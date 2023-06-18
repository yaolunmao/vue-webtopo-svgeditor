<script setup lang="ts">
  import { WebtopoSvgEdit } from 'webtopo-svg-edit';
  import 'webtopo-svg-edit/dist/style.css';
  import { ref } from 'vue';
  const setCustomToolBar = ref({
    测试注入组件: [
      {
        groupType: 'element-ui',
        title: 'element-ui',
        list: [
          {
            name: 'el-button',
            tag: 'el-button',
            title: '按钮',
            type: 'Vue',
            config: {
              can_zoom: true,
              have_anchor: true,
              actual_rect: true
            },
            display: true,
            props: {
              size: {
                title: '尺寸',
                type: 'Select',
                val: 'default',
                options: [
                  {
                    label: '大',
                    value: 'large'
                  },
                  {
                    label: '默认',
                    value: 'default'
                  },
                  {
                    label: '小',
                    value: 'small'
                  }
                ]
              },
              type: {
                title: '类型',
                type: 'Select',
                val: 'primary',
                options: [
                  {
                    label: '主要按钮',
                    value: 'primary'
                  },
                  {
                    label: '成功按钮',
                    value: 'success'
                  },
                  {
                    label: '警告按钮',
                    value: 'warning'
                  },
                  {
                    label: '危险按钮',
                    value: 'danger'
                  },
                  {
                    label: '信息按钮',
                    value: 'info'
                  }
                ]
              },
              plain: {
                title: '朴素按钮',
                type: 'Switch',
                val: false
              },
              text: {
                title: '文字按钮',
                type: 'Switch',
                val: false
              }
            },
            tag_slot: '按钮'
          }
        ]
      },
      {
        groupType: 'custom-vue',
        title: '自定义',
        list: [
          {
            name: 'hello-world',
            title: '自带组件',
            tag: 'hello-world',
            type: 'Vue',
            config: {
              can_zoom: true,
              have_anchor: true,
              actual_rect: true
            },
            display: true,
            props: {
              msg: {
                title: 'msg',
                type: 'Input',
                val: '你好，咬轮猫'
              }
            }
          }
        ]
      },
      {
        groupType: 'svg-file',
        title: 'svg文件',
        list: [
          {
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
            },
            common_animations: {
              val: '',
              delay: 'delay-0s',
              speed: 'slow',
              repeat: 'infinite'
            }
          }
        ]
      }
    ]
  });
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
          x: -295,
          y: -95
        },
        svg_position_center: {
          x: 50,
          y: 50
        }
      },
      done_json: [
        {
          id: 'el-buttonAfTY1bUEts',
          x: 398,
          y: 172,
          client: {
            x: 398,
            y: 172
          },
          scale_x: 1,
          scale_y: 1,
          rotate: 0,
          actual_bound: {
            x: 20,
            y: 34,
            width: 60,
            height: 32
          },
          point_coordinate: {
            tl: {
              x: 368,
              y: 156
            },
            tc: {
              x: 398,
              y: 156
            },
            tr: {
              x: 428,
              y: 156
            },
            l: {
              x: 368,
              y: 172
            },
            r: {
              x: 428,
              y: 172
            },
            bl: {
              x: 368,
              y: 188
            },
            bc: {
              x: 398,
              y: 188
            },
            br: {
              x: 428,
              y: 188
            }
          },
          name: 'el-button',
          tag: 'el-button',
          title: '按钮',
          type: 'Vue',
          config: {
            can_zoom: true,
            have_anchor: true,
            actual_rect: true
          },
          display: true,
          props: {
            size: {
              title: '尺寸',
              type: 'Select',
              val: 'default',
              options: [
                {
                  label: '大',
                  value: 'large'
                },
                {
                  label: '默认',
                  value: 'default'
                },
                {
                  label: '小',
                  value: 'small'
                }
              ]
            },
            type: {
              title: '类型',
              type: 'Select',
              val: 'primary',
              options: [
                {
                  label: '主要按钮',
                  value: 'primary'
                },
                {
                  label: '成功按钮',
                  value: 'success'
                },
                {
                  label: '警告按钮',
                  value: 'warning'
                },
                {
                  label: '危险按钮',
                  value: 'danger'
                },
                {
                  label: '信息按钮',
                  value: 'info'
                }
              ]
            },
            plain: {
              title: '朴素按钮',
              type: 'Switch',
              val: false
            },
            text: {
              title: '文字按钮',
              type: 'Switch',
              val: false
            }
          },
          tag_slot: '按钮'
        }
      ]
    })
  );
  const onReturn = () => {
    console.log('点击了返回按钮');
  };
  const onPreview = (data_model: any) => {
    console.log('点击了预览按钮，可以在此处跳转到预览页', data_model);
  };
  const onSave = (data_model: any) => {
    console.log('点击了保存按钮，可以在此处将图存到数据库', data_model);
  };
</script>

<template>
  <div>
    <webtopo-svg-edit
      @on-return="onReturn"
      @on-preview="onPreview"
      @on-save="onSave"
      :custom-tool-bar="setCustomToolBar"
      :data-model="import_model"
    ></webtopo-svg-edit>
  </div>
</template>

<style scoped></style>
