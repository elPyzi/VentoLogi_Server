import { User } from '@modules/users/entities';
import { TToken } from '@shared/models';

declare module 'express' {
  interface Request {
    user?: User | TToken;
  }
}
