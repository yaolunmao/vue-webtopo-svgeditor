import { IConfigComponentGroup } from '../types';
import { custom_vue_group } from './custom-vue';
import { echarts_group } from './echarts';
import { element_ui_group } from './element-ui';

export const vue_config_center: IConfigComponentGroup[] = Object.seal([
  element_ui_group,
  custom_vue_group,
  echarts_group
]);
