import { IConfigComponentGroup } from '@/config-center/types';

import { custom_vue_common_table } from './common-table';
import { custom_vue_now_time } from './now-time';

export const custom_vue_group: IConfigComponentGroup = {
  groupType: 'custom-vue',
  title: '自定义',
  list: [custom_vue_common_table, custom_vue_now_time]
};
