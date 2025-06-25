import axios from "axios";
import { IPhieuGuiTienReqDTO } from "@/types/phieuGuiTien";
import { callCreatePhieuGuiTien } from "@/config/api";

export const createPhieuGuiTien = async (data: IPhieuGuiTienReqDTO) => {
  return callCreatePhieuGuiTien(data);
};