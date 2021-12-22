<script setup lang="ts">
import { computed, reactive, Ref, ref, watch } from 'vue';
import TopToolBar from './TopBar.vue';
import LeftToolBar from './LeftToolBar.vue';
import RightToolBar from './RightToolBar.vue';
import BottomBar from './BottomBar.vue';
import { NMessageProvider } from "naive-ui";
import { IComponentInfo, ISvgDataLists, ISvgCanvas, ILeftImgLists, IMouseInfo, ISelectSvg } from "../Model";
import SvgDynamic from "./SvgDynamic.vue";
import "../assets/css/svgAnimation/index.css";
import { moveUp, moveDown, moveLeft, moveRight, hotkeyCopy, hotkeyDel, hotkeyPutOnTop, hotkeyPutOnButtom, hotkeyPutOnUp, hotkeyPutOnDown } from "../func/HotkeyFunc";
const emit = defineEmits(['saveSvgInfo']);
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
const contextMenuRef = ref<HTMLElement>();
const svgLists: ISvgDataLists[] = reactive([]);
const topbar_dom_ref = ref(null);
//显示右键菜单
const display_contextmenu = ref(false);
//右键菜单数据
const contextmenu_data = reactive([{
  name: "复制",
  hotkey: "Ctrl+C",
  enable: true,
  fun: function () {
    if (!this.enable) {
      return;
    }
    hotkeyCopy(svgLists, select_svg);
    display_contextmenu.value = false;
  }
}, {
  name: "删除",
  hotkey: "Delete",
  enable: false,
  fun: function () {
    if (!this.enable) {
      return;
    }
    hotkeyDel(svgLists, select_svg);
    display_contextmenu.value = false;
  }
}, {
  name: "置于顶层",
  hotkey: "Ctrl+→",
  enable: true,
  fun: function () {
    if (!this.enable) {
      return;
    }
    hotkeyPutOnTop(svgLists, select_svg);
    display_contextmenu.value = false;
  }
}, {
  name: "置于底层",
  hotkey: "Ctrl+←",
  enable: true,
  fun: function () {
    if (!this.enable) {
      return;
    }
    hotkeyPutOnButtom(svgLists, select_svg);
    display_contextmenu.value = false;
  }
}, {
  name: "置于上一层",
  hotkey: "Ctrl+↑",
  enable: true,
  fun: function () {
    if (!this.enable) {
      return;
    }
    hotkeyPutOnUp(svgLists, select_svg);
    display_contextmenu.value = false;
  }
}, {
  name: "置于下一层",
  hotkey: "Ctrl+↓",
  enable: true,
  fun: function () {
    if (!this.enable) {
      return;
    }
    hotkeyPutOnDown(svgLists, select_svg);
    display_contextmenu.value = false;
  }
}]);
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
/**
 * @description: 鼠标右键
 * @param {*}
 * @return {*}
 */
const contextmenuEvent = (e: MouseEvent) => {
  e.preventDefault();
  display_contextmenu.value = true;
  (contextMenuRef.value as any).style.left = e.pageX + 'px';
  (contextMenuRef.value as any).style.top = e.pageY + 'px';
  contextmenu_data.map(m => m.enable = true);
  //判断当前选中组件的index
  if (svgLists.length === 1) {
    //禁用下移
    contextmenu_data[3].enable = false;
    contextmenu_data[5].enable = false;
    //禁用上移
    contextmenu_data[2].enable = false;
    contextmenu_data[4].enable = false;
  }
  else if (select_svg.index === 0) {
    //禁用下移
    contextmenu_data[3].enable = false;
    contextmenu_data[5].enable = false;

  }
  else if (select_svg.index === svgLists.length - 1) {
    //禁用上移
    contextmenu_data[2].enable = false;
    contextmenu_data[4].enable = false;
  }

}

/**
 * @description: 点击页面其他位置隐藏右键菜单
 * @param {*}
 * @return {*}
 */
const documentClickEvent = (e: MouseEvent) => {
  if (e.button !== 2) {
    display_contextmenu.value = false;

  }
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
  if (!e.ctrlKey && e.key == 'ArrowUp') {
    e.preventDefault();
    moveUp(svgLists, select_svg);
  } else if (!e.ctrlKey && e.key == 'ArrowDown') {
    e.preventDefault();
    moveDown(svgLists, select_svg);
  } else if (!e.ctrlKey && e.key == 'ArrowLeft') {
    e.preventDefault();
    moveLeft(svgLists, select_svg);
  } else if (!e.ctrlKey && e.key == 'ArrowRight') {
    e.preventDefault();
    moveRight(svgLists, select_svg);
  }
  //ctrl  c
  else if (e.ctrlKey && e.key.toLowerCase() == 'c') {
    e.preventDefault();
    hotkeyCopy(svgLists, select_svg);
  }
  //deleted
  else if (e.key == 'Delete') {
    e.preventDefault();
    hotkeyDel(svgLists, select_svg);
    rightnav_open.value = false;
  }
  //上移一层
  else if (e.ctrlKey && e.key == 'ArrowUp') {
    e.preventDefault();
    hotkeyPutOnUp(svgLists, select_svg);
  }
  //下移一层
  else if (e.ctrlKey && e.key == 'ArrowDown') {
    e.preventDefault();
    hotkeyPutOnDown(svgLists, select_svg);
  }
  //置于底层
  else if (e.ctrlKey && e.key == 'ArrowLeft') {
    e.preventDefault();
    hotkeyPutOnButtom(svgLists, select_svg);
  }
  //置于顶层
  else if (e.ctrlKey && e.key == 'ArrowRight') {
    e.preventDefault();
    hotkeyPutOnTop(svgLists, select_svg);
  }
}
const setSvgLists = (new_val: ISvgDataLists[]) => {
  svgLists.length = 0;
  svgLists.push(...new_val);
  emit('saveSvgInfo', svgLists, svg_dom_ref.value)
}
defineExpose({
  setSvgLists
})
</script>

<template>
  <div class="navtop">
    <n-message-provider>
      <top-tool-bar @saveSvgInfo="saveSvgInfo" ref="topbar_dom_ref"></top-tool-bar>
    </n-message-provider>
  </div>
  <div class="ancestors" @mousedown="documentClickEvent">
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
          @contextmenu.stop="contextmenuEvent"
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
  <!-- 右键菜单 -->
  <ul ref="contextMenuRef" class="contextMenu" v-show="display_contextmenu">
    <li v-for="(item,index) in contextmenu_data" :key="index" @click="item.fun()">
      <p :class="item.enable ? '' : 'disabled'">
        {{ item.name }}
        <span class="shortcut">{{ item.hotkey }}</span>
      </p>
    </li>
  </ul>
</template>

<style scoped>
.contextMenu {
  position: absolute;
  z-index: 99999;
  background: #ffffff;
  padding: 5px 0;
  margin: 0px;
  display: block;
  border-radius: 5px;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.3);
}

.contextMenu li {
  list-style: none;
  padding: 0px;
  margin: 0px;
}

.contextMenu .shortcut {
  width: 115px;
  text-align: right;
  float: right;
}

.contextMenu p {
  text-decoration: none;
  display: block;
  padding: 0px 15px 1px 20px;
  margin: 0;
  user-select: none;
  -webkit-user-select: none;
}

.contextMenu p:hover {
  background-color: #0cf;
  color: #ffffff;
  cursor: default;
}

.contextMenu .disabled {
  color: #999;
}
.contextMenu .disabled:hover {
  color: #999;
  background-color: transparent;
}
.contextMenu li.separator {
  border-top: solid 1px #e3e3e3;
  padding-top: 5px;
  margin-top: 5px;
}
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
