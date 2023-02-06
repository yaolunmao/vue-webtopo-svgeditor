import { EDoneJsonType, IConfigItem } from '@/config-center/types';

export const square_svg_file: IConfigItem = {
  name: 'square',
  title: '正方形',
  type: EDoneJsonType.File,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  display: true,
  props: {}
};
