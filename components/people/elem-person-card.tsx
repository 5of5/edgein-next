import { People, Investors, Team_Members } from '@/graphql/types';
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

  const getVcFirmJobs = investors as Investors[];
  const getCompanyJobs = team_members as Team_Members[];
  const mergedJobs = union(getVcFirmJobs, getCompanyJobs as any).filter(
    item => item,
  );
  const jobsByDateDesc = orderBy(mergedJobs, [item => item.end_date], ['desc']);

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
          {jobsByDateDesc?.slice(0, 1).map((job: any, index: number) => {
            let organization;
            if (job.company) {
              organization = job.company;
            } else if (job.vc_firm) {
              organization = job.vc_firm;
            }

            const slug = job.company
              ? `/companies/${organization.slug}`
              : job.vc_firm
              ? `/investors/${organization.slug}`
              : null;

            const location =
              job.company?.location_json || job.vc_firm?.location_json;

            return (
              <div key={index} className="text-gray-500 text-sm">
                {location && (
                  <div className="flex gap-x-1 mb-2">
                    <IconLocation className="w-5 h-5" strokeWidth={1.5} />
                    <span className="leading-5">
                      {getFullAddress(location)}
                    </span>
                  </div>
                )}
                <div>
                  {job.title}
                  {slug ? (
                    <>
                      {' at '}
                      <Link href={slug}>
                        <a className="text-gray-700 underline hover:no-underline">
                          {organization.name}
                        </a>
                      </Link>
                    </>
                  ) : organization?.name ? (
                    <> at {organization?.name}</>
                  ) : (
                    <> at Undisclosed organization</>
                  )}
                </div>
                {job.start_date && (
                  <div className="flex space-x-1">
                    <span>
                      {getWorkDurationFromAndTo(job.start_date, job.end_date)}
                    </span>
                    <span>&middot;</span>
                    <span>{getTimeOfWork(job.start_date, job.end_date)}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {personTags.length > 0 && (
        <ElemTags
          className="my-5"
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
  );
};
