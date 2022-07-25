import { EConfigItemPropsType, IConfigItem } from '../../../types';

export const power_system_traction_transformer: IConfigItem = {
  name: 'traction-transformer',
  title: '牵引变',
  props: {
    fill: {
      title: '填充色',
      type: EConfigItemPropsType.Color,
      val: '#ff0000'
    }
  }
};
