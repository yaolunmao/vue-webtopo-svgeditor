<template>
    <n-card title="操作说明" embedded :bordered="false">
    <ul>
        <li>常规组件和图表组件用鼠标左键选中并按住可拖动至画布</li>
        <li>绘制组件需先选中 再将鼠标移至画布中按住左键开始绘制 松开左键结束绘制</li>
        <li>在画布上单击左键并按住可以拖动组件改变位置</li>
        <li>当组件选中时会有选中效果 此时右侧面板弹出 可使用快捷键和编辑右侧面板属性更改组件</li>
        <li>鼠标右键点击组件可以进行一些快捷操作</li>
        <li>键盘↑↓←→可移动选中组件 ctrl+c复制当前选中组件 deleted删除当前选中组件</li>
        <li>ctrl+键盘↑↓←→可移动组件图层</li>
        <li>点击画布空白处可以取消选中组件 并关闭属性面板</li>
        <li>点击《 符号可以显示或隐藏左侧面板</li>
        <li>如果使用我的在线体验地址 请先保存绘制再切换到预览界面</li>
        <li>更多使用帮助请参考<a href="https://github.com/yaolunmao/vue-webtopo-svgeditor">github</a>或<a href="https://gitee.com/yaolunmao/vue-webtopo-svgeditor">gitee</a></li>
    </ul>
    </n-card>
</template>
<script setup lang="ts">
import { NCard } from "naive-ui";
</script>