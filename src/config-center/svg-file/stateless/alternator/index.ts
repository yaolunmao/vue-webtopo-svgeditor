import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const alternator_svg_file: IConfigItem = {
  name: 'alternator',
  title: '发电机',
  type: EDoneJsonType.File,
  props: {
    fill: {
      title: '填充色',
      type: EConfigItemPropsType.Color,
      val: '#ff0000'
    }
  }
};
