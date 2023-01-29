import { IConfigComponentGroup } from '../../types';
import { alternator_svg_file } from './alternator';
import { traction_transformer_svg_file } from './traction-transformer';
export const stateless_group: IConfigComponentGroup = {
  groupType: 'stateless',
  title: '无状态',
  list: [alternator_svg_file, traction_transformer_svg_file]
};
