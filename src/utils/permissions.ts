import { Permission, PermissionInfo } from '../types/enums';

/**
 * Lấy label của permission
 * @param permission - Permission enum value
 * @returns Label của permission
 */
export const getPermissionLabel = (permission: Permission): string => {
  return PermissionInfo[permission]?.label || permission;
};

/**
 * Lấy description của permission
 * @param permission - Permission enum value
 * @returns Description của permission
 */
export const getPermissionDescription = (permission: Permission): string => {
  return PermissionInfo[permission]?.description || '';
};

/**
 * Lấy cả label và description của permission
 * @param permission - Permission enum value
 * @returns Object chứa label và description
 */
export const getPermissionInfo = (permission: Permission): { label: string; description: string } => {
  return PermissionInfo[permission] || { label: permission, description: '' };
};

/**
 * Lấy danh sách tất cả permissions với label và description
 * @returns Array of permission info objects
 */
export const getAllPermissions = (): Array<{ permission: Permission; label: string; description: string }> => {
  return Object.values(Permission).map(permission => ({
    permission,
    ...getPermissionInfo(permission)
  }));
};

/**
 * Kiểm tra xem permission có hợp lệ không
 * @param permission - Permission string to validate
 * @returns Boolean indicating if permission is valid
 */
export const isValidPermission = (permission: string): permission is Permission => {
  return Object.values(Permission).includes(permission as Permission);
};