<!-- 断路器svg组件 -->
<template>
    <rect :x="-(height/4)" :y="-(height/2)" :width="height/2" :height="height" :fill="color" stroke="#000000" :stroke-width="width" ></rect>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>