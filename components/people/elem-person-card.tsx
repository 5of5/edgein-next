import { People } from '@/graphql/types';
import { FC, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { ElemTags } from '@/components/elem-tags';
import { ElemTooltip } from '@/components/elem-tooltip';
import { getTimeOfWork, getWorkDurationFromAndTo } from '@/utils';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import { flatten, union, orderBy } from 'lodash';
import {
  IconLinkedIn,
  IconEmail,
  IconLocation,
  IconBriefcase,
  IconCalendar,
} from '@/components/icons';
import { useUser } from '@/context/user-context';
import { CARD_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { getFullAddress } from '@/utils/helpers';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';
import { Card, CardContent, CardFooter, CardHeader } from '../shadcn/card';

type Props = {
  person: People;
};

export const ElemPersonCard: FC<Props> = ({ person }) => {
  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const { user } = useUser();

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };

  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

  // TODO: Use precalculate fields (location_json, tags, etc.)
  // Remove old logic
  const {
    id,
    name,
    personal_email,
    work_email,
    email,
    picture,
    slug,
    linkedin,
    follows,
    investors,
    team_members,
  } = person;

  const personEmails = [
    ...(work_email ? [work_email] : []),
    ...(personal_email ? [personal_email] : []),
    ...(email ? [email] : []),
  ];

  const mergedJobs = [
    ...(investors || []).map(item => ({
      ...item,
      type: 'investors',
      organization: item.vc_firm,
    })),
    ...(team_members || []).map(item => ({
      ...item,
      type: 'companies',
      organization: item.company,
    })),
  ];

  const currentJob =
    mergedJobs.length > 0
      ? orderBy(mergedJobs, [item => item.end_date], ['desc'])[0]
      : null;

  //TODO: Remove this logic and replace with precalculate fields
  const vcFirmTags = flatten(
    (investors || []).map(item => item?.vc_firm?.tags || []),
  );
  const companyTags = flatten(
    (team_members || []).map(item => item?.company?.tags || []),
  );
  const personTags = union(vcFirmTags, companyTags).filter(Boolean);

  return (
    <Card className="flex flex-col w-full h-full border border-gray-800 bg-gradient-to-b from-gray-900 to-black hover:border-gray-600 transition-all duration-300">
      <CardHeader className="p-4 pb-3 flex-shrink-0">
        <ElemLink href={`${ROUTES.PEOPLE}/${slug}`} className="block">
          <div className="flex items-center gap-3">
            <ElemPhoto
              photo={picture}
              wrapClass="flex items-center justify-center shrink-0 w-12 h-12 aspect-square rounded-full bg-black overflow-hidden border border-gray-700"
              imgClass="object-fit max-w-full max-h-full"
              imgAlt={name}
              placeholder="user"
              placeholderClass="text-gray-300 w-full h-full"
            />
            <div className="flex flex-col overflow-hidden">
              <ElemTooltip content={name || ''} mode="light">
                <h3 className="text-base font-medium text-gray-100 truncate max-w-[200px] first-letter:uppercase">
                  {name || 'Unknown'}
                </h3>
              </ElemTooltip>
            </div>
          </div>
        </ElemLink>

        {personTags && personTags.length > 0 && (
          <div className="mt-3">
            <ElemTags
              className="overflow-hidden"
              limit={CARD_DEFAULT_TAGS_LIMIT}
              resourceType={'people'}
              tags={personTags}
            />
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-grow min-h-0">
        {currentJob && (
          <div className="space-y-3 text-gray-400">
            <div className="flex items-start gap-1.5">
              <IconBriefcase className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-medium">{currentJob.title}</span>
                {currentJob.organization?.slug ? (
                  <>
                    {' at '}
                    <ElemLink
                      href={`/${currentJob.type}/${currentJob.organization.slug}`}
                      className="text-gray-300 hover:underline">
                      {currentJob.organization.name}
                    </ElemLink>
                  </>
                ) : currentJob.organization?.name ? (
                  <> at {currentJob.organization?.name}</>
                ) : (
                  <> at Undisclosed organization</>
                )}
              </div>
            </div>

            {currentJob.start_date && (
              <div className="flex items-center gap-1.5">
                <IconCalendar className="w-3.5 h-3.5 shrink-0" />
                <div className="text-xs">
                  {getWorkDurationFromAndTo(
                    currentJob.start_date,
                    currentJob.end_date,
                  )}
                  <span className="mx-1">•</span>
                  <span>
                    {getTimeOfWork(currentJob.start_date, currentJob.end_date)}
                  </span>
                </div>
              </div>
            )}

            {currentJob.organization?.location_json && (
              <div className="flex items-center gap-1.5">
                <IconLocation className="w-3.5 h-3.5 shrink-0" />
                <span className="text-xs truncate">
                  {getFullAddress(currentJob.organization.location_json)}
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-3 border-t border-gray-800 flex-shrink-0 h-[60px] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {user?.entitlements?.viewEmails && personEmails.length > 0 ? (
            <a
              href={`mailto:${personEmails[0]}`}
              className="text-gray-400 hover:text-gray-300 transition-colors">
              <IconEmail title="Email" className="w-5 h-5" />
            </a>
          ) : personEmails.length > 0 ? (
            <ElemTooltip size="md" content="Premium feature">
              <button
                onClick={onOpenUpgradeDialog}
                className="text-gray-500 hover:text-gray-400 transition-colors">
                <IconEmail title="Email" className="w-5 h-5" />
              </button>
            </ElemTooltip>
          ) : null}

          {user?.entitlements?.viewEmails && linkedin ? (
            <ElemTooltip size="md" content="View LinkedIn Profile">
              <ElemLink
                href={linkedin}
                className="text-gray-400 hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noreferrer">
                <IconLinkedIn title="LinkedIn" className="w-5 h-5" />
              </ElemLink>
            </ElemTooltip>
          ) : linkedin ? (
            <ElemTooltip size="md" content="Premium feature">
              <button
                className="text-gray-500 hover:text-gray-400 transition-colors"
                onClick={onOpenUpgradeDialog}>
                <IconLinkedIn title="LinkedIn" className="w-5 h-5" />
              </button>
            </ElemTooltip>
          ) : null}
        </div>

        <div className="inline-flex scale-90 origin-right">
          <ElemSaveToList
            resourceName={name || ''}
            resourceId={id}
            resourceType={'people'}
            slug={slug!}
            buttonStyle="black-to-white"
            follows={follows}
          />
        </div>
      </CardFooter>

      <ElemUpgradeDialog
        isOpen={isOpenUpgradeDialog}
        onClose={onCloseUpgradeDialog}
      />
    </Card>
  );
};
