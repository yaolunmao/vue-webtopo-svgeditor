import { EDoneJsonType, IConfigItem } from '@/config-center/types';

export const shapeArrow_svg_file: IConfigItem = {
  name: 'shapeArrow',
  title: '箭头',
  type: EDoneJsonType.File,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  display: true,
  props: {}
};
