import { IConfigComponentGroup } from '../types';
import { stateful_group } from './stateful';
import { stateless_group } from './stateless';

export const power_system_config_center: IConfigComponentGroup[] = Object.seal([
  stateful_group,
  stateless_group
]);
