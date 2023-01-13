import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const circuit_breaker_svg_file: IConfigItem = {
  name: 'circuit-breaker',
  title: '断路器',
  type: EDoneJsonType.File,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  props: {
    fill: {
      title: '开关',
      type: EConfigItemPropsType.Select,
      val: '#ff0000',
      options: [
        {
          value: '#ff0000',
          label: '关'
        },
        {
          value: '#00ff00',
          label: '开'
        }
      ]
    }
  }
};
