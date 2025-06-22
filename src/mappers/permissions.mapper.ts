import { Role } from "@/types/interfaces/user"
import { getPermissions } from "@/utils/permissions"

export const mapApiToRole = (item: any): Role => {
  return {
    roleID: item.id,
    roleName: item.name,
    description: item.description,
    active: item.active,
    customerRole: item.customerRole,
    permissions: getPermissions(item.quyenHans),
  }
}