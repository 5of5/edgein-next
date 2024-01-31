import { FC, useState } from 'react';
import moment from 'moment-timezone';
import { GetEventsQuery } from '@/graphql/types';
import {
  getEventBanner,
  getFullAddress,
  randomImageOfCity,
} from '@/utils/helpers';
import { values, isEmpty } from 'lodash';
import { ElemTooltip } from '@/components/elem-tooltip';
import { ElemButton } from '@/components/elem-button';
import {
  IconGlobe,
  IconTwitter,
  IconFacebook,
  IconInstagram,
  IconDiscord,
  IconTelegram,
  IconLocation,
  IconTicket,
} from '@/components/icons';
import { useUser } from '@/context/user-context';
import { CARD_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { ElemTags } from '@/components/elem-tags';
import { useMutation } from 'react-query';
import { toast, Toaster } from 'react-hot-toast';
import { ElemRequiredProfileDialog } from '../elem-required-profile-dialog';
import { usePopup } from '@/context/popup-context';
import { CardType } from '../companies/elem-company-card';
import { ElemSocialIconGroup } from '../elem-social-icon-group';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';

type Props = {
  event: GetEventsQuery['events'][0];
  type?: CardType;
};

export const ElemEventCard: FC<Props> = ({ event, type = 'full' }) => {
  const { user } = useUser();

  const { setShowPopup } = usePopup();

  const userCanViewLinkedIn = user?.entitlements.viewEmails
    ? user?.entitlements.viewEmails
    : false;

  const [isOpenLinkPersonDialog, setIsOpenLinkPersonDialog] = useState(false);

  const {
    slug,
    name,
    price,
    location_json,
    banner,
    types,
    start_date,
    end_date,
    link,
    event_person,
    twitter,
    facebook,
    instagram,
    discord,
    telegram,
  } = event;

  const attendees = event_person?.filter(item => item.type === 'attendee');

  const defaultIsAttended = attendees?.some(
    item => item.person_id === user?.person?.id,
  );

  const [isAttended, setIsAttended] = useState(defaultIsAttended);

  const tags = types;

  const isEmptyLocation = values(location_json).every(isEmpty);

  const eventPrice =
    price > 0
      ? `Starts at $${price}`
      : price?.toString() === '0'
      ? 'Free'
      : null;

  const eventImageUrl = banner?.url || getEventBanner(location_json?.city);

  const onOpenLinkPersonDialog = () => {
    setIsOpenLinkPersonDialog(true);
  };

  const onCloseLinkPersonDialog = () => {
    setIsOpenLinkPersonDialog(false);
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
                  }`}
                >
                  {err?.message}
                </div>
              ),
              {
                duration: 3000,
                position: 'top-center',
              },
            );
          } else {
            setIsAttended(true);
          }
        },
      },
    );

  const handleClickAttend = () => {
    if (!isAttended) {
      if (user?.person) {
        onAddEventAttendee();
      } else {
        onOpenLinkPersonDialog();
      }
    }
  };

  const dateIsTodayOrBefore = (date: Date) => {
    const dateToday = moment().format('YYYY-MM-D');
    const isBefore = moment(dateToday).isBefore(date);

    return isBefore;
  };

  return (
    <div className="flex flex-col w-full border border-gray-300 rounded-xl p-[18px] transition-all duration-300 hover:border-gray-400">
      <div className="flex flex-col justify-between h-full">
        <div>
          <ElemLink
            href={`${ROUTES.EVENTS}/${slug}`}
            className="flex shrink-0 w-full"
          >
            <div className="relative z-0 flex items-center justify-center shrink-0 w-full h-36 rounded-lg overflow-hidden border border-gray-200">
              <div
                className="absolute -z-10 top-0 right-0 bottom-0 left-0 object-cover max-w-full max-h-full bg-center bg-no-repeat bg-cover blur-2xl" // blur-[50px]
                style={{
                  backgroundImage: `url(${eventImageUrl}), url(${eventImageUrl})`,
                }}
              ></div>
              <img
                className="relative"
                src={eventImageUrl}
                alt={name}
                onError={e => {
                  (e.target as HTMLImageElement).src = randomImageOfCity(
                    location_json?.city,
                  );
                  (e.target as HTMLImageElement).onerror = null; // prevents looping
                }}
              />
            </div>
          </ElemLink>

          <ElemLink
            href={`${ROUTES.EVENTS}/${slug}`}
            className="flex items-center mt-3"
          >
            <ElemTooltip content={name} mode="light">
              <h3 className="text-lg font-medium truncate pb-1.5">{name}</h3>
            </ElemTooltip>
          </ElemLink>

          <div className="text-xs">
            {start_date && (
              <p className="text-sm text-gray-500">
                {moment(start_date).format('MMM D, YYYY')}

                {end_date && (
                  <>
                    &nbsp;&ndash;&nbsp;
                    {moment(end_date).format('MMM D, YYYY')}
                  </>
                )}
              </p>
            )}

            {type === 'full' && !isEmptyLocation && (
              <div className="flex pt-1.5 items-center">
                <IconLocation
                  title={getFullAddress(location_json)}
                  className="h-3 w-3 shrink-0 self-start mt-1"
                />
                <span className="ml-1 break-words text-sm line-clamp-3 text-gray-500">
                  {getFullAddress(location_json)}
                </span>
              </div>
            )}

            {eventPrice && (
              <div className="flex pt-1.5 items-center">
                <IconTicket
                  title={
                    isEmptyLocation ? getFullAddress(location_json) : eventPrice
                  }
                  className="h-3 w-3 shrink-0"
                />
                <span className="ml-1 break-words text-sm line-clamp-3 text-gray-500">
                  {eventPrice}
                </span>
              </div>
            )}
          </div>

          {tags && (
            <ElemTags
              className="mt-4"
              limit={CARD_DEFAULT_TAGS_LIMIT}
              filter={'eventType'}
              resourceType={'events'}
              tags={tags}
            />
          )}
        </div>
        <div className="flex items-center justify-between mt-4 gap-x-5">
          <ElemSocialIconGroup
            resources={[
              {
                value: link,
                title: 'Website',
                icon: IconGlobe,
              },
              {
                value: twitter,
                icon: IconTwitter,
              },
              {
                value: facebook,
                icon: IconFacebook,
              },
              {
                value: instagram,
                icon: IconInstagram,
              },

              {
                value: discord,
                icon: IconDiscord,
              },
              {
                value: telegram,
                icon: IconTelegram,
              },
            ]}
          />

          <ElemButton
            btn={isAttended ? 'primary-light' : 'default'}
            onClick={handleClickAttend}
            loading={isLoadingGoingEvent}
            className="px-2.5"
          >
            {isAttended && dateIsTodayOrBefore(end_date)
              ? 'Attending'
              : isAttended && !dateIsTodayOrBefore(end_date)
              ? 'Attended'
              : 'Attend'}
          </ElemButton>
        </div>
      </div>
      <ElemRequiredProfileDialog
        isOpen={isOpenLinkPersonDialog}
        title="To mark yourself as attendee, please claim a profile."
        content="Search your name and claim profile."
        onClose={onCloseLinkPersonDialog}
      />

      <Toaster />
    </div>
  );
};
