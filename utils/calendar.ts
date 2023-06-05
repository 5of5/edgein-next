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

const generateTime = (event: CalendarEvent, item: CalendarType) => {
  const datetimeStyle = item.type === 'Outlook' ? 'delimiters' : 'clean';

  let start = formatDatetime(new Date(), datetimeStyle);

  const endDate = event.startDate ? new Date(event.startDate) : new Date();
  if (
    item.type === 'Apple' ||
    item.type === 'Google' ||
    item.type === 'iCal File'
  ) {
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
      if (
        item.type === 'Apple' ||
        item.type === 'Google' ||
        item.type === 'iCal File'
      ) {
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

const generateGoogle = (event: CalendarEvent, item: CalendarType) => {
  const urlParts = [];
  urlParts.push('https://calendar.google.com/calendar/render?action=TEMPLATE');
  // generate and add date
  const formattedDate = generateTime(event, item);
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

const generateOutlook = (event: CalendarEvent, item: CalendarType) => {
  const urlParts = [];
  const baseUrl =
    'https://outlook.live.com/calendar/action/compose?rru=addevent';
  urlParts.push(baseUrl);
  // generate and add date
  const formattedDate = generateTime(event, item); //'Outlook'
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

const generateApple = (event: CalendarEvent, item: CalendarType) => {
  const formattedDate = generateTime(event, item);

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

export const generateLink = (event: CalendarEvent, item: CalendarType) => {
  switch (item.type) {
    case 'Google':
      return generateGoogle(event, item);
    case 'Outlook':
      return generateOutlook(event, item);
    default:
      return generateApple(event, item);
  }
};
