<!-- 标准电容器svg组件 -->
<template>
<line  :x1="0" :y1="-(height*4)" :x2="0" :y2="-height" fill="none" :stroke="color" :stroke-width="width"  />
<line  :x1="-(height*3)" :y1="-height" :x2="height*3" :y2="-height" fill="none" :stroke="color" :stroke-width="width" />
<line  :x1="-(height*3)" :y1="height" :x2="height*3" :y2="height" fill="none" :stroke="color" :stroke-width="width" />
<line  :x1="0" :y1="(height*4)" :x2="0" :y2="height" fill="none" :stroke="color" :stroke-width="width" />
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>