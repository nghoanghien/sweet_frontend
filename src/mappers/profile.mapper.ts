import { IUserGetAccountDTO } from '@/types/auth';
import { TypeUserEnum } from '@/types/enums/TypeUserEnum';

export interface IProfileData {
  fullName: string;
  dateOfBirth: string;
  idNumber: string;
  email: string;
  phone: string;
  accountCreated: string;
  accountType: string;
  permanentAddress: {
    province: string;
    district: string;
    ward: string;
    street: string;
    houseNumber: string;
  };
  contactAddress: {
    province: string;
    district: string;
    ward: string;
    street: string;
    houseNumber: string;
  };
}

export const mapUserToProfile = (user: IUserGetAccountDTO): IProfileData => {
  // Format date from ISO string to dd/mm/yyyy
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  // Map user type to account type
  const getAccountType = (type: TypeUserEnum): string => {
    switch (type) {
      case TypeUserEnum.KHACHHANG:
        return 'Khách hàng';
      case TypeUserEnum.NHANVIEN:
        return 'Nhân viên';
      default:
        return 'Standard';
    }
  };

  return {
    fullName: user.hoTen || '',
    dateOfBirth: user.ngaySinh ? formatDate(user.ngaySinh) : '',
    idNumber: user.cccd || '',
    email: user.email || '',
    phone: user.soDienThoai || '',
    accountCreated: '', // This field is not available in IUserGetAccountDTO
    accountType: getAccountType(user.type),
    permanentAddress: {
      province: user.diaChiThuongTru?.tinhTP || '',
      district: user.diaChiThuongTru?.quanHuyen || '',
      ward: user.diaChiThuongTru?.phuongXa || '',
      street: user.diaChiThuongTru?.tenDuong || '',
      houseNumber: user.diaChiThuongTru?.soNha || '',
    },
    contactAddress: {
      province: user.diaChiLienLac?.tinhTP || '',
      district: user.diaChiLienLac?.quanHuyen || '',
      ward: user.diaChiLienLac?.phuongXa || '',
      street: user.diaChiLienLac?.tenDuong || '',
      houseNumber: user.diaChiLienLac?.soNha || '',
    }
  };
}; 