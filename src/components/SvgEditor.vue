<script setup lang="ts">
import { computed, reactive, Ref, ref, watch } from 'vue';
import TopToolBar from './TopBar.vue';
import LeftToolBar from './LeftToolBar.vue';
import RightToolBar from './RightToolBar.vue';
import BottomBar from './BottomBar.vue';
import { NMessageProvider } from "naive-ui";
import { IComponentInfo, ISvgDataLists, ISvgCanvas, ILeftImgLists, IMouseInfo, ISelectSvg } from "../Model";
import SvgDynamic from "./SvgDynamic.vue";
import  "../assets/css/svgAnimation/index.css";
const emit = defineEmits(['saveSvgInfo'])
const props = defineProps({
  //组件的json格式
  component_infos: {
    type: Array as () => Array<IComponentInfo>,
    required: true,
    default: []
  },
  svgCanvas: {
    type: Object as () => ISvgCanvas,
    default: { width: 1520, height: 720 }
  }
});
const svg_dom_ref = ref<null | HTMLElement>(null);
const svgLists: ISvgDataLists[] = reactive([]);
const topbar_dom_ref = ref(null);
const set_svg_info: Ref<ISvgDataLists> = ref({
  id: '', title: '', svgPositionX: 0, svgPositionY: 0
});
//选中的svg
const select_svg: ISelectSvg = reactive({
  id: '',
  index: 0,
  sPositionX: 0,
  sPositionY: 0,
  create_type: ''
});
//选中的左侧工具栏的svg
const select_lefttool: Ref<IComponentInfo> = ref({});
//左侧工具栏svg列表
const leftimg_lists: Ref<ILeftImgLists> = ref({
  commonComponentList: [],
  drawComponentList: [],
  chartComponentList: []
});
//选中的左侧工具栏
const select_toolbar: Ref<string | undefined> = ref('');
//记录鼠标信息
const mouseInfo: IMouseInfo = reactive({
  status: 0,
  mPositionX: 0,
  mPositionY: 0
});
const rightnav_open = ref(false);
/**
 * @description: 从左侧工具栏拖动组件到画布触发的事件
 * @param {*}
 * @return {*}
 */
const dropEvent = (e: DragEvent) => {
  //当左侧工具栏拖动到此处时在画布上创建该组件
  if (Object.keys(select_lefttool.value).length < 1) {
    //未选择任何组件
    return;
  }
  //在鼠标位置创建当前组件
  const create_svg: ISvgDataLists = {
    id: `${new Date().getTime()}`,
    type: select_lefttool.value.type,
    title: select_lefttool.value.title,
    svgPositionX: e.offsetX,
    svgPositionY: e.offsetY,
    angle: 0,
    size: 1,
    extend_attr: JSON.parse(JSON.stringify(select_lefttool.value.extend_attr))
  }
  svgLists.push(create_svg);
  //清空左侧工具选中
  select_lefttool.value = {};

}
const dragEnterEvent = (e: DragEvent) => {
  //dragenter和dragover一定要阻止浏览器默认行为 不然不会触发drop
  rightnav_open.value = false;
  e.preventDefault();
}
const dragOverEvent = (e: DragEvent) => {
  //dragenter和dragover一定要阻止浏览器默认行为 不然不会触发drop
  e.preventDefault();
}
/**
 * @description: 设置要创建组件的信息
 * @param {*} createsvg_info 选中的组件信息
 * @return {*}
 */
const setCreatSvgInfo = (createsvg_info: IComponentInfo) => {
  select_lefttool.value = createsvg_info;
  select_toolbar.value = createsvg_info.type;
}
/**
 * @description: 保存绘制组件后的数据和svgdom
 * @param {*}
 * @return {*}
 */
const saveSvgInfo = () => {
  if (svgLists.length == 0) {
    (topbar_dom_ref.value as any).saveSvgInfoRes({ code: 2, msg: '请先绘制图像!' });
    return;
  }
  (topbar_dom_ref.value as any).saveSvgInfoRes(svgLists.length > 0 ? { code: 1, msg: '保存成功!' } : { code: 0, msg: '保存失败!' });
  emit('saveSvgInfo', svgLists, svg_dom_ref.value)
}
/**
 * @description: 鼠标点击画布上svg触发事件
 * @param {*}
 * @return {*}
 */
const mouseDownEvent = (selectsvg: ISvgDataLists, index: number, e: MouseEvent) => {
  e.preventDefault();
  e.cancelBubble = true;
  //清空左侧工具选中
  select_lefttool.value = {};
  //鼠标在画布上的组件按下记录选中的组件信息和鼠标位置信息等
  ({ id: select_svg.id, svgPositionX: select_svg.sPositionX, svgPositionY: select_svg.sPositionY } = selectsvg);
  rightnav_open.value = false;
  select_svg.index = index;
  select_svg.create_type = "draggable"
  mouseInfo.status = 1;
  mouseInfo.mPositionX = e.clientX;
  mouseInfo.mPositionY = e.clientY;
}
const mouseMoveEvent = (e: MouseEvent) => {
  //如果鼠标不是按下状态或者没有选择组件
  if (mouseInfo.status != 1 || !select_svg.id) {
    return;
  }
  const { clientX, clientY } = e;
  if (select_svg.create_type == "draggable") {
    let new_select_svg = { ...select_svg };
    new_select_svg.sPositionX += clientX - mouseInfo.mPositionX;
    new_select_svg.sPositionY += clientY - mouseInfo.mPositionY;
    //更新视图
    ({ sPositionX: svgLists[select_svg.index].svgPositionX, sPositionY: svgLists[select_svg.index].svgPositionY } = new_select_svg);
  }
  else if (select_svg.create_type == "draw") {
    //拓展属性里未配置的属性不进行赋值
    if (svgLists[select_svg.index].extend_attr?.startpoint_x?.val != null) {
      svgLists[select_svg.index].extend_attr.startpoint_x.val = 0;
    }
    if (svgLists[select_svg.index].extend_attr?.startpoint_y?.val != null) {
      svgLists[select_svg.index].extend_attr.startpoint_y.val = 0;
    }
    if (svgLists[select_svg.index].extend_attr?.endpoint_x?.val != null) {
      svgLists[select_svg.index].extend_attr.endpoint_x.val = clientX - mouseInfo.mPositionX;
    }
    if (svgLists[select_svg.index].extend_attr?.endpoint_y?.val != null) {
      svgLists[select_svg.index].extend_attr.endpoint_y.val = clientY - mouseInfo.mPositionY;
    }
  }

}
const mouseUpEvent = (e: MouseEvent) => {
  //如果鼠标不是按下状态或者没有选择组件
  if (mouseInfo.status != 1 || !select_svg.id) {
    return;
  }
  mouseInfo.status = 0;
  rightnav_open.value = true;
  set_svg_info.value = svgLists[select_svg.index];
  //清空左侧工具选中
  select_lefttool.value = {};
  select_toolbar.value = '';

}
/**
 * @description: 鼠标点击画布
 * @param {*}
 * @return {*}
 */
const mouseDownCanvasEvent = (e: MouseEvent) => {
  //判断当前是否有选中的工具栏
  if (Object.keys(select_lefttool.value).length < 1) {
    rightnav_open.value = false;
    select_svg.id = '';
    return;
  }
  //在当前位置创建要绘制的组件
  const create_svg: ISvgDataLists = {
    id: `${new Date().getTime()}`,
    type: select_lefttool.value.type,
    title: select_lefttool.value.title,
    svgPositionX: e.offsetX,
    svgPositionY: e.offsetY,
    angle: 0,
    size: 1,
    extend_attr: JSON.parse(JSON.stringify(select_lefttool.value.extend_attr))//这个响应式对象我治不了了 所以只能写两次转换
  }
  svgLists.push(create_svg);
  //设置全局选中的组件信息
  ({ id: select_svg.id, svgPositionX: select_svg.sPositionX, svgPositionY: select_svg.sPositionY } = create_svg);
  rightnav_open.value = false;
  select_svg.index = svgLists.length - 1;
  select_svg.create_type = "draw"
  mouseInfo.status = 1;
  mouseInfo.mPositionX = e.clientX;
  mouseInfo.mPositionY = e.clientY;
}
watch(() => [...props.component_infos], (newval, oldval) => {
  leftimg_lists.value = {
    commonComponentList: newval.filter(f => f.panel_class == 'common'),
    drawComponentList: newval.filter(f => f.panel_class == 'draw'),
    chartComponentList: newval.filter(f => f.panel_class == 'chart')
  };
});
//监听键盘
document.onkeydown = function (e) {
  //如果没选中组件
  if (!select_svg.id) {
    return;
  }
  if (e.key == 'ArrowUp') {
    e.preventDefault();
    svgLists[select_svg.index].svgPositionY -= 1;
  } else if (e.key == 'ArrowDown') {
    e.preventDefault();
    svgLists[select_svg.index].svgPositionY += 1;
  } else if (e.key == 'ArrowLeft') {
    e.preventDefault();
    svgLists[select_svg.index].svgPositionX -= 1;
  } else if (e.key == 'ArrowRight') {
    e.preventDefault();
    svgLists[select_svg.index].svgPositionX += 1;
  }
  //ctrl  c
  else if (e.ctrlKey && e.key.toLowerCase() == 'c') {
    e.preventDefault();
    svgLists.push({
      ...(JSON.parse(JSON.stringify(svgLists[select_svg.index]))),
      id: `${new Date().getTime()}`,
      svgPositionX: svgLists[select_svg.index].svgPositionX + 10,
      svgPositionY: svgLists[select_svg.index].svgPositionY + 10,
      title: svgLists[select_svg.index].title + `-copy`
    })
  }
  //deleted
  else if (e.key == 'Delete') {
    e.preventDefault();
    svgLists.splice(select_svg.index, 1);
    rightnav_open.value = false;
  }
}
</script>

<template>
  <div class="navtop">
    <n-message-provider>
      <top-tool-bar @saveSvgInfo="saveSvgInfo" ref="topbar_dom_ref"></top-tool-bar>
    </n-message-provider>
  </div>
  <div class="ancestors">
    <div class="navleft">
      <n-message-provider>
        <left-tool-bar
          :left_imglists="leftimg_lists"
          :select_toolbar="select_toolbar"
          @setCreatSvgInfo="setCreatSvgInfo"
        ></left-tool-bar>
      </n-message-provider>
    </div>
    <div
      class="warp"
      @drop="dropEvent"
      @dragenter="dragEnterEvent"
      @dragover="dragOverEvent"
      @mousemove="mouseMoveEvent"
      @mouseup="mouseUpEvent"
      @mousedown="mouseDownCanvasEvent"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style="background-color:#000000;"
        :width="svgCanvas.width"
        :height="svgCanvas.height"
        :viewBox="`0 0 ${svgCanvas.width} ${svgCanvas.height}`"
        ref="svg_dom_ref"
      >
        <defs />
        <filter x="0" y="0" width="1" height="1" id="solid">
          <feFlood flood-color="rgb(255,255,255)" />
          <feComposite in="SourceGraphic" />
        </filter>
        <g
          style="cursor:pointer"
          :class="item.id == select_svg.id ? 'svg-selected' : ''"
          v-for="(item,index) in svgLists"
          :key="item.id"
          :id="item.id"
          :transform="'translate(' + (item.svgPositionX) + ',' + (item.svgPositionY) + ')' + 'rotate(' + item.angle + ')' + 'scale(' + item.size + ')'"
          @mousedown="mouseDownEvent(item, index, $event)"
        >
          <svg-dynamic
            :component_type="item.type"
            :component_template="props.component_infos.filter(f => f.type == item.type)[0].template"
            :component_props="props.component_infos.filter(f => f.type == item.type)[0].props"
            :component_attr="item"
          />
        </g>
      </svg>
    </div>
    <div class="navright" v-show="rightnav_open">
      <right-tool-bar :set_svg_info="set_svg_info"></right-tool-bar>
    </div>
  </div>
  <div class="navbuttom">
    <bottom-bar></bottom-bar>
  </div>
</template>

<style scoped>
.ancestors {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
.ancestors .navleft {
  width: auto;
  height: 100%;
  /* border-left: solid 1px rgb(239, 239, 245); */
}
.ancestors .warp {
  overflow: auto;
  width: 100%;
  height: 100%;
}
.ancestors .navright {
  width: auto;
  height: 100%;
  /*background-color: aqua;*/
}
.navtop {
  width: 100%;
  height: 60px;
  border-bottom: solid 1px rgb(239, 239, 245);
}
.navbuttom {
  width: 100%;
  height: 60px;
}
.svg-selected {
  outline: 1px solid #0cf;
}
.warp::-webkit-scrollbar {
  display: none;
}
</style>
