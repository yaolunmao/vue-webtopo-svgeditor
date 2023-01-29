<template>
  <webtopo-svg-edit
    @on-return="onReturn"
    @on-preview="onPreview"
    @on-save="onSave"
    :custom-tool-bar="setCustomToolBar"
  ></webtopo-svg-edit>
</template>
<script setup lang="ts">
  // import { ref } from 'vue';
  import { IDataModel } from '@/components/webtopo-svg-edit/types';
  import { ref } from 'vue';
  // import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import WebtopoSvgEdit from '../../components/webtopo-svg-edit/index.vue';
  const setCustomToolBar = ref<any>({
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
            name: 'custom-vue-common-table',
            title: '通用表格',
            tag: 'custom-vue-common-table',
            type: 'Vue',
            config: {
              can_zoom: true,
              have_anchor: true,
              actual_rect: true
            },
            display: true,
            props: {
              'col-config': {
                title: '列配置',
                type: 'JsonEdit',
                val: [
                  {
                    prop: 'date',
                    label: '第一列',
                    width: '120px',
                    fixed: false,
                    sortable: false,
                    'show-overflow-tooltip': false
                  },
                  {
                    prop: 'name',
                    label: '第二列',
                    width: '120px',
                    fixed: false,
                    sortable: false,
                    'show-overflow-tooltip': false
                  },
                  {
                    prop: 'address',
                    label: '第三列测试',
                    width: '280px',
                    fixed: false,
                    sortable: false,
                    'show-overflow-tooltip': false
                  }
                ]
              },
              data: {
                title: '表格数据',
                type: 'JsonEdit',
                val: [
                  {
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                  },
                  {
                    date: '2016-05-02',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                  },
                  {
                    date: '2016-05-04',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                  },
                  {
                    date: '2016-05-01',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles'
                  }
                ]
              },
              height: {
                title: '高度',
                type: 'InputNumber',
                val: null
              },
              'max-height': {
                title: '最大高度',
                type: 'InputNumber',
                val: null
              },
              stripe: {
                title: '斑马纹',
                type: 'Switch',
                val: false
              },
              border: {
                title: '纵向边框',
                type: 'Switch',
                val: false
              },
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
              fit: {
                title: '列宽自撑开',
                type: 'Switch',
                val: false
              }
            }
          }
        ]
      }
    ]
  });
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
