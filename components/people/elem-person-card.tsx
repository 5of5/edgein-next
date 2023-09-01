import { People, Investors, Team_Members } from '@/graphql/types';
import { FC, useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemReactions } from '@/components/elem-reactions';
import { ElemSaveToList } from '@/components/elem-save-to-list';
import { ElemTags } from '@/components/elem-tags';
import { ElemTooltip } from '@/components/elem-tooltip';
import { getTimeOfWork, getWorkDurationFromAndTo } from '@/utils';
import Link from 'next/link';
import { ElemUpgradeDialog } from '../elem-upgrade-dialog';
import { flatten, union, orderBy, first } from 'lodash';
import {
  IconGlobe,
  IconLinkedIn,
  IconEmail,
  IconTwitter,
  IconGithub,
  IconDiscord,
} from '@/components/icons';
import { useUser } from '@/context/user-context';
import { CARD_DEFAULT_TAGS_LIMIT } from '@/utils/constants';

type Props = {
  person: People;
};

export const ElemPersonCard: FC<Props> = ({ person }) => {
  const router = useRouter();

  const [isOpenUpgradeDialog, setIsOpenUpgradeDialog] = useState(false);
  const [showEmails, setShowEmails] = useState(false);

  const { user } = useUser();

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
    github,
    twitter_url,
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

  const onClickShowEmails = () => {
    if (!user) {
      router.push('/sign-in');
    } else if (!user?.entitlements.viewEmails) {
      setShowEmails(!showEmails);
    } else {
      setIsOpenUpgradeDialog(true);
    }
  };

  const onClickLinkedin = () => {
    if (!user) {
      router.push('/sign-in');
    } else {
      setIsOpenUpgradeDialog(true);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2 shrink-0 w-full">
        <Link href={`/people/${slug}`}>
          <a>
            <ElemPhoto
              photo={picture}
              wrapClass="flex items-center justify-center shrink-0 w-12  aspect-square rounded-full bg-white overflow-hidden border border-gray-200"
              imgClass="object-fit max-w-full max-h-full"
              imgAlt={name}
              placeholderClass="text-gray-500"
              placeholder="user"
            />
          </a>
        </Link>
        <div>
          <h3 className="font-medium truncate" title={name ? name : ''}>
            <Link href={`/people/${slug}`}>
              <a>{name}</a>
            </Link>
          </h3>

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

            return (
              <div key={index} className="text-gray-500 text-sm">
                <div>
                  {job.title}
                  {slug ? (
                    <>
                      {' at '}
                      <Link href={slug}>
                        <a className="underline hover:no-underline">
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

          <div className="text-gray-500 text-sm">
            {showEmails && (
              <>
                {personEmails?.map((email, i: number) => [
                  <Fragment key={i}>{email}</Fragment>,
                ])}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-2">
        {/* <div className="flex items-center">
              <IconEmail className="h-6 w-6 shrink-0 mr-2" />
              <div className="break-all">
                {showInfo['email'] ? (
                  email
                ) : (
                  <>
                    &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;@&bull;&bull;&bull;&bull;&bull;&bull;
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center text-primary-500">
              {showInfo['email'] ? (
                <>
                  <IconEyeSlash className="h-5 w-5 shrink-0 mr-1" /> hide
                </>
              ) : (
                <>
                  <IconEye className="h-5 w-5 shrink-0 mr-1" /> show
                </>
              )}
            </div> */}

        {/* {tags && (
          <ElemTags
            className="mt-4"
            limit={CARD_DEFAULT_TAGS_LIMIT}
            resourceType={'people'}
            tags={tags}
          />
        )} */}
      </div>

      <div className="flex items-center justify-between mt-2 gap-x-5">
        <div className="flex items-center space-x-0.5">
          {user?.entitlements?.viewEmails && linkedin ? (
            <ElemTooltip size="md" content="View LinkedIn Profile">
              <div>
                <Link href={linkedin} passHref>
                  <a className="block" target="_blank" rel="noreferrer">
                    <IconLinkedIn
                      title="LinkedIn"
                      className="h-6 w-6 shrink-0 text-gray-400"
                    />
                  </a>
                </Link>
              </div>
            </ElemTooltip>
          ) : linkedin ? (
            <ElemTooltip size="md" content="Premium feature">
              <div>
                <button className="block" onClick={onClickLinkedin}>
                  <IconLinkedIn
                    title="LinkedIn"
                    className="h-6 w-6 shrink-0 text-gray-400"
                  />
                </button>
              </div>
            </ElemTooltip>
          ) : null}

          {personEmails.length > 0 ? (
            <ElemTooltip
              size="md"
              content={
                !user?.entitlements?.viewEmails
                  ? 'View Emails'
                  : 'Premium feature'
              }>
              <div>
                <button className="block" onClick={onClickShowEmails}>
                  <IconEmail
                    title="Email"
                    className="h-6 w-6 shrink-0 text-gray-400"
                  />
                </button>
              </div>
            </ElemTooltip>
          ) : null}

          {twitter_url && (
            <Link href={twitter_url}>
              <a target="_blank">
                <IconTwitter className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}
          {github && (
            <Link href={github}>
              <a target="_blank">
                <IconGithub className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}
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
