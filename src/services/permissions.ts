import { getAllVaiTro, updateVaiTro } from "@/config/api"
import { mapApiToRole, mapRoleToIVaiTroDTO } from "@/mappers/permissions.mapper";
import { Role } from "@/types/interfaces/user";

export const getAllRoles = async () => {
  const response = await getAllVaiTro();
  return response.data.map(mapApiToRole);
}

export const updateRole = async (id: string, newRole: Role) => {
  try {
    const response = await updateVaiTro(id, mapRoleToIVaiTroDTO(newRole));
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
}