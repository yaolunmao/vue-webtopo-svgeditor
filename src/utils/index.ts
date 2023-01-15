import { ELineBindAnchors } from '@/config-center/system/types';
import type { IConfigItemProps } from '@/config-center/types';
import type { IDoneJson } from '@/store/global/types';

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
// 角度转弧度
// Math.PI = 180 度
export const angleToRadian = (angle: number) => {
  return (angle * Math.PI) / 180;
};
/**
 * 计算根据圆心旋转后的点的坐标
 * @param   {Object}  point  旋转前的点坐标
 * @param   {Object}  center 旋转中心
 * @param   {Number}  rotate 旋转的角度
 * @return  {Object}         旋转后的坐标
 * https://www.zhihu.com/question/67425734/answer/252724399 旋转矩阵公式
 */
export const calculateRotatedPointCoordinate = (
  point: { x: number; y: number },
  center: { x: number; y: number },
  rotate: number
) => {
  /**
   * 旋转公式：
   *  点a(x, y)
   *  旋转中心c(x, y)
   *  旋转后点n(x, y)
   *  旋转角度θ                tan ??
   * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
   * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
   */

  return {
    x:
      (point.x - center.x) * Math.cos(angleToRadian(rotate)) -
      (point.y - center.y) * Math.sin(angleToRadian(rotate)) +
      center.x,
    y:
      (point.x - center.x) * Math.sin(angleToRadian(rotate)) +
      (point.y - center.y) * Math.cos(angleToRadian(rotate)) +
      center.y
  };
};
// 求两点之间的中点坐标
export const getCenterPoint = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2
  };
};
/**
 * 坐标数组转换成path路径
 * @param position_arr
 * @returns
 */
export const positionArrarToPath = (position_arr: { x: number; y: number }[]) => {
  let path_str = '';
  for (let index = 0; index < position_arr.length; index++) {
    if (index === 0) {
      path_str += `M ${position_arr[index].x} ${position_arr[index].y}`;
    } else {
      path_str += ` L ${position_arr[index].x} ${position_arr[index].y}`;
    }
  }
  return path_str;
};
/**
 * 获取相对于svg最新的坐标
 * @param init_pos 相对于页面的初始坐标
 * @param finally_pos 相对于页面的最终坐标
 * @param svg_init_pos 相对于svg的初始坐标
 * @returns svg最新的坐标
 */
export const getSvgNowPosition = (init_pos: number, finally_pos: number, svg_init_pos: number) => {
  return svg_init_pos + (finally_pos - init_pos);
};
/**
 * 对象深拷贝
 * @param object
 * @param default_val
 * @returns
 */
export const objectDeepClone = <T>(object: object, default_val: any = {}) => {
  if (!object) {
    return default_val as T;
  }
  return JSON.parse(JSON.stringify(object)) as T;
};
/**
 * 设置实际的属性
 * @param done_json
 */
export const setSvgActualInfo = (done_json: IDoneJson) => {
  const queryBbox = document.querySelector(`#${done_json.id}`);
  // const rectBBox = document.querySelector(`#rect${done_json.id}`);
  if (queryBbox) {
    const BBox = (queryBbox as SVGGraphicsElement).getBBox();
    const { x, y, width, height } = BBox;
    // rectBBox.setAttribute('x', x.toString());
    // rectBBox.setAttribute('y', y.toString());
    // rectBBox.setAttribute('width', width.toString());
    // rectBBox.setAttribute('height', height.toString());
    done_json.actual_bound = { x, y, width, height };
    done_json.point_coordinate.tl = {
      x: done_json.x - (width * done_json.scale_x) / 2,
      y: done_json.y - (height * done_json.scale_y) / 2
    };
    done_json.point_coordinate.tc = {
      x: done_json.x,
      y: done_json.y - (height * done_json.scale_y) / 2
    };
    done_json.point_coordinate.tr = {
      x: done_json.x + (width * done_json.scale_x) / 2,
      y: done_json.y - (height * done_json.scale_y) / 2
    };
    done_json.point_coordinate.l = {
      x: done_json.x - (width * done_json.scale_x) / 2,
      y: done_json.y
    };
    done_json.point_coordinate.r = {
      x: done_json.x + (width * done_json.scale_x) / 2,
      y: done_json.y
    };
    done_json.point_coordinate.bl = {
      x: done_json.x - (width * done_json.scale_x) / 2,
      y: done_json.y + (height * done_json.scale_y) / 2
    };
    done_json.point_coordinate.bc = {
      x: done_json.x,
      y: done_json.y + (height * done_json.scale_y) / 2
    };
    done_json.point_coordinate.br = {
      x: done_json.x + (width * done_json.scale_x) / 2,
      y: done_json.y + (height * done_json.scale_y) / 2
    };
    if (done_json.rotate !== 0) {
      setAfterRotationPointCoordinate(done_json);
    }
  }
};
/**
 * 根据锚点类型获取锚点坐标
 * @param anchor_type
 * @param done_json
 * @returns
 */
export const getAnchorPosByAnchorType = (anchor_type: ELineBindAnchors, done_json: IDoneJson) => {
  if (anchor_type === ELineBindAnchors.BottomCenter) {
    return done_json.point_coordinate.bc;
  } else if (anchor_type === ELineBindAnchors.Left) {
    return done_json.point_coordinate.l;
  } else if (anchor_type === ELineBindAnchors.Right) {
    return done_json.point_coordinate.r;
  } else {
    return done_json.point_coordinate.tc;
  }
};
/**
 * 旋转之后重新设置组件八点坐标
 * @param item
 */
export const setAfterRotationPointCoordinate = (item: IDoneJson) => {
  item.point_coordinate = {
    tl: calculateRotatedPointCoordinate(
      item.point_coordinate.tl,
      { x: item.x, y: item.y },
      item.rotate
    ),
    tc: calculateRotatedPointCoordinate(
      item.point_coordinate.tc,
      { x: item.x, y: item.y },
      item.rotate
    ),
    tr: calculateRotatedPointCoordinate(
      item.point_coordinate.tr,
      { x: item.x, y: item.y },
      item.rotate
    ),
    l: calculateRotatedPointCoordinate(
      item.point_coordinate.l,
      { x: item.x, y: item.y },
      item.rotate
    ),
    r: calculateRotatedPointCoordinate(
      item.point_coordinate.r,
      { x: item.x, y: item.y },
      item.rotate
    ),
    bl: calculateRotatedPointCoordinate(
      item.point_coordinate.bl,
      { x: item.x, y: item.y },
      item.rotate
    ),
    bc: calculateRotatedPointCoordinate(
      item.point_coordinate.bc,
      { x: item.x, y: item.y },
      item.rotate
    ),
    br: calculateRotatedPointCoordinate(
      item.point_coordinate.br,
      { x: item.x, y: item.y },
      item.rotate
    )
  };
};
export const prosToVBind = (props: IConfigItemProps) => {
  let temp = {};
  for (const key in props) {
    temp = { ...temp, ...{ [key]: props[key].val } };
  }
  return temp;
};
