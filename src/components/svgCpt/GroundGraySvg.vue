<!-- 接地灰白svg组件 -->
<template>
    <line  :x1="3*height" :y1="3*height" :x2="3*height" y2="0" fill="none" :stroke="color" :stroke-width="width" :transform="'translate('+(-height*3)+','+(-height*2)+')'"></line>
    <line  x1="0" :y1="3*height" :x2="6*height" :y2="3*height" fill="none" :stroke="color" :stroke-width="width" :transform="'translate('+(-height*3)+','+(-height*2)+')'"></line>
    <line  :x1="height" :y1="5*height" :x2="5*height" :y2="5*height" fill="none" :stroke="color" :stroke-width="width" :transform="'translate('+(-height*3)+','+(-height*2)+')'"></line>
    <line  :x1="2*height" :y1="7*height" :x2="4*height" :y2="7*height" fill="none" :stroke="color" :stroke-width="width" :transform="'translate('+(-height*3)+','+(-height*2)+')'"></line>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>