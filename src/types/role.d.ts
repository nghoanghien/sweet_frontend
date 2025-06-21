export interface IVaiTro {
    id: string;
    name: string;
    isCustomerRole: boolean;
    description: string;
    active: boolean;
    quyenHans: IQuyenHan[];
}

export interface IVaiTroDTO {
    id: string;
    name: string;
    isCustomerRole: boolean;
    description: string;
    active: boolean;
    quyenHanIds: string[];
}