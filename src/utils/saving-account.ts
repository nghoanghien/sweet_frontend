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
 * @param endDate - Ngày kết thúc
 * @returns Số ngày từ hiện tại đến ngày kết thúc (số dương nếu endDate trong tương lai)
 */
export function calculateDaysFromNow(endDate: Date): number {
  const currentDate = new Date();
  return calculateDaysBetween(currentDate, endDate);
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
 * @param date - Ngày cần format
 * @returns Chuỗi ngày theo định dạng dd/mm/yyyy
 */
export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}