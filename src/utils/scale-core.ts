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
    is_old_height: false,
    newCenterPoint
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
    is_old_height: false,
    newCenterPoint
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
    is_old_height: false,
    newCenterPoint
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
    is_old_height: false,
    newCenterPoint
  };
};
/**
 * 顶点中心缩放
 * @param curPositon 按住的缩放按钮的坐标
 * @param symmetricPoint 缩放前对称点的坐标
 * @param rotate 旋转角度
 * @param curPoint 旋转中心
 * @returns
 */
export const calculateTop = (
  curPositon: IScalePoint,
  symmetricPoint: IScalePoint,
  rotate: number,
  curPoint: IScalePoint
) => {
  const rotatedcurPositon = calculateRotatedPointCoordinate(curPositon, curPoint, -rotate);
  const rotatedTopMiddlePoint = calculateRotatedPointCoordinate(
    {
      x: curPoint.x,
      y: rotatedcurPositon.y
    },
    curPoint,
    rotate
  );
  const newHeight = Math.sqrt(
    (rotatedTopMiddlePoint.x - symmetricPoint.x) ** 2 +
      (rotatedTopMiddlePoint.y - symmetricPoint.y) ** 2
  );
  const newCenterPoint = {
    x: rotatedTopMiddlePoint.x - (rotatedTopMiddlePoint.x - symmetricPoint.x) / 2,
    y: rotatedTopMiddlePoint.y + (symmetricPoint.y - rotatedTopMiddlePoint.y) / 2
  };
  return {
    width: 1,
    height: Math.round(newHeight),
    is_old_width: true,
    is_old_height: false,
    newCenterPoint
  };
};
/**
 * 右侧中心缩放
 * @param curPositon 按住的缩放按钮的坐标
 * @param symmetricPoint 缩放前对称点的坐标
 * @param rotate 旋转角度
 * @returns
 */
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
  const newCenterPoint = {
    x: rotatedRightMiddlePoint.x - (rotatedRightMiddlePoint.x - symmetricPoint.x) / 2,
    y: rotatedRightMiddlePoint.y + (symmetricPoint.y - rotatedRightMiddlePoint.y) / 2
  };
  return {
    width: Math.round(newWidth),
    height: 1,
    is_old_width: false,
    is_old_height: true,
    newCenterPoint
  };
};
/**
 * 底部中心缩放
 * @param curPositon 按住的缩放按钮的坐标
 * @param symmetricPoint 缩放前对称点的坐标
 * @param rotate 旋转角度
 * @returns
 */
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
  const newCenterPoint = {
    x: rotatedBottomMiddlePoint.x - (rotatedBottomMiddlePoint.x - symmetricPoint.x) / 2,
    y: rotatedBottomMiddlePoint.y + (symmetricPoint.y - rotatedBottomMiddlePoint.y) / 2
  };
  return {
    width: 1,
    height: Math.round(newHeight),
    is_old_width: true,
    is_old_height: false,
    newCenterPoint
  };
};
/**
 * 左侧中心缩放
 * @param curPositon 按住的缩放按钮的坐标
 * @param symmetricPoint 缩放前对称点的坐标
 * @param rotate 旋转角度
 * @returns
 */
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
  const newCenterPoint = {
    x: rotatedLeftMiddlePoint.x - (rotatedLeftMiddlePoint.x - symmetricPoint.x) / 2,
    y: rotatedLeftMiddlePoint.y + (symmetricPoint.y - rotatedLeftMiddlePoint.y) / 2
  };
  return {
    width: Math.round(newWidth),
    height: 1,
    is_old_width: false,
    is_old_height: true,
    newCenterPoint
  };
};
