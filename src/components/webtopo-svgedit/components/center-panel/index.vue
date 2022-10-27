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
          <g
            :transform="`translate(${item.actual_bound.x + item.actual_bound.width / 2},${
              item.actual_bound.y + item.actual_bound.height / 2
            })rotate(${item.rotate}) scale(1) translate(${-(
              item.actual_bound.x +
              item.actual_bound.width / 2
            )},${-(item.actual_bound.y + item.actual_bound.height / 2)})`"
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
                (globalStore.intention === EGlobalStoreIntention.Select ||
                  globalStore.intention === EGlobalStoreIntention.Zoom ||
                  globalStore.intention === EGlobalStoreIntention.Rotate)
              "
              :item-info="item"
            ></handle-panel>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  import { useConfigStore } from '../../../../store/config';
  import { useGlobalStore } from '../../../../store/global';
  import {
    EGlobalStoreIntention,
    EMouseInfoState,
    EScaleInfoType,
    IDoneJson
  } from '../../../../store/global/types';
  import { useSvgEditLayoutStore } from '../../../../store/svgedit-layout';
  import { getCenterPoint, randomString } from '../../../../utils';
  import {
    calculateBottom,
    calculateLeft,
    calculateLeftBottom,
    calculateLeftTop,
    calculateRight,
    calculateRightBottom,
    calculateRightTop,
    calculateTop
  } from '../../../../utils/scale-core';
  import HandlePanel from '../handle-panel/index.vue';
  // import HandlePanel from '../handle-panel/index.vue';
  const globalStore = useGlobalStore();
  const configStore = useConfigStore();
  const svgEditLayoutStore = useSvgEditLayoutStore();
  const cursor_style = computed(() =>
    globalStore.intention == EGlobalStoreIntention.MoveCanvas
      ? 'grab'
      : globalStore.intention == EGlobalStoreIntention.Rotate
      ? "url('/src/assets/icons/rotate.svg') 12 12, auto"
      : 'default'
  );
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
        client: {
          x: e.clientX,
          y: e.clientY
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
    console.log(172, e);

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
      globalStore.handle_svg_info.info.client = {
        x: clientX,
        y: clientY
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
        x: e.clientX,
        y: e.clientY
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
        const move_length_x = newCenterPoint.x - globalStore.handle_svg_info.info.client.x;
        const move_length_y = newCenterPoint.y - globalStore.handle_svg_info.info.client.y;

        if (
          scale_x > 0 &&
          globalStore.scale_info.type !== EScaleInfoType.TopCenter &&
          globalStore.scale_info.type !== EScaleInfoType.BottomCenter
        ) {
          globalStore.handle_svg_info.info.scale_x = scale_x;
          globalStore.handle_svg_info.info.x =
            globalStore.scale_info.scale_item_info.x + move_length_x;
        }
        if (
          scale_y > 0 &&
          globalStore.scale_info.type !== EScaleInfoType.Left &&
          globalStore.scale_info.type !== EScaleInfoType.Right
        ) {
          globalStore.handle_svg_info.info.scale_y = scale_y;
          globalStore.handle_svg_info.info.y =
            globalStore.scale_info.scale_item_info.y + move_length_y;
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
          clientY - globalStore.handle_svg_info.info.client.y,
          clientX - globalStore.handle_svg_info.info.client.x
        ) /
        (Math.PI / 180);
      globalStore.handle_svg_info.info.rotate =
        globalStore.rotate_info.angle + rotateDegreeAfter - rotateDegreeBefore;
    }
  };
  const onCanvasMouseUp = (e: MouseEvent) => {
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
    } else if (
      globalStore.handle_svg_info?.info &&
      globalStore.intention == EGlobalStoreIntention.Zoom
    ) {
      //缩放完成后重置中点
      const newCenterPoint = getCenterPoint(
        { x: e.clientX, y: e.clientY },
        globalStore.scale_info.symmetric_point
      );
      //这里有bug 要先把移动的时候不根据中点放大 这里才好用
      console.log(newCenterPoint);
      globalStore.handle_svg_info.info.client = newCenterPoint;
      globalStore.intention = EGlobalStoreIntention.None;
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
    cursor: v-bind('cursor_style');
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
