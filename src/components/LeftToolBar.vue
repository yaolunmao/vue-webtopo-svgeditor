
<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { ChevronDoubleLeft20Regular, ChevronDoubleRight20Regular } from '@vicons/fluent';
import { NIcon, NCollapse, NCollapseItem, useMessage } from "naive-ui";
import { ILeftImgLists, IComponentInfo } from "../Model";
const emit = defineEmits(['setCreatSvgInfo'])
const message = useMessage();
const props = defineProps({
  left_imglists: {
    type: Object as () => ILeftImgLists,
    default: []
  },
  //选中的左侧工具图标
  select_toolbar: {
    type: String,
    default: ''
  }
});
const leftnav = reactive({
  navclass: 'leftnavDisplay',
  navopen: true
});
const clickHandleIcon = () => {
  leftnav.navopen = !leftnav.navopen;
  leftnav.navclass = leftnav.navclass == 'leftnavDisplay' ? 'leftnavNone' : 'leftnavDisplay'
};
const dragStartEvent = (leftImgItem: IComponentInfo, e: DragEvent) => {
  //设置要创建的svg组件信息
  emit('setCreatSvgInfo', leftImgItem);
}
const dragEndEvent = (leftImgItem: IComponentInfo, e: DragEvent) => {
  //拖动时记录拖动的svg信息
  if (e.dataTransfer?.dropEffect !== 'copy') {
    message.error('请将组件拖到画布中!');
    //清空已选择的信息
    emit('setCreatSvgInfo', {});
    return;
  }
}
</script>
<template>
  <div :class="leftnav.navclass">
    <div class="svgimg" v-show="leftnav.navopen">
      <n-collapse default-expanded-names="1" accordion>
        <n-collapse-item title="常规组件" name="1" style="margin-top: 15px;">
          <ul class="leftImgUl">
            <li v-for="leftImgItem in props.left_imglists.commonComponentList">
              <img
                :title="leftImgItem.title"
                :src="leftImgItem.priview_img"
                draggable="true"
                @dragstart="dragStartEvent(leftImgItem, $event)"
                @dragend="dragEndEvent(leftImgItem, $event)"
              />
            </li>
          </ul>
        </n-collapse-item>
        <n-collapse-item title="绘制组件" name="2">
          <ul class="leftImgUl">
            <li v-for="leftImgItem in props.left_imglists.drawComponentList">
              <img
                :class="props.select_toolbar == leftImgItem.type ? 'svg-selected' : ''"
                :title="leftImgItem.title"
                :src="leftImgItem.priview_img"
                @click="() => { emit('setCreatSvgInfo', leftImgItem) }"
              />
            </li>
          </ul>
        </n-collapse-item>
        <n-collapse-item title="图表组件" name="3">
          <ul class="leftImgUl">
            <li v-for="leftImgItem in props.left_imglists.chartComponentList">
              <img
                :title="leftImgItem.title"
                :src="leftImgItem.priview_img"
                draggable="true"
                @dragstart="dragStartEvent(leftImgItem, $event)"
                @dragend="dragEndEvent(leftImgItem, $event)"
              />
            </li>
          </ul>
        </n-collapse-item>
      </n-collapse>
    </div>
    <div class="handlehidden">
      <n-icon class="handleicon" size="10" @click="clickHandleIcon">
        <chevron-double-left20-regular v-if="leftnav.navopen" />
        <chevron-double-right20-regular v-else />
      </n-icon>
    </div>
  </div>
</template>
<style scoped>
.leftnavDisplay,
.leftnavNone {
  height: 100%;
  display: flex;
}
.leftnavDisplay {
  width: 210px;
}
.leftnavNone {
  width: 10px;
}
.svgimg {
  /* background-color: green; */
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: overlay;
}
.svgimg::-webkit-scrollbar {
  display: none;
}
.handlehidden {
  height: 100%;
  width: 10px;
  background-color: grey;
}
.handleicon {
  top: 50%;
  cursor: pointer;
  position: relative;
}
.leftImgUl {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}
.leftImgUl li {
  width: calc(33.33% - 30px);
  margin: 0 15px 15px 15px;
  padding: 0;
  border-radius: 50%;
  box-shadow: 1px 1px 5px #ddd;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  display: flex;
}
.leftImgUl li :hover {
  box-shadow: 1px 1px 10px #ccc;
  border-radius: 50%;
}
.leftImgUl img {
  width: 100%;
}
.svg-selected {
  outline: 1px solid #0cf;
}
</style>