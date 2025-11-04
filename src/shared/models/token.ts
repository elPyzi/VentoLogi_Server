import { RoleValue } from '@shared/constants';

export type TToken = {
  id: number;
  email: string;
  role: RoleValue;
  iat?: number;
  exp?: number;
};
