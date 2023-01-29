import { IConfigComponentGroup } from '@/config-center/types';

import { custom_vue_common_table } from './common-table';

export const custom_vue_group: IConfigComponentGroup = {
  groupType: 'custom-vue',
  title: '自定义',
  list: [custom_vue_common_table]
};
