import { IConfigComponentGroup } from '../../types';
import { custom_svg_text } from './custom-svg-text';
import { switch_demo } from './switch-demo';
export const custom_svg_group: IConfigComponentGroup = {
  groupType: 'custom_svg_group',
  title: '自定义svg',
  list: [custom_svg_text, switch_demo]
};
