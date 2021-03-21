<!-- 信号灯svg组件 -->
<template>
    <ellipse  :cx="2*height+1" :cy="7*height+1" :rx="4*height" :ry="4*height" fill="none" :stroke="color" :stroke-width="width" :transform="'translate('+(-(2*height+1))+','+(-(7*height+1))+')'" ></ellipse>
    <line  :x1="(-height+3)" :y1="10*height" :x2="5*height" :y2="5*height" fill="none" :stroke="color" :stroke-width="width" :transform="'translate('+(-(2*height+1))+','+(-(7*height+1))+')'" ></line>
    <line  :x1="5*height" :y1="10*height" :x2="(-height+3)" :y2="5*height" fill="none" :stroke="color" :stroke-width="width" :transform="'translate('+(-(2*height+1))+','+(-(7*height+1))+')'"></line>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>