<template>
  <div style="padding: 30px">
    <button @click="change('1')">组件1</button>
    <button @click="change('2')">组件2</button>
    <button @click="change('3')">组件3</button>
    <component :is="componentTag"
               :color=color
               :translate=translate></component>
  </div>
</template>
<script>
var componentA = {
  template: "<div style=\"color:red\">我是 {{color}}</div>",
  props: ["color"]
}
var componentB = {
  template: `<polygon  points="0,-8 5,0 10,-8" :fill="color" :stroke="color" stroke-width="2" :transform="translate"></polygon>`
  , props: ['color', 'translate']
}
var componentC = {
  template: `<div style="color:rebeccapurple">我是 componentC</div>`
}
export default {
  components: { componentA, componentB, componentC },
  data () {
    return {
      componentTag: '',
      color: '测试颜色',
      translate: '测试坐标'
    }
  },

  methods: {
    change (index) {
      console.log(111);
      if (index == 1) {
        this.componentTag = 'componentA'
      }
      else {
        this.componentTag = 'componentB'
      }

    },
  }
}
</script>
<style scoped>
</style>