import { IConfigComponentGroup } from '../types';
import { stateful_group } from './stateful';
import { stateless_group } from './stateless';
import { have_animation_group } from './have-animation';
import { custom_svg_group } from '../custom-svg';

export const svgfile_config_center: IConfigComponentGroup[] = Object.seal([
  stateful_group,
  stateless_group,
  have_animation_group,
  custom_svg_group
]);
