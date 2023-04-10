import { mutate, query } from "@/graphql/hasuraAdmin";

const addEventAttendee = async (event_id: number, person_id: number) => {
  const {
    data: { insert_event_person_one },
  } = await mutate({
    mutation: `
    mutation InsertEventAttendee($object: event_person_insert_input!) {
      insert_event_person_one(
        object: $object
      ) {
        id
        event_id
        person_id
        type
      }
    }
  `,
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
  const data = await query({
    query: `
      query FindEventAttendee($event_id: Int!, $person_id: Int!) {
        event_person(where: {
          _and: [
            {event_id: {_eq: $event_id}},
            {person_id: {_eq: $person_id}},
            {type: {_eq: "attendee"}}
          ]
        }, limit: 1) {
          id
        }
      }
      `,
    variables: { event_id, person_id },
  });
  return data.data.event_person[0];
};

const EventService = {
  findEventAttendee,
  addEventAttendee,
};
export default EventService;
