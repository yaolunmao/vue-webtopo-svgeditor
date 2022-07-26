import { IConfigCenter, IConfigItem } from '../../config-center/types';

export interface IGlobalStore {
  config_center: IConfigCenter;
  intention: EGlobalStoreIntention;
  create_svg_info: IConfigItem | undefined;
  done_json: IDoneJson[];
  mouse_info: IMouseInfo;
  handle_svg_info: IHandleSvgInfo | undefined;
}
export interface IDoneJson extends IConfigItem {
  id: string;
  x: number;
  y: number;
}
export enum EGlobalStoreIntention {
  None = 'None',
  Create = 'Create',
  Move = 'Move',
  MoveCanvas = 'MoveCanvas',
  Select = 'Select'
}
export interface IMouseInfo {
  state: EMouseInfoState;
  position_x: number;
  position_y: number;
  now_position_x: number;
  now_position_y: number;
  new_position_x: number;
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
