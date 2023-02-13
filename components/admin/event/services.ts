export const transform = (event: any) =>
  event.parent_event_id === "" ? { ...event, parent_event_id: null } : event;
