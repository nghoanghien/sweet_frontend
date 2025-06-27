import { Permission } from "@/types/interfaces/enums"
import { Role } from "@/types/interfaces/user"
import { IQuyenHan } from "@/types/permission"
import { IVaiTroDTO } from "@/types/role"
import { getActionCodesFromPermissions, getPermissions } from "@/utils/permissions"

export const mapApiToRole = (item: any): Role => {
  return {
    roleID: item.id,
    roleName: item.name,
    description: item.description,
    active: item.active,
    customerRole: item.customerRole,
    permissions: item.quyenHanIds ? getPermissions(item.quyenHanIds) : getPermissions(item.quyenHans),
  }
}

export const mapRoleToIVaiTroDTO = (item: Role): IVaiTroDTO => {
  return {
    id: item.roleID.toString(),
    name: item.roleName,
    isCustomerRole: item.customerRole,
    description: item.description,
    active: item.active,
    quyenHanIds: getActionCodesFromPermissions(item.permissions),
  }
}