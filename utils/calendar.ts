import { CalendarEvent, CalendarType } from '@/models/calendar';

const formatDatetime = (
  datetime: Date,
  style: 'clean' | 'delimiters' = 'clean',
  includeTime = false,
) => {
  const regex = (() => {
    // defines what gets cut off
    if (includeTime) {
      if (style == 'clean') {
        return /(-|:|(\.\d{3}))/g;
      }
      return /(\.\d{3})/g;
    }
    if (style == 'clean') {
      return /(-|T(\d{2}:\d{2}:\d{2}\.\d{3})Z)/g;
    }
    return /T(\d{2}:\d{2}:\d{2}\.\d{3})Z/g;
  })();
  return datetime.toISOString().replace(regex, '');
};

const generateTime = (event: CalendarEvent, type: CalendarType) => {
  const datetimeStyle = type === 'Outlook' ? 'delimiters' : 'clean';

  let start = formatDatetime(new Date(), datetimeStyle);

  const endDate = event.startDate ? new Date(event.startDate) : new Date();
  if (type === 'Google' || type === 'iCal File' || type === 'Apple') {
    endDate.setDate(endDate.getDate() + 1);
  }
  let end = formatDatetime(endDate, datetimeStyle);

  if (event.startDate) {
    if (event.startTime) {
      start = formatDatetime(
        new Date(event.startDate + 'T' + event.startTime),
        datetimeStyle,
        true,
      );
    } else {
      start = formatDatetime(new Date(event.startDate), datetimeStyle);
    }
  }

  if (event.endDate) {
    if (event.endTime) {
      end = formatDatetime(
        new Date(event.endDate + 'T' + event.endTime),
        datetimeStyle,
        true,
      );
    } else {
      const newEndDate = new Date(event.endDate);
      if (type === 'Google' || type === 'iCal File' || type === 'Apple') {
        newEndDate.setDate(newEndDate.getDate() + 1);
      }
      end = formatDatetime(newEndDate, datetimeStyle);
    }
  }

  return {
    start,
    end,
  };
};

const generateGoogle = (event: CalendarEvent, type: CalendarType) => {
  const urlParts = [];
  urlParts.push('https://calendar.google.com/calendar/render?action=TEMPLATE');
  // generate and add date
  const formattedDate = generateTime(event, type);
  urlParts.push(
    'dates=' +
      encodeURIComponent(formattedDate.start) +
      '%2F' +
      encodeURIComponent(formattedDate.end),
  );

  // add details (if set)
  if (event.name) {
    urlParts.push('text=' + encodeURIComponent(event.name));
  }

  if (event.description) {
    urlParts.push('details=' + encodeURIComponent(event.description));
  }

  if (event.location) {
    urlParts.push('location=' + encodeURIComponent(event.location));
  }

  return urlParts.join('&');
};

const generateOutlook = (event: CalendarEvent) => {
  const urlParts = [];
  const baseUrl =
    'https://outlook.live.com/calendar/action/compose?rru=addevent';
  urlParts.push(baseUrl);
  // generate and add date
  const formattedDate = generateTime(event, 'Outlook');
  urlParts.push('startdt=' + formattedDate.start);
  urlParts.push('enddt=' + formattedDate.end);

  // add details (if set)
  if (event.name != null && event.name != '') {
    urlParts.push('subject=' + encodeURIComponent(event.name));
  }
  if (event.location != null && event.location != '') {
    urlParts.push('location=' + encodeURIComponent(event.location));
  }
  if (event.description != null && event.description != '') {
    urlParts.push('body=' + encodeURIComponent(event.description));
  }
  return urlParts.join('&');
};

const generateApple = (event: CalendarEvent, type: CalendarType) => {
  const formattedDate = generateTime(event, type);

  const ics_lines = ['BEGIN:VCALENDAR', 'VERSION:2.0'];
  ics_lines.push('BEGIN:VEVENT');
  ics_lines.push('DTSTART:' + formattedDate.start);
  ics_lines.push('DTEND:' + formattedDate.end);
  ics_lines.push('SUMMARY:' + event.name);

  if (event.description) {
    ics_lines.push('DESCRIPTION:' + event.description);
  }

  if (event.location) {
    ics_lines.push('LOCATION:' + event.location);
  }

  ics_lines.push('END:VEVENT');
  ics_lines.push('END:VCALENDAR');

  return ics_lines.join('\r\n');
};

export const generateLink = (event: CalendarEvent, type: CalendarType) => {
  switch (type) {
    case 'Google':
      return generateGoogle(event, type);
    case 'Outlook':
      return generateOutlook(event);
    default:
      return generateApple(event, type);
  }
};
