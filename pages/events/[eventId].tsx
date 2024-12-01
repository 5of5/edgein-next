import React, { MutableRefObject, useRef, useState, useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { ElemKeyInfo } from '@/components/elem-key-info';
import { ElemTags } from '@/components/elem-tags';
import { formatDateShown, runGraphQl } from '@/utils';
import { USER_ROLES } from '@/utils/users';
import { ElemTabBar } from '@/components/elem-tab-bar';
import { ElemButton } from '@/components/elem-button';
import { ElemPhoto } from '@/components/elem-photo';
import { ElemSocialShare } from '@/components/elem-social-share';
import {
  GetEventDocument,
  GetEventQuery,
  useGetEventQuery,
  useGetSubEventsQuery,
} from '@/graphql/types';
import { orderBy, sortBy } from 'lodash';
import { ElemSpeakerGrid } from '@/components/event/elem-speaker-grid';
import { ElemSponsorGrid } from '@/components/event/elem-sponsor-grid';
import { ElemOrganizers } from '@/components/event/elem-organizers';
import { ElemEventActivity } from '@/components/event/elem-event-activity';
import { ElemSimilarEvents } from '@/components/event/elem-similar-events';
import {
  getEventBanner,
  getFullAddress,
  randomImageOfCity,
} from '@/utils/helpers';
import parse from 'html-react-parser';
import { newLineToP } from '@/utils/text';
import { useUser } from '@/context/user-context';
import { ElemRequiredProfileDialog } from '@/components/elem-required-profile-dialog';
import { ElemSubEvents } from '@/components/event/elem-sub-events';
import moment from 'moment-timezone';
import ElemAddToCalendarButton from '@/components/events/elem-add-to-calendar-button';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { usePopup } from '@/context/popup-context';
import { onTrackView } from '@/utils/track';
import { ElemInviteBanner } from '@/components/invites/elem-invite-banner';
import { ROUTES } from '@/routes';
import { ElemLink } from '@/components/elem-link';
import { ElemGoingDialog } from '@/components/events/elem-going-dialog';
import { NextSeo } from 'next-seo';

type Props = {
  event: GetEventQuery['events'][0];
};

const Event: NextPage<Props> = props => {
  const router = useRouter();
  const { eventId } = router.query;

  const { user } = useUser();

  const { setShowPopup } = usePopup();

  const [event, setEvent] = useState<GetEventQuery['events'][0]>(props.event);

  const [isOpenGoingDialog, setIsOpenGoingDialog] = useState(false);

  const [isOpenLinkPersonDialog, setIsOpenLinkPersonDialog] =
    useState<boolean>(false);

  const overviewRef = useRef() as MutableRefObject<HTMLDivElement>;
  const organizersRef = useRef() as MutableRefObject<HTMLDivElement>;
  const speakersRef = useRef() as MutableRefObject<HTMLDivElement>;
  const sponsorsRef = useRef() as MutableRefObject<HTMLDivElement>;
  const subEventsRef = useRef() as MutableRefObject<HTMLDivElement>;

  const { data: eventData, refetch } = useGetEventQuery({
    slug: eventId as string,
  });

  const { data: subEvents } = useGetSubEventsQuery(
    {
      parent_event_id: event?.id,
    },
    { enabled: !!event.id },
  );

  useEffect(() => {
    if (eventData) {
      setEvent(eventData.events[0]);
      onTrackView({
        resourceId: eventData.events[0]?.id,
        resourceType: 'events',
        pathname: router.asPath,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventData]);

  const onOpenLinkPersonDialog = () => {
    setIsOpenLinkPersonDialog(true);
  };

  const onCloseLinkPersonDialog = () => {
    setIsOpenLinkPersonDialog(false);
  };

  const onClickSearchName = () => {
    onCloseLinkPersonDialog();
    setShowPopup('search');
  };

  const onOpenGoingDialog = () => {
    setIsOpenGoingDialog(true);
  };
  const onCloseGoingDialog = () => {
    setIsOpenGoingDialog(false);
  };

  const { mutate: onAddEventAttendee, isLoading: isLoadingGoingEvent } =
    useMutation(
      () =>
        fetch('/api/add-event-attendee/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: event?.id,
          }),
        }),
      {
        onSuccess: async response => {
          if (response.status !== 200) {
            const err = await response.json();
            toast.custom(
              t => (
                <div
                  className={`bg-red-600 text-white py-2 px-4 rounded-lg transition-opacity ease-out duration-300 ${
                    t.visible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}>
                  {err?.message}
                </div>
              ),
              {
                duration: 3000,
                position: 'top-center',
              },
            );
          } else {
            refetch();
          }
        },
      },
    );

  const handleClickGoingEvent = () => {
    if (user?.person) {
      onAddEventAttendee();
    } else {
      onOpenLinkPersonDialog();
    }
  };

  if (!event) {
    return <h1>Not Found</h1>;
  }

  const firstTag = event.types ? event.types[0] : '';
  const secondTag = event.types ? event.types[1] : '';

  // Tabs
  const tabBarItems = [{ name: 'Overview', ref: overviewRef }];
  if (event.event_person?.some(item => item.type === 'speaker')) {
    tabBarItems.push({ name: 'Speakers', ref: speakersRef });
  }
  if (event.event_organization?.some(item => item.type === 'sponsor')) {
    tabBarItems.push({ name: 'Sponsors', ref: sponsorsRef });
  }

  if (subEvents) {
    tabBarItems.push({ name: 'Sub-events', ref: subEventsRef });
  }

  const speakers = event.event_person?.filter(item => item.type === 'speaker');

  const attendees = event.event_person?.filter(
    item => item.type === 'attendee',
  );

  const sponsors = event.event_organization?.filter(
    item => item.type === 'sponsor',
  );

  const organizers = event.event_organization
    ?.filter(item => item.type === 'organizer')
    .filter(item => item.company || item.vc_firm !== null);

  const sortedActivities = orderBy(
    [...event.event_person, ...event.event_organization]?.slice() || [],
    ['created_at'],
    ['desc'],
  );

  const eventImage = (
    <img
      className="w-full h-full object-fit"
      src={
        event.banner?.url ||
        getEventBanner(event.location_json?.city, '1220x400')
      }
      alt={event.name}
      onError={e => {
        (e.target as HTMLImageElement).src = randomImageOfCity(
          event.location_json?.city,
        );
        (e.target as HTMLImageElement).onerror = null; // prevents looping
      }}
    />
  );

  //Meta
  const metaWebsiteUrl = event.link ? event.link : '';

  const metaLocation =
    event.location_json?.city && event.location_json?.country
      ? `– ${event.location_json?.city}, ${event.location_json?.country}`
      : event.location_json?.city
      ? `– ${event.location_json?.city}`
      : event.location_json?.country
      ? `– ${event.location_json?.country}`
      : '';

  const metaStartDate = event.start_date
    ? `– ${moment(event.start_date).format('MMM D, YYYY')}`
    : '';
  const eventLibraries =
    event.library.length > 0 ? event.library.join(', ') : '';

  return (
    <>
      <NextSeo
        title={
          event.name
            ? `${event.name} ${eventLibraries} Event ${metaStartDate} ${metaLocation}`
            : ''
        }
        description={
          event.overview ? `${event.overview} ${metaWebsiteUrl}` : ''
        }
        openGraph={{
          images: [
            {
              url: event.banner?.url,
              alt: event.name ? event.name : 'Event',
            },
            {
              url: 'https://edgein.io/social.jpg',
              width: 800,
              height: 600,
              alt: 'Event',
            },
          ],
        }}
      />
      <DashboardLayout>
        <div className={`p-8 event-${event.id}`}>
          <div className="mb-4">
            <div className="relative m-auto h-auto max-h-[410px] flex items-center justify-center shrink-0 ring-1 ring-slate-200 rounded-[20px] overflow-hidden ">
              <div
                className="absolute top-0 bottom-0 left-0 right-0 object-cover max-w-full max-h-full bg-center bg-no-repeat bg-cover -z-10 blur-2xl" // blur-[50px]
                style={{
                  backgroundImage: `url(${
                    event.banner?.url ||
                    getEventBanner(event.location_json?.city)
                  }), url(${randomImageOfCity(event.location_json?.city)})`,
                }}></div>

              {event.link ? (
                <a href={event.link} target="_blank" rel="noreferrer">
                  {eventImage}
                </a>
              ) : (
                eventImage
              )}
            </div>
          </div>

          {event.start_date && (
            <div className="inline w-full py-1 text-gray-500">
              {formatDateShown(event?.start_date)}

              {event?.start_time && (
                <span className="pl-1">
                  at {moment(event?.start_time, 'HH:mm').format('hh:mmA')}
                </span>
              )}
              {event.end_date && ` – ${formatDateShown(event?.end_date)}`}
              {event?.end_time && (
                <span className="pl-1">
                  at {moment(event?.end_time, 'HH:mm').format('hh:mmA')}
                </span>
              )}
              {/* event.timezone */}
            </div>
          )}

          <div className="items-start justify-between lg:flex lg:gap-20">
            <h1 className="text-4xl font-medium">{event.name}</h1>
            {attendees?.length > 0 && (
              <button
                className="self-center flex items-center gap-x-1 shrink-0 rounded-lg px-2 py-1.5 hover:bg-neutral-900"
                onClick={() => onOpenGoingDialog()}>
                <div className="flex -space-x-3">
                  {attendees?.slice(0, 6)?.map(attendee => (
                    <div key={attendee.id}>
                      {attendee.person?.picture ? (
                        <ElemPhoto
                          photo={attendee.person.picture}
                          wrapClass={`flex items-center justify-center aspect-square shrink-0 bg-dark-100 rounded-full w-8 shadow`}
                          imgClass="object-contain w-full h-full rounded-full  border border-gray-50"
                          imgAlt={attendee.person?.name}
                          placeholder="user"
                          placeholderClass="text-gray-300 w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-8 text-lg capitalize border rounded-full aspect-square bg-slate-300 text-dark-500 border-gray-50">
                          {attendee.person?.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-medium">{attendees?.length}</span> Going
                </div>
              </button>
            )}
          </div>
          <div>
            {event.types?.length > 0 && (
              <ElemTags
                className="mt-4"
                resourceType={'events'}
                tags={event.types}
                filter="eventType"
              />
            )}
          </div>

          {event.parent_event && (
            <div className="mt-4">
              <div className="text-sm font-bold">Sub-event of:</div>
              <ElemLink
                href={`${ROUTES.EVENTS}/${event.parent_event.slug}`}
                className="mt-1 text-primary-500 group transition-all hover:-translate-y-0.5">
                <h2 className="inline group-hover:underline">
                  {event.parent_event.name}
                </h2>
              </ElemLink>
            </div>
          )}

          <ElemInviteBanner className="mt-7" />
        </div>

        <ElemTabBar
          className="!flex-wrap px-8 py-2"
          tabs={tabBarItems}
          resourceName={event.name}
          resourceUrl={`https://edgein.io${router.asPath}`}
          showDropdown={true}>
          <div className="flex flex-wrap gap-2 mr-2 sm:mt-0 lg:justify-end">
            <ElemAddToCalendarButton
              event={{
                name: event.name,
                startDate: event.start_date,
                endDate: event.end_date,
                startTime: event.start_time,
                endTime: event.end_time,
                location: getFullAddress(event.location_json),
                description: event.overview || '',
              }}
            />
            <ElemSocialShare
              resourceName={event.name}
              resourceTwitterUrl={event.twitter}
            />

            {attendees?.some(item => item.person?.id === user?.person?.id) ? (
              <ElemButton btn="primary">Joined</ElemButton>
            ) : (
              <ElemButton
                btn="primary"
                onClick={handleClickGoingEvent}
                loading={isLoadingGoingEvent}>
                Going
              </ElemButton>
            )}

            {user?.role === USER_ROLES.ADMIN && (
              <ElemButton
                href={`${ROUTES.ADMIN_EVENTS}/${event.id}`}
                target="_blank"
                btn="default">
                Edit (admin)
              </ElemButton>
            )}
          </div>
        </ElemTabBar>

        <div className="px-8 mt-4">
          <div
            className="lg:grid lg:grid-cols-11 lg:gap-7"
            ref={overviewRef}
            id="overview">
            <div className="col-span-3">
              <ElemKeyInfo
                className="sticky top-28"
                heading="Key Info"
                eventLink={event.link}
                // website={event.link}
                venue={event.venue_name}
                locationJson={event.location_json}
                price={event.price}
                attendees={event.size}
                twitter={event.twitter}
                discord={event.discord}
                instagram={event.instagram}
                facebook={event.facebook}
                telegram={event.telegram}
                attachments={event.attachments}
              />
            </div>
            <div className="grid col-span-8 mt-8 gap-y-8 lg:mt-0">
              {event.overview && (
                <div className="border border-gray-300 rounded-lg lg:mt-0">
                  <h2 className="px-4 pt-2 text-lg font-medium">Overview</h2>
                  <div className="px-4 py-4 text-sm text-gray-500">
                    {parse(newLineToP(event.overview))}
                  </div>
                </div>
              )}

              {organizers?.length > 0 && (
                <div
                  ref={organizersRef}
                  className="border border-gray-300 rounded-lg"
                  id="organizers">
                  <ElemOrganizers organizations={organizers} />
                </div>
              )}

              <div className="border border-gray-300 rounded-lg">
                <ElemEventActivity
                  activities={sortedActivities}
                  eventName={event.name}
                />
              </div>
            </div>
          </div>

          {speakers?.length > 0 && (
            <div
              ref={speakersRef}
              className="border border-gray-300 rounded-lg mt-7"
              id="speakers">
              <ElemSpeakerGrid people={speakers} />
            </div>
          )}

          {sponsors.length > 0 && (
            <div ref={sponsorsRef} className="mt-7" id="sponsors">
              <ElemSponsorGrid organizations={sponsors} />
            </div>
          )}

          {!event.parent_event && (
            <div ref={subEventsRef}>
              <ElemSubEvents
                className="mt-7"
                eventName={event.name}
                subEvents={subEvents?.events || []}
              />
            </div>
          )}

          {event.types && (
            <ElemSimilarEvents
              className="mt-7"
              currentSlug={event.slug}
              tag1={firstTag}
              tag2={secondTag}
            />
          )}
        </div>

        <ElemRequiredProfileDialog
          isOpen={isOpenLinkPersonDialog}
          title="Claim a profile."
          content="To mark yourself as attendee, search your name and claim profile."
          onClose={onCloseLinkPersonDialog}
        />

        {attendees?.length > 0 && (
          <ElemGoingDialog
            isOpen={isOpenGoingDialog}
            title={`Going`}
            onClose={onCloseGoingDialog}
            attendees={attendees}
          />
        )}

        <Toaster />
      </DashboardLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { data: events } = await runGraphQl<GetEventQuery>(
    GetEventDocument,
    { slug: context.params?.eventId },
    context.req.cookies,
  );

  if (!events?.events[0]) {
    return {
      notFound: true,
    };
  }

  const event = sortBy(events?.events, 'status').reverse()[0];

  return {
    props: {
      event,
    },
  };
};

export default Event;
