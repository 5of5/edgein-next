import { People } from '@/graphql/types';
import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { ElemTags } from '@/components/elem-tags';
import { ElemTooltip } from '@/components/elem-tooltip';
import { getTimeOfWork, getWorkDurationFromAndTo } from '@/utils';
import Link from 'next/link';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import { flatten, union, orderBy } from 'lodash';
import { IconLinkedIn, IconEmail, IconLocation } from '@/components/icons';
import { useUser } from '@/context/user-context';
import { CARD_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { getFullAddress } from '@/utils/helpers';

type Props = {
  person: People;
};

export const ElemPersonCard: FC<Props> = ({ person }) => {
  const router = useRouter();

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);

  const { user } = useUser();

  const onOpenUpgradeDialog = () => {
    setIsOpenUpgradeDialog(true);
  };

  const onCloseUpgradeDialog = () => {
    setIsOpenUpgradeDialog(false);
  };

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

  const jobsByDateDesc = orderBy(mergedJobs, [item => item.end_date], ['desc']);

  const currentJob = jobsByDateDesc[jobsByDateDesc.length - 1];

  const vcFirmTags = flatten(investors.map(item => item?.vc_firm?.tags));
  const companyTags = flatten(team_members.map(item => item?.company?.tags));
  const personTags = union(vcFirmTags, companyTags).filter(item => item);

  const onClickPremiumFeature = () => {
    if (!user) {
      router.push('/sign-in');
    } else {
      setIsOpenUpgradeDialog(true);
    }
  };

  return (
    <div className="flex flex-col w-full border border-gray-200 rounded-xl p-[16px] transition-all duration-300 hover:border-gray-400">
      {' '}
      <div className="flex flex-col justify-between h-full">
        <div className="w-full">
          <Link href={`/people/${slug}`}>
            <a className="flex items-center gap-x-4 mb-4">
              <ElemPhoto
                photo={picture}
                wrapClass="flex items-center justify-center shrink-0 w-12  aspect-square rounded-full bg-white overflow-hidden border border-gray-200"
                imgClass="object-fit max-w-full max-h-full"
                imgAlt={name}
                placeholderClass="text-gray-500"
                placeholder="user"
              />
              <h3 className="font-medium truncate" title={name ? name : ''}>
                {name}
              </h3>
            </a>
          </Link>
          <div>
            {currentJob && (
              <div className="text-gray-500 text-sm">
                <div>
                  {currentJob.title}
                  {currentJob.organization?.slug ? (
                    <>
                      {' at '}
                      <Link
                        href={`/${currentJob.type}/${currentJob.organization.slug}`}
                      >
                        <a className="text-gray-700 underline hover:no-underline">
                          {currentJob.organization.name}
                        </a>
                      </Link>
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
                  <div className="flex gap-x-1 mt-2">
                    <IconLocation className="w-5 h-5" strokeWidth={1.5} />
                    <span className="leading-5">
                      {getFullAddress(currentJob.organization.location_json)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {personTags.length > 0 && (
          <ElemTags
            className="my-4"
            limit={CARD_DEFAULT_TAGS_LIMIT}
            resourceType={'people'}
            tags={personTags}
          />
        )}
        <div className="flex items-center justify-between mt-2 gap-x-5">
          <div className="flex items-center space-x-1.5">
            {user?.entitlements?.viewEmails && personEmails.length > 0 ? (
              <a href={`mailto:${personEmails[0]}`}>
                <IconEmail
                  title="Email"
                  className="h-5 w-5 shrink-0 text-gray-600"
                />
              </a>
            ) : personEmails.length > 0 ? (
              <ElemTooltip size="md" content="Premium feature">
                <div>
                  <button onClick={onClickPremiumFeature} className="block">
                    <IconEmail
                      title="Email"
                      className="h-5 w-5 shrink-0 text-gray-400"
                    />
                  </button>
                </div>
              </ElemTooltip>
            ) : null}

            {user?.entitlements?.viewEmails && linkedin ? (
              <ElemTooltip size="md" content="View LinkedIn Profile">
                <div>
                  <Link href={linkedin} passHref>
                    <a className="block" target="_blank" rel="noreferrer">
                      <IconLinkedIn
                        title="LinkedIn"
                        className="h-5 w-5 shrink-0 text-gray-600"
                      />
                    </a>
                  </Link>
                </div>
              </ElemTooltip>
            ) : linkedin ? (
              <ElemTooltip size="md" content="Premium feature">
                <div>
                  <button className="block" onClick={onClickPremiumFeature}>
                    <IconLinkedIn
                      title="LinkedIn"
                      className="h-5 w-5 shrink-0 text-gray-400"
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
