import React, { useState } from 'react';
import { FC } from 'react';
import { Team_Members, Investors } from '@/graphql/types';
import { getTimeOfWork, getWorkDurationFromAndTo } from '@/utils';
import { ElemPhoto } from '@/components/elem-photo';
import { getFullAddress } from '@/utils/helpers';
import { values, isEmpty } from 'lodash';
import { useIntercom } from 'react-use-intercom';
import { ElemButton } from '../elem-button';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';
import { IconPlus } from '@/components/icons';
import CompanyExperienceModal from '../company-experience-modal';
import { useAuth } from '@/hooks/use-auth';

type Props = {
  className?: string;
  heading?: string;
  jobs?: Team_Members[] | Investors[];
  resourceUrl?: string;
  personId?: string;
};

export const ElemJobsList: FC<Props> = ({
  className = '',
  heading,
  jobs,
  resourceUrl,
  personId,
}) => {
  const { user } = useAuth();
  const { showNewMessages } = useIntercom();
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <section className={`border border-gray-300 rounded-lg ${className}`}>
      <CompanyExperienceModal
        show={showSearchModal}
        isAdmin
        onClose={() => setShowSearchModal(false)}
        personId={personId}
      />
      <div className="flex justify-between">
        <h2 className="px-4 pt-2 text-lg font-medium">{heading}</h2>
        {user?.person?.id?.toString() === personId && heading === 'Company Experience' && <ElemButton onClick={() => { setShowSearchModal(true) }} btn="gray" className="w-8 h-8 m-3 !p-0">
          <IconPlus
            className="w-6 h-6 text-gray-600"
            title="Add"
          />
        </ElemButton>}
      </div>
      <div className="px-4 divide-y divide-gray-300">
        {!jobs || jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="text-gray-500">No work experience info listed.</div>
            <ElemButton
              className="mt-2"
              onClick={() =>
                showNewMessages(
                  `Hi EdgeIn, I'd like to request work experience info on ${resourceUrl}`,
                )
              }
              btn="default">
              Request data or contribute
            </ElemButton>
          </div>
        ) : (
          jobs.map((job: any, index: number) => {
            let organization;
            if (job.company) {
              organization = job.company;
            } else if (job.vc_firm) {
              organization = job.vc_firm;
            }

            const isEmptyLocationJson = values(
              organization?.location_json,
            ).every(isEmpty);
            let locationText = '';
            if (!isEmptyLocationJson) {
              locationText = getFullAddress(organization?.location_json);
            }

            const slug = job.company
              ? `${ROUTES.COMPANIES}/${organization.slug}`
              : job.vc_firm
              ? `${ROUTES.INVESTORS}/${organization.slug}`
              : null;

            const logo = (
              <ElemPhoto
                photo={organization?.logo}
                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-black border  border-neutral-700 rounded-lg overflow-hidden"
                imgClass="object-fit max-w-full max-h-full"
                imgAlt={organization?.name}
                placeholder="company"
                placeholderClass="text-gray-300 w-full h-full m-1"
              />
            );

            return (
              <div className="flex py-4 space-x-4" key={index}>
                {slug ? <ElemLink href={slug}>{logo}</ElemLink> : logo}

                <div>
                  <h3 className="font-medium">{job.title}</h3>
                  <div className="text-sm text-gray-500">
                    {slug ? (
                      <ElemLink
                        href={slug}
                        className="block underline hover:no-underline">
                        {organization.name}
                      </ElemLink>
                    ) : organization?.name ? (
                      <>{organization?.name}</>
                    ) : (
                      <>Undisclosed organization</>
                    )}

                    <div className="flex">
                      <div>
                        {getWorkDurationFromAndTo(job.start_date, job.end_date)}
                      </div>
                      {job.start_date && job.end_date && (
                        <>
                          <div className="px-1">&middot;</div>
                          <div>
                            {getTimeOfWork(job.start_date, job.end_date)}
                          </div>
                        </>
                      )}
                    </div>
                    {locationText}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
