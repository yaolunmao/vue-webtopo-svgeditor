<!-- 长方形svg组件 -->
<template>
    <rect :x="-(height/6)" :y="-(height/2)" :width="height/3" :height="height" fill="none" :stroke="color" :stroke-width="width" stroke-linecap="round"></rect>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>