/**
 * Tính số ngày giữa hai thời điểm
 * @param startDate - Ngày bắt đầu
 * @param endDate - Ngày kết thúc
 * @returns Số ngày giữa hai thời điểm (số dương nếu endDate sau startDate)
 */
export function calculateDaysBetween(startDate: Date, endDate: Date): number {
  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return daysDifference;
}

/**
 * Tính số ngày từ ngày hiện tại đến ngày kết thúc
 * @param endDate - Ngày kết thúc (có thể là Date object hoặc string)
 * @returns Số ngày từ hiện tại đến ngày kết thúc (số dương nếu endDate trong tương lai)
 */
export function calculateDaysFromNow(endDate: Date | string): number {
  // Nếu endDate là null hoặc undefined, trả về 0
  if (!endDate) return 0;
  
  // Nếu endDate là string, chuyển đổi thành Date object
  const dateObj = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  // Kiểm tra xem dateObj có phải là Date hợp lệ không
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    console.warn('Invalid date provided to calculateDaysFromNow:', endDate);
    return 0;
  }
  
  const currentDate = new Date();
  return calculateDaysBetween(currentDate, dateObj);
}

/**
 * Tính số ngày từ ngày kết thúc đến hiện tại
 * @param endDate - Ngày kết thúc
 * @returns Số ngày từ ngày kết thúc đến hiện tại (số dương nếu endDate trong quá khứ)
 */
export function calculateDaysToNow(endDate: Date): number {
  const currentDate = new Date();
  return calculateDaysBetween(endDate, currentDate);
}

/**
 * Kiểm tra xem một ngày có trong quá khứ không
 * @param date - Ngày cần kiểm tra
 * @returns true nếu ngày trong quá khứ
 */
export function isPastDate(date: Date): boolean {
  const currentDate = new Date();
  return date < currentDate;
}

/**
 * Kiểm tra xem một ngày có trong tương lai không
 * @param date - Ngày cần kiểm tra
 * @returns true nếu ngày trong tương lai
 */
export function isFutureDate(date: Date): boolean {
  const currentDate = new Date();
  return date > currentDate;
}

/**
 * Format ngày theo định dạng dd/mm/yyyy
 * @param date - Ngày cần format (có thể là Date object hoặc string)
 * @returns Chuỗi ngày theo định dạng dd/mm/yyyy
 */
export function formatDate(date: Date | string): string {
  // Nếu date là null hoặc undefined, trả về chuỗi rỗng
  if (!date) return '';
  
  // Nếu date là string, chuyển đổi thành Date object
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Kiểm tra xem dateObj có phải là Date hợp lệ không
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    console.warn('Invalid date provided to formatDate:', date);
    return '';
  }
  
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}