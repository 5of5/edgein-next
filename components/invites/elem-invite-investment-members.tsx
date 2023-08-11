import { useMutation } from 'react-query';
import { InviteToEdgeInPayload } from '@/types/api';
import { useUser } from '@/context/user-context';
import {
  Users,
  Investors,
  useGetInvestorMailingListQuery,
  useGetUserByIdQuery,
} from '@/graphql/types';
import { ElemButton } from '../elem-button';
import { flatten, get, has, includes, uniqBy } from 'lodash';
import { DeepPartial } from '@/types/common';
import { ElemPhoto } from '../elem-photo';
import Link from 'next/link';
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
  const { user } = useUser();

  const [isLoadingButtonIndex, setIsLoadingButtonIndex] = useState<
    number | undefined
  >();

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

  const {
    data: sendInvitationEmailResponse,
    mutate: sendInvitationEmailMutation,
    isLoading,
  } = useMutation<unknown, unknown, SendInvitationPayload>({
    mutationFn: ({ companyId }) =>
      fetch('/api/send-invite-to-investment-members/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyId }),
      }),
    onSuccess: () => setIsLoadingButtonIndex(undefined),
    onError: () => setIsLoadingButtonIndex(undefined),
    onSettled: () => refetchUser(),
  });

  const handleSendEmails = async (companyId?: number) => {
    if (companyId) {
      setIsLoadingButtonIndex(companyId);
      sendInvitationEmailMutation({ companyId });
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg border border-black/10">
      <div className="flex flex-col lg:gap-1">
        <h3 className="font-bold">Invite your team</h3>
        <p className="text-sm text-slate-600">
          Invite people that are part of the companies you invested in
        </p>

        <div className="grid grid-cols-2 gap-4 p-5 bg-white rounded-lg border border-black/10">
          {companies.map(company => (
            <div className="flex flex-row gap-4 items-center">
              <ElemPhoto
                photo={company?.logo}
                wrapClass="flex items-center justify-center shrink-0 w-12 h-12 p-1 rounded-lg overflow-hidden border border-slate-200"
                imgClass="object-fit max-w-full max-h-full"
                imgAlt={company?.name}
                placeholderClass="text-slate-300"
              />

              <div>
                <span className="line-clamp-2 font-bold">{company?.name}</span>
                <span className="line-clamp-2 font-normal text-sm text-slate-600">
                  {company?.teamMembers?.length} emails
                </span>
              </div>

              <ElemButton
                btn="purple"
                onClick={() => handleSendEmails(company?.id)}
                loading={isLoadingButtonIndex === company?.id && isLoading}
                disabled={
                  !company?.teamMembers?.length ||
                  !canSendInvestorInvitation(userById?.users, company?.id) ||
                  !user
                }
              >
                Invite
              </ElemButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
