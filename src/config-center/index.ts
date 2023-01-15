import { svgfile_config_center } from './svg-file';
import { IComponentImport, IConfigCenter } from './types';
import customSvgText from '@/components/webtopo-svgedit/components/custom-svg/custom-svg-text/index.vue';
export const configCenter: IConfigCenter = {
  svg文件: svgfile_config_center,
  vue组件: [],
  自定义组件: [],
  图表: []
};
export const ComponentImport: IComponentImport = {
  'custom-svg-text': customSvgText
};
