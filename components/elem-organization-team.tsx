import React, { useState, useEffect } from 'react';
import { PlaceholderPerson } from '@/components/placeholders';
import { ElemPersonCard } from '@/components/elem-person-card';
import { ElemFilterTags } from '@/components/filters/elem-filter-tags';
import { Pagination } from '@/components/pagination';
import { ElemBulkSavePeople } from './elem-bulk-save-people';
import { ElemButton } from './elem-button';
import { uniq, compact, sortBy } from 'lodash';
import { DeepPartial } from '@/types/common';
// import { useIntercom } from 'react-use-intercom';
import { ROUTES } from '@/routes';
import { useStateParams } from '@/hooks/use-state-params';
import { functionChoicesTM } from '@/utils/constants';
import AddPeopleModal from '@/components/add-people-modal';
import dynamic from 'next/dynamic';
import {
  Order_By,
  useGetTeamMembersQuery,
  Team_Members,
  Team_Members_Bool_Exp,
  Team_Members_Order_By,
  useGetInvestorsQuery,
  Investors,
  Investors_Bool_Exp,
  Investors_Order_By,
  People,
} from '@/graphql/types';
import { useUser } from '@/context/user-context';

// Dynamically import LiveChatWidget to avoid SSR issues
const LiveChatWidget = dynamic(
  () => import('@livechat/widget-react').then((mod) => mod.LiveChatWidget),
  { ssr: false }
);

type Props = {
  className?: string;
  heading?: string;
  resourceName?: string;
  resourceType: 'companies' | 'vc_firms';
  resourceId?: number;
  showTags?: boolean;
  allowToSaveTeam?: boolean;
};

export const ElemOrganizationTeam: React.FC<Props> = ({
  className,
  heading,
  resourceName,
  resourceType,
  resourceId,
  showTags = true,
  allowToSaveTeam = true,
}) => {
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  // Set isMounted to true when component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  function handleLiveChatEvent(event: any) {
    console.log('LiveChatWidget.onNewEvent', event);
  }

  const [show, setShow] = useState<boolean>(false);
  const showNewMessages = (message: String) => {
    console.log(message);
    setShow(true);
  };

  const [page, setPage] = useStateParams<number>(
    0,
    'page',
    pageIndex => pageIndex + 1 + '',
    pageIndex => Number(pageIndex) - 1,
  );

  const [selectedTag, setSelectedTag] = useState<string | null>('All Members');

  const limit = 50;
  const offset = limit * page;

  const defaultCompanyFilters: DeepPartial<Team_Members_Bool_Exp>[] = [
    { company_id: { _eq: resourceId } },
  ];
  const companyFilters: DeepPartial<Team_Members_Bool_Exp> = {
    _and: defaultCompanyFilters,
  };

  const defaultInvestorFilters: DeepPartial<Investors_Bool_Exp>[] = [
    { vc_firm_id: { _eq: resourceId } },
  ];
  const investorFilters: DeepPartial<Investors_Bool_Exp> = {
    _and: defaultInvestorFilters,
  };

  const {
    data: teamData,
    error,
    isLoading,
  } = useGetTeamMembersQuery(
    {
      offset: offset,
      limit: limit,
      where: companyFilters as Team_Members_Bool_Exp,
      orderBy: [
        {
          end_date: Order_By.DescNullsFirst,
        } as Team_Members_Order_By,
        { founder: Order_By.DescNullsLast } as Team_Members_Order_By,
      ],
    },
    { refetchOnWindowFocus: false },
  );

  const {
    data: investorsData,
    error: errorSecondary,
    isLoading: isLoadingSecondary,
  } = useGetInvestorsQuery(
    {
      offset: offset,
      limit: limit,
      where: investorFilters as Investors_Bool_Exp,
      orderBy: [
        {
          end_date: Order_By.DescNullsFirst,
        } as Investors_Order_By,
        { founder: Order_By.DescNullsLast } as Investors_Order_By,
      ],
    },
    { refetchOnWindowFocus: false },
  );

  const members: (Team_Members | Investors)[] =
    resourceType === 'companies'
      ? (teamData?.team_members as Team_Members[]) || []
      : resourceType === 'vc_firms'
      ? (investorsData?.investors as Investors[]) || []
      : [];

  const members_aggregate =
    resourceType === 'companies'
      ? teamData?.team_members_aggregate?.aggregate?.count || 0
      : resourceType === 'vc_firms'
      ? investorsData?.investors_aggregate?.aggregate?.count || 0
      : 0;

  const filteredMembers =
    selectedTag === 'All Members' && members
      ? members
      : members
      ? members.filter(p => p.function === selectedTag)
      : [];

  if (resourceType === 'companies' && selectedTag !== 'All Members') {
    defaultCompanyFilters.push({
      _and: [{ function: { _eq: selectedTag } }],
    });
  }
  if (resourceType === 'vc_firms' && selectedTag !== 'All Members') {
    defaultInvestorFilters.push({
      _and: [{ function: { _eq: selectedTag } }],
    });
  }

  const allMemberTags = [
    'All Members',
    ...functionChoicesTM.map(option => {
      return option.name;
    }),
  ];

  const currentQueryMemberTags = compact(
    uniq([
      'All Members',
      ...sortBy(members?.map((members: any) => members.function)),
    ]),
  );

  const getSelectableMemberTags = allMemberTags.filter(name =>
    currentQueryMemberTags.includes(name),
  );

  const personIds = members
    .filter(item => item.person !== null)
    .map(item => (item.person as People).id);

  const [showAddPeopleModal, setShowAddPeopleModal] = useState(false);

  return (
    <section className={`rounded-lg border border-gray-700 ${className}`}>
      {/* Only render LiveChatWidget on client-side */}
      {isMounted && show && (
        <LiveChatWidget
          license={process.env.NEXT_PUBLIC_LIVECHAT_LISCENCE || ''}
          visibility="maximized"
          onNewEvent={handleLiveChatEvent}
        />
      )}
      <AddPeopleModal
        show={showAddPeopleModal}
        onClose={() => setShowAddPeopleModal(false)}
        resourceType={resourceType}
        companyId={resourceType === 'companies' ? resourceId : undefined}
        vcFirmId={resourceType === 'vc_firms' ? resourceId : undefined}
      />
      {heading && (
        <div className="flex items-center justify-between px-4 pt-2">
          <h2 className="text-lg font-medium">{heading}</h2>
        </div>
      )}

      <div className="px-4 py-4">
        {isLoading || isLoadingSecondary ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <PlaceholderPerson key={i} />
            ))}
          </div>
        ) : error || errorSecondary ? (
          <div className="text-center text-red-500">
            Error loading team members
          </div>
        ) : (
          <>
            {showTags && (
              <div className="mb-4">
                <ElemFilterTags
                  tags={getSelectableMemberTags}
                  selectedTag={selectedTag}
                  onClick={setSelectedTag}
                />
              </div>
            )}
            {filteredMembers.length === 0 ? (
              <div className="text-center">
                <p className="mb-4 text-gray-400">No team members found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMembers.map((member, index) => (
                  <ElemPersonCard
                    key={index}
                    href={`${ROUTES.PEOPLE}/${member.person?.slug}`}
                    photo={member.person?.picture}
                    heading={member.person?.name}
                    founder={member.founder}
                    text={member.function}
                    linkedin={member.person?.linkedin}
                    personal_email={member.person?.personal_email}
                    work_email={member.person?.work_email}
                    end_date={member.end_date}
                  />
                ))}
              </div>
            )}
            {allowToSaveTeam && (
              <div className="mt-4 flex justify-center">
                {user ? (
                  <ElemButton
                    onClick={() => setShowAddPeopleModal(true)}
                    btn="default"
                    size="sm">
                    Contribute Data
                  </ElemButton>
                ) : (
                  <ElemButton
                    href={ROUTES.SIGN_IN}
                    btn="default"
                    size="sm"
                    disabled={!user}>
                    Login to Contribute Data
                  </ElemButton>
                )}
              </div>
            )}
            {members_aggregate > limit && (
              <div className="mt-4">
                <Pagination
                  shownItems={filteredMembers.length}
                  totalItems={members_aggregate}
                  page={page}
                  itemsPerPage={limit}
                  onClickPrev={() => setPage(page - 1)}
                  onClickNext={() => setPage(page + 1)}
                  onClickToPage={selectedPage => setPage(selectedPage)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};
