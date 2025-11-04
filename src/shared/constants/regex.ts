type RegexType = {
  LETTERS: RegExp;
  PHONE: RegExp;
};

export const REGEX: RegexType = {
  LETTERS: /^[А-Яа-яЁёA-Za-z\s-]*$/,
  PHONE: /^\+?[0-9\s()-]{7,20}$/,
} as const;
