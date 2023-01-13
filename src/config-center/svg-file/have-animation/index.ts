import { IConfigComponentGroup } from '../../types';
import { reservoir_svg_file } from './reservoir';

export const have_animation_group: IConfigComponentGroup = {
  groupType: 'have_animation',
  title: '自带动画',
  list: [reservoir_svg_file]
};
