<template>
    <div style="padding: 10px;display: flex;">
        <img title="基于vue3+ts+svg的web组件编辑器" class="logoimg" src="../assets/logo.png" />
        <span class="logotext">vue-webtopo-svgeditor</span>
        <div style="display: flex;width: 100%;flex-direction: row-reverse;">
            <a href="https://www.cnblogs.com/Hero-/p/14784744.html" target="_blank" class="a-link">
                <n-button text>帮助</n-button>
            </a>
            <a href="https://github.com/yaolunmao/vue-webtopo-svgeditor" target="_blank" class="a-link">
                <n-button text>Github</n-button>
            </a>
            <n-popover trigger="hover">
                <template #trigger>
                    <n-button text class="button-class">v3.0</n-button>
                </template>
                <div>这个点了没什么用 不过会变色</div>
                <div>说实话 这个版本号就是瞎写的 一点都不严谨</div>
            </n-popover>
            <n-button type="primary" class="button-class" @click="() => { emit('saveSvgInfo') }">保存</n-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { NButton, useMessage, NPopover } from "naive-ui";
const message = useMessage();
const emit = defineEmits(['saveSvgInfo']);
defineExpose({
    /**
     * @description: 保存svg结果 父组件调用用
     * @param {*}type 0失败 1成功 2警告
     * @return {*}
     */
    saveSvgInfoRes(type: any) {
        if (type?.code == 0) {
            message.error(type?.msg);
        }
        else if (type?.code == 1) {
            message.success(type?.msg);
        }
        else if (type?.code == 2) {
            message.warning(type?.msg);
        }
    }
})
</script>
<style>
.logoimg {
    height: 2rem;
    min-width: 2rem;
    margin-right: 0.1rem;
    margin-top: 0.2rem;
}
.logotext {
    font-size: 0.8rem;
    font-weight: 700;
    color: #2c3e50;
    margin-top: 0.7rem;
    width: 30%;
}
.a-link {
    text-decoration: none;
    margin-right: 1.5rem;
    align-self: center;
}
.button-class {
    margin-right: 1.5rem;
}
</style>