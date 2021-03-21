<!-- 标准电抗类型svg组件 -->
<template>
<path d="M18,63 V36 H33 C33,42 27,51 18,51 9,51 3,42 3,36 3,27 9,21 18,21 V6 V21" fill="none" :stroke="color" :stroke-width="width" :transform="'translate('+(-6*height)+','+(-12*height)+') scale('+height/3+')'"></path>
</template>
<script>
export default {
    props: ['height','color','width'],
};
</script>