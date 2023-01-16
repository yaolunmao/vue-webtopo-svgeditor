import { ELineBindAnchors } from '@/config-center/system/types';
import { EDoneJsonType, IConfigItem } from '@/config-center/types';
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
  const rectBBox = document.querySelector(`#rect${done_json.id}`);
  if (queryBbox) {
    let x = 0,
      y = 0,
      width = 0,
      height = 0;
    if (done_json.type !== EDoneJsonType.Vue) {
      const BBox = (queryBbox as SVGGraphicsElement).getBBox();
      x = BBox.x;
      y = BBox.y;
      (width = BBox.width), (height = BBox.height);
    } else {
      (width = (queryBbox as HTMLElement).offsetWidth),
        (height = (queryBbox as HTMLElement).offsetHeight);
      width = width === 0 ? 100 : width;
      height = height === 0 ? 100 : height;
      x = 50 - width / 2;
      y = 50 - height / 2;
      const foreignObjectBox = document.querySelector(`#foreign-object${done_json.id}`);
      if (
        foreignObjectBox &&
        foreignObjectBox.getAttribute('x') === '0' &&
        foreignObjectBox.getAttribute('y') === '0' &&
        foreignObjectBox.getAttribute('width') === '0' &&
        foreignObjectBox.getAttribute('height') === '0'
      ) {
        foreignObjectBox.setAttribute('x', x.toString());
        foreignObjectBox.setAttribute('y', y.toString());
        foreignObjectBox.setAttribute('width', width.toString());
        foreignObjectBox.setAttribute('height', height.toString());
      }
    }
    if (
      rectBBox &&
      rectBBox.getAttribute('x') === '0' &&
      rectBBox.getAttribute('y') === '0' &&
      rectBBox.getAttribute('width') === '0' &&
      rectBBox.getAttribute('height') === '0'
    ) {
      console.log(rectBBox.getAttribute('x'), 168);
      rectBBox.setAttribute('x', x.toString());
      rectBBox.setAttribute('y', y.toString());
      rectBBox.setAttribute('width', width.toString());
      rectBBox.setAttribute('height', height.toString());
    }
    //实际大小和坐标理论上不会变 但是如果子组件设置了100% 还是会变 所以要做下判断
    if (
      done_json.actual_bound.x === 0 &&
      done_json.actual_bound.y === 0 &&
      done_json.actual_bound.width === 0 &&
      done_json.actual_bound.height === 0
    ) {
      done_json.actual_bound = { x, y, width, height };
    }
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

export const prosToVBind = (item: IConfigItem) => {
  let temp = {};
  if (item.state) {
    for (const key in item.state) {
      if (key === 'OnOff') {
        for (const on_off_key in item.state[key]?.props) {
          temp = {
            ...temp,
            ...{
              [on_off_key]: item.state[key]?.default
                ? item.state[key]?.props[on_off_key].openVal
                : item.state[key]?.props[on_off_key].closeVal
            }
          };
        }
      }
    }
  }
  for (const key in item.props) {
    temp = { ...temp, ...{ [key]: item.props[key].val } };
  }
  return temp;
};
