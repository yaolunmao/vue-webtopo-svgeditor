import { IConfigComponentGroup } from '../../types';
import { circle_svg_file } from './circle';
import { square_svg_file } from './square';
import { diamond_svg_file } from './diamond';

export const shape_group: IConfigComponentGroup = {
  groupType: 'shape',
  title: '图形',
  list: [circle_svg_file, square_svg_file, diamond_svg_file]
};
