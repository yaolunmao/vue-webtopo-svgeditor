<!-- 双圆svg组件 -->
<template>
    <ellipse  cx="0" :cy="-height-(height/2)" :rx="height*2" :ry="height*2" fill="none" :stroke="color" :stroke-width="width"></ellipse>
    <ellipse  cx="0" :cy="height+height/2" :rx="height*2" :ry="height*2" fill="none" :stroke="color" :stroke-width="width"></ellipse>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>