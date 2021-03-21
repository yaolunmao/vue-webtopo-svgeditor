
<!-- 文字svg组件 -->
<template>
<text :x="0-(fontSize*text.length/2)" :y="fontSize/2" :font-size="fontSize" :fill="color">{{text}}</text>
</template>
<script>
export default {
    props: ['fontSize','color','text'],
};
</script>