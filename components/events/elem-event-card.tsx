import { FC, useState } from 'react';
import moment from 'moment-timezone';
import Link from 'next/link';
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
} from '@/components/icons';
import { useUser } from '@/context/user-context';
import { CARD_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { ElemTags } from '@/components/elem-tags';
import { useMutation } from 'react-query';
import { toast, Toaster } from 'react-hot-toast';
import { ElemRequiredProfileDialog } from '../elem-required-profile-dialog';
import { usePopup } from '@/context/popup-context';

type Props = {
  event: GetEventsQuery['events'][0];
};

export const ElemEventCard: FC<Props> = ({ event }) => {
  const { user } = useUser();

  const { setShowPopup } = usePopup();

  const userCanViewLinkedIn = user?.entitlements.viewEmails
    ? user?.entitlements.viewEmails
    : false;

  const [isOpenLinkPersonDialog, setIsOpenLinkPersonDialog] = useState(false);

  const {
    id,
    slug,
    name,
    overview,
    price,
    venue_name,
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

  const onClickSearchName = () => {
    onCloseLinkPersonDialog();
    setShowPopup('search');
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
    <div className="flex flex-col w-full">
      <Link href={`/events/${slug}`}>
        <a className="flex shrink-0 w-full">
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
        </a>
      </Link>

      <Link href={`/events/${slug}`}>
        <a className="flex items-center mt-3">
          <ElemTooltip content={name} mode="light">
            <h3 className="text-xl font-medium truncate">{name}</h3>
          </ElemTooltip>
        </a>
      </Link>

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

      {!isEmptyLocation && (
        <p className="text-sm text-gray-500">{getFullAddress(location_json)}</p>
      )}

      {tags && (
        <ElemTags
          className="mt-4"
          limit={CARD_DEFAULT_TAGS_LIMIT}
          filter={'eventType'}
          resourceType={'events'}
          tags={tags}
        />
      )}

      <div className="flex items-center justify-between mt-4 gap-x-5">
        <div className="flex items-center space-x-0.5">
          {link && (
            <Link href={link}>
              <a target="_blank">
                <ElemTooltip content="Website" mode="light">
                  <div>
                    <IconGlobe className="h-6 w-6 text-gray-400" title={link} />
                  </div>
                </ElemTooltip>
              </a>
            </Link>
          )}
          {twitter && (
            <Link href={twitter}>
              <a target="_blank">
                <IconTwitter className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}
          {facebook && (
            <Link href={facebook}>
              <a target="_blank">
                <IconFacebook className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}
          {instagram && (
            <Link href={instagram}>
              <a target="_blank">
                <IconInstagram className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}
          {discord && (
            <Link href={discord}>
              <a target="_blank">
                <IconDiscord className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}
          {telegram && (
            <Link href={telegram}>
              <a target="_blank">
                <IconTelegram className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2">
          {eventPrice && (
            <div className="text-xs text-gray-500">{eventPrice}</div>
          )}

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
        title="You have not linked your account to a profile on EdgeIn"
        content="Search your name and claim profile to be able to mark yourself as going to this event."
        onClose={onCloseLinkPersonDialog}
        onClickSearch={onClickSearchName}
      />

      <Toaster />
    </div>
  );
};
