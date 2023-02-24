/**
 * 组件分组数据格式
 * @property {string} groupType 组件分组类型
 * @property {string} title 组件分组标题
 * @property {Array} list 分组包含的组件项列表
 * @export
 * @interface IComponentGroup
 */
export interface IConfigComponentGroup {
  groupType: string;
  title: string;
  list: Array<IConfigItem>;
}

export interface IConfigCenter {
  [key: string]: IConfigComponentGroup[];
}
export interface IConfigItem {
  name: string;
  title: string;
  display: boolean;
  props: IConfigItemProps;
  type: EDoneJsonType;
  config: IDoneJsonConfig;
  animations?: IConfigItemProps;
  tag?: any;
  state?: IConfigItemState; //通过一个属性去控制多个属性就是有状态组件
  tag_slot?: string;
  eventAttr?: IEventAttr;
  triggerList?: ITrigger[];
}
export interface IConfigItemProps {
  [key: string]: {
    title: string;
    type: EConfigItemPropsType;
    val: any;
    options?: any;
    disabled?: boolean;
  };
}

export interface ITrigger {
  tag: string | undefined;
  max: number | undefined;
  min: number | undefined;
  animationsType: EConfigAnimationsType;
}
export enum EConfigAnimationsType {
  None = 'None',
  Electricity = 'Electricity', //电流效果
  WaterDrop = 'WaterDrop', //水珠
  Track = 'Track', //轨迹
  RotateOut = 'animate__rotateOut', //旋转
  RotateIn = 'animate__rotateIn', //旋转
  HeartBeat = 'animate__heartBeat',
  Bounce = 'animate__bounce',
  Flash = 'animate__flash',
  Pulse = 'animate__pulse',
  RubberBand = 'animate__rubberBand',
  ShakeX = 'animate__shakeX',
  ShakeY = 'animate__shakeY',
  HeadShake = 'animate__headShake',
  Swing = 'animate__swing',
  Tada = 'animate__tada',
  Wobble = 'animate__wobble',
  Jello = 'animate__jello'
}
export enum EConfigItemPropsType {
  Input = 'Input',
  Color = 'Color',
  InputNumber = 'InputNumber',
  Switch = 'Switch', //此类型option默认索引0为关闭
  JsonEdit = 'JsonEdit',
  Select = 'Select'
}
// export enum EJudgingType {
//   EQU = '等于', //equal
//   NEQ = '不等于', //not equal
//   LSS = '小于', //less than
//   LEQ = '小于或等于', //equal or less than
//   GTR = '大于', //greater than
//   GEQ = '大于或等于' //equal or greater than
// }
export enum EDoneJsonType {
  File = 'File',
  StraightLine = 'StraightLine',
  ConnectionLine = 'ConnectionLine',
  CustomSvg = 'CustomSvg',
  Vue = 'Vue'
}
interface IDoneJsonConfig {
  can_zoom: boolean;
  have_anchor: boolean;
  actual_rect: boolean;
}
export interface IComponentImport {
  [key: string]: any;
}
export interface IConfigItemState {
  OnOff?: {
    title: string;
    default: false;
    props: { [key: string]: { openVal: any; closeVal: any } };
  };
}
export interface IEventAttr {
  [key: string]: {
    custom: boolean;
    tips: string;
    val: string;
    anonymous_params: string[];
    list: string[];
  };
}
export enum IEventAttrType {
  Call = 'call', //代表调用
  Custom = 'custom' //代表自定义
}
