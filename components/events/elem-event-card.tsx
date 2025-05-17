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
  IconTwitterX,
  IconFacebook,
  IconInstagram,
  IconDiscord,
  IconTelegram,
  IconLocation,
  IconTicket,
  IconCalendar,
  IconCheck,
  IconPlus,
} from '@/components/icons';
import { useUser } from '@/context/user-context';
import { CARD_DEFAULT_TAGS_LIMIT } from '@/utils/constants';
import { ElemTags } from '@/components/elem-tags';
import { useMutation } from 'react-query';
import { toast, Toaster } from 'react-hot-toast';
import { ElemRequiredProfileDialog } from '../elem-required-profile-dialog';
import { CardType } from '../companies/elem-company-card';
import { ElemSocialIconGroup } from '../elem-social-icon-group';
import { ROUTES } from '@/routes';
import { ElemLink } from '../elem-link';
import { formatDateShown } from '@/utils';
import { Card, CardContent, CardFooter, CardHeader } from '../shadcn/card';

type Props = {
  event: GetEventsQuery['events'][0];
  type?: CardType;
};

export const ElemEventCard: FC<Props> = ({ event, type = 'full' }) => {
  const { user } = useUser();

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

  return (
    <Card className="flex flex-col w-full h-full border border-gray-800 bg-gradient-to-b from-gray-900 to-black hover:border-gray-600 transition-all duration-300 overflow-hidden">
      <div className="flex-shrink-0 w-full h-36 overflow-hidden relative">
        <ElemLink href={`${ROUTES.EVENTS}/${slug}`} className="block h-full">
          <div className="absolute inset-0 bg-gray-400 bg-center bg-no-repeat bg-cover blur-2xl -z-10"></div>
          <img
            className="w-full h-full object-cover"
            src={eventImageUrl}
            alt={name}
            onError={e => {
              (e.target as HTMLImageElement).src = randomImageOfCity(
                location_json?.city,
              );
              (e.target as HTMLImageElement).onerror = null; // prevents looping
            }}
          />
        </ElemLink>
      </div>

      <CardHeader className="p-4 pb-3 flex-shrink-0">
        <ElemLink href={`${ROUTES.EVENTS}/${slug}`} className="block">
          <ElemTooltip content={name} mode="light">
            <h3 className="text-base font-medium text-gray-100 line-clamp-2">
              {name}
            </h3>
          </ElemTooltip>
        </ElemLink>

        {tags && tags.length > 0 && (
          <div className="mt-3">
            <ElemTags
              className="overflow-hidden"
              limit={CARD_DEFAULT_TAGS_LIMIT}
              filter={'eventType'}
              resourceType={'events'}
              tags={tags}
            />
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-grow min-h-0">
        <div className="space-y-3">
          {start_date && (
            <div className="flex items-center text-gray-400">
              <IconCalendar className="w-3 h-3 shrink-0" />
              <span className="ml-1.5 text-xs">
                {formatDateShown(start_date, 'MMM D, YYYY')}
                {end_date && (
                  <>
                    &nbsp;&ndash;&nbsp;
                    {formatDateShown(end_date, 'MMM D, YYYY')}
                  </>
                )}
              </span>
            </div>
          )}

          {type === 'full' && !isEmptyLocation && (
            <div className="flex items-center text-gray-400">
              <IconLocation
                title={getFullAddress(location_json)}
                className="w-3 h-3 shrink-0"
              />
              <span className="ml-1.5 text-xs truncate">
                {getFullAddress(location_json)}
              </span>
            </div>
          )}

          {eventPrice && (
            <div className="flex items-center text-gray-400">
              <IconTicket className="w-3 h-3 shrink-0" />
              <span className="ml-1.5 text-xs">{eventPrice}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-3 border-t border-gray-800 flex-shrink-0 h-[60px] flex items-center justify-between">
        <ElemSocialIconGroup
          resources={[
            {
              value: link,
              title: 'Website',
              icon: IconGlobe,
            },
            {
              value: twitter,
              icon: IconTwitterX,
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

        <div className="inline-flex scale-90 origin-right">
          <ElemButton
            btn="white"
            size="sm"
            disabled={isLoadingGoingEvent}
            loading={isLoadingGoingEvent}
            onClick={handleClickAttend}
            className="flex items-center gap-1.5 font-medium shadow-sm hover:shadow transition-all duration-300">
            {isAttended ? (
              <>
                <IconCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Going</span>
              </>
            ) : (
              <>
                <IconPlus className="w-3.5 h-3.5" />
                <span>Attend</span>
              </>
            )}
          </ElemButton>
        </div>
      </CardFooter>

      <ElemRequiredProfileDialog
        isOpen={isOpenLinkPersonDialog}
        onClose={onCloseLinkPersonDialog}
        title="Claim a profile"
        content="To mark yourself as an attendee, search your name and claim a profile."
      />
      <Toaster />
    </Card>
  );
};
