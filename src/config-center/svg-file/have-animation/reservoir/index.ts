import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const reservoir_svg_file: IConfigItem = {
  name: 'reservoir',
  title: '蓄水池',
  type: EDoneJsonType.File,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  display: true,
  props: {
    fill: {
      title: '水流颜色',
      type: EConfigItemPropsType.Color,
      val: '#37cfe7'
    },
    stroke: {
      title: '边框颜色',
      type: EConfigItemPropsType.Color,
      val: '#000'
    }
  },
  common_animations: {
    val: '',
    delay: 'delay-0s',
    speed: 'slow',
    repeat: 'infinite'
  }
};
