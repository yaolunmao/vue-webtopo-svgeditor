<!-- 竖线svg组件 -->
<template>
	<line x1="0" :y1="0-height/2" x2="0" :y2="(0+height)-height/2" fill="none" :stroke="color" :stroke-width="width" />
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>