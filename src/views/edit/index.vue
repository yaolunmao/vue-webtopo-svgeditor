<template>
  <webtopo-svg-edit
    @on-return="onReturn"
    @on-preview="onPreview"
    @on-save="onSave"
  ></webtopo-svg-edit>
</template>
<script setup lang="ts">
  // import { ref } from 'vue';
  import { IDataModel } from '@/components/webtopo-svg-edit/types';
  // import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import WebtopoSvgEdit from '../../components/webtopo-svg-edit/index.vue';
  // const setCustomToolBar = ref({
  //   测试注入组件: [
  //     {
  //       groupType: 'element-ui',
  //       title: 'element-ui',
  //       list: [
  //         {
  //           name: 'el-button',
  //           tag: 'el-button',
  //           title: '按钮',
  //           type: 'Vue',
  //           config: {
  //             can_zoom: true,
  //             have_anchor: true,
  //             actual_rect: true
  //           },
  //           display: true,
  //           props: {
  //             size: {
  //               title: '尺寸',
  //               type: 'Select',
  //               val: 'default',
  //               options: [
  //                 {
  //                   label: '大',
  //                   value: 'large'
  //                 },
  //                 {
  //                   label: '默认',
  //                   value: 'default'
  //                 },
  //                 {
  //                   label: '小',
  //                   value: 'small'
  //                 }
  //               ]
  //             },
  //             type: {
  //               title: '类型',
  //               type: 'Select',
  //               val: 'primary',
  //               options: [
  //                 {
  //                   label: '主要按钮',
  //                   value: 'primary'
  //                 },
  //                 {
  //                   label: '成功按钮',
  //                   value: 'success'
  //                 },
  //                 {
  //                   label: '警告按钮',
  //                   value: 'warning'
  //                 },
  //                 {
  //                   label: '危险按钮',
  //                   value: 'danger'
  //                 },
  //                 {
  //                   label: '信息按钮',
  //                   value: 'info'
  //                 }
  //               ]
  //             },
  //             plain: {
  //               title: '朴素按钮',
  //               type: 'Switch',
  //               val: false
  //             },
  //             text: {
  //               title: '文字按钮',
  //               type: 'Switch',
  //               val: false
  //             }
  //           },
  //           tag_slot: '按钮'
  //         }
  //       ]
  //     },
  //     {
  //       groupType: 'custom-vue',
  //       title: '自定义',
  //       list: [
  //         {
  //           name: 'custom-vue-common-table',
  //           title: '通用表格',
  //           tag: 'custom-vue-common-table',
  //           type: 'Vue',
  //           config: {
  //             can_zoom: true,
  //             have_anchor: true,
  //             actual_rect: true
  //           },
  //           display: true,
  //           props: {
  //             'col-config': {
  //               title: '列配置',
  //               type: 'JsonEdit',
  //               val: [
  //                 {
  //                   prop: 'date',
  //                   label: '第一列',
  //                   width: '120px',
  //                   fixed: false,
  //                   sortable: false,
  //                   'show-overflow-tooltip': false
  //                 },
  //                 {
  //                   prop: 'name',
  //                   label: '第二列',
  //                   width: '120px',
  //                   fixed: false,
  //                   sortable: false,
  //                   'show-overflow-tooltip': false
  //                 },
  //                 {
  //                   prop: 'address',
  //                   label: '第三列测试',
  //                   width: '280px',
  //                   fixed: false,
  //                   sortable: false,
  //                   'show-overflow-tooltip': false
  //                 }
  //               ]
  //             },
  //             data: {
  //               title: '表格数据',
  //               type: 'JsonEdit',
  //               val: [
  //                 {
  //                   date: '2016-05-03',
  //                   name: 'Tom',
  //                   address: 'No. 189, Grove St, Los Angeles'
  //                 },
  //                 {
  //                   date: '2016-05-02',
  //                   name: 'Tom',
  //                   address: 'No. 189, Grove St, Los Angeles'
  //                 },
  //                 {
  //                   date: '2016-05-04',
  //                   name: 'Tom',
  //                   address: 'No. 189, Grove St, Los Angeles'
  //                 },
  //                 {
  //                   date: '2016-05-01',
  //                   name: 'Tom',
  //                   address: 'No. 189, Grove St, Los Angeles'
  //                 }
  //               ]
  //             },
  //             height: {
  //               title: '高度',
  //               type: 'InputNumber',
  //               val: null
  //             },
  //             'max-height': {
  //               title: '最大高度',
  //               type: 'InputNumber',
  //               val: null
  //             },
  //             stripe: {
  //               title: '斑马纹',
  //               type: 'Switch',
  //               val: false
  //             },
  //             border: {
  //               title: '纵向边框',
  //               type: 'Switch',
  //               val: false
  //             },
  //             size: {
  //               title: '尺寸',
  //               type: 'Select',
  //               val: 'default',
  //               options: [
  //                 {
  //                   label: '大',
  //                   value: 'large'
  //                 },
  //                 {
  //                   label: '默认',
  //                   value: 'default'
  //                 },
  //                 {
  //                   label: '小',
  //                   value: 'small'
  //                 }
  //               ]
  //             },
  //             fit: {
  //               title: '列宽自撑开',
  //               type: 'Switch',
  //               val: false
  //             }
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // });
  // const import_model = ref(
  //   JSON.stringify({
  //     layout_center: {
  //       x: 0,
  //       y: 0
  //     },
  //     config: {
  //       background_color: '#fff',
  //       scale: 1,
  //       position_center: {
  //         x: -295,
  //         y: -95
  //       },
  //       svg_position_center: {
  //         x: 50,
  //         y: 50
  //       }
  //     },
  //     done_json: [
  //       {
  //         id: 'circuit-breakerCuFTG7Iy6F',
  //         x: 474,
  //         y: 226,
  //         client: {
  //           x: 474,
  //           y: 226
  //         },
  //         scale_x: 1,
  //         scale_y: 1,
  //         rotate: 0,
  //         actual_bound: {
  //           x: 23.1640625,
  //           y: 19.375,
  //           width: 61.201171875,
  //           height: 64.033203125
  //         },
  //         point_coordinate: {
  //           tl: {
  //             x: 443.3994140625,
  //             y: 193.9833984375
  //           },
  //           tc: {
  //             x: 474,
  //             y: 193.9833984375
  //           },
  //           tr: {
  //             x: 504.6005859375,
  //             y: 193.9833984375
  //           },
  //           l: {
  //             x: 443.3994140625,
  //             y: 226
  //           },
  //           r: {
  //             x: 504.6005859375,
  //             y: 226
  //           },
  //           bl: {
  //             x: 443.3994140625,
  //             y: 258.0166015625
  //           },
  //           bc: {
  //             x: 474,
  //             y: 258.0166015625
  //           },
  //           br: {
  //             x: 504.6005859375,
  //             y: 258.0166015625
  //           }
  //         },
  //         name: 'circuit-breaker',
  //         title: '断路器',
  //         type: 'File',
  //         config: {
  //           can_zoom: true,
  //           have_anchor: true,
  //           actual_rect: true
  //         },
  //         display: true,
  //         props: {},
  //         state: {
  //           OnOff: {
  //             title: '开关',
  //             default: false,
  //             props: {
  //               fill: {
  //                 openVal: '#00ff00',
  //                 closeVal: '#ff0000'
  //               },
  //               'fill-opacity': {
  //                 openVal: '0',
  //                 closeVal: '1'
  //               }
  //             }
  //           }
  //         }
  //       },
  //       {
  //         id: 'traction-transformer9nzBE9dPxm',
  //         x: 666,
  //         y: 170,
  //         client: {
  //           x: 666,
  //           y: 170
  //         },
  //         scale_x: 1,
  //         scale_y: 1,
  //         rotate: 0,
  //         actual_bound: {
  //           x: 35.416664123535156,
  //           y: 22.916667938232422,
  //           width: 26.858333587646484,
  //           height: 54.16874313354492
  //         },
  //         point_coordinate: {
  //           tl: {
  //             x: 652.5708332061768,
  //             y: 142.91562843322754
  //           },
  //           tc: {
  //             x: 666,
  //             y: 142.91562843322754
  //           },
  //           tr: {
  //             x: 679.4291667938232,
  //             y: 142.91562843322754
  //           },
  //           l: {
  //             x: 652.5708332061768,
  //             y: 170
  //           },
  //           r: {
  //             x: 679.4291667938232,
  //             y: 170
  //           },
  //           bl: {
  //             x: 652.5708332061768,
  //             y: 197.08437156677246
  //           },
  //           bc: {
  //             x: 666,
  //             y: 197.08437156677246
  //           },
  //           br: {
  //             x: 679.4291667938232,
  //             y: 197.08437156677246
  //           }
  //         },
  //         name: 'traction-transformer',
  //         title: '牵引变',
  //         type: 'File',
  //         config: {
  //           can_zoom: true,
  //           have_anchor: true,
  //           actual_rect: true
  //         },
  //         display: true,
  //         props: {
  //           fill: {
  //             title: '填充色',
  //             type: 'Color',
  //             val: '#ff0000'
  //           }
  //         }
  //       }
  //     ]
  //   })
  // );
  const router = useRouter();
  const onReturn = () => {
    console.log('点击了返回按钮');
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
