/**
 * 生成随机字符串
 * @param len 生成个数
 */
export const randomString = (len?: number) => {
  len = len || 10;
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const maxPos = str.length;
  let random_str = '';
  for (let i = 0; i < len; i++) {
    random_str += str.charAt(Math.floor(Math.random() * maxPos));
  }
  return random_str;
};

// 通过泛型定义通用类型保护函数
export const isOfType = <T>(target: unknown, prop: keyof T): target is T => {
  return (target as T)[prop] !== undefined;
};
/**
 * 获取坐标偏移量
 * @param length 真实宽/高
 * @param scale 缩放倍数
 * @returns 坐标偏移量
 */
export const getCoordinateOffset = (length: number, scale: number) => {
  return (length / 2) * (scale - 1);
};
