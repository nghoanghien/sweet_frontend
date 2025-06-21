import { getAllThamSo } from "@/config/api"

export const getAllParameters = async () => {
  const response = await getAllThamSo();
  return response.data;
}