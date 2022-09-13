/**
 * Make stop words lower case in a title
 * @param str - string to manipulate
 * @param lib - stopwords array
 */
export const stopWordLowercase = (str: string, lib: string[] = []): string => {
  if (lib.length === 0) {
    lib = ["and", "an", "a", "the", "or", "am"];
  }

  const words = str.split(" ");

  if (words.length <= 1) return str;

  const regex = new RegExp("\\b(" + lib.join("|") + ")\\b", "gi");

  return str.replace(regex, (match) => match.toLowerCase());
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

  const stringWordCount = string.split(" ").length;

  return stringWordCount > wordCount
    ? string.split(" ").splice(0, wordCount).join(" ") + "..."
    : string;
};

/**
 * Convert camel-case to kebab-case
 * @param string - string to manipulate
 */
export const camelToKebab = (string: string): string => {
  return !string
    ? string
    : string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

export const kebabCase = (string: string): string => {
  return !string
    ? string
    : string
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace("-", "") // Remove string dashes
        .replace(/[\s_]+/g, "-")
        .toLowerCase();
};

/**
 * Coverts a slug or variable into a title-like string
 */
export const toLabel = (str?: string): string => {
  if (!str || typeof str !== "string") return "";

  const label = camelToKebab(str)
    .replace(/-|_/g, " ") // turn dashes to spaces
    .replace(/\//g, " ") // remove slashes and special chars
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .trim();

  return stopWordLowercase(label, ["and", "an", "a", "the", "or", "am"]);
};

/**
 * Converts regular space delimited text into a hyphenated slug
 */
export const slugify = (text?: string): string | undefined => {
  if (!text) return text;

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/^\d+/g, "") // Remove Numbers
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/(\?|:)/g, "") // remove colons and question marks
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};