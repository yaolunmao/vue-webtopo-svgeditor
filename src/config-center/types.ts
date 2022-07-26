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
  state?: IConfigItemState;
}
export interface IConfigItemProps {
  [key: string]: {
    title: string;
    type: EConfigItemPropsType;
    val: string;
  };
}
export enum EConfigItemPropsType {
  Input = 'Input',
  Color = 'Color',
  InputNumber = 'InputNumber'
}
export interface IConfigItemState {
  type: EConfigItemStateType;
  default: any;
}
export enum EConfigItemStateType {
  Switch = 'Switch'
}