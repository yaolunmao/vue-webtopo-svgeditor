import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const pie_charts: IConfigItem = {
  name: 'pie-charts',
  tag: 'pie-charts',
  title: '饼图',
  type: EDoneJsonType.Vue,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  display: true,
  props: {
    title: {
      title: '标题',
      type: EConfigItemPropsType.Input,
      val: '默认标题'
    },
    seriesName: {
      title: '详情',
      type: EConfigItemPropsType.Input,
      val: '详情标题'
    },
    seriesData: {
      title: 'legendData',
      type: EConfigItemPropsType.JsonEdit,
      val: [
        {
          value: 1048,
          name: '办公楼A'
        },
        {
          value: 735,
          name: '办公楼B'
        },
        {
          value: 580,
          name: '保安室'
        },
        {
          value: 484,
          name: '地下车库'
        },
        {
          value: 300,
          name: '食堂'
        }
      ]
    }
  }
};
