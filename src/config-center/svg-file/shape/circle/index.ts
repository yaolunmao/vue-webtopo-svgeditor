import { EDoneJsonType, IConfigItem, EConfigAnimationsType } from '@/config-center/types';

export const circle_svg_file: IConfigItem = {
  name: 'circle',
  title: '圆形',
  type: EDoneJsonType.File,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  display: true,
  props: {},
  state: {
    OnOff: {
      title: '开关',
      default: false,
      props: {
        fill: {
          openVal: '#00ff00',
          closeVal: '#ff0000'
        },
        'fill-opacity': {
          openVal: '0',
          closeVal: '1'
        }
      }
    }
  },
  eventAttr: {
    click: {
      custom: true,
      tips: '点击',
      val: "alert('点击了按钮')",
      anonymous_params: [],
      list: []
    }
  },
  triggerList: [
    {
      tag: '',
      max: undefined,
      min: undefined,
      animationsType: EConfigAnimationsType.None
    }
  ]
};
