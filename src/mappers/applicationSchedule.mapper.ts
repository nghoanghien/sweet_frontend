import { IQuyDinhLaiSuatResDTO } from '@/types/quyDinhLaiSuat.d';

// Define colors for regulations (you can adjust these as needed)
const REGULATION_COLORS = ['indigo', 'emerald', 'amber', 'rose', 'blue', 'purple'];

const formatDateToYYYYMMDD = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const mapApiToApplicationSchedule = (regulation: IQuyDinhLaiSuatResDTO, index: number = 0) => {
  return {
    id: regulation.quyDinhLaiSuatID.toString(),
    name: `Quy định lãi suất ${regulation.quyDinhLaiSuatID}`,
    applicationDate: formatDateToYYYYMMDD(regulation.ngayBatDau),
    color: REGULATION_COLORS[index % REGULATION_COLORS.length],
    creator: regulation.nguoiLapQuyDinh?.hoTen || 'Unknown',
    minimumDeposit: regulation.soTienGuiToiThieu,
    noTermRate: regulation.laiSuatKhongKyHan,
    description: regulation.moTa || 'Không có mô tả'
  };
};

export const mapMultipleApiToApplicationSchedule = (regulations: IQuyDinhLaiSuatResDTO[]) => {
  if (!Array.isArray(regulations)) {
    return [];
  }
  return regulations.map((regulation, index) => mapApiToApplicationSchedule(regulation, index));
};
