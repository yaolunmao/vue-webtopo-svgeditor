/**
 * @description: 数据结构
 * @param {*} commonComponentList 常规组件列表
 * @param {*} drawComponentList 绘制组件列表
 * @param {*} chartComponentList 图表组件列表
 * @return {*}
 */
export interface ILeftImgLists {
  commonComponentList?: Array<IComponentInfo>,
  drawComponentList?: Array<IComponentInfo>,
  chartComponentList?: Array<IComponentInfo>
}
/**
 * @description: 画好的组件数据列表
 * @param {*}
 * @return {*}
 */
export interface ISvgDataLists {
  id: string,
  type?: string,
  title?: string,
  svgPositionX: number,
  svgPositionY: number,
  angle?: number,
  size?: number,
  extend_attr?: any
}
export interface ISvgCanvas {
  width: number,
  height: number
}
/**
 * @description: 组件信息格式
 * @param {*} type  组件类型
 * @param {*} title 组件显示标题
 * @param {*} panel_class 面板显示类型 拖放 绘制
 * @param {*} template 组件渲染模板
 * @param {*} props 组件传值
 * @param {*} extend_attr 组件拓展属性
 * @param {*} create_type 组件创建类型
 * @param {*} priview_img 组件预览图片
 * @return {*}
 */
export interface IComponentInfo {
  type?: string,
  title?: string,
  panel_class?: string,
  template?: string,//
  props?: Array<string>,
  extend_attr?: any,
  create_type?: string,
  priview_img?: string
}
/**
 * @description: 鼠标信息
 * @param {*} status 1按下 0弹起
 * @param {*} mPositionX 鼠标x轴坐标
 * @param {*} mPositionY 鼠标y轴坐标
 * @return {*}
 */
export interface IMouseInfo {
  status: number,
  mPositionX: number
  mPositionY: number
}
/**
 * @description: 选中的svg属性
 * @param {*}
 * @return {*}
 */
export interface ISelectSvg {
  id: string,
  index: number,
  sPositionX: number,
  sPositionY: number,
  create_type: string,
}