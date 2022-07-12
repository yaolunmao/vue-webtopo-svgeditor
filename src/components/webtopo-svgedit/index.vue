<template>
  <div>
    <el-container>
      <el-header class="top-el-header">
        <top-panel></top-panel>
      </el-header>
      <el-container class="middle">
        <el-aside class="side-nav" :class="'show-nav'">
          <el-scrollbar class="elscrooll-pc">
            <left-panel class="content-left"></left-panel>
          </el-scrollbar>
        </el-aside>
        <el-main class="middle main">
          <el-scrollbar class="canvas-main-pc">
            <div>
              <center-panel></center-panel>
            </div>
          </el-scrollbar>
        </el-main>
        <el-aside class="side-nav" :class="'show-nav'">
          <el-scrollbar class="elscrooll-pc">
            <right-panel></right-panel>
          </el-scrollbar>
        </el-aside>
      </el-container>
      <el-footer class="bottom-el-footer" height="40px">
        <bottom-panel></bottom-panel>
      </el-footer>
    </el-container>
  </div>
</template>
<script setup lang="ts">
  import { ElContainer, ElHeader, ElAside, ElFooter, ElMain, ElScrollbar } from 'element-plus';
  import 'element-plus/dist/index.css';
  import TopPanel from './components/top-panel/index.vue';
  import LeftPanel from './components/left-panel/index.vue';
  import CenterPanel from './components/center-panel/index.vue';
  import RightPanel from './components/right-panel/index.vue';
  import BottomPanel from './components/bottom-panel/index.vue';
</script>
<style scoped lang="less">
  @headerHeight: 60px;
  @buttomHeight: 40px;
  .elscrooll-pc {
    height: calc(100vh - (@headerHeight + @buttomHeight));
  }

  .canvas-main-pc {
    min-height: calc(100vh - (@headerHeight + @buttomHeight));
    width: 100%;
    margin: 0 auto;
  }
  .middle {
    min-height: calc(100vh - (@headerHeight + @buttomHeight));
    &.main {
      margin: 0px 5px;
      background-color: #ffffff;
      padding: 0px 2px;
    }

    .side-nav {
      @showLeftNavWidth: 240px;
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
