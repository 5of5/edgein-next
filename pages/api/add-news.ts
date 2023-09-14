import type { NextApiRequest, NextApiResponse } from 'next';
import { convertLookupField, insertResourceData, validateRequest } from '@/utils/submit-data';
import { CommonRequest, CommonResponse, convertNextToCommonRequest, convertNextToCommonResp } from '@/utils/api';
import { IncomingNewsItemSchema } from '@/utils/schema';
import { zodValidate } from '@/utils/validation';
import { z } from 'zod';

const addSpecialRelationships = async (
  newsObj: Record<string, any>,
) => {
  try {
    const specialRelationships: Array<Record<string, any>> = [];
    const newsContent = newsObj?.metadata?.description;
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
    return specialRelationships;
  } catch (error: any) {
    return [];
  }
};

type IncomingNewsItem = z.infer<typeof IncomingNewsItemSchema>;

const commonHandler = async (req: CommonRequest, res: CommonResponse) => {
  if (req.method !== 'POST') return res.status(405);
  const validate = await validateRequest(req, res);
  if (!validate) return;
  const { partnerId, user } = validate;
  if (!partnerId && !user) return res.status(400).send({ message: 'Bad Request' });

  const newsObjs = req.body.news_objs;

  const { errors } = zodValidate(newsObjs, z.array(IncomingNewsItemSchema));
  if (errors) {
    return res
      .status(400)
      .send({ error: errors['name']?.[0] || 'Invalid parameters' });
  } else {
    await Promise.all(newsObjs.map(async (newsObj: IncomingNewsItem) => {
      const relationships = await addSpecialRelationships(newsObj);
      const news = await insertResourceData('news', newsObj)
      for (const resourceRelationship of relationships) {
        const resourceRelationshipType = Object.keys(resourceRelationship)[0];
        if (['news_organizations',
        'news_person',
        'news_related_person',
        'news_related_organizations'].includes(resourceRelationshipType)) {
          const resourceRelationshipTyped = resourceRelationshipType as 'news_organizations' |
          'news_person' |
          'news_related_person' |
          'news_related_organizations';

          let resourceRelationshipObjs = Object.values(resourceRelationship)[0];
          if (!Array.isArray(resourceRelationshipObjs)) {
            resourceRelationshipObjs = [resourceRelationshipObjs];
          }
          for (const resourceRelationshipObj of resourceRelationshipObjs) {
            try {
              // Convert lookup fields
              for (let field in resourceRelationshipObj) {
                const convert = await convertLookupField(resourceRelationshipTyped, news.id, resourceRelationshipObj, field)
                if (!convert.success) {
                  continue;
                }
                resourceRelationshipObjs[convert.field] = convert.value;
                delete resourceRelationshipObjs[field];
              }    
              // Add relationship field for resourceId of main record
              const relationshipField = 'news_id'
              resourceRelationshipObj[relationshipField] = news.id;
              const ret = await insertResourceData(resourceRelationshipTyped, resourceRelationshipObj)
            } catch (error: any) {
              continue;
            }
          }
        }
      }
    }));
    return res.send({ message: 'Success' });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await commonHandler(
    convertNextToCommonRequest(req),
    convertNextToCommonResp(res),
  );
};

export default handler;
