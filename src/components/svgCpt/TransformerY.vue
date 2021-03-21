<!-- 电流互感器y svg组件 -->
<template>
    <ellipse  cx="0" cy="0" :rx="height*2" :ry="height*2" fill="none" :stroke="color" :stroke-width="width" ></ellipse>
    <line  :x1="height" :y1="-height" x2="0" y2="0" fill="none" :stroke="color" :stroke-width="width" ></line>
    <line  :x1="-height" :y1="-height" x2="0" y2="0" fill="none" :stroke="color" :stroke-width="width"  ></line>
    <line  x1="0" y1="0" x2="0" :y2="height" fill="none" :stroke="color" :stroke-width="width" ></line>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>