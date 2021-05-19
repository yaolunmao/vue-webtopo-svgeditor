<template>
  <component :is="svgtype"
             :svg_color= svg_color></component>
</template>
<script>
let importComponents = {};
export default {
  props: ['svgInfoData','svg_color','svgtype'],
  data () {
    return {
      componentTag: ''
    }
  },
  components: importComponents,
  methods: {

  },
  created () {
    this.svgInfoData.forEach(f => {
      console.log(111);
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