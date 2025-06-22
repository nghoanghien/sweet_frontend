import { getAllVaiTro } from "@/config/api"
import { mapApiToRole } from "@/mappers/permissions.mapper";

export const getAllRoles = async () => {
  const response = await getAllVaiTro();
  return response.data.map(mapApiToRole);
}