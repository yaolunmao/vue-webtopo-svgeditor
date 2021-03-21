<!-- 发电机类型svg组件 -->
<template>
<ellipse id="c1" cx="50" cy="50" rx="35" ry="35" fill="none" :stroke="color" :stroke-width="width" :transform="'translate('+(-10*height)+','+(-10*height)+')  scale('+height/5+')'"></ellipse>
<path id="l1" d="M30,50 C30,44 34,40 40,40 46,40 50,44 50,50 M50,50 C50,56 54,60 60,60 66,60 70,56 70,50 " fill="none" :stroke="color" :stroke-width="width" :transform="'translate('+(-10*height)+','+(-10*height)+')scale('+height/5+')'"></path>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>