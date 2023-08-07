import React, { useState } from 'react';
import Link from 'next/link';
import { ElemButton } from './elem-button';
import { formatDate, convertToIntNum } from '@/utils';
import { useIntercom } from 'react-use-intercom';
import { Investment_Rounds } from '@/graphql/types';

type Props = {
  heading?: string;
  resourceType: 'companies' | 'vc_firms';
  resourceInvestments: Array<Investment_Rounds>;
};

export const ElemOrganizationActivity: React.FC<Props> = ({
  heading,
  resourceType,
  resourceInvestments,
}) => {
  const [activityLimit, setActivityLimit] = useState(10);
  const showMoreActivity = () => {
    setActivityLimit(activityLimit + 10);
  };
  const { show } = useIntercom();

  return (
    <div className="rounded-lg border border-gray-300">
      <div className="flex items-center justify-between px-4 pt-2">
        <h2 className="text-lg font-medium">
          {heading ? heading : 'Activity Timeline'}
        </h2>
      </div>

      <div className="px-4 py-4">
        {resourceInvestments && resourceInvestments.length > 0 ? (
          <>
            <ul className="flex flex-col">
              {resourceInvestments
                .slice(0, activityLimit)
                .map((activity, index) => {
                  return (
                    <li
                      key={index}
                      className="relative pl-6 overflow-hidden group last:-mb-4"
                    >
                      <span className="absolute h-full top-0 bottom-0 left-0">
                        <span className="absolute dashes top-2 left-2 -bottom-2 right-auto w-px h-auto border-y border-white bg-repeat-y"></span>
                        <span className="block absolute top-2 left-1 w-2 h-2 rounded-full bg-gradient-to-r from-primary-300 to-primary-300 transition-all group-hover:from-[#1A22FF] group-hover:via-primary-500 group-hover:to-primary-400"></span>
                      </span>

                      {renderActivity(activity, resourceType)}
                    </li>
                  );
                })}
            </ul>

            {activityLimit < resourceInvestments.length && (
              <div className="mt-6">
                <ElemButton
                  btn="ol-primary"
                  onClick={showMoreActivity}
                  className="w-full"
                >
                  Show More Activity
                </ElemButton>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-500">
              There is no recent activity for this organization.
            </div>
            <ElemButton onClick={show} btn="default" className="mt-3">
              Request data or contribute
            </ElemButton>
          </div>
        )}
      </div>
    </div>
  );
};

const renderActivity = (
  activity: any,
  resourceType: 'companies' | 'vc_firms',
) => {
  return resourceType === 'companies' && activity ? (
    <div className="mb-4">
      <div className="inline leading-7 text-gray-600 text-sm">
        {activity.round === 'Acquisition' ? (
          <div className="inline font-medium">Acquired by </div>
        ) : (
          <>
            <div className="inline font-medium">
              Raised{' '}
              {activity.amount ? (
                <div className="inline text-green-600">
                  ${convertToIntNum(activity.amount)}
                </div>
              ) : (
                <div className="inline text-green-600">undisclosed capital</div>
              )}{' '}
              {activity.valuation && (
                <div className="inline">
                  at{' '}
                  <div className="inline text-green-600">
                    ${convertToIntNum(activity.valuation)}{' '}
                  </div>
                  valuation{' '}
                </div>
              )}
            </div>
          </>
        )}
        {activity.investments && activity.investments?.length > 0 ? (
          <>
            from{' '}
            {activity.investments.map((item: any, index: number) => {
              return (
                <div key={index} className="inline">
                  {index !== 0 &&
                    (index === activity.investments.length - 1
                      ? ', and '
                      : ', ')}
                  {item.vc_firm && (
                    <Link href={`/investors/${item.vc_firm?.slug}`}>
                      <a className="underline hover:no-underline">
                        {item.vc_firm['name']}
                      </a>
                    </Link>
                  )}
                  {item.vc_firm && item.person && <>/</>}
                  {item.person && (
                    <Link href={`/people/${item.person['slug']}`}>
                      <a className="underline hover:no-underline">
                        {item.person['name']}
                      </a>
                    </Link>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          'from undisclosed investor'
        )}
        .
      </div>

      <p className="text-sm text-slate-600">
        {formatDate(activity.round_date as string, {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })}
      </p>
    </div>
  ) : resourceType === 'vc_firms' && activity ? (
    <div className="mb-4">
      <div className="inline leading-7 text-gray-600 text-sm">
        {activity.company && (
          <Link href={`/companies/${activity.company['slug']}`}>
            <a className="underline font-medium hover:no-underline">
              {activity.company['name']}
            </a>
          </Link>
        )}{' '}
        {activity.round === 'Acquisition' ? (
          <div className="inline font-medium">Acquired by </div>
        ) : (
          <>
            <div className="inline font-medium">
              Raised{' '}
              {activity.amount ? (
                <div className="inline text-green-600">
                  ${convertToIntNum(activity.amount)}
                </div>
              ) : (
                <div className="inline text-green-600">undisclosed capital</div>
              )}
              :{' '}
              {activity.valuation && (
                <div className="inline">
                  at{' '}
                  <div className="inline text-green-600">
                    ${convertToIntNum(activity.valuation)}{' '}
                  </div>
                  valuation{' '}
                </div>
              )}
            </div>
            {activity.round ? activity.round : 'Investment round'} from{' '}
          </>
        )}
        {activity.investments.map((item: any, index: number) => {
          return (
            <div key={index} className="inline">
              {index !== 0 &&
                (index === activity.investments.length - 1 ? ', and ' : ', ')}

              {item.vc_firm && (
                <Link href={`/investors/${item.vc_firm?.slug}`}>
                  <a className="underline hover:no-underline">
                    {item.vc_firm['name']}
                  </a>
                </Link>
              )}
              {item.vc_firm && item.person && <>/</>}

              {item.person && (
                <Link href={`/people/${item.person['slug']}`}>
                  <a className="underline hover:no-underline">
                    {item.person['name']}
                  </a>
                </Link>
              )}
            </div>
          );
        })}
        .
      </div>
      <p className="text-sm text-gray-600">
        {formatDate(activity.round_date as string, {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        })}
      </p>
    </div>
  ) : (
    <></>
  );
};
