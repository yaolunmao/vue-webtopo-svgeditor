import { EConfigItemPropsType, EDoneJsonType } from '@/config-center/types';
import type { ISystemStraightLine } from './types';

export const straight_line_system: ISystemStraightLine = Object.seal({
  name: 'straight-line',
  title: '直线',
  type: EDoneJsonType.StraightLine,
  config: {
    can_zoom: false,
    have_anchor: false
  },
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
    have_anchor: false
  },
  props: {
    fill: {
      title: '填充色',
      type: EConfigItemPropsType.Color,
      val: '#ff0000'
    },
    point_position: {
      title: '点坐标',
      type: EConfigItemPropsType.JsonEdit,
      val: []
    }
  },
  bind_anchors: {
    start: null,
    end: null
  }
});
