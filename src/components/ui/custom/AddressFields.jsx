import { motion } from 'framer-motion';
import CustomSelect from './CustomSelect';
import InputField from './Inputfield';

const AddressFields = ({ 
  className="",
  prefix,
  values,
  onChange,
  disabled = false,
  errors = {},
  required = false,
  onBlur = () => {}
}) => {
  // Mẫu dữ liệu cho các dropdown
  const provinces = ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ", "An Giang", "Bà Rịa - Vũng Tàu"];
  const districts = ["Quận 1", "Quận 2", "Quận 3", "Cầu Giấy", "Đống Đa", "Hai Bà Trưng", "Hoàn Kiếm", "Hải Châu"];
  const wards = ["Phường 1", "Phường 2", "Phường 3", "Dịch Vọng", "Quang Trung", "Bến Nghé", "Thuận Phước"];
  
  return (
    <motion.div 
      layout
      transition={{ duration: 0.3, type: "spring" }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
    >
      <CustomSelect 
        className={className}
        label="Tỉnh/Thành phố" 
        value={values.province} 
        onChange={(val) => onChange(`${prefix}.province`, val)}
        onBlur={() => onBlur(`${prefix}.province`)}
        disabled={disabled}
        error={errors[`${prefix}.province`]}
        required={required}
        options={provinces}
        placeholder="Chọn tỉnh/thành phố..."
      />
      <CustomSelect 
        className={className}
        label="Quận/Huyện" 
        value={values.district} 
        onChange={(val) => onChange(`${prefix}.district`, val)}
        onBlur={() => onBlur(`${prefix}.district`)}
        disabled={disabled}
        error={errors[`${prefix}.district`]}
        required={required}
        options={districts}
        placeholder="Chọn quận/huyện..."
      />
      <CustomSelect 
        className={className}
        label="Phường/Xã" 
        value={values.ward} 
        onChange={(val) => onChange(`${prefix}.ward`, val)}
        onBlur={() => onBlur(`${prefix}.ward`)}
        disabled={disabled}
        error={errors[`${prefix}.ward`]}
        required={required}
        options={wards}
        placeholder="Chọn phường/xã..."
      />
      <InputField 
        label="Tên đường" 
        value={values.street} 
        onChange={(val) => onChange(`${prefix}.street`, val)}
        onBlur={() => onBlur(`${prefix}.street`)}
        disabled={disabled}
        error={errors[`${prefix}.street`]}
        required={required}
        placeholder="Nhập tên đường..."
      />
      <InputField 
        label="Số nhà" 
        value={values.houseNumber} 
        onChange={(val) => onChange(`${prefix}.houseNumber`, val)}
        onBlur={() => onBlur(`${prefix}.houseNumber`)}
        disabled={disabled}
        error={errors[`${prefix}.houseNumber`]}
        required={required}
        placeholder="Nhập số nhà..."
      />
    </motion.div>
  );
};

export default AddressFields;