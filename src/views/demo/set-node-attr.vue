<!-- eslint-disable vue/html-indent -->
<template>
  <div>
    <el-button @click="openTest">打开开关</el-button>
    <el-button @click="closeTest">关闭开关</el-button>
    <webtopo-svg-preview
      ref="svgPreviewRef"
      :data-model="data_model"
      :canvas-drag="true"
    ></webtopo-svg-preview>
  </div>
</template>
<script setup lang="ts">
  import WebtopoSvgPreview from '@/components/webtopo-svg-preview/index.vue';
  import { ElButton } from 'element-plus';
  import { ref } from 'vue';
  const svgPreviewRef = ref<InstanceType<typeof WebtopoSvgPreview>>();
  const data_model = ref<any>({
    layout_center: {
      x: 0,
      y: 0
    },
    config: {
      background_color: '#fff',
      scale: 1,
      position_center: {
        x: -315,
        y: -95
      },
      svg_position_center: {
        x: 50,
        y: 50
      }
    },
    done_json: [
      {
        id: 'circuit-breakerCkjuZ7Ql9C',
        x: 471,
        y: 222,
        client: {
          x: 471,
          y: 222
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
            x: 440.3994140625,
            y: 189.9833984375
          },
          tc: {
            x: 471,
            y: 189.9833984375
          },
          tr: {
            x: 501.6005859375,
            y: 189.9833984375
          },
          l: {
            x: 440.3994140625,
            y: 222
          },
          r: {
            x: 501.6005859375,
            y: 222
          },
          bl: {
            x: 440.3994140625,
            y: 254.0166015625
          },
          bc: {
            x: 471,
            y: 254.0166015625
          },
          br: {
            x: 501.6005859375,
            y: 254.0166015625
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
      }
    ]
  });
  const openTest = () => {
    svgPreviewRef.value
      ?.setNodeAttrByID('circuit-breakerCkjuZ7Ql9C', 'state.OnOff.default', true)
      .then((res) => {
        console.log(res);
      });
  };
  const closeTest = () => {
    svgPreviewRef.value
      ?.setNodeAttrByID('circuit-breakerCkjuZ7Ql9C', 'state.OnOff.default', false)
      .then((res) => {
        console.log(res);
      });
  };
</script>
