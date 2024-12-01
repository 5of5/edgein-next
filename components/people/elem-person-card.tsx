import { People } from '@/graphql/types';
import { FC, useState } from 'react';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { ElemTags } from '@/components/elem-tags';
import { ElemTooltip } from '@/components/elem-tooltip';
import { getTimeOfWork, getWorkDurationFromAndTo } from '@/utils';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import { flatten, union, orderBy } from 'lodash';
import { IconLinkedIn, IconEmail, IconLocation } from '@/components/icons';
import { useUser } from '@/context/user-context';
import { CARD_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { getFullAddress } from '@/utils/helpers';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';

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
    ...investors.map(item => ({
      ...item,
      type: 'investors',
      organization: item.vc_firm,
    })),
    ...team_members.map(item => ({
      ...item,
      type: 'companies',
      organization: item.company,
    })),
  ];

  const currentJob = orderBy(mergedJobs, [item => item.end_date], ['desc'])[0];

  //TODO: Remove this logic and replace with precalculate fields
  const vcFirmTags = flatten(investors.map(item => item?.vc_firm?.tags));
  const companyTags = flatten(team_members.map(item => item?.company?.tags));
  const personTags = union(vcFirmTags, companyTags).filter(item => item);

  return (
    <div className="flex flex-col w-full border border-gray-200 rounded-xl p-[16px] transition-all duration-300 hover:border-gray-400">
      {' '}
      <div className="flex flex-col justify-between h-full">
        <div className="w-full">
          <ElemLink
            href={`${ROUTES.PEOPLE}/${slug}`}
            className="flex items-center mb-4 gap-x-4">
            <ElemPhoto
              photo={picture}
              wrapClass="flex items-center justify-center shrink-0 w-12 aspect-square rounded-full bg-dark-100 overflow-hidden border border-gray-200"
              imgClass="object-fit max-w-full max-h-full"
              imgAlt={name}
              placeholder="user"
              placeholderClass="text-gray-300 w-full h-full"
            />
            <h3 className="font-medium truncate" title={name ? name : ''}>
              {name}
            </h3>
          </ElemLink>
          <div>
            {currentJob && (
              <div className="text-sm text-gray-500">
                <div>
                  {currentJob.title}
                  {currentJob.organization?.slug ? (
                    <>
                      {' at '}
                      <ElemLink
                        href={`/${currentJob.type}/${currentJob.organization.slug}`}
                        className="text-gray-700 underline hover:no-underline">
                        {currentJob.organization.name}
                      </ElemLink>
                    </>
                  ) : currentJob.organization?.name ? (
                    <> at {currentJob.organization?.name}</>
                  ) : (
                    <> at Undisclosed organization</>
                  )}
                </div>
                {currentJob.start_date && (
                  <div className="flex space-x-1">
                    <span>
                      {getWorkDurationFromAndTo(
                        currentJob.start_date,
                        currentJob.end_date,
                      )}
                    </span>
                    <span>&middot;</span>
                    <span>
                      {getTimeOfWork(
                        currentJob.start_date,
                        currentJob.end_date,
                      )}
                    </span>
                  </div>
                )}
                {currentJob.organization?.location_json && (
                  <div className="flex mt-2 gap-x-1">
                    <IconLocation className="w-5 h-5" strokeWidth={1.5} />
                    <span className="leading-5">
                      {getFullAddress(currentJob.organization.location_json)}
                    </span>
                  </div>
                )}
              </div>
            )}
            {personTags.length > 0 && (
              <ElemTags
                className="my-4"
                limit={CARD_DEFAULT_TAGS_LIMIT}
                resourceType={'people'}
                tags={personTags}
              />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 gap-x-5">
          <div className="flex items-center space-x-1.5">
            {user?.entitlements?.viewEmails && personEmails.length > 0 ? (
              <a href={`mailto:${personEmails[0]}`}>
                <IconEmail
                  title="Email"
                  className="w-5 h-5 text-gray-600 shrink-0"
                />
              </a>
            ) : personEmails.length > 0 ? (
              <ElemTooltip size="md" content="Premium feature">
                <div>
                  <button onClick={onOpenUpgradeDialog} className="block">
                    <IconEmail
                      title="Email"
                      className="w-5 h-5 text-gray-400 shrink-0"
                    />
                  </button>
                </div>
              </ElemTooltip>
            ) : null}

            {user?.entitlements?.viewEmails && linkedin ? (
              <ElemTooltip size="md" content="View LinkedIn Profile">
                <div>
                  <ElemLink
                    href={linkedin}
                    className="block"
                    target="_blank"
                    rel="noreferrer">
                    <IconLinkedIn
                      title="LinkedIn"
                      className="w-5 h-5 text-gray-600 shrink-0"
                    />
                  </ElemLink>
                </div>
              </ElemTooltip>
            ) : linkedin ? (
              <ElemTooltip size="md" content="Premium feature">
                <div>
                  <button className="block" onClick={onOpenUpgradeDialog}>
                    <IconLinkedIn
                      title="LinkedIn"
                      className="w-5 h-5 text-gray-400 shrink-0"
                    />
                  </button>
                </div>
              </ElemTooltip>
            ) : null}
          </div>

          <ElemSaveToList
            resourceName={name}
            resourceId={id}
            resourceType={'people'}
            slug={slug!}
            buttonStyle="default"
            follows={follows}
          />
        </div>
        <ElemUpgradeDialog
          isOpen={isOpenUpgradeDialog}
          onClose={onCloseUpgradeDialog}
        />
      </div>
    </div>
  );
};
