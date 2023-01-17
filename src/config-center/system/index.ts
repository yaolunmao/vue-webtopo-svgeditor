import { EConfigAnimationsType, EConfigItemPropsType, EDoneJsonType } from '@/config-center/types';
import type { ISystemStraightLine } from './types';

export const straight_line_system: ISystemStraightLine = Object.seal({
  name: 'straight-line',
  title: '直线',
  type: EDoneJsonType.StraightLine,
  config: {
    can_zoom: false,
    have_anchor: false,
    actual_rect: false
  },
  display: true,
  props: {
    fill: {
      title: '填充色',
      type: EConfigItemPropsType.Color,
      val: '#ff0000'
    },
    start_x: {
      title: '起点x坐标',
      type: EConfigItemPropsType.InputNumber,
      val: 0
    },
    start_y: {
      title: '起点y坐标',
      type: EConfigItemPropsType.InputNumber,
      val: 0
    },
    end_x: {
      title: '终点x坐标',
      type: EConfigItemPropsType.InputNumber,
      val: 0
    },
    end_y: {
      title: '终点y坐标',
      type: EConfigItemPropsType.InputNumber,
      val: 0
    }
  },
  bind_anchors: {
    start: null,
    end: null
  }
});
export const connection_line_system: ISystemStraightLine = Object.freeze({
  name: 'connection_line',
  title: '连接线',
  type: EDoneJsonType.ConnectionLine,
  config: {
    can_zoom: false,
    have_anchor: false,
    actual_rect: false
  },
  display: true,
  props: {
    stroke: {
      title: '线条颜色',
      type: EConfigItemPropsType.Color,
      val: '#ff0000'
    },
    'stroke-width': {
      title: '线条宽度',
      type: EConfigItemPropsType.InputNumber,
      val: 2
    },
    point_position: {
      title: '点坐标',
      type: EConfigItemPropsType.JsonEdit,
      val: []
    }
  },
  animations: {
    type: {
      title: '动画类型',
      type: EConfigItemPropsType.Select,
      val: EConfigAnimationsType.None,
      options: [
        {
          label: '无',
          value: EConfigAnimationsType.None
        },
        {
          label: '电流',
          value: EConfigAnimationsType.Electricity
        },
        {
          label: '轨迹',
          value: EConfigAnimationsType.Track
        },
        {
          label: '水珠',
          value: EConfigAnimationsType.WaterDrop
        }
      ]
    },
    dur: { title: '持续时间', type: EConfigItemPropsType.InputNumber, val: 20 },
    repeatCount: {
      title: '循环次数',
      type: EConfigItemPropsType.Input,
      val: 'indefinite',
      disabled: true
    },
    color: { title: '颜色', type: EConfigItemPropsType.Color, val: '#0a7ae2' },
    reverse: { title: '反转动画', type: EConfigItemPropsType.Switch, val: false }
  },
  bind_anchors: {
    start: null,
    end: null
  }
});
