<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import SvgEditor from './components/SvgEditor.vue';
import SvgPrview from './components/SvgPrview.vue';
import axios from "axios";
import { ref } from '@vue/reactivity';
const interval = ref<any>(null);
const component_infos = ref([]);
const ref_svgedit = ref();
//要预览的数据
const prview_data = ref<any>([]);
//获取组件列表
axios.get("InterfaceReturn.json").then(res => {
  component_infos.value = res.data;
});
//定义一个变量用来控制演示模式 0为绘制模式 1为预览模式
const displaymode = ref(0);
//定义一个变量用来接收保存的svg数据
const savesvg_data = ref([]);
//定义一个变量用来接收保存的svgdom数据
const savesvg_dom_data: any = ref(null);
//定义一个方法 接收组件保存传过来的数据
const saveSvgInfo = (svg_data: any, svg_dom: any) => {
  savesvg_data.value = svg_data;
  savesvg_dom_data.value = svg_dom;
}
const downloadSvgData = () => {
  if (savesvg_data.value == null) {
    alert('请先保存绘制数据');
    return;
  }
  let datastr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savesvg_data.value))
  let download = document.createElement('a')
  download.setAttribute('href', datastr)
  download.setAttribute('download', `${new Date().getTime()}.json`)
  download.click()
  download.remove();
}
const downloadSvgDomData = () => {
  if (savesvg_dom_data.value == null) {
    alert('请先保存绘制数据');
    return;
  }
  console.log(savesvg_dom_data.value);
  let datastr = 'data:text;charset=utf-8,' + encodeURIComponent(savesvg_dom_data.value.outerHTML);
  let download = document.createElement('a')
  download.setAttribute('href', datastr)
  download.setAttribute('download', `${new Date().getTime()}.html`)
  download.click()
  download.remove()
}
const switchMode = () => {
  displaymode.value = displaymode.value == 0 ? 1 : 0;
  if (displaymode.value == 1) {
    prview_data.value = [];
    setTimeout(() => {
      prview_data.value = savesvg_data.value;
    }, 500);
  }
}
const loadExampleData = () => {
  axios.get("example.json").then(res => {
    clearInterval(interval.value)
    prview_data.value = res.data;
    let temp: Array<any> = [...res.data];
    //模拟硬件工作
    //找出所有断路器
    let anyCircuitBreakerList = temp.filter(f => f.type == 'CircuitBreakerSvg');
    //找出所有的电线开关
    const anyWireBreakList = temp.filter(f => f.type == 'WireBreakSvg');
    //找到所有饼图
    const anyEchartsPieList = temp.filter(f => f.type == 'EchartsPieSvg');
    //找到所有柱状图
    const anyEchartsBasicBarSvgList = temp.filter(f => f.type == 'EchartsBasicBarSvg');
    interval.value = setInterval(function () {
      anyCircuitBreakerList.forEach(anyCircuitBreaker => {
        //生成一个随机数
        let random = Math.round(Math.random() * 10);
        if (random < 5) {
          (anyCircuitBreaker as any).extend_attr.switch.val.selectval = '{\"fill\":\"#FF0000\"}';
        }
        else {
          (anyCircuitBreaker as any).extend_attr.switch.val.selectval = '{\"fill\":\"#00FF00\"}';
        }
      });
      anyWireBreakList.forEach(anyWireBreak => {
        //生成一个随机数
        let random = Math.round(Math.random() * 10);
        if (random < 5) {
          (anyWireBreak as any).extend_attr.switch.val.selectval = '{\"x2\":-10}';
        }
        else {
          (anyWireBreak as any).extend_attr.switch.val.selectval = '{\"x2\":0}';
        }
      });
      anyEchartsPieList.forEach(anyEchartsPie => {
        const temp_val = JSON.parse(anyEchartsPie.extend_attr.echarts_option.val);
        (temp_val.series[0].data as Array<any>).forEach(f => {
          //生成一个随机数
          let random = Math.round(Math.random() * 100);
          f.value = random;
        });
        anyEchartsPie.extend_attr.echarts_option.val = JSON.stringify(temp_val);
      })
      anyEchartsBasicBarSvgList.forEach(anyEchartsBasicBar => {
        let data_arr = [Math.round(Math.random() * 300), Math.round(Math.random() * 300), Math.round(Math.random() * 300), Math.round(Math.random() * 300), Math.round(Math.random() * 300), Math.round(Math.random() * 300), Math.round(Math.random() * 300)];
        const temp_val = JSON.parse(anyEchartsBasicBar.extend_attr.echarts_option.val);
        temp_val.series[0].data = data_arr;
        anyEchartsBasicBar.extend_attr.echarts_option.val = JSON.stringify(temp_val);
      })
      const tempa = JSON.stringify(temp)
      prview_data.value = JSON.parse(tempa);
    }, 2000)
  });
}
const loadExample = (file_name: string) => {
  axios.get(file_name).then(res => {
    console.log(ref_svgedit.value);
    (ref_svgedit.value as any).setSvgLists(res.data);
  })
}
</script>

<template>
  <div style="text-align: center;">
    <span>此处为测试演示用 组件不包含此元素：</span>
    <button class="btn" @click="loadExample('example.json')" v-if="displaymode == 0">电力系统模板</button>
    <button class="btn" @click="loadExample('example2.json')" v-if="displaymode == 0">水务系统模板</button>
    <button class="btn" @click="switchMode">切换到{{ displaymode == 0 ? '预览' : '绘制' }}模式</button>
    <button class="btn" @click="downloadSvgData" v-if="displaymode == 0">下载保存数据</button>
    <button class="btn" @click="downloadSvgDomData" v-if="displaymode == 0">下载svg数据</button>
    <button class="btn" @click="loadExampleData" v-if="displaymode == 1">加载电力模板并模拟硬件工作</button>
  </div>

  <div style="width:1500px;height:650px;margin:0 auto">
    <div v-show="displaymode == 0">
      <svg-editor
        ref="ref_svgedit"
        :component_infos="component_infos"
        @saveSvgInfo="saveSvgInfo"
        :svgCanvas="{ width: 1920, height: 1080 }"
      ></svg-editor>
    </div>
    <div v-show="displaymode != 0">
      <svg-prview
        :component_infos="component_infos"
        :svg_data="prview_data"
        :svgCanvas="{ width: 1920, height: 1080 }"
      ></svg-prview>
    </div>
  </div>
</template>

<style>
.btn {
  margin-left: 1rem;
}
</style>
