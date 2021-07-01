<template>
  <div class="components-layout-left">

    <a-input-search placeholder="搜索组件" />
    <a-collapse v-model:activeKey="activeKey"
                accordion>
      <a-collapse-panel key="1"
                        header="基本形状">
        <ul class="svg-nav-list">
          <li v-for="item in svgInfoData"
              :key="item">
            <div class="title">{{item.title}}</div>
            <img :title="item.title"
                 @mousedown="Mousedown(item.type,item.title,item.default_color)"
                 :src="item.priview_img"
                 draggable="true">
          </li>
        </ul>
      </a-collapse-panel>
      <a-collapse-panel key="2"
                        header="拓扑图"
                        :disabled="false">
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="3"
                        header="物联网">
        <p>{{ text }}</p>
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
      text: `这里是预留位置.`
    };
  },
  methods: {
    Mousedown (type, title, color) {
      window.CurrentlySelectedToolBar = {
        Type: type,//选中的工具栏svg类型
        TypeName:title,//选中的工具栏svg类型名称
        Title:title,//选中的工具栏svg标题
        Color:color//选中的工具栏svg颜色
      };
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
</style>