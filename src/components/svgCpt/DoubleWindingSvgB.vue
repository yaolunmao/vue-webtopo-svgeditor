<!-- 双绕组变压器B类型svg组件 -->
<template>
<ellipse  cx="0" :cy="-height*4" :rx="height*5" :ry="height*5" fill="none" :stroke="color" :stroke-width="width" ></ellipse>
<ellipse  cx="0" :cy="height*4" :rx="height*5" :ry="height*5" fill="none" :stroke="color" :stroke-width="width" ></ellipse>
<polygon  :points="height*2+','+height*6+' '+0+','+height*2 +''+(-height*2)+','+height*6" fill="none" :stroke="color"  :stroke-width="width" ></polygon>
<line  x1="0" :y1="-height*4" x2="0" :y2="-height*7" fill="none" :stroke="color"  :stroke-width="width" ></line>
<line  x1="0" :y1="-height*4" :x2="height*2" :y2="-height*2" fill="none" :stroke="color"  :stroke-width="width" ></line>
<line  x1="0" :y1="-height*4" :x2="-height*2" :y2="-height*2" fill="none" :stroke="color"  :stroke-width="width" ></line>

</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>