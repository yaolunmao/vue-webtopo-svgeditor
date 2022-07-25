import { EConfigItemPropsType, EConfigItemStateType, IConfigItem } from '../../../types';

export const power_system_circuit_breaker: IConfigItem = {
  name: 'circuit-breaker',
  title: '断路器',
  props: {
    fill: {
      title: '填充色',
      type: EConfigItemPropsType.Color,
      val: '#ff0000'
    }
  },
  state: {
    type: EConfigItemStateType.Switch,
    default: false
  }
};
