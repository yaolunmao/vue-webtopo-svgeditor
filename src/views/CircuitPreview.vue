<template>
  <div style="overflow:auto;position: relative;">
    <div class="svg-contain">
      <svg version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink"
           style="background-color:#000000"
           viewBox="0 0 1920 1080"
           width="100%"
           height="100%">
        <defs />
        <g v-for="item in svgLists"
           :key="item"
           :id=item.id
           :title=item.title
           :transform="'translate('+(item.svgPositionX)+','+(item.svgPositionY)+')' +'rotate('+item.angle+')' +'scale('+item.size+')'">
          <SvgComponents :component_prop=item
                         :svgInfoData=svgInfoData></SvgComponents>
        </g>
      </svg>
    </div>
    <div class="btns-content">
      <a-button type="primary"
                @click="testF">模拟硬件</a-button>
      <a-button type="primary"
                @click="testG">取消模拟硬件</a-button>
    </div>
  </div>
</template>
<script>
import SvgComponents from '@/components/SvgComponents.vue';
export default {
  components: { SvgComponents },
  data () {
    return {
      svgLists: [],
      svgInfoData: [],
      analogDataTimer: '',//模拟数据定时器
      userInfo: '',
      editable: false
    }
  },
  methods: {
    /**
     * @description: 此方法仅为演示使用 真正修改组件数据请判断data_type属性
     * @param {*}
     * @return {*}
     */    
    testF () {
      //找出所有断路器
      let anyCircuitBreakerList = this.svgLists.filter(f => f.type == 'CircuitBreakerSvg');
      //找出所有的电线开关
      let anyWireBreakList = this.svgLists.filter(f => f.type == 'WireBreakOnSvg' || f.type == 'WireBreakOffSvg');
      //找到所有饼图
      let anyEchartsPieList = this.svgLists.filter(f => f.type == 'EchartsPieSvg');
      //找到所有柱状图
      let anyEchartsBasicBarSvgList = this.svgLists.filter(f => f.type == 'EchartsBasicBarSvg');
      this.analogDataTimer = setInterval(function () {
        anyCircuitBreakerList.forEach(anyCircuitBreaker => {
          //生成一个随机数
          let random = Math.round(Math.random() * 10);
          if (random < 5) {
            anyCircuitBreaker.svgColor = '#00FF00';
          }
          else {
            anyCircuitBreaker.svgColor = '#FF0000';
          }
        });
        anyWireBreakList.forEach(anyWireBreak => {
          //生成一个随机数
          let random = Math.round(Math.random() * 10);
          if (random < 5) {
            anyWireBreak.type = 'WireBreakOnSvg';
            anyWireBreak.svgColor = "#00FF00"
          }
          else {
            anyWireBreak.type = 'WireBreakOffSvg';
            anyWireBreak.svgColor = "#FF0000"
          }
        });
        anyEchartsPieList.forEach(anyEchartsPie => {
          anyEchartsPie.echartsOption.series[0].data.forEach(f => {
            //生成一个随机数
            let random = Math.round(Math.random() * 100);
            f.value = random;
          });

        })
        anyEchartsBasicBarSvgList.forEach(anyEchartsBasicBar => {
          let data_arr=[Math.round(Math.random() * 300),Math.round(Math.random() * 300),Math.round(Math.random() * 300),Math.round(Math.random() * 300),Math.round(Math.random() * 300),Math.round(Math.random() * 300),Math.round(Math.random() * 300)];
          anyEchartsBasicBar.echartsOption.series[0].data=data_arr;

        })

      }, 2000)

    },
    testG () {
      clearInterval(this.analogDataTimer);
    },
  },
  created () {
    let _this = this;

    //请求接口获取组件
    this.$axios.get('/InterfaceReturn.json')
      .then(function (response) {
        _this.svgInfoData = response.data;
        console.log(response.data);
        //渲染组件
        _this.svgLists = JSON.parse(localStorage.getItem('svginfo'));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}
</script>
<style scoped lang="less">
.svg-contain {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.btns-content {
  position: fixed;
  left: 10px;
  bottom: 10px;
  button {
    margin-right: 10px;
  }
}
</style>