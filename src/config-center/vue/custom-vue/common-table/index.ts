import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '@/config-center/types';

export const custom_vue_common_table: IConfigItem = {
  name: 'custom-vue-common-table',
  title: '通用表格',
  tag: 'custom-vue-common-table',
  type: EDoneJsonType.Vue,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  props: {
    'col-config': {
      title: '列配置',
      type: EConfigItemPropsType.JsonEdit,
      val: [
        {
          prop: 'date',
          label: '第一列',
          width: '120px',
          fixed: false,
          sortable: false,
          'show-overflow-tooltip': false
        },
        {
          prop: 'name',
          label: '第二列',
          width: '120px',
          fixed: false,
          sortable: false,
          'show-overflow-tooltip': false
        },
        {
          prop: 'address',
          label: '第三列测试',
          width: '280px',
          fixed: false,
          sortable: false,
          'show-overflow-tooltip': false
        }
      ]
    },
    data: {
      title: '表格数据',
      type: EConfigItemPropsType.JsonEdit,
      val: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ]
    },
    height: {
      title: '高度',
      type: EConfigItemPropsType.InputNumber,
      val: null
    },
    'max-height': {
      title: '最大高度',
      type: EConfigItemPropsType.InputNumber,
      val: null
    },
    stripe: {
      title: '斑马纹',
      type: EConfigItemPropsType.Switch,
      val: false
    },
    border: {
      title: '纵向边框',
      type: EConfigItemPropsType.Switch,
      val: false
    },
    size: {
      title: '尺寸',
      type: EConfigItemPropsType.Select,
      val: 'default',
      options: [
        {
          label: '大',
          value: 'large'
        },
        {
          label: '默认',
          value: 'default'
        },
        {
          label: '小',
          value: 'small'
        }
      ]
    },
    fit: {
      title: '列宽自撑开',
      type: EConfigItemPropsType.Switch,
      val: false
    }
  }
};
