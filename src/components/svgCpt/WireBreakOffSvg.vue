<!-- 电线断开svg组件 -->
<template>
<line  :x1="0" :y1="-(height*8)" :x2="0" :y2="-(3*height)" fill="none" stroke="#00ff00" :stroke-width="width"></line>
<line  :x1="0" :y1="3*height" :x2="-(2*height)" :y2="-(3*height)" fill="none" stroke="#00ff00" :stroke-width="width"></line>
<line  :x1="0" :y1="9*height" :x2="0" :y2="3*height" fill="none" stroke="#00ff00" :stroke-width="width"></line>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>