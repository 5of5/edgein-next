import React, { useState } from 'react';
// import { useIntercom } from 'react-use-intercom';
import { formatDate } from '@/utils';
import { ElemButton } from '../elem-button';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';
import { LiveChatWidget, EventHandlerPayload } from '@livechat/widget-react';

type Props = {
  activities: Array<any>;
  eventName: string;
};

export const ElemEventActivity: React.FC<Props> = ({
  activities,
  eventName,
}) => {
  const [activityLimit, setActivityLimit] = useState(10);
  const showMoreActivity = () => {
    setActivityLimit(activityLimit + 10);
  };
  // const { show } = useIntercom();
  function handleLiveChatEvent(event: EventHandlerPayload<'onNewEvent'>) {
    console.log('LiveChatWidget.onNewEvent', event);
  }

  const [show, setShow] = useState<boolean>(false);
  const showNewMessages = () => {
    setShow(true);
  };

  return (
    <div>
      {show && (
        <LiveChatWidget
          license={process.env.NEXT_PUBLIC_LIVECHAT_LISCENCE || ''}
          visibility="maximized"
          onNewEvent={handleLiveChatEvent}
        />
      )}
      <h2 className="text-lg font-medium px-4 pt-2">Activity</h2>

      <div className="px-4 py-4">
        {activities.length > 0 ? (
          <>
            <ul className="flex flex-col overflow-hidden">
              {activities.slice(0, activityLimit).map((activity, index) => {
                const isPublishedCompany =
                  activity?.company && activity?.company?.status === 'published'
                    ? true
                    : false;

                const isPublishedPerson =
                  activity?.person && activity?.person?.status === 'published'
                    ? true
                    : false;

                const isPublishedVcfirm =
                  activity?.vc_firm && activity?.vc_firm?.status === 'published'
                    ? true
                    : false;

                // Hide activity item with unpublished company/person/vcfirm
                if (
                  !isPublishedCompany &&
                  !isPublishedPerson &&
                  !isPublishedVcfirm
                ) {
                  return;
                }

                return (
                  <li
                    key={index}
                    className="relative pl-6 overflow-hidden group last:-mb-4">
                    <span className="absolute h-full top-0 bottom-0 left-0">
                      <span className="absolute dashes top-2 left-2 -bottom-2 right-auto w-px h-auto border-y border-white bg-repeat-y"></span>
                      <span className="block absolute top-2 left-1 w-2 h-2 rounded-full bg-primary-200 group-hover:bg-primary-500"></span>
                    </span>

                    <div className="mb-4">
                      <div className="inline leading-7 text-gray-600 text-sm">
                        <div className="inline">
                          {/* isPublishedCompany: {isPublishedCompany && 'company'}{' '}
                          <br />
                          isPublishedCompany: {isPublishedPerson &&
                            'person'}{' '}
                          <br />
                          isPublishedVcfirm: {isPublishedVcfirm && 'Vcfirm'}
                          <br /> */}
                          {activity?.type === 'attendee' ? (
                            <>
                              <ElemLink
                                href={`${ROUTES.PEOPLE}/${activity?.person?.slug}`}
                                className="font-medium underline hover:no-underline">
                                {activity?.person?.name}
                              </ElemLink>
                              {` is going to `}
                              <span className="font-medium capitalize">
                                {eventName}
                              </span>
                            </>
                          ) : activity?.type === 'speaker' ? (
                            <>
                              <ElemLink
                                href={`${ROUTES.PEOPLE}/${activity?.person?.slug}`}
                                className="font-medium underline hover:no-underline">
                                {activity?.person?.name}
                              </ElemLink>
                              {` was added as a `}
                              <span className="font-medium capitalize">
                                {activity?.type}
                              </span>
                            </>
                          ) : activity?.type === 'organizer' ? (
                            <>
                              <ElemLink
                                href={
                                  activity?.company
                                    ? `${ROUTES.COMPANIES}/${activity?.company?.slug}`
                                    : activity?.vc_firm
                                    ? `${ROUTES.INVESTORS}/${activity?.vc_firm?.slug}`
                                    : `${ROUTES.PEOPLE}/${activity?.person?.slug}`
                                }
                                className="font-medium underline hover:no-underline">
                                {activity?.company?.name ||
                                  activity?.vc_firm?.name ||
                                  activity?.person?.name}
                              </ElemLink>
                              {` was added as an `}
                              <span className="font-medium capitalize">
                                {activity?.type}
                              </span>
                            </>
                          ) : activity?.type === 'sponsor' ? (
                            <>
                              <ElemLink
                                href={
                                  activity?.company
                                    ? `${ROUTES.COMPANIES}/${activity?.company?.slug}`
                                    : activity?.vc_firm
                                    ? `${ROUTES.INVESTORS}/${activity?.vc_firm?.slug}`
                                    : `${ROUTES.PEOPLE}/${activity?.person?.slug}`
                                }
                                className="font-medium underline hover:no-underline">
                                {activity?.company?.name ||
                                  activity?.vc_firm?.name ||
                                  activity?.person?.name}
                              </ElemLink>
                              {` was added as a `}
                              <span className="font-medium capitalize">
                                {activity?.type}
                              </span>
                            </>
                          ) : (
                            <>
                              {`${
                                activity?.person?.name ||
                                activity?.company?.name ||
                                activity?.vc_firm?.name
                              } was added as ${
                                activity?.type === 'organizer' ? 'an' : 'a'
                              } ${activity?.type}`}
                              <br />
                            </>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">
                          {formatDate(activity.created_at as string, {
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {activityLimit < activities.length && (
              <div className="mt-6">
                <ElemButton
                  btn="default"
                  onClick={showMoreActivity}
                  className="w-full">
                  Show More Activity
                </ElemButton>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="text-gray-500">
              There is no recent activity for this event.
            </div>
            <ElemButton
              className="mt-2"
              onClick={showNewMessages}
              btn="default">
              Contribute Data
            </ElemButton>
          </div>
        )}
      </div>
    </div>
  );
};
