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
           :transform="'translate('+(item.svgPositionX)+','+(item.svgPositionY)+')' +'rotate('+item.angle+')'">
          <SvgComponents :svg_color=item.svgColor
                         :svgtype=item.type
                         :svgInfoData=svgInfoData></SvgComponents>
        </g>
      </svg>
    </div>
    <!-- <div class="btns-content">
      <a-button type="primary"
                @click="testF">模拟硬件</a-button>
      <a-button type="primary"
                @click="testG">取消模拟硬件</a-button>
    </div> -->
  </div>
</template>
<script>
import SvgComponents from '@/components/SvgComponents.vue';
export default {
  components: { SvgComponents },
  data () {
    return {
      svgLists: [],
      svgInfoData:[],
      analogDataTimer: '',//模拟数据定时器
      userInfo: '',
      editable: false
    }
  },
  methods: {
    testF () {
      //找出所有断路器
      let anyCircuitBreakerList = this.svgLists.filter(f => f.type == 'CircuitBreakerSvg');
      //找出所有的电线开关
      let anyWireBreakList = this.svgLists.filter(f => f.type == 'WireConnectionSvg' || f.type == 'WireBreakOffSvg');
      //查找所有表格值
      let anyTable = this.svgLists.filter(f => f.type == 'TableSvg')[0];
      let anyTableList;
      if (anyTable == 'undefined' || anyTable == null) {
        anyTableList = [];
      }
      else {
        anyTableList = anyTable.tableData.map(m => m.cols);
      }
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
            anyWireBreak.type = 'WireConnectionSvg';
            anyWireBreak.svgColor = "#FF0000"
          }
          else {
            anyWireBreak.type = 'WireBreakOffSvg';
          }
        });
        anyTableList.forEach(anyTables => {
          anyTables.forEach(anyTable => {
            if (anyTable.type == 'ff85bc7f-3b69-454f-8cf8-21c9f1903dd6' || anyTable.id == 'f8271273-d07d-4033-8b6c-6b52c04fe3e5'
              || anyTable.id == 'dc5931bc-7e8e-47f4-b28e-5bc42fb207da' || anyTable.id == '560f5404-6539-422f-8fb9-77bac641e72b') {
              //生成一个随机数
              let random = Math.round(Math.random() * 100);
              anyTable.val = random;
            }
          });
        });
      }, 2000)

    },
    testG () {
      clearInterval(this.analogDataTimer);
    },
  },
  created () {
    let _this = this;
    _this.svgLists = JSON.parse(localStorage.getItem('svginfo'));
    //请求接口获取组件
    this.$axios.get('/InterfaceReturn.json')
      .then(function (response) {
        _this.svgInfoData = response.data;
        console.log(response.data);
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