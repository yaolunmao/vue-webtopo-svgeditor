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
        >
          <rect
            width="100"
            height="100"
            fill="black"
            fill-opacity="0"
            style="stroke: none; stroke-width: 2; stroke-miterlimit: 10"
          ></rect>

          <use :xlink:href="`#svg-${item.name}`" fill="#ff0000" width="100" height="100"></use>
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
    IDoneJson
  } from '../../../../store/global/types';
  import { useSvgEditLayoutStore } from '../../../../store/svgedit-layout';
  import { randomString } from '../../../../utils';

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
      const done_item_json = {
        id: randomString(),
        x: e.offsetX - svgEditLayoutStore.center_offset.x,
        y: e.offsetY - svgEditLayoutStore.center_offset.y,
        ...globalStore.create_svg_info
      };
      globalStore.setHandleSvgInfo(done_item_json, globalStore.done_json.length);
      globalStore.setDoneJson(done_item_json);
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
    }
  };
  const onCanvasMouseUp = () => {
    //如果鼠标不是按下状态或者没有选择组件
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
