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
      return [4, 47, 57];
      {/*
        4. login
        47. get giao dịch by tktt ID
        57. get LSGD by tktt ID
         */} 
    case Permission.SAVING_ACCOUNTS:
      return [25, 62, 80, 81, 93];
      {/*
        11. Tạo phiếu rút tiền
        25. Tạo mới phiếu gửi tiền
        62. Lấy danh sách các phiếu rút tiền
        80. Lấy phiếu gửi tiền by khách hàng ID
        81. Lấy phiếu trả lãi theo phiếu gửi tiền ID
        93. lấy lịch sử giao dịch phiếu gửi tiền theo ID
         */} 
    case Permission.CUSTOMERS:
      return [13, 15, 24, 25, 42, 43, 47, 49, 57, 62, 77, 80, 81, 90, 93];
      {/*
        11. Tạo phiếu rút tiền
        13. get all khách hàng
        15. vô hiệu hóa khách hàng
        24. kích hoạt lại một khách hàng
        25. Tạo mới phiếu gửi tiền
        42. update khach hang
        43. get khách hàng by ID
        47. get giao dịch by tktt ID
        49. tạo mới khách hàng
        57. get LSGD by Tktt ID
        62. lấy danh sách các phiếu rút tiền
        77. Lấy tất cả phiếu gửi tiền
        80. Lấy phiếu gửi tiền by khách hàng ID
        81. Lấy phiếu trả lãi theo phiếu gửi tiền ID
        90. update địa chỉ 
        93. lấy lịch sử giao dịch phiếu gửi tiền theo ID
         */} 
    case Permission.EMPLOYEES:
      return [41, 46, 55, 61, 83, 87, 88, 90];
      {/*
        41. get all nhan vien 
        46. vô hiệu hóa nhân viên
        55. kích hoạt nhân viên
        61. get giao dịch by nhân viên
        83. tạo mới nhân viên 
        87. update nhân viên
        88. get nhân viên by ID
        90. update địa chỉ 
         */} 
    case Permission.SAVING_PRODUCTS:
      return [20, 22, 66, 67];
      {/*
        20. get all chi tiết quy định lãi suất
        22. get all quy định lãi suất 
        66. xóa quy định lãi suất
        67. thêm quy định lãi suất
         */} 
    case Permission.SALE_REPORTS:
      return [10, 11];
      {/*
         */} 
    case Permission.SETTINGS:
      return [35, 36, 78];
      {/*
        35. update tham so by ID
        36. get tham so by ID
        78. Lấy tất cả tham số
         */} 
    case Permission.PERMISSIONS:
      return [5, 21, 33, 34, 53, 73];
      {/*
        5. Tạo quyền hạn mới
        21. Cấp quyền module to VaiTro
        33. Xóa vai trò by ID
        34. Get all vai tro
        53. update vai tro by ID
        73. Tạo vai trò mới 
         */} 
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
 * Lấy danh sách permissions dựa trên array object có thuộc tính .id hoặc array số nguyên
 * @param actionInput - Array các object có thuộc tính .id hoặc array số nguyên
 * @returns Array các permissions có action codes thuộc về actionCodes đầu vào
 */
export const getPermissions = (actionInput: any[] | number[]): Permission[] => {
  // Xử lý input để lấy ra mảng action codes
  let actionCodes: number[];
  
  if (actionInput.length === 0) {
    actionCodes = [];
  } else if (typeof actionInput[0] === 'number') {
    // Nếu phần tử đầu tiên là số, coi như toàn bộ array là số
    actionCodes = actionInput.filter(item => typeof item === 'number') as number[];
  } else {
    // Nếu phần tử đầu tiên không phải số, coi như array object có thuộc tính .id
    actionCodes = actionInput.map((obj: any) => obj.id).filter(id => typeof id === 'number');
  }
  
  const permissions: Permission[] = [];
  
  Object.values(Permission).forEach(permission => {
    const permissionActionCodes = getActionCodes(permission);
    if (isSubsetOf(actionCodes, permissionActionCodes)) {
      permissions.push(permission);
    }
  });
  
  return permissions;
};

/**
 * Lấy danh sách action codes từ array permissions
 * @param permissions - Array các Permission enum values
 * @returns Array các action codes không trùng nhau
 */
export const getActionCodesFromPermissions = (permissions: Permission[]): number[] => {
  const allActionCodes: number[] = [];
  
  permissions.forEach(permission => {
    const actionCodes = getActionCodes(permission);
    allActionCodes.push(...actionCodes);
  });
  
  // Loại bỏ các số trùng nhau và sắp xếp theo thứ tự tăng dần
  return Array.from(new Set(allActionCodes)).sort((a, b) => a - b);
};