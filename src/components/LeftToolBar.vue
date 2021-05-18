<template>
  <div class="components-layout-left">

    <a-input-search placeholder="搜索组件"
                    @search="onSearch" />
    <a-collapse v-model:activeKey="activeKey"
                accordion>
      <a-collapse-panel key="1"
                        header="基本形状">
                        
        <ul class="svg-nav-list">
          <li v-for="item in svgInfoData" :key="item">
            <div class="title">{{item.title}}</div>
            <img :title="item.title"
                 @mousedown="Mousedown(item.type,item.title,item.default_color)"
                 :src="item.priview_img"
                 draggable="true">
          </li>
        </ul>
        <!-- <ul class="svg-nav-list">
          <li>
            <div class="title">断路器</div><img title="断路器"
                 @mousedown="Mousedown('CircuitBreakerSvg','断路器','#00FF00',40,0,'',2)"
                 src="../assets/CircuitBreakerSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">竖线</div><img title="竖线"
                 @mousedown="Mousedown('VerticalLineSvg','竖线','#FF0000',150,0,'',2)"
                 src="../assets/VerticalLineSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">文字</div><img title="文字"
                 @mousedown="Mousedown('TextSvg','文字','#FF0000',0,50,'文字')"
                 src="../assets/TextSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">隔离开关</div><img title="隔离开关"
                 @mousedown="Mousedown('IsolatingSwitchSvg','隔离开关','#00FF00',20,0,'',2)"
                 src="../assets/IsolatingSwitchSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">避雷器</div><img title="避雷器"
                 @mousedown="Mousedown('LightningArresterSvg','避雷器','#FF0000',7,0,'',2)"
                 src="../assets/LightningArresterSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">标准电容器</div><img title="标准电容器"
                 @mousedown="Mousedown('StandardCapacitorSvg','标准电容器','#FF0000',3,0,'',2)"
                 src="../assets/StandardCapacitorSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">电线开关</div><img title="电线开关"
                 @mousedown="Mousedown('WireBreakOffSvg','电线开关','#00FF00',5,0,'',2)"
                 src="../assets/WireBreakOffSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">表格</div><img title="表格"
                 @mousedown="Mousedown('TableSvg','表格','#CCCC33')"
                 src="../assets/TableSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">横线</div><img title="横线"
                 @mousedown="Mousedown('HorizontalLineSvg','横线','#FF0000',150,0,'',2)"
                 src="../assets/HorizontalLineSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">多段向上折线</div><img title="多段向上折线"
                 @mousedown="Mousedown('PolylineUpSvg','多段向上折线','#FF0000',7,0,'',2)"
                 src="../assets/PolylineUpSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">多段向下折线</div><img title="多段向下折线"
                 @mousedown="Mousedown('PolylineDownSvg','多段向下折线','#FF0000',7,0,'',2)"
                 src="../assets/PolylineDownSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">箭头向上</div><img title="箭头向上"
                 @mousedown="Mousedown('ArrowUpSvg','箭头向上','#FF0000',2,0,'',2)"
                 src="../assets/ArrowUpSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">箭头向下</div><img title="箭头向下"
                 @mousedown="Mousedown('ArrowDownSvg','箭头向下','#FF0000',2,0,'',2)"
                 src="../assets/ArrowDownSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">接地灰白</div><img title="接地灰白"
                 @mousedown="Mousedown('GroundGraySvg','接地灰白','#CCCCCC',3,0,'',2)"
                 src="../assets/GroundGraySvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">信号灯</div><img title="信号灯"
                 @mousedown="Mousedown('SignalLamp','信号灯','#FF0000',3,0,'',2)"
                 src="../assets/SignalLamp.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">长方形</div><img title="长方形"
                 @mousedown="Mousedown('RectSvg','长方形','#FF0000',30,0,'',2)"
                 src="../assets/RectSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">双圆</div><img title="双圆"
                 @mousedown="Mousedown('TwoCircleSvg','双圆','#FF0000',3,0,'',2)"
                 src="../assets/TwoCircleSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">电流互感器y</div><img title="电流互感器y"
                 @mousedown="Mousedown('TransformerYSvg','电流互感器y','#FF0000',5,0,'',2)"
                 src="../assets/TransformerY.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">三相互感器开口</div><img title="三相互感器开口"
                 @mousedown="Mousedown('TransformerTriphaseOpenSvg','三相互感器开口','#FF0000',2,0,'',2)"
                 src="../assets/TransformerTriphaseOpen.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">双绕组变压器</div><img title="双绕组变压器"
                 @mousedown="Mousedown('DoubleWindingSvg','双绕组变压器','#FF0000',5,0,'',2)"
                 src="../assets/DoubleWindingSvg.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">双绕组变压器B</div><img title="双绕组变压器B"
                 @mousedown="Mousedown('DoubleWindingSvgB','双绕组变压器B','#FF0000',5,0,'',2)"
                 src="../assets/DoubleWindingSvgB.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">电容柜</div><img title="电容柜"
                 @mousedown="Mousedown('GGJSvg','电容柜','#FF6600',1,0,'',2)"
                 src="../assets/GGJ.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">标准电抗</div><img title="标准电抗"
                 @mousedown="Mousedown('StandardReactanceSvg','标准电抗','#CCCC00',3,0,'',2)"
                 src="../assets/StandardReactance.png"
                 draggable="true">
          </li>
          <li>
            <div class="title">发电机</div><img title="发电机"
                 @mousedown="Mousedown('AlternatorSvg','发电机','#FF0000',5,0,'',2)"
                 src="../assets/Alternator.png"
                 draggable="true">
          </li>
        </ul> -->
      </a-collapse-panel>
      <a-collapse-panel key="2"
                        header="拓扑图"
                        :disabled="false">
        <!-- <ul class="svg-nav-list two-item">
          <li>
            <div class="title">智慧终端</div><img title="智慧终端"
                 @mousedown="Mousedown('SmartTerminalSvg','智慧终端','',140,0,'',0)"
                 src="../assets/SmartTerminalSvg.png"
                 draggable="true">
          </li>
        </ul> -->
      </a-collapse-panel>
      <a-collapse-panel key="3"
                        header="物联网">
        <p>{{ text }}</p>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
import global from '@/global/global.js';//全局变量
export default {
  props: ['svgInfoData'],
  data () {
    return {
      activeKey: ['1'],//当前激活的key
      text: `这里是预留位置.`
    };
  },
  methods: {
    Mousedown (type, title, color, height, fontSize, text, width) {
      global.CurrentlySelectedToolBarType = type;
      global.CurrentlySelectedToolBarTypeName = title;
      global.CurrentlySelectedToolBarTitle = title;
      global.CurrentlySelectedToolBarColor = color;
      global.CurrentlySelectedToolBarHeight = height;
      global.CurrentlySelectedToolBarFontSize = fontSize;
      global.CurrentlySelectedToolBarText = text;
      global.CurrentlySelectedToolBarWidth = width;
      // alert(this.$UCore.GenUUid());
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