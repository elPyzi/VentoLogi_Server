import { ExtractJwt } from 'passport-jwt';
import type { Request } from 'express';

export const cookieJwtExtractor = (req: Request): string | null => {
  console.log('ПУПУПУППУ');
  console.log('req.cookies', req.cookies);

  if (!req || !req.cookies) {
    return null;
  }

  console.log("req.cookies['accessToken:']", req.cookies['accessToken']);

  return req.cookies['accessToken'] || null;
};
