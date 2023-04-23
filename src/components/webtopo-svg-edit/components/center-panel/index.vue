<!-- eslint-disable vue/html-indent -->
<template>
  <div
    class="canvas"
    tabindex="0"
    ref="canvasRef"
    @drop="dropEvent"
    @dragenter="dragEnterEvent"
    @dragover="dragOverEvent"
    @mousedown="onCanvasMouseDown"
    @mousemove="onCanvasMouseMove"
    @mouseup="onCanvasMouseUp"
    @contextmenu="onCanvasContextMenuEvent"
    @keydown="onHandleKeyDown"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :style="{ backgroundColor: configStore.svg.background_color }"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern id="pattern_grid" patternUnits="userSpaceOnUse" x="0" y="0" width="10" height="10">
          <rect width="1" height="1" rx="1" ry="1" fill="#aaaaaa" />
        </pattern>
      </defs>
      <rect v-if="configStore.svg.grid" width="100%" height="100%" fill="url(#pattern_grid)" />
      <g
        :transform="`translate(${
          configStore.svg.position_center.x + svgEditLayoutStore.center_offset.x
        },${
          configStore.svg.position_center.y + svgEditLayoutStore.center_offset.y
        })rotate(${0})scale(${configStore.svg.scale})`"
      >
        <g
          v-for="(item, index) in globalStore.done_json"
          :key="item.id"
          :transform="`translate(${item.x},${item.y})rotate(0)scale(1)`"
          v-show="item.display"
        >
          <g :class="`${getCommonClass(item)}`">
            <g
              :transform="`translate(${item.actual_bound.x + item.actual_bound.width / 2},${
                item.actual_bound.y + item.actual_bound.height / 2
              })rotate(${item.rotate}) scale(1) translate(${-(
                item.actual_bound.x +
                item.actual_bound.width / 2
              )},${-(item.actual_bound.y + item.actual_bound.height / 2)})`"
              @mousedown="onSvgMouseDown(item, index, $event)"
              @mouseenter="onSvgMouseEnter(item, index, $event)"
              @mouseleave="onSvgMouseLeave(item, index, $event)"
              @contextmenu="onSvgContextMenuEvent(item, index, $event)"
            >
              <connection-line
                v-if="item.type === EDoneJsonType.ConnectionLine"
                :item-info="item"
                :point-visiable="
                  visiable_info.connection_line && visiable_info.select_item.info?.id == item.id
                "
              ></connection-line>
              <use
                v-else-if="item.type === EDoneJsonType.File"
                :xlink:href="`#svg-${item.name}`"
                v-bind="prosToVBind(item)"
                width="100"
                height="100"
                :id="item.id"
                :transform="`translate(${item.actual_bound.x + item.actual_bound.width / 2},${
                  item.actual_bound.y + item.actual_bound.height / 2
                }) scale(${item.scale_x},${item.scale_y}) translate(${-(
                  item.actual_bound.x +
                  item.actual_bound.width / 2
                )},${-(item.actual_bound.y + item.actual_bound.height / 2)})`"
              ></use>
              <component
                v-else-if="item.type === EDoneJsonType.CustomSvg"
                :is="item.tag"
                v-bind="prosToVBind(item)"
                width="100"
                height="100"
                :id="item.id"
                :transform="`translate(${item.actual_bound.x + item.actual_bound.width / 2},${
                  item.actual_bound.y + item.actual_bound.height / 2
                }) scale(${item.scale_x},${item.scale_y}) translate(${-(
                  item.actual_bound.x +
                  item.actual_bound.width / 2
                )},${-(item.actual_bound.y + item.actual_bound.height / 2)})`"
              ></component>
              <foreignObject
                v-else-if="item.type === EDoneJsonType.Vue"
                v-bind="getActualBoundScale(item.actual_bound, item.scale_x, item.scale_y)"
                :id="`foreign-object${item.id}`"
              >
                <component
                  :is="item.tag"
                  v-bind="prosToVBind(item)"
                  :id="item.id"
                  :transform="`translate(${item.actual_bound.x + item.actual_bound.width / 2},${
                    item.actual_bound.y + item.actual_bound.height / 2
                  }) scale(${item.scale_x},${item.scale_y}) translate(${-(
                    item.actual_bound.x +
                    item.actual_bound.width / 2
                  )},${-(item.actual_bound.y + item.actual_bound.height / 2)})`"
                  >{{ item.tag_slot }}</component
                >
              </foreignObject>

              <line
                v-else-if="item.type === EDoneJsonType.StraightLine"
                :id="item.id"
                :x1="item.props.start_x.val"
                :y1="item.props.start_y.val"
                :x2="item.props.end_x.val"
                :y2="item.props.end_y.val"
                fill="#FF0000"
                stroke="#FF0000"
                stroke-width="2"
              ></line>
              <rect
                v-if="item.config.actual_rect"
                :id="`rect${item.id}`"
                fill="black"
                fill-opacity="0"
                v-bind="getActualBoundScale(item.actual_bound, item.scale_x, item.scale_y)"
                style="stroke: none; stroke-width: 2; stroke-miterlimit: 10"
                :class="`${
                  globalStore.intention == EGlobalStoreIntention.None ||
                  globalStore.intention == EGlobalStoreIntention.Select
                    ? 'svg-item-none'
                    : ''
                }
                                    ${
                                      globalStore.intention == EGlobalStoreIntention.Move &&
                                      globalStore.handle_svg_info?.info.id == item.id
                                        ? 'svg-item-move'
                                        : ''
                                    } ${
                  globalStore.intention == EGlobalStoreIntention.Select &&
                  globalStore.handle_svg_info?.info.id == item.id
                    ? 'svg-item-select'
                    : ''
                }`"
              ></rect>
              <handle-panel
                v-if="
                  globalStore.handle_svg_info?.info.id === item.id &&
                  visiable_info.handle_panel &&
                  item.config.can_zoom
                "
                :item-info="item"
              ></handle-panel>
              <connection-panel
                v-if="
                  visiable_info.select_item.info?.id == item.id &&
                  visiable_info.connection_panel &&
                  item.config.have_anchor &&
                  (globalStore.intention === EGlobalStoreIntention.Select
                    ? item.id !== globalStore.handle_svg_info?.info.id
                      ? true
                      : false
                    : true)
                "
                :item-info="item"
              ></connection-panel>
            </g>
          </g>
        </g>
      </g>
    </svg>
    <!-- 右键菜单 -->
    <ul ref="contextMenuRef" class="contextMenu" v-show="contextMenuStore.display">
      <li
        v-for="(item, key) in contextMenuStore.info"
        :key="item.title"
        @click="contextMenuStore.onContextMenuClick(key)"
      >
        <p :class="item.enable ? '' : 'disabled'">
          {{ item.title }}
          <span class="shortcut">{{ item.hot_key }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue';
  import { useConfigStore } from '@/store/config';
  import { useGlobalStore } from '@/store/global';
  import {
    EGlobalStoreIntention,
    EMouseInfoState,
    EScaleInfoType,
    IDoneJson
  } from '@/store/global/types';
  import { useSvgEditLayoutStore } from '@/store/svgedit-layout';
  import {
    getCenterPoint,
    randomString,
    getSvgNowPosition,
    setSvgActualInfo,
    prosToVBind,
    objectDeepClone,
    getCommonClass
  } from '@/utils';
  import {
    calculateBottom,
    calculateLeft,
    calculateLeftBottom,
    calculateLeftTop,
    calculateRight,
    calculateRightBottom,
    calculateRightTop,
    calculateTop
  } from '@/utils/scale-core';
  import HandlePanel from '@/components/webtopo-svg-edit/components/handle-panel/index.vue';
  import ConnectionPanel from '@/components/webtopo-svg-edit/components/connection-panel/index.vue';
  import { EDoneJsonType, IConfigItem } from '@/config-center/types';
  import ConnectionLine from '@/components/webtopo-svg-edit/components/connection-line/index.vue';
  import { IVisiableInfo } from './types';
  import { ComponentImport } from '@/config-center';
  import { useContextMenuStore, useEditPrivateStore } from '@/store/system';
  import { EContextMenuInfoType } from '@/store/system/types';
  import { useHistoryRecord } from '@/hooks';
  // import HandlePanel from '../handle-panel/index.vue';
  //注册所有组件
  const instance = getCurrentInstance();
  Object.keys(ComponentImport).forEach((key) => {
    if (!Object.keys(instance?.appContext?.components as any).includes(key)) {
      instance?.appContext.app.component(key, ComponentImport[key]);
    }
  });
  const globalStore = useGlobalStore();
  const configStore = useConfigStore();
  const svgEditLayoutStore = useSvgEditLayoutStore();
  const editPrivateStore = useEditPrivateStore();
  const contextMenuStore = useContextMenuStore();
  const contextMenuRef = ref<HTMLElement>();
  const canvasRef = ref<HTMLElement>();
  const cursor_style = computed(() =>
    globalStore.intention == EGlobalStoreIntention.MoveCanvas
      ? 'grab'
      : globalStore.intention == EGlobalStoreIntention.Rotate
      ? "url('/src/assets/icons/rotate.svg') 12 12, auto"
      : 'default'
  );
  const visiable_info: IVisiableInfo = reactive({
    handle_panel: computed(
      () =>
        globalStore.intention === EGlobalStoreIntention.Select ||
        globalStore.intention === EGlobalStoreIntention.Zoom ||
        globalStore.intention === EGlobalStoreIntention.Rotate
    ),
    connection_panel: false,
    connection_line: false,
    select_item: {
      info: null,
      index: -1
    }
  });
  const dropEvent = (e: DragEvent) => {
    if (globalStore.intention == EGlobalStoreIntention.None) {
      return;
    } else if (globalStore.intention == EGlobalStoreIntention.Create) {
      if (!globalStore.create_svg_info) {
        console.error('要创建的数据获取失败');
        return;
      }
      const done_item_json: IDoneJson = {
        id: globalStore.create_svg_info.name + randomString(),
        x: e.clientX - svgEditLayoutStore.center_offset.x,
        y: e.clientY - svgEditLayoutStore.center_offset.y,
        client: {
          x: e.clientX - svgEditLayoutStore.center_offset.x,
          y: e.clientY - svgEditLayoutStore.center_offset.y
        },
        scale_x: 1,
        scale_y: 1,
        rotate: 0,
        actual_bound: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        point_coordinate: {
          tl: {
            x: 0,
            y: 0
          },
          tc: {
            x: 0,
            y: 0
          },
          tr: {
            x: 0,
            y: 0
          },
          l: {
            x: 0,
            y: 0
          },
          r: {
            x: 0,
            y: 0
          },
          bl: {
            x: 0,
            y: 0
          },
          bc: {
            x: 0,
            y: 0
          },
          br: {
            x: 0,
            y: 0
          }
        },
        ...objectDeepClone<IConfigItem>(globalStore.create_svg_info)
      };
      globalStore.setHandleSvgInfo(done_item_json, globalStore.done_json.length);
      globalStore.setDoneJson(done_item_json);
      globalStore.intention = EGlobalStoreIntention.None;
    }
    canvasRef.value?.focus();
  };
  const dragEnterEvent = (e: DragEvent) => {
    //dragenter和dragover一定要阻止浏览器默认行为 不然不会触发drop
    e.preventDefault();
  };
  const dragOverEvent = (e: DragEvent) => {
    //dragenter和dragover一定要阻止浏览器默认行为 不然不会触发drop
    e.preventDefault();
  };
  const onSvgMouseDown = (select_item: IDoneJson, index: number, e: MouseEvent) => {
    canvasRef.value?.focus();
    if (globalStore.intention === EGlobalStoreIntention.Connection) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    //鼠标在画布上的组件按下记录选中的组件信息和鼠标位置信息等
    globalStore.intention = EGlobalStoreIntention.Select;
    globalStore.setHandleSvgInfo(select_item, index);
    globalStore.setMouseInfo({
      state: EMouseInfoState.Down,
      position_x: e.clientX,
      position_y: e.clientY,
      now_position_x: select_item.x,
      now_position_y: select_item.y,
      new_position_x: select_item.x,
      new_position_y: select_item.y
    });
  };
  const onSvgMouseEnter = (select_item: IDoneJson, index: number, e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    visiable_info.connection_panel = true;
    visiable_info.connection_line = true;
    if (
      (globalStore.intention === EGlobalStoreIntention.Connection ||
        globalStore.intention === EGlobalStoreIntention.SetConnectionLineNode) &&
      select_item.type === EDoneJsonType.ConnectionLine
    ) {
      return;
    }
    visiable_info.select_item.info = select_item;
    visiable_info.select_item.index = index;
  };
  const onSvgMouseLeave = (select_item: IDoneJson, index: number, e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      (globalStore.intention === EGlobalStoreIntention.Connection ||
        globalStore.intention === EGlobalStoreIntention.SetConnectionLineNode) &&
      select_item.type === EDoneJsonType.ConnectionLine
    ) {
      return;
    }
    visiable_info.connection_panel = false;
    visiable_info.connection_line = false;
    visiable_info.select_item.info = null;
    visiable_info.select_item.index = -1;
  };
  const onCanvasMouseMove = (e: MouseEvent) => {
    //如果鼠标不是按下状态 连线除外
    if (
      globalStore.mouse_info.state != EMouseInfoState.Down &&
      globalStore.intention !== EGlobalStoreIntention.Connection
    ) {
      return;
    }
    const { clientX, clientY } = e;
    globalStore.mouse_info.new_position_x =
      globalStore.mouse_info.now_position_x + clientX - globalStore.mouse_info.position_x;
    globalStore.mouse_info.new_position_y =
      globalStore.mouse_info.now_position_y + clientY - globalStore.mouse_info.position_y;
    if (
      globalStore.handle_svg_info?.info &&
      (globalStore.intention == EGlobalStoreIntention.Select ||
        globalStore.intention == EGlobalStoreIntention.Move)
    ) {
      //有选中组件 移动组件
      globalStore.handle_svg_info.info.x = globalStore.mouse_info.new_position_x;
      globalStore.handle_svg_info.info.y = globalStore.mouse_info.new_position_y;
      globalStore.handle_svg_info.info.client = {
        x: globalStore.mouse_info.new_position_x,
        y: globalStore.mouse_info.new_position_y
      };
      globalStore.intention = EGlobalStoreIntention.Move;
    } else if (globalStore.intention == EGlobalStoreIntention.MoveCanvas) {
      //移动画布
      svgEditLayoutStore.center_offset.x = globalStore.mouse_info.new_position_x;
      svgEditLayoutStore.center_offset.y = globalStore.mouse_info.new_position_y;
    } else if (globalStore.intention === EGlobalStoreIntention.Zoom) {
      if (!globalStore.handle_svg_info) {
        return;
      }
      //当前鼠标坐标
      const curPositon = {
        x: e.clientX - svgEditLayoutStore.center_offset.x,
        y: e.clientY - svgEditLayoutStore.center_offset.y
      };
      let new_length = {
        width: 0,
        height: 0,
        is_old_width: false,
        is_old_height: false
      };
      if (globalStore.scale_info.type === EScaleInfoType.TopLeft) {
        new_length = calculateLeftTop(
          curPositon,
          globalStore.scale_info.symmetric_point,
          globalStore.handle_svg_info.info.rotate
        );
      } else if (globalStore.scale_info.type === EScaleInfoType.TopRight) {
        new_length = calculateRightTop(
          curPositon,
          globalStore.scale_info.symmetric_point,
          globalStore.handle_svg_info.info.rotate
        );
      } else if (globalStore.scale_info.type === EScaleInfoType.BottomRight) {
        new_length = calculateRightBottom(
          curPositon,
          globalStore.scale_info.symmetric_point,
          globalStore.handle_svg_info.info.rotate
        );
      } else if (globalStore.scale_info.type === EScaleInfoType.BottomLeft) {
        new_length = calculateLeftBottom(
          curPositon,
          globalStore.scale_info.symmetric_point,
          globalStore.handle_svg_info.info.rotate
        );
      } else if (globalStore.scale_info.type === EScaleInfoType.TopCenter) {
        new_length = calculateTop(
          curPositon,
          globalStore.scale_info.symmetric_point,
          globalStore.handle_svg_info.info.rotate,
          globalStore.handle_svg_info.info.client
        );
      } else if (globalStore.scale_info.type === EScaleInfoType.Right) {
        new_length = calculateRight(
          curPositon,
          globalStore.scale_info.symmetric_point,
          globalStore.handle_svg_info.info.rotate,
          globalStore.handle_svg_info.info.client
        );
      } else if (globalStore.scale_info.type === EScaleInfoType.BottomCenter) {
        new_length = calculateBottom(
          curPositon,
          globalStore.scale_info.symmetric_point,
          globalStore.handle_svg_info.info.rotate,
          globalStore.handle_svg_info.info.client
        );
      } else if (globalStore.scale_info.type === EScaleInfoType.Left) {
        new_length = calculateLeft(
          curPositon,
          globalStore.scale_info.symmetric_point,
          globalStore.handle_svg_info.info.rotate,
          globalStore.handle_svg_info.info.client
        );
      }

      //缩放
      // const move_length_x =
      //   globalStore.scale_info.type === EScaleInfoType.TopLeft ||
      //   globalStore.scale_info.type === EScaleInfoType.Left ||
      //   globalStore.scale_info.type === EScaleInfoType.BottomLeft
      //     ? -(newTopLeftPoint.x - globalStore.mouse_info.now_position_x)
      //     : globalStore.scale_info.type === EScaleInfoType.TopRight ||
      //       globalStore.scale_info.type === EScaleInfoType.Right ||
      //       globalStore.scale_info.type === EScaleInfoType.BottomRight
      //     ? globalStore.mouse_info.now_position_x - newTopLeftPoint.x
      //     : 0;
      // const move_length_y =
      //   globalStore.scale_info.type === EScaleInfoType.TopLeft ||
      //   globalStore.scale_info.type === EScaleInfoType.TopCenter ||
      //   globalStore.scale_info.type === EScaleInfoType.TopRight
      //     ? newTopLeftPoint.y - globalStore.mouse_info.now_position_y
      //     : globalStore.scale_info.type === EScaleInfoType.BottomLeft ||
      //       globalStore.scale_info.type === EScaleInfoType.BottomCenter ||
      //       globalStore.scale_info.type === EScaleInfoType.BottomRight
      //     ? globalStore.mouse_info.now_position_y - newTopLeftPoint.y
      //     : 0;
      //算出缩放倍数
      if (globalStore.handle_svg_info && new_length.width > 0 && new_length.height > 0) {
        const scale_x = !new_length.is_old_width
          ? new_length.width / globalStore.handle_svg_info.info.actual_bound.width
          : 1;
        const scale_y = !new_length.is_old_height
          ? new_length.height / globalStore.handle_svg_info.info.actual_bound.height
          : 1;
        const newCenterPoint = getCenterPoint(curPositon, globalStore.scale_info.symmetric_point);
        if (
          scale_x > 0 &&
          globalStore.scale_info.type !== EScaleInfoType.TopCenter &&
          globalStore.scale_info.type !== EScaleInfoType.BottomCenter
        ) {
          globalStore.handle_svg_info.info.scale_x = scale_x;
          globalStore.handle_svg_info.info.x = getSvgNowPosition(
            globalStore.handle_svg_info.info.client.x,
            newCenterPoint.x,
            globalStore.scale_info.scale_item_info.x
          );
        }
        if (
          scale_y > 0 &&
          globalStore.scale_info.type !== EScaleInfoType.Left &&
          globalStore.scale_info.type !== EScaleInfoType.Right
        ) {
          globalStore.handle_svg_info.info.scale_y = scale_y;
          globalStore.handle_svg_info.info.y = getSvgNowPosition(
            globalStore.handle_svg_info.info.client.y,
            newCenterPoint.y,
            globalStore.scale_info.scale_item_info.y
          );
        }
      }
    } else if (globalStore.intention === EGlobalStoreIntention.Rotate) {
      if (!globalStore.handle_svg_info) {
        return;
      }
      const rotateDegreeBefore =
        Math.atan2(
          globalStore.mouse_info.position_y - globalStore.handle_svg_info.info.client.y,
          globalStore.mouse_info.position_x - globalStore.handle_svg_info.info.client.x
        ) /
        (Math.PI / 180);
      const rotateDegreeAfter =
        Math.atan2(
          clientY - svgEditLayoutStore.center_offset.y - globalStore.handle_svg_info.info.client.y,
          clientX - svgEditLayoutStore.center_offset.x - globalStore.handle_svg_info.info.client.x
        ) /
        (Math.PI / 180);
      globalStore.handle_svg_info.info.rotate =
        globalStore.rotate_info.angle + rotateDegreeAfter - rotateDegreeBefore;
    } else if (
      globalStore.intention === EGlobalStoreIntention.Connection &&
      globalStore.handle_svg_info
    ) {
      globalStore.handle_svg_info.info.props.point_position.val[
        globalStore.handle_svg_info?.info.props.point_position.val.length - 1
      ] = {
        x: getSvgNowPosition(
          globalStore.mouse_info.position_x,
          clientX,
          globalStore.handle_svg_info?.info.props.point_position.val[0].x
        ),
        y: getSvgNowPosition(
          globalStore.mouse_info.position_y,
          clientY,
          globalStore.handle_svg_info?.info.props.point_position.val[0].y
        )
      };
      // console.log('连线', start_x, start_y, end_x, end_y, clientX, clientY);
    } else if (
      globalStore.intention === EGlobalStoreIntention.SetConnectionLineNode &&
      globalStore.handle_svg_info
    ) {
      globalStore.handle_svg_info.info.props.point_position.val[
        globalStore.connection_line_node_info.point_index
      ] = {
        x: getSvgNowPosition(
          globalStore.mouse_info.position_x,
          clientX,
          globalStore.connection_line_node_info.init_pos.x
        ),
        y: getSvgNowPosition(
          globalStore.mouse_info.position_y,
          clientY,
          globalStore.connection_line_node_info.init_pos.y
        )
      };
    }
  };
  const onCanvasMouseUp = () => {
    //如果鼠标不是按下状态
    if (globalStore.mouse_info.state != EMouseInfoState.Down) {
      return;
    }
    if (globalStore.handle_svg_info?.info && globalStore.intention == EGlobalStoreIntention.Move) {
      globalStore.done_json[globalStore.handle_svg_info.index].x =
        globalStore.mouse_info.new_position_x;
      globalStore.done_json[globalStore.handle_svg_info.index].y =
        globalStore.mouse_info.new_position_y;
      // globalStore.setDoneJson(globalStore.done_json);
      setSvgActualInfo(globalStore.done_json[globalStore.handle_svg_info.index]);
      globalStore.intention = EGlobalStoreIntention.None;
      //记录历史记录
      globalStore.setDoneJson(globalStore.done_json);
      // globalStore.setHandleSvgInfo(undefined, 0);
    } else if (
      globalStore.handle_svg_info?.info &&
      globalStore.intention == EGlobalStoreIntention.Zoom
    ) {
      //缩放完成后重置中点 新版本中点就是组件坐标
      // const newCenterPoint = getCenterPoint(
      //   { x: e.clientX, y: e.clientY },
      //   globalStore.scale_info.symmetric_point
      // );
      globalStore.handle_svg_info.info.client = {
        x: globalStore.handle_svg_info.info.x,
        y: globalStore.handle_svg_info.info.y
      };
      globalStore.intention = EGlobalStoreIntention.None;
      setSvgActualInfo(globalStore.done_json[globalStore.handle_svg_info.index]);
      //记录历史记录
      globalStore.setDoneJson(globalStore.done_json);
    } else if (
      globalStore.intention === EGlobalStoreIntention.Rotate &&
      globalStore.handle_svg_info?.info
    ) {
      setSvgActualInfo(globalStore.done_json[globalStore.handle_svg_info.index]);
      //记录历史记录
      globalStore.setDoneJson(globalStore.done_json);
    } else if (globalStore.intention === EGlobalStoreIntention.Connection) {
      return;
    } else if (globalStore.intention != EGlobalStoreIntention.Select) {
      globalStore.intention = EGlobalStoreIntention.None;
    }
    globalStore.setMouseInfo({
      state: EMouseInfoState.Up,
      position_x: 0,
      position_y: 0,
      now_position_x: 0,
      now_position_y: 0,
      new_position_x: 0,
      new_position_y: 0
    });
    contextMenuStore.display = false;
  };
  const onCanvasMouseDown = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    if (globalStore.intention === EGlobalStoreIntention.Connection && globalStore.handle_svg_info) {
      if (e.button === 0) {
        //鼠标左键创建新线段
        globalStore.handle_svg_info.info.props.point_position.val.push({
          x: getSvgNowPosition(
            globalStore.mouse_info.position_x,
            clientX,
            globalStore.handle_svg_info?.info.props.point_position.val[0].x
          ),
          y: getSvgNowPosition(
            globalStore.mouse_info.position_y,
            clientY,
            globalStore.handle_svg_info?.info.props.point_position.val[0].y
          )
        });
      }
      if (e.button === 2) {
        //鼠标右键结束线段绘制
        globalStore.intention = EGlobalStoreIntention.None;
        setSvgActualInfo(globalStore.done_json[globalStore.handle_svg_info.index]);
      }
      return;
    }
    //点击画布 未选中组件 拖动画布
    globalStore.intention = EGlobalStoreIntention.MoveCanvas;
    globalStore.setMouseInfo({
      state: EMouseInfoState.Down,
      position_x: clientX,
      position_y: clientY,
      now_position_x: svgEditLayoutStore.center_offset.x,
      now_position_y: svgEditLayoutStore.center_offset.y,
      new_position_x: svgEditLayoutStore.center_offset.x,
      new_position_y: svgEditLayoutStore.center_offset.y
    });
  };
  /**
   * 鼠标右键事件
   * @param select_component
   * @param e
   * @returns
   */
  const onCanvasContextMenuEvent = (e: MouseEvent) => {
    e.preventDefault(); //禁用浏览器右键
  };
  const onSvgContextMenuEvent = (select_item: IDoneJson, index: number, e: MouseEvent) => {
    if (globalStore.intention === EGlobalStoreIntention.Connection) {
      return;
    }

    if (contextMenuRef.value) {
      globalStore.intention = EGlobalStoreIntention.ContextMenu;
      globalStore.setHandleSvgInfo(select_item, index);
      contextMenuRef.value.style.left = e.pageX + 'px';
      contextMenuRef.value.style.top = e.pageY + 'px';
      contextMenuStore.info.MoveUpOneLevel.enable =
        contextMenuStore.info.MoveUpTopLevel.enable =
        contextMenuStore.info.MoveDownOneLevel.enable =
        contextMenuStore.info.MoveDownTopLevel.enable =
          true;
      if (index === globalStore.done_json.length - 1) {
        contextMenuStore.info.MoveUpOneLevel.enable = contextMenuStore.info.MoveUpTopLevel.enable =
          false;
      }
      if (index === 0) {
        contextMenuStore.info.MoveDownOneLevel.enable =
          contextMenuStore.info.MoveDownTopLevel.enable = false;
      }
      contextMenuStore.display = true;
    }
  };
  const getActualBoundScale = (
    actual_bound: {
      x: number;
      y: number;
      width: number;
      height: number;
    },
    scale_x: number,
    scale_y: number
  ) => {
    return {
      x: actual_bound.x - (actual_bound.width / 2) * scale_x + actual_bound.width / 2,
      y: actual_bound.y - (actual_bound.height / 2) * scale_y + actual_bound.height / 2,
      width: actual_bound.width * scale_x,
      height: actual_bound.height * scale_y
    };
  };
  const onHandleKeyDown = (e: KeyboardEvent) => {
    console.log(e, 733);
    e.preventDefault();
    if (globalStore.handle_svg_info && !e.ctrlKey && e.key == 'ArrowUp') {
      globalStore.done_json[globalStore.handle_svg_info.index].y -= 1;
      useHistoryRecord(globalStore.done_json);
    } else if (globalStore.handle_svg_info && !e.ctrlKey && e.key == 'ArrowDown') {
      globalStore.handle_svg_info.info.y += 1;
      useHistoryRecord(globalStore.done_json);
    } else if (globalStore.handle_svg_info && !e.ctrlKey && e.key == 'ArrowLeft') {
      globalStore.handle_svg_info.info.x -= 1;
      useHistoryRecord(globalStore.done_json);
    } else if (globalStore.handle_svg_info && !e.ctrlKey && e.key == 'ArrowRight') {
      globalStore.handle_svg_info.info.x += 1;
      useHistoryRecord(globalStore.done_json);
    }
    //ctrl  c
    else if (e.ctrlKey && e.key.toLowerCase() == 'c') {
      contextMenuStore.onContextMenuClick(EContextMenuInfoType.Copy);
    }
    //deleted
    else if (!e.ctrlKey && e.key == 'Delete') {
      contextMenuStore.onContextMenuClick(EContextMenuInfoType.Delete);
    }
    //上移一层
    else if (e.ctrlKey && e.key == 'ArrowUp') {
      contextMenuStore.onContextMenuClick(EContextMenuInfoType.MoveUpOneLevel);
    }
    //下移一层
    else if (e.ctrlKey && e.key == 'ArrowDown') {
      contextMenuStore.onContextMenuClick(EContextMenuInfoType.MoveDownOneLevel);
    }
    //置于底层
    else if (e.ctrlKey && e.key == 'ArrowLeft') {
      contextMenuStore.onContextMenuClick(EContextMenuInfoType.MoveDownTopLevel);
    }
    //置于顶层
    else if (e.ctrlKey && e.key == 'ArrowRight') {
      contextMenuStore.onContextMenuClick(EContextMenuInfoType.MoveUpTopLevel);
    }
    //ctrl+shift+z
    else if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() == 'z') {
      editPrivateStore.topRedoBtnClick();
    }
    //ctrl+z
    else if (e.ctrlKey && e.key.toLowerCase() == 'z') {
      editPrivateStore.topUndoBtnClick();
    }
    //ctrl+delete
    else if (e.ctrlKey && e.key.toLowerCase() == 'delete') {
      globalStore.done_json.length <= 0 || globalStore.setDoneJson([]);
    }
  };
  onMounted(() => {
    canvasRef.value?.focus();
  });
</script>
<style lang="less" scoped>
  .canvas {
    width: 100%;
    height: 100%;
    cursor: v-bind('cursor_style');
    &:focus-visible {
      outline: 0px;
    }
  }

  .svg-item-none {
    cursor: move;

    &:hover {
      outline: 1px solid #0cf;
    }
  }

  .svg-item-move {
    cursor: move;
    outline: 1px dashed rgb(23, 222, 30);
  }

  .svg-item-select {
    cursor: move;
    outline: 1px solid rgb(23, 222, 30);
  }
  .contextMenu {
    position: fixed;
    z-index: 99999;
    background: #ffffff;
    padding: 5px 0;
    margin: 0px;
    display: block;
    border-radius: 5px;
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.3);

    li {
      list-style: none;
      padding: 0px;
      margin: 0px;
    }

    .shortcut {
      width: 115px;
      text-align: right;
      float: right;
    }

    p {
      text-decoration: none;
      display: block;
      padding: 0px 15px 1px 20px;
      margin: 0;
      user-select: none;
      -webkit-user-select: none;
    }

    p:hover {
      background-color: #0cf;
      color: #ffffff;
      cursor: default;
    }

    .disabled {
      color: #999;
    }

    .disabled:hover {
      color: #999;
      background-color: transparent;
    }

    li.separator {
      border-top: solid 1px #e3e3e3;
      padding-top: 5px;
      margin-top: 5px;
    }
  }
  .common-ani {
    transform-box: fill-box;
  }
</style>
