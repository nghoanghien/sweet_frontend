import { createVaiTro, deleteVaiTro, getAllVaiTro, updateVaiTro } from "@/config/api"
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

export const addNewRole = async(newRole: Role) => {
  try {
    const response = await createVaiTro(mapRoleToIVaiTroDTO(newRole));
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
}

export const deleteRole = async (id: number) => {
  try {
    const response = await deleteVaiTro(id.toString());
    return response;
  } catch (error) {
    throw new Error(error as string);
  }
}