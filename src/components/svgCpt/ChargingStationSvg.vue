<!-- 充电站svg组件 -->
<template>
    <image :x="-height/4" :y="-height/2" :width="height/2" :height="height" xlink:href="../../assets/ChargingStationSvg.png"></image>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>