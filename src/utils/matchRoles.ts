import { RoleValue } from '@shared/constants';

export const matchRoles = (requiredRoles: RoleValue[], userRole: RoleValue) => {
  return requiredRoles.includes(userRole);
};
