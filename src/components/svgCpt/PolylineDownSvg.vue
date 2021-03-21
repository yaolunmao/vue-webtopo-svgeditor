<!-- 多段线向下svg组件 -->
<template>
    <polyline :points="'0,'+height+' '+(2*height-1)+','+(3*height+1)+' '+(4*height-2)+','+height" fill="none" :stroke="color"  :stroke-width="width" :transform="'translate('+(-(2*height-1))+','+0+')'" ></polyline>
    <polyline :points="'0,'+height+' '+(2*height-1)+','+(3*height+1)+' '+(4*height-2)+','+height" fill="none" :stroke="color"  :stroke-width="width" :transform="'translate('+(-(2*height-1))+','+(height+1)+')'" ></polyline>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>