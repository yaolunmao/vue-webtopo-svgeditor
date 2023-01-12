import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const circuit_breaker_svg_file: IConfigItem = {
  name: 'circuit-breaker',
  title: '断路器',
  type: EDoneJsonType.File,
  props: {
    fill: {
      title: '填充色',
      type: EConfigItemPropsType.Switch,
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
