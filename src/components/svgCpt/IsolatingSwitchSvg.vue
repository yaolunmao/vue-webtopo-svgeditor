<!-- 隔离开关svg组件 -->
<template>
    <line :x1="0" :y1="0-(height)" :x2="0" :y2="0" fill="none" :stroke="color" :stroke-width="width" ></line>
	<line :x1="0-(height/2)"    :y1="0"    :x2="height/3" :y2="0" fill="none" :stroke="color" :stroke-width="width" ></line>
	<line :x1="0" :y1="height" :x2="-(height/2)"    :y2="height/4" fill="none" :stroke="color" :stroke-width="width"></line>
	<line :x1="0" :y1="height*2" :x2="0" :y2="height" fill="none" :stroke="color" :stroke-width="width" ></line>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>