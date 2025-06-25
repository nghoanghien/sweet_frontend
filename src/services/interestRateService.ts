import { callGetQuyDinhLaiSuatHienTai } from "@/config/api";
import { IChiTietQuyDinhLaiSuatResDTO } from "@/types/quyDinhLaiSuat";

type DepositType = "standard" | "flexible";
type PaymentType = "monthly" | "quarterly" | "end_of_term" | "yearly";
type TermKey = string; // hoặc liệt kê cụ thể nếu muốn

type InterestRateMap = {
  [key in DepositType]: {
    [key in PaymentType]?: {
      [term: string]: number;
    };
  };
};

export const getInterestRateData = async () => {
  const response = await callGetQuyDinhLaiSuatHienTai();
  const apiData: IChiTietQuyDinhLaiSuatResDTO[] = response.data.chiTietQuyDinhLaiSuats || [];
  const mapped: InterestRateMap = { standard: {}, flexible: {} };
  apiData.forEach((item) => {
    const type: DepositType = item.loaiTietKiem.loaiTietKiemID === 1 ? "standard" : "flexible";
    let paymentType: PaymentType = "end_of_term";
    if (item.tanSuatNhanLai && item.tanSuatNhanLai.maTanSoNhanLai != null) {
      switch (item.tanSuatNhanLai.maTanSoNhanLai) {
        case 1: paymentType = "monthly"; break;
        case 2: paymentType = "quarterly"; break;
        case 3: paymentType = "end_of_term"; break;
        case 4: paymentType = "yearly"; break;
        default: paymentType = "end_of_term";
      }
    }
    const termKey = item.loaiKyHan?.soThang === 1
      ? "1_month"
      : `${item.loaiKyHan?.soThang}_months`;
    if (!mapped[type][paymentType]) mapped[type][paymentType] = {};
    mapped[type][paymentType]![termKey] = item.laiSuat;
  });
  return mapped;
};