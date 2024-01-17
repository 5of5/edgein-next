import sanitizeHtml from 'sanitize-html';
import { ROUTES } from '@/routes';

export const renderMarkdownToHTML = (markdown: string) => {
  if (markdown)
    return {
      __html: sanitizeHtml(markdown, {
        allowedAttributes: {
          a: ['href', 'target', 'class', 'title', 'className'],
        },
      }),
    };
};

export const wrapHyperlinks = (text: string) => {
  const regex = /https?:\/\/\S*/gi;
  const decodeURL = decodeURIComponent(text);

  const modifiedText = decodeURL.replace(regex, url => {
    return `<a class="text-primary-500 hover:underline" href="${url}" title="${url}" target="_blank">${
      url.length > 40 ? url.substring(0, 40) + '...' : url
    }</a>`;
  });

  return modifiedText;
};

export const replaceAtMentionsWithLinks = (text: string) => {
  const regex = /(^|(?<=\s))@[a-zA-Z0-9+-]+(?=(\s|$)|[!?:;-=+,\.])/g;

  const output = text.replace(regex, (match: string) => {
    const createSlug = match
      .replace(/[A-Z]/g, m => '-' + m)
      .replace(/@-/g, '')
      .toLowerCase();
    return `<a class="text-primary-500 hover:underline" href="${ROUTES.PEOPLE}/${createSlug}">${match}</a>`;
  });

  return output;
};
