import { FC } from 'react';
import { Team_Members, Investors } from '@/graphql/types';
import { getTimeOfWork, getWorkDurationFromAndTo } from '@/utils';
import { ElemPhoto } from '@/components/elem-photo';
import { getFullAddress } from '@/utils/helpers';
import { values, isEmpty } from 'lodash';
import { useIntercom } from 'react-use-intercom';
import { ElemButton } from '../elem-button';
import { COMPANIES, INVESTORS } from '@/routes';
import { ElemLink } from '../elem-link';

type Props = {
  className?: string;
  heading?: string;
  jobs?: Team_Members[] | Investors[];
  resourceUrl?: string;
};

export const ElemJobsList: FC<Props> = ({
  className = '',
  heading,
  jobs,
  resourceUrl,
}) => {
  const { showNewMessages } = useIntercom();

  return (
    <section className={`border border-gray-300 rounded-lg ${className}`}>
      <h2 className="text-lg font-medium px-4 pt-2">{heading}</h2>

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
              btn="default"
            >
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
              ? `${COMPANIES}/${organization.slug}`
              : job.vc_firm
              ? `${INVESTORS}/${organization.slug}`
              : null;

            const logo = (
              <ElemPhoto
                photo={organization?.logo}
                wrapClass="flex items-center justify-center shrink-0 w-10 h-10 bg-white border border-gray-200 rounded-lg overflow-hidden"
                imgClass="object-fit max-w-full max-h-full"
                imgAlt={organization?.name}
                placeholderClass="p-1 text-gray-300"
                placeholder="company"
              />
            );

            return (
              <div className="flex space-x-4 py-4" key={index}>
                {slug ? <ElemLink href={slug}>{logo}</ElemLink> : logo}

                <div>
                  <h3 className="font-medium">{job.title}</h3>
                  <div className="text-gray-500 text-sm">
                    {slug ? (
                      <ElemLink
                        href={slug}
                        className="block underline hover:no-underline"
                      >
                        {organization.name}
                      </ElemLink>
                    ) : organization?.name ? (
                      <>{organization?.name}</>
                    ) : (
                      <>Undisclosed organization</>
                    )}
                    <div className="flex space-x-2">
                      <span>
                        {getWorkDurationFromAndTo(job.start_date, job.end_date)}
                      </span>
                      <span>&middot;</span>
                      <span>{getTimeOfWork(job.start_date, job.end_date)}</span>
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
