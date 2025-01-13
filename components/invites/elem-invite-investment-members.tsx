import { useMutation } from 'react-query';
import { useUser } from '@/context/user-context';
import {
  Users,
  Investors,
  useGetInvestorMailingListQuery,
  useGetUserByIdQuery,
  Companies,
} from '@/graphql/types';
import { ElemButton } from '../elem-button';
import {
  filter,
  flatten,
  get,
  has,
  includes,
  reduce,
  uniqBy,
  compact,
} from 'lodash';
import { DeepPartial } from '@/types/common';
import { ElemPhoto } from '../elem-photo';
import { FC, Fragment, useState } from 'react';

const getInvestedInCompanies = (investors: DeepPartial<Investors>[]) => {
  const getCompanies = investors.map(investor => {
    const companyfromRound = investor.vc_firm?.investments?.map(inv => {
      return inv?.investment_round?.company;
    });

    // remove undefined items from array
    return compact(companyfromRound);
  });

  // Flatten the list of lists and return only unique companies (compared by company_id only)
  return uniqBy(flatten(getCompanies), 'id');
};

const canSendInvestorInvitation = (
  users: DeepPartial<Users>[] | undefined,
  companyId: number | undefined,
) => {
  const notifiedCompanies = get(
    users,
    '0.feature_flags.notifiedInvestorCompanies',
    {},
  );

  return !has(notifiedCompanies, `${companyId}`);
};

type SendInvitationPayload = {
  companyIds: number[];
};

type Props = {
  vcFirmName: string;
};

export const ElemInviteInvestmentMembers: FC<Props> = ({ vcFirmName }) => {
  const [selectedCompanies, setSelectedCompanies] = useState<
    DeepPartial<Companies>[]
  >([]);

  const { user } = useUser();

  const { data: userById, refetch: refetchUser } = useGetUserByIdQuery({
    id: user?.id || 0,
  });

  const mailingList = useGetInvestorMailingListQuery(
    {
      personId: user?.person?.id as number,
    },
    { enabled: Boolean(user?.person?.id) },
  );

  const companies = getInvestedInCompanies(mailingList.data?.investors ?? []);

  const { mutate: sendInvitationEmailMutation, isLoading } = useMutation<
    unknown,
    unknown,
    SendInvitationPayload
  >({
    mutationFn: ({ companyIds }) =>
      fetch('/api/send-invite-to-investment-members/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vcFirmName, companyIds }),
      }),
    onSuccess: () => setSelectedCompanies([]),
    onSettled: () => refetchUser(),
  });

  const handleClick = (company: DeepPartial<Companies> | undefined | null) => {
    if (company) {
      if (includes(selectedCompanies, company)) {
        setSelectedCompanies(
          filter(selectedCompanies, c => c.id !== company?.id),
        );
      } else {
        setSelectedCompanies([...selectedCompanies, company]);
      }
    }
  };

  const handleSendEmails = async () => {
    if (selectedCompanies.length > 0) {
      sendInvitationEmailMutation({
        companyIds: selectedCompanies.map(company => company.id as number),
      });
    }
  };

  const handleSendAllEmails = async () => {
    const notifiedCompanies = get(
      userById?.users,
      '0.feature_flags.notifiedInvestorCompanies',
      {},
    );

    const notYetSentCompanies = filter(
      companies,
      c => !includes(notifiedCompanies, c),
    );

    sendInvitationEmailMutation({
      companyIds: notYetSentCompanies.map(company => company?.id as number),
    });
  };

  const emails = reduce(
    selectedCompanies,
    (acc, c) => acc + (c.teamMembers?.length ?? 0),
    0,
  );

  if (!companies || companies.length === 0) {
    return <></>;
  }

  return (
    <div className="p-5 bg-black border  border-neutral-700 rounded-lg">
      <h3 className="font-medium">Invite from your portfolio</h3>
      <p className="text-sm text-gray-500">
        Select a company from your portfolio to invite their team
      </p>

      <div className="grid grid-cols-3 gap-4 mt-2">
        {companies.map(company => {
          return (
            <Fragment key={company?.id}>
              {canSendInvestorInvitation(userById?.users, company?.id) ? (
                <div
                  className={`flex flex-row items-center py-2 px-3 rounded-lg border  border-neutral-700  hover:cursor-pointer ${
                    includes(selectedCompanies, company)
                      ? 'border-primary-500 bg-gray-50'
                      : ''
                  }`}
                  onClick={() => handleClick(company)}>
                  <ElemPhoto
                    photo={company?.logo}
                    wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-black border  border-neutral-700 rounded-lg overflow-hidden"
                    imgClass="object-fit max-w-full max-h-full"
                    imgAlt={company?.name}
                    placeholderClass="p-1 text-gray-300"
                    placeholder="company"
                  />

                  <div className="flex flex-col ml-2">
                    <div className="text-sm font-medium line-clamp-2">
                      {company?.name}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`flex flex-row justify-start items-center py-2 px-3 rounded-lg border  border-neutral-700`}>
                  <ElemPhoto
                    photo={company?.logo}
                    wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-black border  border-neutral-700 rounded-lg overflow-hidden"
                    imgClass="object-fit max-w-full max-h-full opacity-50"
                    imgAlt={company?.name}
                    placeholderClass="p-1 text-gray-300"
                    placeholder="company"
                  />

                  <div className="flex flex-col justify-center ml-2 text-gray-500">
                    <div className="text-sm font-medium line-clamp-2">
                      {company?.name}
                    </div>
                    <div className="text-xs">Sent</div>
                  </div>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      <div className="flex flex-row items-center gap-4 mt-2 text-center">
        <ElemButton
          btn="primary"
          onClick={handleSendEmails}
          loading={isLoading}
          disabled={!user || selectedCompanies.length === 0 || emails === 0}>
          Invite
        </ElemButton>

        {selectedCompanies.length !== 0 && (
          <div className="my-auto text-sm text-gray-500">
            {emails} people will be invited
          </div>
        )}

        <ElemButton
          btn="primary"
          onClick={handleSendAllEmails}
          loading={isLoading}
          disabled={!user}>
          Invite all
        </ElemButton>
      </div>
    </div>
  );
};
