import { EDoneJsonType, IConfigItem } from '../../../types';

export const pie_charts: IConfigItem = {
  name: 'pie-charts',
  tag: 'pie-charts',
  title: '饼图',
  type: EDoneJsonType.Vue,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  props: {}
};
