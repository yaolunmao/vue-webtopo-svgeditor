<!-- eslint-disable vue/html-indent -->
<template>
  <div
    class="canvas"
    @drop="dropEvent"
    @dragenter="dragEnterEvent"
    @dragover="dragOverEvent"
    @mousedown="onCanvasMouseDown"
    @mousemove="onCanvasMouseMove"
    @mouseup="onCanvasMouseUp"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :style="{ backgroundColor: configStore.svg.background_color }"
      width="100%"
      height="100%"
    >
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
        >
          <use
            :xlink:href="`#svg-${item.name}`"
            fill="#ff0000"
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
          <rect
            :id="`rect${item.id}`"
            fill="black"
            fill-opacity="0"
            :x="
              item.actual_bound.x -
              (item.actual_bound.width / 2) * item.scale_x +
              item.actual_bound.width / 2
            "
            :y="
              item.actual_bound.y -
              (item.actual_bound.height / 2) * item.scale_y +
              item.actual_bound.height / 2
            "
            :width="item.actual_bound.width * item.scale_x"
            :height="item.actual_bound.height * item.scale_y"
            style="stroke: none; stroke-width: 2; stroke-miterlimit: 10"
            :class="`${globalStore.intention == EGlobalStoreIntention.None ? 'svg-item-none' : ''}
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
            @mousedown="onSvgMouseDown(item, index, $event)"
          ></rect>
          <handle-panel
            v-if="
              globalStore.handle_svg_info?.info.id == item.id &&
              (globalStore.intention == EGlobalStoreIntention.Select ||
                globalStore.intention == EGlobalStoreIntention.Zoom)
            "
            :item-info="item"
          ></handle-panel>
        </g>
      </g>
    </svg>
  </div>
</template>
<script setup lang="ts">
  import { useConfigStore } from '../../../../store/config';
  import { useGlobalStore } from '../../../../store/global';
  import {
    EGlobalStoreIntention,
    EMouseInfoState,
    EScaleInfoType,
    IDoneJson
  } from '../../../../store/global/types';
  import { useSvgEditLayoutStore } from '../../../../store/svgedit-layout';
  import { randomString } from '../../../../utils';
  import HandlePanel from '../handle-panel/index.vue';
  // import HandlePanel from '../handle-panel/index.vue';
  const globalStore = useGlobalStore();
  const configStore = useConfigStore();
  const svgEditLayoutStore = useSvgEditLayoutStore();
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
        x: e.offsetX - svgEditLayoutStore.center_offset.x,
        y: e.offsetY - svgEditLayoutStore.center_offset.y,
        scale_x: 1,
        scale_y: 1,
        actual_bound: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        ...globalStore.create_svg_info
      };
      globalStore.setHandleSvgInfo(done_item_json, globalStore.done_json.length);
      globalStore.setDoneJson(done_item_json);
      globalStore.intention = EGlobalStoreIntention.None;
    }
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
    e.preventDefault();
    e.cancelBubble = true;
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
  const onCanvasMouseMove = (e: MouseEvent) => {
    //如果鼠标不是按下状态
    if (globalStore.mouse_info.state != EMouseInfoState.Down) {
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
      globalStore.intention = EGlobalStoreIntention.Move;
    } else if (globalStore.intention == EGlobalStoreIntention.MoveCanvas) {
      //移动画布
      svgEditLayoutStore.center_offset.x = globalStore.mouse_info.new_position_x;
      svgEditLayoutStore.center_offset.y = globalStore.mouse_info.new_position_y;
    } else if (globalStore.intention == EGlobalStoreIntention.Zoom) {
      //缩放
      const move_length_x =
        globalStore.scale_info.type === EScaleInfoType.TopLeft ||
        globalStore.scale_info.type === EScaleInfoType.Left ||
        globalStore.scale_info.type === EScaleInfoType.BottomLeft
          ? globalStore.mouse_info.new_position_x - globalStore.mouse_info.now_position_x
          : globalStore.scale_info.type === EScaleInfoType.TopRight ||
            globalStore.scale_info.type === EScaleInfoType.Right ||
            globalStore.scale_info.type === EScaleInfoType.BottomRight
          ? globalStore.mouse_info.now_position_x - globalStore.mouse_info.new_position_x
          : 0;
      const move_length_y =
        globalStore.scale_info.type === EScaleInfoType.TopLeft ||
        globalStore.scale_info.type === EScaleInfoType.TopCenter ||
        globalStore.scale_info.type === EScaleInfoType.TopRight
          ? globalStore.mouse_info.new_position_y - globalStore.mouse_info.now_position_y
          : globalStore.scale_info.type === EScaleInfoType.BottomLeft ||
            globalStore.scale_info.type === EScaleInfoType.BottomCenter ||
            globalStore.scale_info.type === EScaleInfoType.BottomRight
          ? globalStore.mouse_info.now_position_y - globalStore.mouse_info.new_position_y
          : 0;
      //算出缩放倍数
      if (globalStore.handle_svg_info) {
        const scale_x =
          (globalStore.handle_svg_info.info.actual_bound.width *
            globalStore.scale_info.scale_times.x -
            move_length_x) /
          globalStore.handle_svg_info.info.actual_bound.width;
        const scale_y =
          (globalStore.handle_svg_info.info.actual_bound.height *
            globalStore.scale_info.scale_times.y -
            move_length_y) /
          globalStore.handle_svg_info.info.actual_bound.height;
        if (scale_x > 0) {
          globalStore.handle_svg_info.info.scale_x = scale_x;
          globalStore.handle_svg_info.info.x =
            globalStore.scale_info.type === EScaleInfoType.TopLeft ||
            globalStore.scale_info.type === EScaleInfoType.Left ||
            globalStore.scale_info.type === EScaleInfoType.BottomLeft
              ? globalStore.scale_info.scale_item_info.x + move_length_x / 2
              : globalStore.scale_info.scale_item_info.x - move_length_x / 2;
        }
        if (scale_y > 0) {
          globalStore.handle_svg_info.info.scale_y = scale_y;
          globalStore.handle_svg_info.info.y =
            globalStore.scale_info.type === EScaleInfoType.TopLeft ||
            globalStore.scale_info.type === EScaleInfoType.TopCenter ||
            globalStore.scale_info.type === EScaleInfoType.TopRight
              ? globalStore.scale_info.scale_item_info.y + move_length_y / 2
              : globalStore.scale_info.scale_item_info.y - move_length_y / 2;
        }
      }
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
      globalStore.setDoneJson(globalStore.done_json);
      globalStore.intention = EGlobalStoreIntention.Select;
      // globalStore.setHandleSvgInfo(undefined, 0);
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
  };
  const onCanvasMouseDown = (e: MouseEvent) => {
    //点击画布 未选中组件 拖动画布
    globalStore.intention = EGlobalStoreIntention.MoveCanvas;
    globalStore.setMouseInfo({
      state: EMouseInfoState.Down,
      position_x: e.clientX,
      position_y: e.clientY,
      now_position_x: svgEditLayoutStore.center_offset.x,
      now_position_y: svgEditLayoutStore.center_offset.y,
      new_position_x: svgEditLayoutStore.center_offset.x,
      new_position_y: svgEditLayoutStore.center_offset.y
    });
  };
</script>
<style lang="less" scoped>
  .canvas {
    width: 100%;
    height: 100%;
    cursor: v-bind('globalStore.intention == EGlobalStoreIntention.MoveCanvas?"grab":"default"');
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
</style>
