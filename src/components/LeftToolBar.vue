
<template>
  <div class="components-layout-left">

    <a-input-search placeholder="搜索组件" />
    <a-collapse v-model:activeKey="activeKey"
                accordion>
      <a-collapse-panel key="1"
                        header="拖动组件">
        <ul class="svg-nav-list">
          <li v-for="item in draggableComponentList"
              :key="item">
            <div class="title">{{item.title}}</div>
            <img :title="item.title"
                 @mousedown="Mousedown(item.type,item.title,item.default_attr,item.create_type)"
                 :src="item.priview_img"
                 draggable="draggable">
          </li>
        </ul>
      </a-collapse-panel>
      <a-collapse-panel key="2"
                        header="绘制组件"
                        :disabled="false">
        <ul class="svg-nav-list">
          <li v-for="item in drawComponentList"
              :key="item"
              :class="$store.state.CurrentlySelectedToolBar.CreateType==item.create_type?'toolbar-selected':''">
            <div class="title">{{item.title}}</div>
            <img :title="item.title"
                 @mousedown="Mousedown(item.type,item.title,item.default_attr,item.create_type)"
                 :src="item.priview_img">
          </li>
        </ul>
      </a-collapse-panel>
      <a-collapse-panel key="3"
                        header="图表">
        <ul class="svg-nav-list">
          <li v-for="item in chartComponentList"
              :key="item">
            <div class="title">{{item.title}}</div>
            <img :title="item.title"
                 @mousedown="Mousedown(item.type,item.title,item.default_attr,item.create_type)"
                 :src="item.priview_img"
                 draggable="draggable">
          </li>
        </ul>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
export default {
  props: ['svgInfoData'],
  data () {
    return {
      activeKey: ['1'],//当前激活的key
      text: `这里是预留位置.`,
      draggableComponentList: [],//拖动组件
      drawComponentList: [],//绘制类型组件
      chartComponentList: [],//图表类型
    };
  },
  watch: {
    'svgInfoData': {
      deep: true,
      handler (val) {
        this.draggableComponentList = val.filter(m => {
          return m.panelclass == 'draggable'
        });
        this.drawComponentList = val.filter(m => {
          return m.panelclass == 'draw'
        });
        this.chartComponentList = val.filter(m => {
          return m.panelclass == 'chart'
        });
      }
    }
  },
  methods: {
    /**
     * @description: 点击左侧工具栏触发函数
     * @param {*} type
     * @param {*} title
     * @param {*} default_attr 属性默认值
     * @param {*} create_type 组件创建方式
     * @return {*}
     */
    Mousedown (type, title, default_attr, create_type) {
      let CurrentlySelectedToolBar = {
        Type: type,//选中的工具栏svg类型
        TypeName: title,//选中的工具栏svg类型名称
        Title: title,//选中的工具栏svg标题
        Color: default_attr.color,//选中的工具栏svg颜色
        CreateType: create_type,//选中工具栏的创建方式
        EChartsOption: default_attr.echarts_option
      };
      this.$store.setCurrentlySelectedToolBarAction(CurrentlySelectedToolBar);
    },
  }
};
</script>
<style>
.components-layout-left .ant-input-search-icon {
  font-size: 20px !important;
  color: #1890ff !important;
}
.components-layout-left .ant-collapse,
.components-layout-left .ant-collapse-content,
.components-layout-left .ant-collapse > .ant-collapse-item {
  border-color: #eee !important;
}
.components-layout-left .ant-collapse-content > .ant-collapse-content-box {
  padding: 16px 0;
}
</style>
<style lang="less" scoped>
.ant-input-affix-wrapper {
  height: 45px;
  line-height: 45px;
  border: none;
}
.svg-nav-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    position: relative;
    width: calc(33.33% - 30px);
    height: 56px;
    margin: 0 15px 15px 15px;
    padding: 0;
    border-radius: 50%;
    box-shadow: 1px 1px 5px #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      box-shadow: 1px 1px 5px #0090ff;
    }

    img {
      display: block;
      width: 100%;
    }

    .title {
      display: none;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      text-align: center;
    }
  }

  &.two-item {
    li {
      width: calc(50% - 30px);
      height: 100px;
      margin-bottom: 25px;
      border-radius: 10px;

      img {
        width: auto;
        height: 100%;
      }
    }
  }
}
.toolbar-selected {
  outline: 1px solid #0cf;
}
</style>