<template>
  <div>
    <el-container>
      <el-header class="top-el-header">
        <top-panel
          @change-visible="changeVisible"
          @on-return="emits('onReturn')"
          @on-preview="(val) => emits('onPreview', val)"
          @on-save="(val) => emits('onSave', val)"
        ></top-panel>
      </el-header>
      <el-container class="middle">
        <el-aside class="side-nav" :class="svgEditLayoutStore.left_nav ? 'show-nav' : 'hide-nav'">
          <el-scrollbar class="elscrooll-pc">
            <left-panel class="content-left" :custom-tool-bar="props.customToolBar"></left-panel>
          </el-scrollbar>
        </el-aside>
        <el-main class="middle main">
          <div class="canvas-main-pc">
            <center-panel></center-panel>
          </div>
        </el-main>
        <el-aside class="side-nav" :class="svgEditLayoutStore.right_nav ? 'show-nav' : 'hide-nav'">
          <el-scrollbar class="elscrooll-pc">
            <right-panel></right-panel>
          </el-scrollbar>
        </el-aside>
      </el-container>
      <el-footer class="bottom-el-footer" height="40px">
        <bottom-panel></bottom-panel>
      </el-footer>
    </el-container>
    <el-dialog v-model="visible_conf.ImportJson" title="导入" width="60%" destroy-on-close>
      <import-json ref="importJsonRef"></import-json>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="onImportJson">确定</el-button>
          <el-button type="primary" @click="visible_conf.ImportJson = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="visible_conf.ExportJson" title="导出" width="60%" destroy-on-close>
      <export-json></export-json>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="visible_conf.ExportJson = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
    <el-drawer
      v-if="visible_conf.ComponentTree"
      v-model="visible_conf.ComponentTree"
      title="组件树"
      direction="ltr"
      size="30%"
    >
      <component-tree></component-tree>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
  import {
    ElContainer,
    ElHeader,
    ElAside,
    ElFooter,
    ElMain,
    ElScrollbar,
    ElDialog,
    ElButton,
    ElDrawer
  } from 'element-plus';
  import 'element-plus/dist/index.css';
  import TopPanel from './components/top-panel/index.vue';
  import LeftPanel from './components/left-panel/index.vue';
  import CenterPanel from './components/center-panel/index.vue';
  import RightPanel from './components/right-panel/index.vue';
  import BottomPanel from './components/bottom-panel/index.vue';
  import { useSvgEditLayoutStore } from '../../store/svgedit-layout';
  import { onMounted, PropType, reactive, ref } from 'vue';
  import ExportJson from '@/components/webtopo-svg-edit/components/export-json/index.vue';
  import ImportJson from '@/components/webtopo-svg-edit/components/import-json/index.vue';
  import ComponentTree from '@/components/webtopo-svg-edit/components/component-tree/index.vue';
  import { IVisibleConf, EVisibleConfKey } from './types';
  import { IConfigCenter } from '@/config-center/types';
  import { useImportDataModel } from '@/hooks';
  import { useGlobalStore } from '@/store/global';
  import { IDoneJson } from '@/store/global/types';
  const props = defineProps({
    customToolBar: {
      type: Object as PropType<IConfigCenter>,
      default: () => {}
    },
    dataModel: {
      type: String,
      default: ''
    }
  });
  const globalStore = useGlobalStore();
  const svgEditLayoutStore = useSvgEditLayoutStore();
  const importJsonRef = ref<InstanceType<typeof ImportJson>>();
  const visible_conf: IVisibleConf = reactive({
    [EVisibleConfKey.ExportJson]: false,
    [EVisibleConfKey.ImportJson]: false,
    [EVisibleConfKey.ComponentTree]: false
  });
  const emits = defineEmits(['onReturn', 'onPreview', 'onSave']);
  const changeVisible = (key: EVisibleConfKey, val: boolean) => {
    visible_conf[key] = val;
  };
  const onImportJson = () => {
    importJsonRef.value?.onImportJson();
    changeVisible(EVisibleConfKey.ImportJson, false);
  };
  const setGraphNodeJson = (done_json: IDoneJson[]) => {
    globalStore.setDoneJson(done_json);
  };
  onMounted(() => {
    if (props.dataModel != '') {
      useImportDataModel(props.dataModel);
    } else {
      globalStore.setDoneJson([]);
    }
  });
  defineExpose({
    setGraphNodeJson
  });
</script>
<style scoped lang="less">
  @headerHeight: 60px;
  @buttomHeight: 40px;
  .elscrooll-pc {
    height: calc(100vh - (@headerHeight + @buttomHeight));
  }

  .canvas-main-pc {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .middle {
    height: calc(100vh - (@headerHeight + @buttomHeight));
    &.main {
      margin: 0px 5px;
      background-color: #ffffff;
      padding: 0px 2px;
    }

    .side-nav {
      @showLeftNavWidth: 260px;
      @hideLeftNavWidth: 0px;
      position: relative;
      overflow: inherit;
      transition: all 0.5s;
      // background-color: rgb(250, 251, 253);
      box-shadow: 0px 0px 2px #dfcfcf;

      .content-left {
        overflow: hidden;
        margin: 0px 1vh;
      }

      &.show-nav {
        flex: 0 0 @showLeftNavWidth;
        min-width: @showLeftNavWidth;
        max-width: @showLeftNavWidth;
      }

      &.hide-nav {
        flex: 0 0 @hideLeftNavWidth;
        min-width: @hideLeftNavWidth;
        max-width: @hideLeftNavWidth;
      }
    }
  }

  .top-el-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0px 0px 2px #dfcfcf;
    margin-bottom: 1px;
    height: 45px;
  }

  .bottom-el-footer {
    box-shadow: 0px -1px 0px 0px #dfcfcf;
    margin-top: 10px;
  }

  .contextMenu {
    position: absolute;
    z-index: 99999;
    background: #ffffff;
    padding: 5px 0;
    margin: 0px;
    display: block;
    border-radius: 5px;
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.3);

    li {
      list-style: none;
      padding: 0px;
      margin: 0px;
    }

    .shortcut {
      width: 115px;
      text-align: right;
      float: right;
    }

    p {
      text-decoration: none;
      display: block;
      padding: 0px 15px 1px 20px;
      margin: 0;
      user-select: none;
      -webkit-user-select: none;
    }

    p:hover {
      background-color: #0cf;
      color: #ffffff;
      cursor: default;
    }

    .disabled {
      color: #999;
    }

    .disabled:hover {
      color: #999;
      background-color: transparent;
    }

    li.separator {
      border-top: solid 1px #e3e3e3;
      padding-top: 5px;
      margin-top: 5px;
    }
  }
</style>
