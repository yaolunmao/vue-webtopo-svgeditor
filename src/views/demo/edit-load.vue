<template>
  <webtopo-svg-edit
    @on-return="onReturn"
    @on-preview="onPreview"
    @on-save="onSave"
    :data-model="import_model"
  ></webtopo-svg-edit>
</template>
<script setup lang="ts">
  import { IDataModel } from '@/components/webtopo-svg-edit/types';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import WebtopoSvgEdit from '../../components/webtopo-svg-edit/index.vue';
  //我是从数据库获取到的数据
  const import_model = ref(
    JSON.stringify({
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
          id: 'circuit-breakerCuFTG7Iy6F',
          x: 474,
          y: 226,
          client: {
            x: 474,
            y: 226
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
              x: 443.3994140625,
              y: 193.9833984375
            },
            tc: {
              x: 474,
              y: 193.9833984375
            },
            tr: {
              x: 504.6005859375,
              y: 193.9833984375
            },
            l: {
              x: 443.3994140625,
              y: 226
            },
            r: {
              x: 504.6005859375,
              y: 226
            },
            bl: {
              x: 443.3994140625,
              y: 258.0166015625
            },
            bc: {
              x: 474,
              y: 258.0166015625
            },
            br: {
              x: 504.6005859375,
              y: 258.0166015625
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
          id: 'traction-transformer9nzBE9dPxm',
          x: 666,
          y: 170,
          client: {
            x: 666,
            y: 170
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
              x: 652.5708332061768,
              y: 142.91562843322754
            },
            tc: {
              x: 666,
              y: 142.91562843322754
            },
            tr: {
              x: 679.4291667938232,
              y: 142.91562843322754
            },
            l: {
              x: 652.5708332061768,
              y: 170
            },
            r: {
              x: 679.4291667938232,
              y: 170
            },
            bl: {
              x: 652.5708332061768,
              y: 197.08437156677246
            },
            bc: {
              x: 666,
              y: 197.08437156677246
            },
            br: {
              x: 679.4291667938232,
              y: 197.08437156677246
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
        }
      ]
    })
  );
  const router = useRouter();
  const onReturn = () => {
    console.log('点击了返回按钮');
    router.go(-1);
  };
  const onPreview = (data_model: IDataModel) => {
    router.push({
      name: 'preview',
      params: { data_model: JSON.stringify(data_model) }
    });
  };
  const onSave = (data_model: IDataModel) => {
    console.log('点击了保存按钮，可以在此处将图存到数据库', data_model);
  };
</script>
