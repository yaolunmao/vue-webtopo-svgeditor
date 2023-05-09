import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '@/config-center/types';

export const custom_vue_now_time: IConfigItem = {
  name: 'custom-vue-now-time',
  title: '当前时间',
  tag: 'custom-vue-now-time',
  type: EDoneJsonType.Vue,
  config: {
    can_zoom: true,
    have_anchor: false,
    actual_rect: true
  },
  display: true,
  props: {
    fontColor: {
      title: '文字颜色',
      type: EConfigItemPropsType.Color,
      val: '#000000'
    }
  },
  common_animations: {
    val: '',
    delay: 'delay-0s',
    speed: 'slow',
    repeat: 'infinite'
  }
};
