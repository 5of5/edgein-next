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
import { filter, flatten, get, has, includes, reduce, uniqBy } from 'lodash';
import { DeepPartial } from '@/types/common';
import { ElemPhoto } from '../elem-photo';
import { FC, useState } from 'react';

const getInvestedInCompanies = (investors: DeepPartial<Investors>[]) => {
  const companies = investors.map(investor => {
    const innerCompanies = investor.vc_firm?.investments?.map(
      inv => inv?.investment_round?.company,
    );

    return innerCompanies;
  });

  // Flatten the list of lists and return only unique companies (compared by company_id only)
  return uniqBy(flatten(companies), 'id');
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

  return (
    <div className="p-5 bg-white rounded-lg border border-black/10">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold">Invite from your portfolio</h3>
          <p className="text-sm text-slate-600">
            Select a company from your portfolio to invite their team
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {companies.map(company =>
            canSendInvestorInvitation(userById?.users, company?.id) ? (
              <div
                key={company?.id}
                className={`flex flex-row items-center py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 hover:cursor-pointer ${
                  includes(selectedCompanies, company)
                    ? 'border-primary-500'
                    : ''
                }`}
                onClick={() => handleClick(company)}
              >
                <ElemPhoto
                  photo={company?.logo}
                  wrapClass="flex items-center justify-center shrink-0 w-12 h-12 p-1 rounded-lg overflow-hidden border border-slate-200"
                  imgClass="object-fit max-w-full max-h-full"
                  imgAlt={company?.name}
                  placeholderClass="text-slate-300"
                />

                <div className="flex flex-col ml-2">
                  <div className="font-semibold line-clamp-2">
                    {company?.name}
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={company?.id}
                className={`flex flex-row justify-start items-center py-2 px-3 rounded-lg border border-slate-200`}
              >
                <ElemPhoto
                  photo={company?.logo}
                  wrapClass="flex items-center justify-center shrink-0 w-12 h-12 p-1 rounded-lg overflow-hidden border border-slate-200"
                  imgClass="object-fit max-w-full max-h-full opacity-50"
                  imgAlt={company?.name}
                  placeholderClass="text-slate-300"
                />

                <div className="flex flex-col ml-2 justify-center text-slate-400">
                  <div className="font-semibold line-clamp-2">
                    {company?.name}
                  </div>
                  <div className="text-xs">Sent</div>
                </div>
              </div>
            ),
          )}
        </div>

        <div className="flex flex-row gap-4 mt-2 items-center text-center">
          <ElemButton
            btn="purple"
            onClick={handleSendEmails}
            loading={isLoading}
            disabled={!user || selectedCompanies.length === 0 || emails === 0}
          >
            Invite
          </ElemButton>

          {selectedCompanies.length !== 0 && (
            <div className="text-sm text-slate-400 my-auto">
              {emails} people will be invited
            </div>
          )}

          <ElemButton
            btn="purple"
            onClick={handleSendAllEmails}
            loading={isLoading}
            disabled={!user}
          >
            Invite all
          </ElemButton>
        </div>
      </div>
    </div>
  );
};
