import { EDoneJsonType, IConfigItem } from '@/config-center/types';

export const shapeTrape_svg_file: IConfigItem = {
  name: 'shapeTrape',
  title: '梯形',
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
