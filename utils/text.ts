import validator from 'validator';

/**
 * Make stop words lower case in a title
 * @param str - string to manipulate
 * @param lib - stopwords array
 */
export const stopWordLowercase = (str: string, lib: string[] = []): string => {
  if (lib.length === 0) {
    lib = ['and', 'an', 'a', 'the', 'or', 'am'];
  }

  const words = str.split(' ');

  if (words.length <= 1) return str;

  const regex = new RegExp('\\b(' + lib.join('|') + ')\\b', 'gi');

  return str.replace(regex, match => match.toLowerCase());
};

/**
 * Truncate Text by words
 * @param string - string to manipulate
 */
export const truncateWords = (string: string, wordCount?: number): string => {
  if (string.length <= 1) return string;

  if (!wordCount) {
    wordCount = 25;
  }

  const stringWordCount = string.split(' ').length;

  return stringWordCount > wordCount
    ? string.split(' ').splice(0, wordCount).join(' ') + '...'
    : string;
};

/**
 * Convert camel-case to kebab-case
 * @param string - string to manipulate
 */
export const camelToKebab = (string: string): string => {
  return !string
    ? string
    : string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export const kebabCase = (string: string): string => {
  return !string
    ? string
    : string
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace('-', '') // Remove string dashes
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
};

/**
 * Coverts a slug or variable into a title-like string
 */
export const toLabel = (str?: string): string => {
  if (!str || typeof str !== 'string') return '';

  const label = camelToKebab(str)
    .replace(/-|_/g, ' ') // turn dashes to spaces
    .replace(/\//g, ' ') // remove slashes and special chars
    .replace(/\b\w/g, l => l.toUpperCase())
    .trim();

  return stopWordLowercase(label, ['and', 'an', 'a', 'the', 'or', 'am']);
};

/**
 * Converts regular space delimited text into a hyphenated slug
 */
export const slugify = (text?: string): string | undefined => {
  if (!text) return text;

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/^\d+/g, '') // Remove Numbers
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/(\?|:)/g, '') // remove colons and question marks
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

/**
 * Remove all special character except space from a string
 */
export const removeSpecialCharacterFromString = (
  text?: string,
): string | undefined => {
  if (!text) return text;

  const addComma = text.replace(/,/g, ', ');
  //return text.replace(/,/g, ", ");

  //return addComma.replace(/[^a-zA-Z ]/g, "");

  return addComma.replace(/[^a-zA-Z_, ]/g, '');
};
export const validateCompanyEmail = (domains: string[], email: string) => {
  if (!validator.isEmail(email)) return false;

  const emailParts = email.split('@');

  if (!domains.includes(emailParts[1])) return false;

  return true;
};

export const newLineToP = (text?: any): string => {
  // replace the case when there are two line breaks.
  const replaceTwoLineBreaks = text.replace(/\n{2}/g, '&nbsp;</p><p>');

  // replace the case when there are only one line breaks left.
  const replaceCase = replaceTwoLineBreaks.replace(/\n/g, '&nbsp;<br />');

  //wrap the whole content in a <p> tag
  const wrapWithPTags = '<p>' + replaceCase + '</p>';

  const out = wrapWithPTags;

  return out;
};

export const generatePassword = () => {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const passwordLength = 12;
  let password = '';
  for (let i = 0; i <= passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
};

export const getTwitterHandle = (url: string) => {
  if (!url) return '';
  return (
    `@` +
    url
      .replace(/^.*\/\/[^\/]+/, '')
      .replace('/', '')
      .toLowerCase()
  );
};

export const removeDomainName = (url: string) => {
  if (!url) return '';
  return url.replace(/^.*\/\/[^\/]+/, '');
};

export const getCleanWebsiteUrl = (rawUrl: any, protocol?: boolean) => {
  if (!rawUrl) {
    return;
  }

  if (protocol) {
    return rawUrl.split('/').slice(0, 3).join('/');
  }

  return rawUrl.split('//').pop().split('/')[0].replace('www.', '');
};
