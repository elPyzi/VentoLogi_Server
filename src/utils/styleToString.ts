import { CSSProperties } from '@shared/models';
import { parseToKebabCase } from '@utils/parceToKebabCase';

export const styleToString = (styles: CSSProperties) =>
  Object.entries(styles)
    .map(([key, value]) => `${parseToKebabCase(key)}: ${value};`)
    .join('');
