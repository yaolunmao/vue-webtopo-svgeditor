import { IConfigComponentGroup } from '../../types';
import { power_system_circuit_breaker } from './circuit-breaker';

export const stateful_group: IConfigComponentGroup = {
  groupType: 'stateful',
  title: '有状态',
  list: [power_system_circuit_breaker]
};
