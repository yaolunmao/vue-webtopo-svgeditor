import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const el_button_vue: IConfigItem = {
  name: 'el-button',
  tag: 'el-button',
  title: '按钮',
  type: EDoneJsonType.Vue,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  display: true,
  props: {
    size: {
      title: '尺寸',
      type: EConfigItemPropsType.Select,
      val: 'default',
      options: [
        { label: '大', value: 'large' },
        { label: '默认', value: 'default' },
        { label: '小', value: 'small' }
      ]
    },
    type: {
      title: '类型',
      type: EConfigItemPropsType.Select,
      val: 'primary',
      options: [
        { label: '主要按钮', value: 'primary' },
        { label: '成功按钮', value: 'success' },
        { label: '警告按钮', value: 'warning' },
        { label: '危险按钮', value: 'danger' },
        { label: '信息按钮', value: 'info' }
      ]
    },
    plain: {
      title: '朴素按钮',
      type: EConfigItemPropsType.Switch,
      val: false
    },
    text: {
      title: '文字按钮',
      type: EConfigItemPropsType.Switch,
      val: false
    }
  },
  tag_slot: '按钮',
  common_animations: {
    val: '',
    delay: 'delay-0s',
    speed: 'slow',
    repeat: 'infinite'
  }
};
