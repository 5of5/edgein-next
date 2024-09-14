import moment from 'moment-timezone';
import { ISO_DATE_FORMAT } from './constants';

export const formatDate = (
  dateString: string | number,
  options?: Intl.DateTimeFormatOptions,
): string => {
  if (!dateString) {
    return '';
  }

  let date = new Date(dateString);
  date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  if (!options) {
    return date.toLocaleDateString('en-us', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Los_Angeles',
    });
  } else {
    return date.toLocaleDateString('en-us', options);
  }
};

export const formatDateShown = (date: Date, format?: string) => {
  if (!date) {
    return '';
  }
  const theDate = moment(date).local(true);
  const theFormat = format ? format : 'LL'; //Default: January 16, 2024
  return moment(theDate).format(theFormat);
};

export const convertToInternationalCurrencySystem = (amount: number) => {
  if (!amount) {
    return '';
  }

  // Nine Zeroes for Billions
  return Math.abs(Number(amount)) >= 1.0e9
    ? (Math.abs(Number(amount)) / 1.0e9).toFixed(1).replace(/\.0+$/, '') + 'B'
    : // Six Zeroes for Millions
    Math.abs(Number(amount)) >= 1.0e6
    ? (Math.abs(Number(amount)) / 1.0e6).toFixed(2).replace(/\.0+$/, '') + 'M'
    : // Three Zeroes for Thousands
    Math.abs(Number(amount)) >= 1.0e3
    ? (Math.abs(Number(amount)) / 1.0e3).toFixed(2).replace(/\.0+$/, '') + 'K'
    : Math.abs(Number(amount)).toFixed(2);
};

export const convertToIntNum = (amount: number) => {
  if (!amount) {
    return '';
  }

  return Intl.NumberFormat('en', {
    notation: 'compact',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getWorkDurationFromAndTo = (
  startDate: string,
  endDate: string,
) => {
  const start = startDate ? moment(startDate).format('MMM YYYY') : null;
  const end = endDate ? moment(endDate) : null;

  return `${start ? `${start} - ` : ''}${
    end ? end.format('MMM YYYY') : 'Present'
  }`;
};

export const getTimeOfWork = (startDate: string, endDate: string) => {
  const today = moment();
  const start = startDate ? moment(startDate) : null;
  const end = endDate ? moment(endDate) : null;

  if (!start) return null;

  const timeDiff = end ? end.diff(start) : today.diff(start);

  const years = moment.duration(timeDiff).years();
  const months = moment.duration(timeDiff).months();

  let durationYears;
  if (years === 1) {
    durationYears = years + ' yr';
  } else if (years > 1) {
    durationYears = years + ' yrs';
  } else {
    durationYears = '';
  }

  let durationMonths;
  if (months === 1) {
    durationMonths = months + ' mo';
  } else if (months > 1) {
    durationMonths = months + ' mos';
  } else {
    durationMonths = '';
  }

  return `${durationYears} ${durationMonths}`;
};

export const getTimeString = (value: Date) => {
  const hour = new Date(value).getHours();
  const mins = ('0' + new Date(value).getMinutes()).slice(-2);
  return `${hour}:${mins}`;
};

export const convertCurrencyStringToIntNumber = (value: string) => {
  return Number(
    value
      .toUpperCase()
      .replace(/^(\d+(\.\d+)?)([K,M,B])?/, (_, n, __, suffix) => {
        if (suffix === 'K') {
          return n * 10 ** 3;
        }

        if (suffix === 'M') {
          return n * 10 ** 6;
        }

        if (suffix === 'B') {
          return n * 10 ** 9;
        }

        return n;
      }),
  );
};
