import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const traction_transformer_svg_file: IConfigItem = {
  name: 'traction-transformer',
  title: '牵引变',
  type: EDoneJsonType.File,
  props: {
    fill: {
      title: '填充色',
      type: EConfigItemPropsType.Color,
      val: '#ff0000'
    }
  }
};
