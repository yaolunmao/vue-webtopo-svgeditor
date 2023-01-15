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
  props: IConfigItemProps;
  type: EDoneJsonType;
  config: IDoneJsonConfig;
  animations?: IConfigItemProps;
  tag?: any;
  state?: IConfigItemState; //通过一个属性去控制多个属性就是有状态组件
}
export interface IConfigItemProps {
  [key: string]: {
    title: string;
    type: EConfigItemPropsType;
    val: any;
    options?: { value: any; label: string }[];
    disabled?: boolean;
  };
}

export enum EConfigAnimationsType {
  None = 'None',
  Electricity = 'Electricity', //电流效果
  WaterDrop = 'WaterDrop', //水珠
  Track = 'Track' //轨迹
}
export enum EConfigItemPropsType {
  Input = 'Input',
  Color = 'Color',
  InputNumber = 'InputNumber',
  Switch = 'Switch', //此类型option默认索引0为关闭
  JsonEdit = 'JsonEdit',
  Select = 'Select'
}
export enum EDoneJsonType {
  File = 'File',
  StraightLine = 'StraightLine',
  ConnectionLine = 'ConnectionLine',
  CustomSvg = 'CustomSvg'
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
