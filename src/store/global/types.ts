import { IConfigCenter, IConfigItem } from '../../config-center/types';

export interface IGlobalStore {
  config_center: IConfigCenter;
  intention: EGlobalStoreIntention;
  create_svg_info: IConfigItem | undefined;
  done_json: IDoneJson[];
  mouse_info: IMouseInfo;
  handle_svg_info: IHandleSvgInfo | undefined;
  scale_info: IScaleInfo;
  rotate_info: IRotateInfo;
}
export interface IDoneJson extends IConfigItem {
  id: string;
  x: number;
  y: number;
  client: {
    x: number;
    y: number;
  };
  scale_x: number;
  scale_y: number;
  rotate: number;
  actual_bound: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
export enum EGlobalStoreIntention {
  None = 'None',
  Create = 'Create',
  Move = 'Move',
  MoveCanvas = 'MoveCanvas',
  Select = 'Select',
  Zoom = 'Zoom',
  Rotate = 'Rotate'
}
export interface IMouseInfo {
  state: EMouseInfoState;
  position_x: number; //鼠标指针坐标
  position_y: number;
  now_position_x: number; //当前目标的坐标
  now_position_y: number;
  new_position_x: number; //移动之后目标的坐标
  new_position_y: number;
}
export enum EMouseInfoState {
  Down = 'Down',
  Up = 'Up'
}
export interface IHandleSvgInfo {
  info: IDoneJson;
  index: number;
}
/**
 * 缩放信息
 */
export interface IScaleInfo {
  type: EScaleInfoType;
  scale_times: {
    //点击缩放时当前组件的缩放倍数
    x: number;
    y: number;
  };
  scale_item_info: {
    x: number;
    y: number;
  };
}
/**
 * 旋转信息
 */
export interface IRotateInfo {
  angle: number;
}
export enum EScaleInfoType {
  None = '',
  TopLeft = 'TopLeft',
  TopCenter = 'TopCenter',
  TopRight = 'TopRight',
  Left = 'Left',
  Right = 'Right',
  BottomLeft = 'BottomLeft',
  BottomCenter = 'BottomCenter',
  BottomRight = 'BottomRight'
}
