import { IConfigComponentGroup } from '@/config-center/types';
import { el_button_vue } from './button';
import { el_tag_vue } from './tag';

export const element_ui_group: IConfigComponentGroup = {
  groupType: 'element-ui',
  title: 'element-ui',
  list: [el_button_vue, el_tag_vue]
};
