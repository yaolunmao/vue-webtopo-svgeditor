<!--
 * @Author: yaolunmao
-->
<template>
  <component :is="component_prop.type"
             :prop_data= component_prop></component>
</template>
<script>
let importComponents = {};
export default {
  props: ['svgInfoData','component_prop'],
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