<!-- 横线svg组件 -->
<template>
    <line :x1="-height/2" :y1="0" :x2="(height)-height/2" :y2="0" fill="none" :stroke="color" :stroke-width="width"></line>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>