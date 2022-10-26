import { calculateRotatedPointCoordinate, getCenterPoint } from '.';
import { IScalePoint } from './types';
/**
 * 左上角缩放
 * @param curPositon 按住的缩放按钮的坐标
 * @param symmetricPoint 缩放前对称点的坐标
 * @param rotate 旋转角度
 * @returns
 */
export const calculateLeftTop = (
  curPositon: IScalePoint,
  symmetricPoint: IScalePoint,
  rotate: number
) => {
  //新的中心点坐标
  const newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
  console.log('left中心坐标', newCenterPoint);
  const newTopLeftPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -rotate);
  const newBottomRightPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    -rotate
  );

  return {
    width: newBottomRightPoint.x - newTopLeftPoint.x,
    height: newBottomRightPoint.y - newTopLeftPoint.y,
    is_old_width: false,
    is_old_height: false
  };
};
/**
 * 右上角缩放
 * @param curPositon 按住的缩放按钮的坐标
 * @param symmetricPoint 缩放前对称点的坐标
 * @param rotate 旋转角度
 * @returns
 */
export const calculateRightTop = (
  curPositon: IScalePoint,
  symmetricPoint: IScalePoint,
  rotate: number
) => {
  const newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
  const newTopRightPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -rotate);
  const newBottomLeftPoint = calculateRotatedPointCoordinate(
    symmetricPoint,
    newCenterPoint,
    -rotate
  );

  return {
    width: newTopRightPoint.x - newBottomLeftPoint.x,
    height: newBottomLeftPoint.y - newTopRightPoint.y,
    is_old_width: false,
    is_old_height: false
  };
};
/**
 * 右下角缩放
 * @param curPositon 按住的缩放按钮的坐标
 * @param symmetricPoint 缩放前对称点的坐标
 * @param rotate 旋转角度
 * @returns
 */
export const calculateRightBottom = (
  curPositon: IScalePoint,
  symmetricPoint: IScalePoint,
  rotate: number
) => {
  const newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
  const newTopLeftPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -rotate);
  const newBottomRightPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -rotate);

  return {
    width: newBottomRightPoint.x - newTopLeftPoint.x,
    height: newBottomRightPoint.y - newTopLeftPoint.y,
    is_old_width: false,
    is_old_height: false
  };
};
/**
 * 左下角缩放
 * @param curPositon 按住的缩放按钮的坐标
 * @param symmetricPoint 缩放前对称点的坐标
 * @param rotate 旋转角度
 * @returns
 */
export const calculateLeftBottom = (
  curPositon: IScalePoint,
  symmetricPoint: IScalePoint,
  rotate: number
) => {
  const newCenterPoint = getCenterPoint(curPositon, symmetricPoint);
  const newTopRightPoint = calculateRotatedPointCoordinate(symmetricPoint, newCenterPoint, -rotate);
  const newBottomLeftPoint = calculateRotatedPointCoordinate(curPositon, newCenterPoint, -rotate);

  return {
    width: newTopRightPoint.x - newBottomLeftPoint.x,
    height: newBottomLeftPoint.y - newTopRightPoint.y,
    is_old_width: false,
    is_old_height: false
  };
};

export const calculateTop = (
  curPositon: IScalePoint,
  symmetricPoint: IScalePoint,
  rotate: number,
  curPoint: IScalePoint
) => {
  // 由于用户拉伸时是以任意角度拉伸的，所以在求得旋转前的坐标时，只取 y 坐标（这里的 x 坐标可能是任意值），x 坐标用 curPoint 的。
  // 这个中心点（第二个参数）用 curPoint, center, symmetricPoint 都可以，只要他们在一条直线上就行
  const rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -rotate);
  console.log('top中心坐标', rotatedcurPositon);

  // 算出旋转前 y 坐标，再用 curPoint 的 x 坐标，重新计算它们旋转后对应的坐标
  const rotatedTopMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: curPoint.x,
      y: rotatedcurPositon.y
    },
    curPoint,
    rotate
  );

  // 用旋转后的坐标和对称点算出新的高度（勾股定理）
  const newHeight = Math.sqrt(
    (rotatedTopMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedTopMiddlePoint.y - symmetricPoint.y) ** 2
  );
  return {
    width: 1,
    height: Math.round(newHeight),
    is_old_width: true,
    is_old_height: false
  };
};

export const calculateRight = (
  curPositon: IScalePoint,
  symmetricPoint: IScalePoint,
  rotate: number,
  curPoint: IScalePoint
) => {
  const rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -rotate);
  const rotatedRightMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: rotatedcurPositon.x,
      y: curPoint.y
    },
    curPoint,
    rotate
  );

  const newWidth = Math.sqrt(
    (rotatedRightMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedRightMiddlePoint.y - symmetricPoint.y) ** 2
  );

  return {
    width: Math.round(newWidth),
    height: 1,
    is_old_width: false,
    is_old_height: true
  };
};

export const calculateBottom = (
  curPositon: IScalePoint,
  symmetricPoint: IScalePoint,
  rotate: number,
  curPoint: IScalePoint
) => {
  const rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -rotate);
  const rotatedBottomMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: curPoint.x,
      y: rotatedcurPositon.y
    },
    curPoint,
    rotate
  );

  const newHeight = Math.sqrt(
    (rotatedBottomMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedBottomMiddlePoint.y - symmetricPoint.y) ** 2
  );

  return {
    width: 1,
    height: Math.round(newHeight),
    is_old_width: true,
    is_old_height: false
  };
};

export const calculateLeft = (
  curPositon: IScalePoint,
  symmetricPoint: IScalePoint,
  rotate: number,
  curPoint: IScalePoint
) => {
  const rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -rotate);
  const rotatedLeftMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: rotatedcurPositon.x,
      y: curPoint.y
    },
    curPoint,
    rotate
  );

  const newWidth = Math.sqrt(
    (rotatedLeftMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedLeftMiddlePoint.y - symmetricPoint.y) ** 2
  );

  return {
    width: Math.round(newWidth),
    height: 1,
    is_old_width: false,
    is_old_height: true
  };
};
