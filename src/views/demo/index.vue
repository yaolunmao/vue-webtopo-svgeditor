<!-- eslint-disable vue/html-indent -->
<template>
  <div>
    <div class="flex justify-center">
      <div>
        <p class="mt-5">webtopo-svg-edit demo演示页面</p>
      </div>
    </div>
    <div class="flex mt-10px justify-center h-[calc(100vh-100px)]">
      <el-button
        type="primary"
        link
        v-for="item in button_list"
        :key="item.name"
        :title="item.title"
        @click="item.onClick"
        style="height: 20px"
        >{{ item.name }}</el-button
      >
    </div>
    <div class="h-40px bottom-el-footer">
      <bottom-panel></bottom-panel>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ElButton } from 'element-plus';
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import BottomPanel from '@/components/webtopo-svg-edit/components/bottom-panel/index.vue';
  const router = useRouter();
  const button_list: IButtonList[] = reactive([
    {
      name: '编辑器页面',
      title: '基础功能之编辑器页面',
      onClick: () => {
        router.push({
          name: 'edit',
          params: {}
        });
      }
    },
    {
      name: '编辑器(加载已有数据)',
      title: '模拟从数据库加载数据',
      onClick: () => {
        router.push({
          name: 'edit-load',
          params: {}
        });
      }
    },
    {
      name: '自定义左侧组件库',
      title: '用自己的组件库替换现有组件库，一般是集成到自己项目时使用',
      onClick: () => {
        router.push({
          name: 'custom-toolbar',
          params: {}
        });
      }
    },
    {
      name: '加载保存好的页面',
      title: '模拟从数据库加载数据',
      onClick: () => {
        router.push({
          name: 'preview-test',
          params: {}
        });
      }
    },
    {
      name: '设置节点属性',
      title: '从插件外部设置节点属性',
      onClick: () => {
        router.push({
          name: 'set-node-attr',
          params: {}
        });
      }
    }
  ]);
  interface IButtonList {
    name: string;
    title: string;
    onClick: () => void;
  }
</script>
<style scoped>
  .bottom-el-footer {
    box-shadow: 0px -1px 0px 0px #dfcfcf;
  }
</style>
