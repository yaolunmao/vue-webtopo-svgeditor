<template>
  <div style="padding: 30px">
    <button @click="change('1')">组件1</button>
    <button @click="change('2')">组件2</button>
    <button @click="change('3')">组件3</button>
    <component :is="componentTag"
               :color= color
               :translate =translate></component>
  </div>
</template>
<script>
// var componentA = {
//   template: `<div style="color:red">我是 {{msg}}</div>`,
//   props: ['msg']
// }
// var componentB = {
//   template: `<div style="color:green">我是 componentB</div>`
// }
// var componentC = {
//   template: `<div style="color:rebeccapurple">我是 componentC</div>`
// }
let importComponents = {};
export default {

  data () {
    return {
      componentTag: '',
      color: '测试颜色',
      translate:'测试坐标'
    }
  },
  components: importComponents,
  methods: {
    change (index) {
      if (index == 1) {
        this.componentTag = 'AlternatorSvg'
      }
      else {
        this.componentTag = 'ArrowDownSvg'
      }

    },
  },
  created () {
    // let _this=this;
    //假如这是接口获取的字符串
    const dataStr = [{
      type: 'AlternatorSvg',
      name: '发电机',
      template: `<ellipse id="c1" cx="50" cy="50" rx="35" ry="35" fill="none" :stroke="color" stroke-width="2" :transform="translate"></ellipse><path id="l1" d="M30,50 C30,44 34,40 40,40 46,40 50,44 50,50 M50,50 C50,56 54,60 60,60 66,60 70,56 70,50 " fill="none" :stroke="color" stroke-width="2" :transform="translate"></path>`,
      props: ['color', 'translate']
    }, {
      typr: 'ArrowDownSvg',
      name: '箭头向下',
      template: `<polygon  points="0,-8 5,0 10,-8" :fill="color" :stroke="color" stroke-width="2" :transform="translate"></polygon>`,
      props: ['color', 'translate']
    }];
    dataStr.forEach(f => {
      let componentInfo = {
        template: f.template,
        props: f.props
      }
      importComponents[f.type] = componentInfo;
    })
  }
}
</script>
<style scoped>
</style>