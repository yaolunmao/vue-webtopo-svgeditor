import { IConfigComponentGroup } from '../types';
import { stateful_group } from './stateful';
import { stateless_group } from './stateless';
import { have_animation_group } from './have-animation';

export const svgfile_config_center: IConfigComponentGroup[] = Object.seal([
  stateful_group,
  stateless_group,
  have_animation_group
]);
