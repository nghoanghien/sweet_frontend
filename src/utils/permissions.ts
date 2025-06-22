import { Permission, PermissionInfo } from '../types/interfaces/enums';

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

/**
 * Lấy danh sách action codes cho một permission
 * @param permission - Permission enum value
 * @returns Array of action codes (numbers from 1 to 92)
 */
export const getActionCodes = (permission: Permission): number[] => {
  switch (permission) {
    case Permission.PAYMENT_ACCOUNT:
      return [8];
    case Permission.SAVING_ACCOUNTS:
      return [11];
    case Permission.CUSTOMERS:
      return [13];
    case Permission.EMPLOYEES:
      return [61];
    case Permission.SAVING_PRODUCTS:
      return [20, 64];
    case Permission.SALE_REPORTS:
      return [4, 19];
    case Permission.SETTINGS:
      return [35];
    case Permission.PERMISSIONS:
      return [33];
    default:
      return [];
  }
};

/**
 * Kiểm tra xem tất cả giá trị trong array thứ 2 có trong array thứ nhất không
 * @param mainArray - Array chính chứa các giá trị
 * @param subArray - Array con cần kiểm tra
 * @returns True nếu tất cả giá trị trong subArray đều có trong mainArray
 */
export const isSubsetOf = (mainArray: number[], subArray: number[]): boolean => {
  return subArray.every(item => mainArray.includes(item));
};

/**
 * Lấy danh sách permissions dựa trên array object có thuộc tính .id
 * @param actionObjects - Array các object có thuộc tính .id
 * @returns Array các permissions có action codes thuộc về actionCodes đầu vào
 */
export const getPermissions = (actionObjects: any[]): Permission[] => {
  // Trích xuất tất cả .id từ array object thành mảng số
  const actionCodes = actionObjects.map(obj => obj.id).filter(id => typeof id === 'number');
  
  const permissions: Permission[] = [];
  
  Object.values(Permission).forEach(permission => {
    const permissionActionCodes = getActionCodes(permission);
    if (isSubsetOf(actionCodes, permissionActionCodes)) {
      permissions.push(permission);
    }
  });
  
  return permissions;
};