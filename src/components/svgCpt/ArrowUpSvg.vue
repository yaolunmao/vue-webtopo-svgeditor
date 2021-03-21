<!-- 箭头向上svg组件 -->
<template>
    <polygon  points="0,8 5,0 10,8" :fill="color" :stroke="color" :stroke-width="height" :transform="'translate('+(-5)+','+0+')'"></polygon>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>