import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import {
  processNotification,
  processNotificationOnDelete,
} from '@/utils/notifications';
import {
  ActionType,
  ResourceTypes,
  isResourceType,
  NODE_NAME,
} from '@/utils/constants';
import { User } from '@/models/user';
import {
  partnerLookUp,
  resourceIdLookup,
  fieldLookup,
  mutateActionAndDataRaw,
  getCompanyByRoundId,
  deleteMainTableRecord,
  insertActionDataChange,
  markDataRawAsInactive,
  insertDataDiscard,
} from '@/utils/submit-data';
import type { NextApiRequest, NextApiResponse } from 'next';
import CookieService from '@/utils/cookie';
import {
  convertNextToCommonRequest,
  convertNextToCommonResp,
  CommonRequest,
  CommonResponse,
} from '@/utils/api';

const sendNotification = async (
  resourceId: number | undefined,
  resourceType: ResourceTypes,
  resourceObj: Record<string, any>,
  insertResult: Record<string, any>,
) => {
  let actionType: ActionType = 'Insert Data';
  if (resourceId === undefined) {
    if (
      resourceType === 'investment_rounds' ||
      resourceType === 'team_members'
    ) {
      await processNotification(
        resourceObj?.company_id,
        'companies',
        resourceType,
        actionType,
        insertResult?.actions,
      );
    }

    if (resourceType === 'investors') {
      await processNotification(
        resourceObj?.vc_firm_id,
        'vc_firms',
        resourceType,
        actionType,
        insertResult?.actions,
      );
    }

    if (resourceType === 'investments') {
      if (resourceObj?.round_id) {
        const investmentRound = await getCompanyByRoundId(resourceObj.round_id);
        await processNotification(
          investmentRound?.company_id || 0,
          'companies',
          resourceType,
          actionType,
          insertResult?.actions,
        );
      }

      await processNotification(
        resourceObj?.vc_firm_id,
        'vc_firms',
        resourceType,
        actionType,
        insertResult?.actions,
      );
    }

    if (resourceType === 'event_organization') {
      if (resourceObj?.company_id) {
        await processNotification(
          resourceObj.company_id,
          'companies',
          resourceType,
          actionType,
          insertResult?.actions,
        );
      }
      if (resourceObj?.vc_firm_id) {
        await processNotification(
          resourceObj.vc_firm_id,
          'vc_firms',
          resourceType,
          actionType,
          insertResult?.actions,
        );
      }
    }
  } else {
    // updated exists one
    actionType = 'Change Data';
    if (resourceType === 'companies' || resourceType === 'vc_firms') {
      /** Insert notification */
      await processNotification(
        resourceId,
        resourceType,
        resourceType,
        actionType,
        insertResult?.actions,
      );
    }
  }
};

const addSpecialRelationships = async (
  resourceType: ResourceTypes,
  resourceObj: Record<string, any>,
) => {
  try {
    const specialRelationships: Array<Record<string, any>> = [];
    if (resourceType === 'news') {
      const newsContent = resourceObj?.metadata?.description;
      if (newsContent) {
        const newsPeople: Array<Record<string, any>> = [];
        const newscompanies: Array<Record<string, any>> = [];
        const ret = await fetch(
          `${process.env.DANDLEION_API_URL}?text=${newsContent}&include=types&token=${process.env.DANDLEION_API_TOKEN}`,
        );
        const data = await ret.json();
        if (data.annotations)
          for (const entity of data.annotations) {
            if (
              entity.types.includes('http://dbpedia.org/ontology/Person') &&
              !newsPeople.map(item => item['people:name']).includes(entity.spot)
            )
              newsPeople.push({ 'people:name': entity.spot });
            else if (
              !newscompanies
                .map(item => item['companies:name'])
                .includes(entity.spot)
            )
              newscompanies.push({ 'companies:name': entity.spot });
          }

        if (newsPeople.length > 0)
          specialRelationships.push({ news_person: newsPeople });
        if (newscompanies.length > 0)
          specialRelationships.push({ news_organizations: newscompanies });
      }
    }
    return specialRelationships;
  } catch (error: any) {
    return [];
  }
};

const handleResource = async (
  partnerId: number,
  user: User | null,
  resourceId: number | undefined,
  resourceObj: Record<string, any>,
  resourceType: ResourceTypes,
  forceUpdate: Boolean,
) => {
  const resourceRelationships: Array<Record<string, any>> = [
    ...(await addSpecialRelationships(resourceType, resourceObj)),
  ];
  for (const key in resourceObj) {
    if (isResourceType(key)) {
      resourceRelationships.push({ [key]: resourceObj[key] });
      delete resourceObj[key];
    }
  }

  if (
    !resourceId &&
    !resourceObj?.library &&
    ['companies', 'vc_firms', 'people', 'news'].includes(resourceType)
  ) {
    resourceObj.library = ['Web3'];
  }

  let mainResult: Record<string, any> = await mutateActionAndDataRaw(
    partnerId,
    user,
    NODE_NAME[resourceType],
    resourceId as number,
    resourceObj,
    resourceType,
    forceUpdate,
  );

  await sendNotification(resourceId, resourceType, resourceObj, mainResult);

  const relationshipResults: Array<Record<string, any>> = [];
  for (const resourceRelationship of resourceRelationships) {
    const resourceRelationshipType = Object.keys(resourceRelationship)[0];
    let resourceRelationshipObjs = Object.values(resourceRelationship)[0];
    if (!Array.isArray(resourceRelationshipObjs))
      resourceRelationshipObjs = [resourceRelationshipObjs];

    for (const resourceRelationshipObj of resourceRelationshipObjs) {
      try {
        // Add relationship field for resourceId of main record
        const relationshipField =
          resourceType === 'people'
            ? 'person_id'
            : `${NODE_NAME[resourceType]}_id`;
        resourceRelationshipObj[relationshipField] = mainResult.id;
        const ret = await handleResource(
          partnerId,
          user,
          undefined,
          resourceRelationshipObj,
          resourceRelationshipType as ResourceTypes,
          forceUpdate,
        );
        relationshipResults.push(ret);
      } catch (error: any) {
        continue;
      }
    }
  }

  if (relationshipResults.length > 0)
    mainResult = { ...mainResult, relationshipResults };

  return mainResult;
};

export const commonHandler = async (
  req: CommonRequest,
  res: CommonResponse,
) => {
  if (!['POST', 'PUT', 'DELETE'].includes(req.method as string))
    return res.status(405).send({ message: 'Method is not allowed' });
  let user: (User & { _iat?: number }) | null = null;
  try {
    const token = CookieService.getAuthToken(req.cookies);
    user = await CookieService.getUser(token);
  } catch (error) {
    user = null;
  }
  const apiKey: string = req.body.partner_api_key;
  const resourceType: ResourceTypes = req.body.resource_type;
  const resourceIdentifier:
    | Array<Array<Record<string, any>>>
    | Array<Record<string, any>> = req.body.resource_identifier;
  const resourceObj: Array<Record<string, any>> | Record<string, any> =
    req.body.resource;
  const forceUpdate: Boolean = req.body.force_update;

  let resourceIdentifiers: Array<Array<Record<string, any>>> = [];
  let resourceIds: Array<number | undefined> = [];
  let resourceObjs: Array<Record<string, any>> = [];
  let partnerId = 0;

  try {
    if (
      apiKey === undefined ||
      resourceIdentifier === undefined ||
      resourceObj === undefined ||
      resourceType === undefined
    )
      return res.status(400).send({ message: 'Bad Request' });

    // Identify partner or admin
    const partner = await partnerLookUp(apiKey);
    if (partner?.id === undefined) {
      if (!(user?.role === 'admin')) {
        return res.status(401).send({ message: 'Unauthorized Partner' });
      }
    } else {
      partnerId = partner.id;
    }

    // Resource object can be an array (for one record) or an array of array (for list of records)
    if (!Array.isArray(resourceObj)) {
      resourceObjs.push(resourceObj);
    } else {
      resourceObjs = [...(resourceObj as Array<Record<string, any>>)];
    }

    // Resource identifier can be an array (for one record) or an array of array (for list of records)
    if (!Array.isArray(resourceIdentifier) || resourceIdentifier.length <= 0) {
      return res.status(400).send({ message: 'Invalid identifier' });
    } else if (
      Array.isArray(resourceIdentifier[0]) &&
      resourceObjs.length !== resourceIdentifier.length
    ) {
      return res.status(400).send({
        message: 'Resource identifier and resource must be same length',
      });
    } else if (!Array.isArray(resourceIdentifier[0])) {
      resourceIdentifiers.push(resourceIdentifier);
    } else {
      resourceIdentifiers = [
        ...(resourceIdentifier as Array<Array<Record<string, any>>>),
      ];
    }

    // Validate identifier fields (defined in data_fields)
    for (const identifier of resourceIdentifiers)
      for (const item of identifier) {
        if (!item.field) continue;
        const identifierColumn = item.field;
        if (identifierColumn !== 'id') {
          const lookupField = await fieldLookup(
            `${NODE_NAME[resourceType]}.${identifierColumn}`,
          );

          if (!lookupField?.is_valid_identifier) {
            return res.status(400).send({
              identifier: identifierColumn,
              message: 'Invalid identifier',
            });
          }
        }
      }

    // Identify resource id
    resourceIds = await Promise.all(
      resourceIdentifiers.map(async identifier => {
        return resourceIdLookup(
          resourceType,
          identifier as Array<Record<string, any>>,
        );
      }),
    );

    const result: Array<any> = await Promise.all(
      resourceIds.map(async (resourceId, index) => {
        if (req.method === 'DELETE') {
          // In 'Delete' case, request method is 'DELETE'
          if (!resourceId) return { id: null, deleted: false };

          try {
            await deleteMainTableRecord(resourceType, resourceId);
            const action = await insertActionDataChange(
              'Delete Data',
              resourceId,
              resourceType,
              {},
              user?.id,
            );
            await markDataRawAsInactive(resourceType, resourceId);
            await processNotificationOnDelete(
              resourceType,
              resourceId,
              action?.id || 0,
              resourceObjs[index],
            );
            return { id: resourceId, deleted: true };
          } catch (error: any) {
            return { id: resourceId, deleted: false, error };
          }
        } else {
          // Upsert record
          try {
            const res = await handleResource(
              partnerId,
              user,
              resourceId,
              resourceObjs[index],
              resourceType,
              forceUpdate,
            );
            return res;
          } catch (error: any) {
            return {
              id: resourceId || null,
              error,
            };
          }
        }
      }),
    );
    return res.send(result);
  } catch (error: any) {
    return res.status(500);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await commonHandler(
    convertNextToCommonRequest(req),
    convertNextToCommonResp(res),
  );
};

export default handler;
