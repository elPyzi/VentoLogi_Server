export const parseToKebabCase = (value: string) =>
  value
    .trim()
    .replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
    .replace(/^-/, '');
