import { IConfigComponentGroup } from '../../types';
import { circle_svg_file } from './circle';
import { square_svg_file } from './square';
import { diamond_svg_file } from './diamond';
import { shapeCylinder_svg_file } from './shapeCylinder';
import { shapeArrow_svg_file } from './shapeArrow';
import { shapeTrape_svg_file } from './shapeTrape';

export const shape_group: IConfigComponentGroup = {
  groupType: 'shape',
  title: '图形',
  list: [
    circle_svg_file,
    square_svg_file,
    diamond_svg_file,
    shapeCylinder_svg_file,
    shapeArrow_svg_file,
    shapeTrape_svg_file
  ]
};
