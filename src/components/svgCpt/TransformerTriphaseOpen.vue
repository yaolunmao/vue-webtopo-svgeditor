<!-- 电流互感器三相开口 svg组件 -->
<template>
    <ellipse  cx="0" cy="0" :rx="height*5" :ry="height*5" fill="none" :stroke="color" :stroke-width="width" ></ellipse>
    <line  :x1="-height" :y1="-height*3" :x2="-height" :y2="height*3" fill="none" :stroke="color" :stroke-width="width"></line>
    <line  :x1="-height" :y1="-height*3" :x2="height*2" y2="0" fill="none" :stroke="color" :stroke-width="width"></line>
    <line  :x1="height*2" :y1="height" :x2="-height" :y2="height*3" fill="none" :stroke="color" :stroke-width="width"></line>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>