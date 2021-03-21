<!-- 避雷器svg组件 -->
<template>
<rect  :x="-height" :y="-(height*2)" :width="(height*2+1)" :height="height*5" fill="none" :stroke="color" :stroke-width="width" />
<line  :x1="0" :y1="-(height*3)" :x2="0" :y2="0" fill="none" :stroke="color" :stroke-width="width" />
<line  :x1="0" :y1="(height*3)" :x2="0" :y2="(4*height)" fill="none" :stroke="color" :stroke-width="width" />
<polyline :points="(-1)+','+(-7)+' '+(0)+','+(0)+' '+(1)+','+(-7)" fill="none" :stroke="color" :stroke-width="width"/>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>