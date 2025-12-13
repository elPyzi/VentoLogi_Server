export const REDIS_KEY = {
  TOKEN: (key: unknown) => `auth:token:${key}`,
  REGISTER_USER: (key: unknown) => `auth:register:user:${key}`,
  REGISTER_CODE: (key: string | number) => `auth:register:code:${key}`,
  RESET_PASSWORD_EMAIL: (key: string) => `auth:resetPassword:email:${key}`,
  RESET_PASSWORD_CODE: (key: string | number) =>
    `auth:resetPassword:email:${key}`,
} as const;
