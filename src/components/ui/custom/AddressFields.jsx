import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import CustomSelect from './CustomSelect';
import InputField from './Inputfield';
import { 
  getProvinces, 
  getDistrictsByProvince, 
  getWardsByDistrict,
  getProvinceByCode 
} from '@/data/vietnamAdministrative';

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
  const [selectedProvinceCode, setSelectedProvinceCode] = useState('');
  const [selectedDistrictCode, setSelectedDistrictCode] = useState('');
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [availableWards, setAvailableWards] = useState([]);
  
  // Lấy danh sách tỉnh/thành phố
  const provinces = getProvinces();
  
  // Cập nhật danh sách quận/huyện khi chọn tỉnh/thành phố
  useEffect(() => {
    if (values.province) {
      const province = provinces.find(p => p.name === values.province);
      if (province) {
        setSelectedProvinceCode(province.code);
        const districts = getDistrictsByProvince(province.code);
        setAvailableDistricts(districts);
        
        // Reset district và ward nếu không tồn tại trong tỉnh mới
        if (values.district) {
          const districtExists = districts.find(d => d.name === values.district);
          if (!districtExists) {
            onChange(`${prefix}.district`, '');
            onChange(`${prefix}.ward`, '');
          }
        }
      }
    } else {
      setSelectedProvinceCode('');
      setAvailableDistricts([]);
      setAvailableWards([]);
    }
  }, [values.province, provinces, onChange, prefix]);
  
  // Cập nhật danh sách phường/xã khi chọn quận/huyện
  useEffect(() => {
    if (values.district && availableDistricts.length > 0) {
      const district = availableDistricts.find(d => d.name === values.district);
      if (district) {
        setSelectedDistrictCode(district.code);
        const wards = getWardsByDistrict(district.code);
        setAvailableWards(wards);
        
        // Reset ward nếu không tồn tại trong quận mới
        if (values.ward) {
          const wardExists = wards.find(w => w.name === values.ward);
          if (!wardExists) {
            onChange(`${prefix}.ward`, '');
          }
        }
      }
    } else {
      setSelectedDistrictCode('');
      setAvailableWards([]);
    }
  }, [values.district, availableDistricts, onChange, prefix]);
  
  // Xử lý thay đổi tỉnh/thành phố
  const handleProvinceChange = (provinceName) => {
    onChange(`${prefix}.province`, provinceName);
    onChange(`${prefix}.district`, '');
    onChange(`${prefix}.ward`, '');
  };
  
  // Xử lý thay đổi quận/huyện
  const handleDistrictChange = (districtName) => {
    onChange(`${prefix}.district`, districtName);
    onChange(`${prefix}.ward`, '');
  };
  
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
        onChange={handleProvinceChange}
        onBlur={() => onBlur(`${prefix}.province`)}
        disabled={disabled}
        error={errors[`${prefix}.province`]}
        required={required}
        options={provinces.map(p => p.name)}
        placeholder="Chọn tỉnh/thành phố..."
      />
      <CustomSelect 
        className={className}
        label="Quận/Huyện" 
        value={values.district} 
        onChange={handleDistrictChange}
        onBlur={() => onBlur(`${prefix}.district`)}
        disabled={disabled || !values.province}
        error={errors[`${prefix}.district`]}
        required={required}
        options={availableDistricts.map(d => d.name)}
        placeholder="Chọn quận/huyện..."
      />
      <CustomSelect 
        className={className}
        label="Phường/Xã" 
        value={values.ward} 
        onChange={(val) => onChange(`${prefix}.ward`, val)}
        onBlur={() => onBlur(`${prefix}.ward`)}
        disabled={disabled || !values.district}
        error={errors[`${prefix}.ward`]}
        required={required}
        options={availableWards.map(w => w.name)}
        placeholder="Chọn phường/xã..."
      />
      <InputField 
        label="Tên đường" 
        value={values.streetName} 
        onChange={(val) => onChange(`${prefix}.streetName`, val)}
        onBlur={() => onBlur(`${prefix}.streetName`)}
        disabled={disabled}
        error={errors[`${prefix}.streetName`]}
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