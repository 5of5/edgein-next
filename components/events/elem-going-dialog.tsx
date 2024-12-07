import { GetEventQuery } from '@/graphql/types';
import { ElemLink } from '../elem-link';
import { ROUTES } from '@/routes';
import { ElemPhoto } from '../elem-photo';
import { ElemModal } from '../elem-modal';

type Props = {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  attendees: GetEventQuery['events'][0]['event_person'];
};

export const ElemGoingDialog: React.FC<Props> = ({
  isOpen,
  title,
  onClose,
  attendees,
}) => {
  return (
    <ElemModal
      isOpen={isOpen}
      onClose={onClose}
      showCloseIcon={true}
      placement="center"
      panelClass="relative w-full max-w-lg bg-black rounded-lg px-6 py-3 z-10 my-10">
      <div>
        <h2 className="text-xl font-medium">{title}</h2>
      </div>

      <div className="flex flex-col py-3 gap-y-3">
        {attendees.map(attendee => {
          if (attendee.person === null) {
            return;
          } else {
            return (
              <ElemLink
                key={attendee.id}
                href={`${ROUTES.PEOPLE}/${attendee.person?.slug}`}
                className="block cursor-pointer py-1.5 px-2 rounded-lg hover:bg-slate-100">
                <div
                  className="flex items-center justify-start gap-x-2"
                  key={attendee.id}>
                  {attendee.person?.picture ? (
                    <ElemPhoto
                      wrapClass="w-10 h-10 aspect-square shrink-0 bg-black overflow-hidden bg-black rounded-lg"
                      imgClass="object-fit max-w-full max-h-full"
                      photo={attendee.person?.picture}
                      placeholder="user2"
                      placeholderClass="text-gray-300"
                      imgAlt={attendee.person?.name}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-10 text-xl capitalize rounded-lg aspect-square bg-slate-200 text-dark-500">
                      {attendee.person?.name?.charAt(0)}
                    </div>
                  )}

                  <div className="leading-none">
                    <div className="font-medium capitalize">
                      {attendee.person?.name}
                    </div>

                    <div className="inline text-sm text-gray-500">
                      {attendee.person?.team_members.length > 0 && (
                        <>
                          {attendee.person.team_members[0].title} at{' '}
                          {attendee.person.team_members[0].company?.name}
                        </>
                      )}

                      {attendee.person?.team_members.length > 0 &&
                        attendee.person?.investors.length > 0 && <>, </>}

                      {attendee.person?.investors.length > 0 && (
                        <>
                          {attendee.person.investors[0].title} at{' '}
                          {attendee.person.investors[0].vc_firm?.name}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </ElemLink>
            );
          }
        })}
      </div>
    </ElemModal>
  );
};
