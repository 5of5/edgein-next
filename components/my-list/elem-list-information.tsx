import { FC } from 'react';
import { IconSettings, IconGlobe, IconLockClosed } from '@/components/icons';
import { ElemButton } from '@/components/elem-button';
import { numberWithCommas, toLabel } from '@/utils';
import moment from 'moment-timezone';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/router';
import { ElemSocialShare } from '../elem-social-share';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';
import { ElemTooltip } from '../elem-tooltip';
import { getListDisplayName } from '@/utils/lists';
import { startCase } from 'lodash';
import { Lists } from '@/graphql/types';
import { ElemAvatarList } from '../elem-avatar-list';

type Props = {
  list: Lists;
  isListAuthor: boolean;
  isPublicList: boolean;
  isFollowing: boolean;
  isFollowButtonLoading: boolean;
  onFollowList: () => void;
  onOpenSettingsDialog: () => void;
};

export const ElemListInformation: FC<Props> = ({
  list,
  isListAuthor,
  isPublicList,
  isFollowing,
  isFollowButtonLoading,
  onFollowList,
  onOpenSettingsDialog,
}) => {
  const { user } = useUser();
  const router = useRouter();

  const isCustomList = list
    ? !['hot', 'like', 'crap'].includes(getListDisplayName(list))
    : router.query.slug
    ? !['hot', 'like', 'crap'].includes(router.query.slug as string)
    : false;

  const listName =
    getListDisplayName(list) === 'crap' ? 'sh**' : getListDisplayName(list);

  return (
    <>
      <div className="px-4 pb-3 mb-4 border-b border-gray-200">
        <div className="flex flex-wrap items-start justify-between space-y-2 lg:space-y-0">
          <div className="max-w-full">
            <div className="flex items-center space-x-2">
              {isListAuthor && isCustomList ? (
                <>
                  <button
                    type="button"
                    className="inline-flex items-start justify-start mr-2 lg:items-center hover:underline"
                    onClick={onOpenSettingsDialog}>
                    <span className="text-xl font-medium text-left capitalize lg:text-3xl">
                      {getListDisplayName(list)}
                    </span>
                  </button>
                </>
              ) : (
                <h1 className="mr-2 text-xl font-medium capitalize lg:text-3xl">
                  {list
                    ? getListDisplayName(list)
                    : toLabel(router.query.slug as string)}
                </h1>
              )}
              <div className="px-2 py-0.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-full">
                {list.public ? 'Public' : 'Private'}
              </div>
            </div>

            {list?.description && (
              <div className="max-w-xl mb-3 text-sm text-gray-500">
                {list?.description}
              </div>
            )}

            <div className="flex flex-wrap items-center mb-3 text-sm text-gray-500 gap-x-6">
              {list?.created_by && (
                <>
                  <ElemTooltip
                    content={`Created ${moment
                      .utc(list?.created_at)
                      .local()
                      .format('LL HH:mma')}`}
                    direction="top"
                    mode="dark">
                    <div className="inline capitalize">
                      {list?.created_by?.person ? (
                        <>
                          By{' '}
                          <ElemLink
                            href={`${ROUTES.PEOPLE}/${list?.created_by?.person?.slug}`}
                            className="hover:underline">
                            {list?.created_by?.person.name}
                          </ElemLink>
                        </>
                      ) : (
                        <>
                          By{' '}
                          {startCase(
                            list?.created_by.display_name
                              ? list?.created_by.display_name
                              : '',
                          )}
                        </>
                      )}
                    </div>
                  </ElemTooltip>
                </>
              )}

              {list?.updated_at && (
                <>
                  <ElemTooltip
                    content={`Updated ${moment
                      .utc(list?.updated_at)
                      .local()
                      .format('LL HH:mma')}`}
                    direction="top"
                    size="lg"
                    mode="dark">
                    <div className="inline">
                      Updated{' '}
                      {moment.utc(list?.updated_at).local().format('LL')}
                    </div>
                  </ElemTooltip>
                </>
              )}

              <div className="text-gray-500">
                {list?.total_no_of_resources}{' '}
                {`Item${
                  list?.total_no_of_resources &&
                  list?.total_no_of_resources === 1
                    ? ''
                    : 's'
                }`}
              </div>
            </div>

            <div className="mb-3 grow">
              {list?.list_members && list?.list_members.length > 0 && (
                <div className="flex items-center pl-1">
                  <ElemAvatarList people={list?.list_members} />
                  <div className="ml-1 text-sm text-gray-500 shrink-0">
                    {list?.list_members.length > 1
                      ? `${numberWithCommas(
                          list?.list_members.length,
                        )} Followers`
                      : `${numberWithCommas(
                          list?.list_members.length,
                        )} Follower`}
                  </div>
                </div>
              )}
            </div>
          </div>

          {isCustomList && (
            <div className="flex items-center gap-x-2 shrink-0">
              {isPublicList && (
                <ElemSocialShare
                  resourceName={`"${listName}" list`}
                  resourceTwitterUrl={null}
                />
              )}
              {isListAuthor && (
                <ElemButton
                  btn="default"
                  className="gap-x-1 lg:!pl-3"
                  onClick={onOpenSettingsDialog}>
                  <IconSettings className="hidden w-5 h-5 sm:block" />
                  <span>Settings</span>
                </ElemButton>
              )}

              {user && !isFollowing && (
                <ElemButton
                  btn="primary"
                  loading={isFollowButtonLoading}
                  onClick={onFollowList}>
                  Follow
                </ElemButton>
              )}
              {isFollowing && !isListAuthor && (
                <ElemButton
                  btn="default"
                  loading={isFollowButtonLoading}
                  onClick={onFollowList}>
                  Following
                </ElemButton>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
