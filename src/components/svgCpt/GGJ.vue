<!-- 电容柜类型svg组件 -->
<template>
<line  :x1="0.5*height" :y1="-25*height" :x2="-9.5*height" :y2="-13*height" fill="none" :stroke="color" :stroke-width="width" ></line>
<line  :x1="-0.5*height" :y1="-26*height" :x2="9.5*height" :y2="-13*height" fill="none" :stroke="color" :stroke-width="width" ></line>
<line  :x1="-12*height" :y1="-17*height" :x2="-6*height" :y2="-8*height" fill="none" :stroke="color" :stroke-width="width"></line>
<line  :x1="-15*height" :y1="-12*height" :x2="-11*height" :y2="-3*height" fill="none" :stroke="color" :stroke-width="width"></line>
<polyline  :points="(-13*height)+','+(-8*height)+' '+(-22*height)+','+(3*height)+' '+(-22*height)+','+(5*height)" fill="none" :stroke="color" :stroke-width="width" ></polyline>
<line :x1="-21*height" :y1="4*height" :x2="-4*height" :y2="4*height" fill="none" :stroke="color" :stroke-width="width" ></line>
<line :x1="-5*height" :y1="-2*height" :x2="-5*height" :y2="11*height" fill="none" :stroke="color" :stroke-width="width" ></line>
<line :x1="3*height" :y1="-2*height" :x2="3*height" :y2="11*height" fill="none" :stroke="color" :stroke-width="width" ></line>
<line :x1="4*height" :y1="4*height" :x2="21*height" :y2="4*height" fill="none" :stroke="color" :stroke-width="width" ></line>
<polyline  :points="(13*height)+','+(-8*height)+' '+(22*height)+','+(3*height)+' '+(22*height)+','+(5*height)" fill="none" :stroke="color" :stroke-width="width" ></polyline>
<line  :x1="14*height" :y1="-12*height" :x2="8*height" :y2="-3*height" fill="none" :stroke="color" :stroke-width="width"></line>
<line  :x1="12*height" :y1="-17*height" :x2="6*height" :y2="-8*height" fill="none" :stroke="color" :stroke-width="width"></line>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>