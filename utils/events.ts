import { mutate, query } from "@/graphql/hasuraAdmin";
import {
  FindEventAttendeeDocument,
  FindEventAttendeeQuery,
  InsertEventAttendeeDocument,
  InsertEventAttendeeMutation,
} from "@/graphql/types";

const addEventAttendee = async (event_id: number, person_id: number) => {
  const {
    data: { insert_event_person_one },
  } = await mutate<InsertEventAttendeeMutation>({
    mutation: InsertEventAttendeeDocument,
    variables: {
      object: {
        event_id,
        person_id,
        type: "attendee",
      },
    },
  });

  return insert_event_person_one;
};

const findEventAttendee = async (event_id: number, person_id: number) => {
  const data = await query<FindEventAttendeeQuery>({
    query: FindEventAttendeeDocument,
    variables: { event_id, person_id },
  });
  return data.data.event_person[0];
};

const EventService = {
  findEventAttendee,
  addEventAttendee,
};
export default EventService;
