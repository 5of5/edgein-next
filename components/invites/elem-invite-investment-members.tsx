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
import { filter, flatten, get, has, uniqBy } from 'lodash';
import { DeepPartial } from '@/types/common';
import { ElemPhoto } from '../elem-photo';
import { useState } from 'react';

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
  companyId: number;
};

export const ElemInviteInvestmentMembers = () => {
  const [selectedCompany, setSelectedCompany] = useState<
    DeepPartial<Companies> | undefined | null
  >(undefined);

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
    mutationFn: ({ companyId }) =>
      fetch('/api/send-invite-to-investment-members/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyId }),
      }),
    onSuccess: () => setSelectedCompany(undefined),
    onSettled: () => refetchUser(),
  });

  const handleClick = (company: DeepPartial<Companies> | undefined | null) => {
    if (selectedCompany === company) {
      setSelectedCompany(undefined);
    } else {
      setSelectedCompany(company);
    }
  };

  const handleSendEmails = async () => {
    if (selectedCompany?.id) {
      sendInvitationEmailMutation({
        companyId: selectedCompany.id,
      });
    }
  };

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
                  selectedCompany?.id === company?.id
                    ? 'border-primary-700'
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

        <div className="flex flex-row gap-4 mt-2">
          <ElemButton
            btn="purple"
            onClick={handleSendEmails}
            loading={isLoading}
            disabled={
              !user ||
              selectedCompany === undefined ||
              selectedCompany?.teamMembers?.length === 0
            }
          >
            Invite
          </ElemButton>

          {selectedCompany !== undefined && (
            <div className="text-sm text-slate-400 my-auto">
              {selectedCompany?.teamMembers?.length} people will be invited
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
