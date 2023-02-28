import { EConfigItemPropsType, EDoneJsonType, IConfigItem } from '../../../types';

export const alternator_svg_file: IConfigItem = {
  name: 'alternator',
  title: '发电机',
  type: EDoneJsonType.File,
  config: {
    can_zoom: true,
    have_anchor: true,
    actual_rect: true
  },
  display: true,
  props: {
    fill: {
      title: '填充色',
      type: EConfigItemPropsType.Color,
      val: '#00ff00'
    }
  },
  // animations: {
  //   type: {
  //     title: '动画类型',
  //     type: EConfigItemPropsType.Select,
  //     val: EConfigAnimationsType.None,
  //     options: [
  //       {
  //         label: '无',
  //         value: EConfigAnimationsType.None
  //       },
  //       {
  //         label: '旋转',
  //         value: EConfigAnimationsType.Rotate
  //       }
  //     ]
  //   },
  //   dur: { title: '持续时间', type: EConfigItemPropsType.InputNumber, val: 5 },
  //   repeatCount: {
  //     title: '循环次数',
  //     type: EConfigItemPropsType.Input,
  //     val: 'indefinite',
  //     disabled: true
  //   },
  //   reverse: { title: '反转动画', type: EConfigItemPropsType.Switch, val: false }
  // },
  triggerList: []
};
