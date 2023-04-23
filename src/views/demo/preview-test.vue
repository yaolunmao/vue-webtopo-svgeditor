<template>
  <webtopo-svg-preview :data-model="data_model" :canvas-drag="true"></webtopo-svg-preview>
</template>
<script setup lang="ts">
  import WebtopoSvgPreview from '@/components/webtopo-svg-preview/index.vue';

  import { ref } from 'vue';
  //假装我是接口返回的
  const data_model = ref<any>({
    layout_center: {
      x: -29,
      y: 17
    },
    config: {
      background_color: '#fff',
      scale: 1,
      position_center: {
        x: -333,
        y: -113
      },
      svg_position_center: {
        x: 50,
        y: 50
      }
    },
    done_json: [
      {
        id: 'circuit-breaker5AWZnim3r6',
        x: 412,
        y: 154,
        client: {
          x: 412,
          y: 154
        },
        scale_x: 1,
        scale_y: 1,
        rotate: 0,
        actual_bound: {
          x: 23.1640625,
          y: 19.375,
          width: 61.201171875,
          height: 64.033203125
        },
        point_coordinate: {
          tl: {
            x: 381.3994140625,
            y: 121.9833984375
          },
          tc: {
            x: 412,
            y: 121.9833984375
          },
          tr: {
            x: 442.6005859375,
            y: 121.9833984375
          },
          l: {
            x: 381.3994140625,
            y: 154
          },
          r: {
            x: 442.6005859375,
            y: 154
          },
          bl: {
            x: 381.3994140625,
            y: 186.0166015625
          },
          bc: {
            x: 412,
            y: 186.0166015625
          },
          br: {
            x: 442.6005859375,
            y: 186.0166015625
          }
        },
        name: 'circuit-breaker',
        title: '断路器',
        type: 'File',
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
        }
      },
      {
        id: 'circuit-breakerCeyE17C7Ib',
        x: 696,
        y: 144,
        client: {
          x: 696,
          y: 144
        },
        scale_x: 1,
        scale_y: 1,
        rotate: 0,
        actual_bound: {
          x: 23.1640625,
          y: 19.375,
          width: 61.201171875,
          height: 64.033203125
        },
        point_coordinate: {
          tl: {
            x: 665.3994140625,
            y: 111.9833984375
          },
          tc: {
            x: 696,
            y: 111.9833984375
          },
          tr: {
            x: 726.6005859375,
            y: 111.9833984375
          },
          l: {
            x: 665.3994140625,
            y: 144
          },
          r: {
            x: 726.6005859375,
            y: 144
          },
          bl: {
            x: 665.3994140625,
            y: 176.0166015625
          },
          bc: {
            x: 696,
            y: 176.0166015625
          },
          br: {
            x: 726.6005859375,
            y: 176.0166015625
          }
        },
        name: 'circuit-breaker',
        title: '断路器',
        type: 'File',
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
        }
      },
      {
        id: 'straight-lineGUyEi2THVC',
        x: 442.6005859375,
        y: 154,
        client: {
          x: 447,
          y: 158
        },
        scale_x: 1,
        scale_y: 1,
        rotate: 0,
        actual_bound: {
          x: 50,
          y: 50,
          width: 0,
          height: 0
        },
        point_coordinate: {
          tl: {
            x: 442.6005859375,
            y: 154
          },
          tc: {
            x: 442.6005859375,
            y: 154
          },
          tr: {
            x: 442.6005859375,
            y: 154
          },
          l: {
            x: 442.6005859375,
            y: 154
          },
          r: {
            x: 442.6005859375,
            y: 154
          },
          bl: {
            x: 442.6005859375,
            y: 154
          },
          bc: {
            x: 442.6005859375,
            y: 154
          },
          br: {
            x: 442.6005859375,
            y: 154
          }
        },
        name: 'connection_line',
        title: '连接线',
        type: 'ConnectionLine',
        config: {
          can_zoom: false,
          have_anchor: false,
          actual_rect: false
        },
        display: true,
        props: {
          stroke: {
            title: '线条颜色',
            type: 'Color',
            val: '#ff0000'
          },
          'stroke-width': {
            title: '线条宽度',
            type: 'InputNumber',
            val: 2
          },
          point_position: {
            title: '点坐标',
            type: 'JsonEdit',
            val: [
              {
                x: 50,
                y: 50
              },
              {
                x: 274,
                y: 39
              }
            ]
          }
        },
        animations: {
          type: {
            title: '动画类型',
            type: 'Select',
            val: 'Electricity',
            options: [
              {
                label: '无',
                value: 'None'
              },
              {
                label: '电流',
                value: 'Electricity'
              },
              {
                label: '轨迹',
                value: 'Track'
              },
              {
                label: '水珠',
                value: 'WaterDrop'
              }
            ]
          },
          dur: {
            title: '持续时间',
            type: 'InputNumber',
            val: 20
          },
          repeatCount: {
            title: '循环次数',
            type: 'Input',
            val: 'indefinite',
            disabled: true
          },
          color: {
            title: '颜色',
            type: 'Color',
            val: '#0a7ae2'
          },
          reverse: {
            title: '反转动画',
            type: 'Switch',
            val: false
          }
        },
        bind_anchors: {
          start: {
            type: 'Right',
            target_id: 'circuit-breaker5AWZnim3r6'
          },
          end: null
        }
      },
      {
        id: 'straight-lineXORecx5dkM',
        x: 665.3994140625,
        y: 144,
        client: {
          x: 671,
          y: 147
        },
        scale_x: 1,
        scale_y: 1,
        rotate: 0,
        actual_bound: {
          x: 50,
          y: 50,
          width: 0,
          height: 0
        },
        point_coordinate: {
          tl: {
            x: 665.3994140625,
            y: 144
          },
          tc: {
            x: 665.3994140625,
            y: 144
          },
          tr: {
            x: 665.3994140625,
            y: 144
          },
          l: {
            x: 665.3994140625,
            y: 144
          },
          r: {
            x: 665.3994140625,
            y: 144
          },
          bl: {
            x: 665.3994140625,
            y: 144
          },
          bc: {
            x: 665.3994140625,
            y: 144
          },
          br: {
            x: 665.3994140625,
            y: 144
          }
        },
        name: 'connection_line',
        title: '连接线',
        type: 'ConnectionLine',
        config: {
          can_zoom: false,
          have_anchor: false,
          actual_rect: false
        },
        display: true,
        props: {
          stroke: {
            title: '线条颜色',
            type: 'Color',
            val: '#ff0000'
          },
          'stroke-width': {
            title: '线条宽度',
            type: 'InputNumber',
            val: 2
          },
          point_position: {
            title: '点坐标',
            type: 'JsonEdit',
            val: [
              {
                x: 50,
                y: 50
              }
            ]
          }
        },
        animations: {
          type: {
            title: '动画类型',
            type: 'Select',
            val: 'None',
            options: [
              {
                label: '无',
                value: 'None'
              },
              {
                label: '电流',
                value: 'Electricity'
              },
              {
                label: '轨迹',
                value: 'Track'
              },
              {
                label: '水珠',
                value: 'WaterDrop'
              }
            ]
          },
          dur: {
            title: '持续时间',
            type: 'InputNumber',
            val: 20
          },
          repeatCount: {
            title: '循环次数',
            type: 'Input',
            val: 'indefinite',
            disabled: true
          },
          color: {
            title: '颜色',
            type: 'Color',
            val: '#0a7ae2'
          },
          reverse: {
            title: '反转动画',
            type: 'Switch',
            val: false
          }
        },
        bind_anchors: {
          start: {
            type: 'Left',
            target_id: 'circuit-breakerCeyE17C7Ib'
          },
          end: null
        }
      },
      {
        id: 'alternator8fWE3IfvWE',
        x: 504,
        y: 398,
        client: {
          x: 504,
          y: 398
        },
        scale_x: 1,
        scale_y: 1,
        rotate: 0,
        actual_bound: {
          x: 22.916664123535156,
          y: 22.91666603088379,
          width: 54.16667175292969,
          height: 54.166664123535156
        },
        point_coordinate: {
          tl: {
            x: 476.91666412353516,
            y: 370.9166679382324
          },
          tc: {
            x: 504,
            y: 370.9166679382324
          },
          tr: {
            x: 531.0833358764648,
            y: 370.9166679382324
          },
          l: {
            x: 476.91666412353516,
            y: 398
          },
          r: {
            x: 531.0833358764648,
            y: 398
          },
          bl: {
            x: 476.91666412353516,
            y: 425.0833320617676
          },
          bc: {
            x: 504,
            y: 425.0833320617676
          },
          br: {
            x: 531.0833358764648,
            y: 425.0833320617676
          }
        },
        name: 'alternator',
        title: '发电机',
        type: 'File',
        config: {
          can_zoom: true,
          have_anchor: true,
          actual_rect: true
        },
        display: true,
        props: {
          fill: {
            title: '填充色',
            type: 'Color',
            val: '#00ff00'
          }
        }
      },
      {
        id: 'straight-lineyNa2CGSIjq',
        x: 412,
        y: 186.0166015625,
        client: {
          x: 419,
          y: 187
        },
        scale_x: 1,
        scale_y: 1,
        rotate: 0,
        actual_bound: {
          x: 50,
          y: 50,
          width: 0,
          height: 0
        },
        point_coordinate: {
          tl: {
            x: 412,
            y: 186.0166015625
          },
          tc: {
            x: 412,
            y: 186.0166015625
          },
          tr: {
            x: 412,
            y: 186.0166015625
          },
          l: {
            x: 412,
            y: 186.0166015625
          },
          r: {
            x: 412,
            y: 186.0166015625
          },
          bl: {
            x: 412,
            y: 186.0166015625
          },
          bc: {
            x: 412,
            y: 186.0166015625
          },
          br: {
            x: 412,
            y: 186.0166015625
          }
        },
        name: 'connection_line',
        title: '连接线',
        type: 'ConnectionLine',
        config: {
          can_zoom: false,
          have_anchor: false,
          actual_rect: false
        },
        display: true,
        props: {
          stroke: {
            title: '线条颜色',
            type: 'Color',
            val: '#ff0000'
          },
          'stroke-width': {
            title: '线条宽度',
            type: 'InputNumber',
            val: 2
          },
          point_position: {
            title: '点坐标',
            type: 'JsonEdit',
            val: [
              {
                x: 50,
                y: 50
              },
              {
                x: 70,
                y: 158
              },
              {
                x: 167,
                y: 96
              },
              {
                x: 113,
                y: 216
              },
              {
                x: 137,
                y: 232
              }
            ]
          }
        },
        animations: {
          type: {
            title: '动画类型',
            type: 'Select',
            val: 'Track',
            options: [
              {
                label: '无',
                value: 'None'
              },
              {
                label: '电流',
                value: 'Electricity'
              },
              {
                label: '轨迹',
                value: 'Track'
              },
              {
                label: '水珠',
                value: 'WaterDrop'
              }
            ]
          },
          dur: {
            title: '持续时间',
            type: 'InputNumber',
            val: 20
          },
          repeatCount: {
            title: '循环次数',
            type: 'Input',
            val: 'indefinite',
            disabled: true
          },
          color: {
            title: '颜色',
            type: 'Color',
            val: '#0a7ae2'
          },
          reverse: {
            title: '反转动画',
            type: 'Switch',
            val: false
          }
        },
        bind_anchors: {
          start: {
            type: 'BottomCenter',
            target_id: 'circuit-breaker5AWZnim3r6'
          },
          end: null
        }
      },
      {
        id: 'straight-line5N22jllLwB',
        x: 504,
        y: 370.9166679382324,
        client: {
          x: 506,
          y: 369
        },
        scale_x: 1,
        scale_y: 1,
        rotate: 0,
        actual_bound: {
          x: 50,
          y: 50,
          width: 0,
          height: 0
        },
        point_coordinate: {
          tl: {
            x: 504,
            y: 370.9166679382324
          },
          tc: {
            x: 504,
            y: 370.9166679382324
          },
          tr: {
            x: 504,
            y: 370.9166679382324
          },
          l: {
            x: 504,
            y: 370.9166679382324
          },
          r: {
            x: 504,
            y: 370.9166679382324
          },
          bl: {
            x: 504,
            y: 370.9166679382324
          },
          bc: {
            x: 504,
            y: 370.9166679382324
          },
          br: {
            x: 504,
            y: 370.9166679382324
          }
        },
        name: 'connection_line',
        title: '连接线',
        type: 'ConnectionLine',
        config: {
          can_zoom: false,
          have_anchor: false,
          actual_rect: false
        },
        display: true,
        props: {
          stroke: {
            title: '线条颜色',
            type: 'Color',
            val: '#ff0000'
          },
          'stroke-width': {
            title: '线条宽度',
            type: 'InputNumber',
            val: 2
          },
          point_position: {
            title: '点坐标',
            type: 'JsonEdit',
            val: [
              {
                x: 50,
                y: 50
              }
            ]
          }
        },
        animations: {
          type: {
            title: '动画类型',
            type: 'Select',
            val: 'None',
            options: [
              {
                label: '无',
                value: 'None'
              },
              {
                label: '电流',
                value: 'Electricity'
              },
              {
                label: '轨迹',
                value: 'Track'
              },
              {
                label: '水珠',
                value: 'WaterDrop'
              }
            ]
          },
          dur: {
            title: '持续时间',
            type: 'InputNumber',
            val: 20
          },
          repeatCount: {
            title: '循环次数',
            type: 'Input',
            val: 'indefinite',
            disabled: true
          },
          color: {
            title: '颜色',
            type: 'Color',
            val: '#0a7ae2'
          },
          reverse: {
            title: '反转动画',
            type: 'Switch',
            val: false
          }
        },
        bind_anchors: {
          start: {
            type: 'TopCenter',
            target_id: 'alternator8fWE3IfvWE'
          },
          end: null
        }
      },
      {
        id: 'traction-transformer4utrZz4hIc',
        x: 803,
        y: 326,
        client: {
          x: 803,
          y: 326
        },
        scale_x: 1,
        scale_y: 1,
        rotate: 0,
        actual_bound: {
          x: 35.416664123535156,
          y: 22.916667938232422,
          width: 26.858333587646484,
          height: 54.16874313354492
        },
        point_coordinate: {
          tl: {
            x: 789.5708332061768,
            y: 298.91562843322754
          },
          tc: {
            x: 803,
            y: 298.91562843322754
          },
          tr: {
            x: 816.4291667938232,
            y: 298.91562843322754
          },
          l: {
            x: 789.5708332061768,
            y: 326
          },
          r: {
            x: 816.4291667938232,
            y: 326
          },
          bl: {
            x: 789.5708332061768,
            y: 353.08437156677246
          },
          bc: {
            x: 803,
            y: 353.08437156677246
          },
          br: {
            x: 816.4291667938232,
            y: 353.08437156677246
          }
        },
        name: 'traction-transformer',
        title: '牵引变',
        type: 'File',
        config: {
          can_zoom: true,
          have_anchor: true,
          actual_rect: true
        },
        display: true,
        props: {
          fill: {
            title: '填充色',
            type: 'Color',
            val: '#ff0000'
          }
        }
      },
      {
        id: 'straight-lineRNS1ttG2xy',
        x: 696,
        y: 176.0166015625,
        client: {
          x: 696,
          y: 176.0166015625
        },
        scale_x: 1,
        scale_y: 1,
        rotate: 0,
        actual_bound: {
          x: 50,
          y: 50,
          width: 0,
          height: 0
        },
        point_coordinate: {
          tl: {
            x: 617,
            y: 20.5166015625
          },
          tc: {
            x: 696,
            y: 20.5166015625
          },
          tr: {
            x: 775,
            y: 20.5166015625
          },
          l: {
            x: 617,
            y: 176.0166015625
          },
          r: {
            x: 775,
            y: 176.0166015625
          },
          bl: {
            x: 617,
            y: 331.5166015625
          },
          bc: {
            x: 696,
            y: 331.5166015625
          },
          br: {
            x: 775,
            y: 331.5166015625
          }
        },
        name: 'connection_line',
        title: '连接线',
        type: 'ConnectionLine',
        config: {
          can_zoom: false,
          have_anchor: false,
          actual_rect: false
        },
        display: true,
        props: {
          stroke: {
            title: '线条颜色',
            type: 'Color',
            val: '#ff0000'
          },
          'stroke-width': {
            title: '线条宽度',
            type: 'InputNumber',
            val: 2
          },
          point_position: {
            title: '点坐标',
            type: 'JsonEdit',
            val: [
              {
                x: 50,
                y: 50
              },
              {
                x: 204,
                y: 47
              },
              {
                x: 46,
                y: 291
              },
              {
                x: 188,
                y: 358
              }
            ]
          }
        },
        animations: {
          type: {
            title: '动画类型',
            type: 'Select',
            val: 'WaterDrop',
            options: [
              {
                label: '无',
                value: 'None'
              },
              {
                label: '电流',
                value: 'Electricity'
              },
              {
                label: '轨迹',
                value: 'Track'
              },
              {
                label: '水珠',
                value: 'WaterDrop'
              }
            ]
          },
          dur: {
            title: '持续时间',
            type: 'InputNumber',
            val: 20
          },
          repeatCount: {
            title: '循环次数',
            type: 'Input',
            val: 'indefinite',
            disabled: true
          },
          color: {
            title: '颜色',
            type: 'Color',
            val: '#0a7ae2'
          },
          reverse: {
            title: '反转动画',
            type: 'Switch',
            val: false
          }
        },
        bind_anchors: {
          start: {
            type: 'BottomCenter',
            target_id: 'circuit-breakerCeyE17C7Ib'
          },
          end: null
        }
      },
      {
        id: 'reservoirrFSCTkvgJx',
        x: 838,
        y: 529,
        client: {
          x: 838,
          y: 529
        },
        scale_x: 1,
        scale_y: 1,
        rotate: 0,
        actual_bound: {
          x: 8.310546875,
          y: 12.607422828674316,
          width: 83.37890625,
          height: 76.37694549560547
        },
        point_coordinate: {
          tl: {
            x: 796.310546875,
            y: 490.81152725219727
          },
          tc: {
            x: 838,
            y: 490.81152725219727
          },
          tr: {
            x: 879.689453125,
            y: 490.81152725219727
          },
          l: {
            x: 796.310546875,
            y: 529
          },
          r: {
            x: 879.689453125,
            y: 529
          },
          bl: {
            x: 796.310546875,
            y: 567.1884727478027
          },
          bc: {
            x: 838,
            y: 567.1884727478027
          },
          br: {
            x: 879.689453125,
            y: 567.1884727478027
          }
        },
        name: 'reservoir',
        title: '蓄水池',
        type: 'File',
        config: {
          can_zoom: true,
          have_anchor: true,
          actual_rect: true
        },
        display: true,
        props: {
          fill: {
            title: '水流颜色',
            type: 'Color',
            val: '#37cfe7'
          },
          stroke: {
            title: '边框颜色',
            type: 'Color',
            val: '#000'
          }
        }
      },
      {
        id: 'pie-chartsAKReNdbYgt',
        x: 1174,
        y: 355,
        client: {
          x: 1174,
          y: 355
        },
        scale_x: 4.26,
        scale_y: 1,
        rotate: 0,
        actual_bound: {
          x: 0,
          y: -150,
          width: 100,
          height: 400
        },
        point_coordinate: {
          tl: {
            x: 266.62,
            y: 155
          },
          tc: {
            x: 1174,
            y: 155
          },
          tr: {
            x: 2081.38,
            y: 155
          },
          l: {
            x: 266.62,
            y: 355
          },
          r: {
            x: 2081.38,
            y: 355
          },
          bl: {
            x: 266.62,
            y: 555
          },
          bc: {
            x: 1174,
            y: 555
          },
          br: {
            x: 2081.38,
            y: 555
          }
        },
        name: 'pie-charts',
        tag: 'pie-charts',
        title: '饼图',
        type: 'Vue',
        config: {
          can_zoom: true,
          have_anchor: true,
          actual_rect: true
        },
        display: true,
        props: {
          title: {
            title: '标题',
            type: 'Input',
            val: '默认标题'
          },
          seriesName: {
            title: '详情',
            type: 'Input',
            val: '详情标题'
          },
          seriesData: {
            title: 'legendData',
            type: 'JsonEdit',
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
      }
    ]
  });
</script>
