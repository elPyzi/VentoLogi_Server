export const ROLES: Record<string, number> = {
  SHIPPER: 1,
  ADMIN: 2,
  PILOT: 3,
  OPERATOR: 4,
} as const;

export type RoleKey = keyof typeof ROLES;

export type RoleValue = (typeof ROLES)[RoleKey];
