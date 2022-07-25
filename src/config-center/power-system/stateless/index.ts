import { IConfigComponentGroup } from '../../types';
import { power_system_alternator } from './alternator';
import { power_system_traction_transformer } from './traction-transformer';
export const stateless_group: IConfigComponentGroup = {
  groupType: 'stateless',
  title: '无状态',
  list: [power_system_alternator, power_system_traction_transformer]
};
