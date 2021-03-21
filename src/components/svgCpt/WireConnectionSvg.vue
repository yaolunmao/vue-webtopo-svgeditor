<!-- 电线连接svg组件 -->
<template>
<line  :x1="0" :y1="-(height*8)" :x2="0" :y2="-(3*height)" fill="none" :stroke="color" :stroke-width="width"></line>
<line  :x1="0" :y1="height*3" :x2="0" :y2="-(3*height)" fill="none" :stroke="color" :stroke-width="width"></line>
<line  :x1="0" :y1="height*9" :x2="0" :y2="3*height" fill="none" :stroke="color" :stroke-width="width"></line>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>