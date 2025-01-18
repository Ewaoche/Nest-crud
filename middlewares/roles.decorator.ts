
import { SetMetadata } from '@nestjs/common';

export enum AccessLevel {
  ALL = "all",
  ADMINISTRATOR = "administrator",
  SUPER_ADMINISTRATOR = "super_administrator",
  USER = "user",
  DRIVER = "driver",
  SALES = "sales",
  SALES_ADMINISTRATOR = "sales_administrator",
  AD_MANAGER = "ad_manager",
  OWNER = "owner",
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: AccessLevel[]) => SetMetadata(ROLES_KEY, roles);

// Type guard to check if a string is a valid AccessLevel
export function isAccessLevel(value: string): value is AccessLevel {
  return Object.values(AccessLevel).includes(value as AccessLevel);
}



//To use this in your application:
1. Import this file where you need to use the `Roles` decorator or check access levels.
2. Use the decorator like this: `@Roles(AccessLevel.ADMINISTRATOR, AccessLevel.SUPER_ADMINISTRATOR)`
3. Use the type guard like this: `if (isAccessLevel(someString)) { ... }`