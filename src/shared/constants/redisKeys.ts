export const REDIS_KEY = {
  TOKEN: (key: unknown) => `auth:token:${key}`,
  REGISTER_USER: (key: unknown) => `auth:register:user:${key}`,
  REGISTER_CODE: (key: string | number) => `auth:register:code:${key}`,
} as const;
