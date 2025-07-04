import { IQuyDinhLaiSuatResDTO, IChiTietQuyDinhLaiSuatResDTO, IQuyDinhLaiSuatReqDTO, IChiTietQuyDinhLaiSuatReqDTO } from '@/types/quyDinhLaiSuat.d';
import { formatDate } from '@/utils/saving-account';
import { ITanSuatNhanLai } from '@/types/loai';

const DEFAULT_PAYMENT_FREQUENCIES = [
  { id: 'start', name: 'Đầu kỳ hạn' },
  { id: 'monthly', name: 'Hàng tháng' },
  { id: 'quarterly', name: 'Hàng quý' },
  { id: 'end', name: 'Cuối kỳ hạn' }
];

const mapFrequencyId = (maTanSoNhanLai: number): string => {
  switch (maTanSoNhanLai) {
    case 1:
      return 'monthly';    // Hàng tháng
    case 2:
      return 'quarterly';  // Hàng quý
    case 3:
      return 'end';       // Cuối kỳ hạn
    case 4:
      return 'start';     // Đầu kỳ hạn
    default:
      return 'end';
  }
};

// Định nghĩa các tần suất bị vô hiệu hóa cho từng loại tiết kiệm
const getDisabledFrequencies = (maLoaiTietKiem: number) => {
  // Nếu là tiết kiệm không kỳ hạn (flexible - mã 2)
  if (maLoaiTietKiem === 2) {
    return ['start', 'monthly', 'quarterly']; // Vô hiệu hóa đầu kỳ hạn, hàng tháng, hàng quý
  }
  // Nếu là tiết kiệm có kỳ hạn (standard - mã 1)
  return []; // Không vô hiệu hóa tần suất nào
};

interface ITerm {
  id: string;
  months: number;
}

const mapFrequencyIdToNumber = (frequencyId: string): number => {
  switch (frequencyId) {
    case 'monthly':
      return 1;    // Hàng tháng
    case 'quarterly':
      return 2;    // Hàng quý
    case 'end':
      return 3;    // Cuối kỳ hạn
    case 'start':
      return 4;    // Đầu kỳ hạn
    default:
      return 3;    // Default to Cuối kỳ hạn
  }
};

export const mapFrontendToApiRegulation = (frontendData: any): IQuyDinhLaiSuatReqDTO => {
  const chiTietQuyDinhLaiSuats: IChiTietQuyDinhLaiSuatReqDTO[] = [];

  // Process each savings type and its interest rates
  frontendData.savingsTypes.forEach((savingsType: any) => {
    const loaiTietKiemID = parseInt(savingsType.id);

    // For each term and frequency combination
    savingsType.interestRates.forEach((rate: any) => {
      // Find the corresponding term
      const term = savingsType.terms.find((t: any) => t.id === rate.termId);
      
      if (term) {
        // Skip if this frequency is disabled for this savings type
        if (savingsType.disabledFrequencies?.includes(rate.frequencyId)) {
          return;
        }

        chiTietQuyDinhLaiSuats.push({
          chiTietQuyDinhID: undefined,
          quyDinhLaiSuatID: undefined,
          loaiTietKiemID: loaiTietKiemID,
          tanSuatNhanLaiID: mapFrequencyIdToNumber(rate.frequencyId),
          loaiKyHan: {
            loaiKyHanID: term.id ? parseInt(term.id) : null,
            tenLoaiKyHan: `Tháng ${term.months}`,
            soThang: term.months
          },
          laiSuat: rate.rate / 100
        });
      }
    });
  });

  // Convert date from DD/MM/YYYY to YYYY-MM-DD if needed
  const formatDateForApi = (dateString: string) => {
    if (!dateString) return undefined;
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  return {
    quyDinhLaiSuatID: undefined,
    ngayBatDau: formatDateForApi(frontendData.applicationDate) || new Date().toISOString().split('T')[0],
    ngayKetThuc: undefined,
    moTa: frontendData.description || '',
    nguoiLapQuyDinhID: frontendData.creator?.id,
    laiSuatKhongKyHan: frontendData.noTermRate,
    soTienGuiToiThieu: frontendData.minimumDeposit,
    chiTietQuyDinhLaiSuats: chiTietQuyDinhLaiSuats
  };
};

export const mapApiToRegulationHistory = (item: IQuyDinhLaiSuatResDTO) => {
  // Đầu tiên, gom nhóm theo loại tiết kiệm
  const savingsTypeMap = new Map();

  // Duyệt qua tất cả chi tiết quy định
  item.chiTietQuyDinhLaiSuats.forEach((detail: IChiTietQuyDinhLaiSuatResDTO) => {
    const savingsTypeId = detail.loaiTietKiem.maLoaiTietKiem.toString();
    
    if (!savingsTypeMap.has(savingsTypeId)) {
      // Tạo mới nếu chưa có loại tiết kiệm này
      savingsTypeMap.set(savingsTypeId, {
        id: savingsTypeId,
        name: detail.loaiTietKiem.tenLoaiTietKiem,
        terms: [],
        interestRates: [],
        disabledFrequencies: getDisabledFrequencies(detail.loaiTietKiem.maLoaiTietKiem)
      });
    }

    // Thêm kỳ hạn vào loại tiết kiệm tương ứng
    const savingsType = savingsTypeMap.get(savingsTypeId);
    
    // Kiểm tra xem kỳ hạn đã tồn tại chưa
    const termExists = savingsType.terms.some((term: ITerm) => 
      term.id === detail.loaiKyHan.loaiKyHanID?.toString()
    );

    if (!termExists) {
      savingsType.terms.push({
        id: detail.loaiKyHan.loaiKyHanID?.toString() || '',
        months: detail.loaiKyHan.soThang
      });
    }

    // Thêm lãi suất
    savingsType.interestRates.push({
      termId: detail.loaiKyHan.loaiKyHanID?.toString() || '',
      frequencyId: mapFrequencyId(detail.tanSuatNhanLai?.maTanSoNhanLai), // Default to 'end' if null
      rate: detail.laiSuat * 100 || 0
    });
  });

  // Chuyển Map thành array
  const savingsTypes = Array.from(savingsTypeMap.values());

  // Log dữ liệu cuối cùng trước khi trả về
  console.log('Mapped Regulation Data:', {
    savingsTypes: savingsTypes.map(type => ({
      name: type.name,
      terms: type.terms,
      interestRates: type.interestRates,
      disabledFrequencies: type.disabledFrequencies
    })),
    paymentFrequencies: DEFAULT_PAYMENT_FREQUENCIES
  });

  return {
    id: `reg${item.quyDinhLaiSuatID}`,
    createdAt: formatDate(item.ngayBatDau),
    applicationDate: formatDate(item.ngayBatDau),
    description: item.moTa,
    creator: {
      id: item.nguoiLapQuyDinh.nhanVienID,
      name: item.nguoiLapQuyDinh.hoTen
    },
    minimumDeposit: item.soTienGuiToiThieu,
    noTermRate: item.laiSuatKhongKyHan,
    savingsTypes: savingsTypes,
    paymentFrequencies: DEFAULT_PAYMENT_FREQUENCIES,
    isActive: item.active // Since daHuy is not in the DTO, we'll default to false
  };
};