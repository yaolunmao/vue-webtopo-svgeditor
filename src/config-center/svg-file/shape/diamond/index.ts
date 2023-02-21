import { EDoneJsonType, IConfigItem } from '@/config-center/types';

export const diamond_svg_file: IConfigItem = {
  name: 'diamond',
  title: '菱形',
  type: EDoneJsonType.File,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  display: true,
  props: {},
  triggerList: []
};
