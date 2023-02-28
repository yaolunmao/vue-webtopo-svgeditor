import { EDoneJsonType, IConfigItem } from '@/config-center/types';

export const shapeCylinder_svg_file: IConfigItem = {
  name: 'shapeCylinder',
  title: '圆柱体',
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
