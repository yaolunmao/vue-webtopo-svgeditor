import { EConfigItemPropsType, IConfigItem } from '../../../types';

export const power_system_alternator: IConfigItem = {
  name: 'alternator',
  title: '发电机',
  props: {
    fill: {
      title: '填充色',
      type: EConfigItemPropsType.Color,
      val: '#ff0000'
    }
  }
};
