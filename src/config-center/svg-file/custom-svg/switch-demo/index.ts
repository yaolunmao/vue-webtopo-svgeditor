import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '@/config-center/types';

export const switch_demo: IConfigItem = {
  name: 'switch-demo',
  title: '开关演示',
  tag: 'switch-demo',
  type: EDoneJsonType.CustomSvg,
  display: true,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  props: {
    isOpen: {
      title: '开关',
      type: EConfigItemPropsType.Switch,
      val: true
    }
  },
  common_animations: {
    val: '',
    delay: 'delay-0s',
    speed: 'slow',
    repeat: 'infinite'
  }
};
