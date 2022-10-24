<!-- eslint-disable prettier/prettier -->
<!-- 旋转缩放组件 -->
<template>
  <g style="vector-effect: non-scaling-stroke">
    <rect
      id="resize_tl"
      width="8"
      height="8"
      :fill="fill"
      style="cursor: nw-resize; vector-effect: non-scaling-stroke"
      pointer-events="all"
      :x="props.itemInfo.actual_bound.x-offset-getCoordinateOffset(props.itemInfo.actual_bound.width,props.itemInfo.scale_x)"
      :y="props.itemInfo.actual_bound.y-offset-getCoordinateOffset(props.itemInfo.actual_bound.height,props.itemInfo.scale_y)"
      stroke="rgba(0,0,0,0)"
      @mousedown="onHandleMouseDown(EScaleInfoType.TopLeft,$event)"
    ></rect
    ><rect
      id="resize_tc"
      width="8"
      height="8"
      :fill="fill"
      style="cursor: n-resize; vector-effect: non-scaling-stroke"
      pointer-events="all"
      :x="props.itemInfo.actual_bound.x+props.itemInfo.actual_bound.width/2-offset"
      :y="props.itemInfo.actual_bound.y-offset-getCoordinateOffset(props.itemInfo.actual_bound.height,props.itemInfo.scale_y)"
      stroke="rgba(0,0,0,0)"
      @mousedown="onHandleMouseDown(EScaleInfoType.TopCenter,$event)"
    ></rect
    ><rect
      id="resize_tr"
      width="8"
      height="8"
      :fill="fill"
      style="cursor: ne-resize; vector-effect: non-scaling-stroke"
      pointer-events="all"
      :x="props.itemInfo.actual_bound.x+props.itemInfo.actual_bound.width-offset+getCoordinateOffset(props.itemInfo.actual_bound.width,props.itemInfo.scale_x)"
      :y="props.itemInfo.actual_bound.y-offset-getCoordinateOffset(props.itemInfo.actual_bound.height,props.itemInfo.scale_y)"
      stroke="rgba(0,0,0,0)"
      @mousedown="onHandleMouseDown(EScaleInfoType.TopRight,$event)"
    ></rect
    ><rect
      id="resize_l"
      width="8"
      height="8"
      :fill="fill"
      style="cursor: e-resize; vector-effect: non-scaling-stroke"
      pointer-events="all"
      :x="props.itemInfo.actual_bound.x-offset-getCoordinateOffset(props.itemInfo.actual_bound.width,props.itemInfo.scale_x)"
      :y="props.itemInfo.actual_bound.y-offset+props.itemInfo.actual_bound.height*props.itemInfo.scale_y/2-getCoordinateOffset(props.itemInfo.actual_bound.height,props.itemInfo.scale_y)"
      stroke="rgba(0,0,0,0)"
      @mousedown="onHandleMouseDown(EScaleInfoType.Left,$event)"
    ></rect
    ><rect
      id="resize_r"
      width="8"
      height="8"
      :fill="fill"
      style="cursor: w-resize; vector-effect: non-scaling-stroke"
      pointer-events="all"
      :x="props.itemInfo.actual_bound.x-offset+props.itemInfo.actual_bound.width+getCoordinateOffset(props.itemInfo.actual_bound.width,props.itemInfo.scale_x)"
      :y="props.itemInfo.actual_bound.y-offset+props.itemInfo.actual_bound.height*props.itemInfo.scale_y/2-getCoordinateOffset(props.itemInfo.actual_bound.height,props.itemInfo.scale_y)"
      stroke="rgba(0,0,0,0)"
      @mousedown="onHandleMouseDown(EScaleInfoType.Right,$event)"
    ></rect
    ><rect
      id="resize_bl"
      width="8"
      height="8"
      :fill="fill"
      style="cursor: sw-resize; vector-effect: non-scaling-stroke"
      pointer-events="all"
      :x="props.itemInfo.actual_bound.x-offset-getCoordinateOffset(props.itemInfo.actual_bound.width,props.itemInfo.scale_x)"
      :y="props.itemInfo.actual_bound.y-offset+props.itemInfo.actual_bound.height*props.itemInfo.scale_y-getCoordinateOffset(props.itemInfo.actual_bound.height,props.itemInfo.scale_y)"
      stroke="rgba(0,0,0,0)"
      @mousedown="onHandleMouseDown(EScaleInfoType.BottomLeft,$event)"
    ></rect
    ><rect
      id="resize_bc"
      width="8"
      height="8"
      :fill="fill"
      style="cursor: s-resize; vector-effect: non-scaling-stroke"
      pointer-events="all"
      :x="props.itemInfo.actual_bound.x-offset+props.itemInfo.actual_bound.width/2"
      :y="props.itemInfo.actual_bound.y-offset+props.itemInfo.actual_bound.height+getCoordinateOffset(props.itemInfo.actual_bound.height,props.itemInfo.scale_y)"
      stroke="rgba(0,0,0,0)"
      @mousedown="onHandleMouseDown(EScaleInfoType.BottomCenter,$event)"
    ></rect
    ><rect
      id="resize_br"
      width="8"
      height="8"
      :fill="fill"
      style="cursor: se-resize; vector-effect: non-scaling-stroke"
      pointer-events="all"
      :x="props.itemInfo.actual_bound.x-offset+props.itemInfo.actual_bound.width+getCoordinateOffset(props.itemInfo.actual_bound.width,props.itemInfo.scale_x)"
      :y="props.itemInfo.actual_bound.y-offset+props.itemInfo.actual_bound.height+getCoordinateOffset(props.itemInfo.actual_bound.height,props.itemInfo.scale_y)"
      stroke="rgba(0,0,0,0)"
      @mousedown="onHandleMouseDown(EScaleInfoType.BottomRight,$event)"
    ></rect>
  </g>
</template>
<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { useGlobalStore } from '../../../../store/global/index.js';
  import {
    EGlobalStoreIntention,
    EMouseInfoState,
    EScaleInfoType,
    IDoneJson
  } from '../../../../store/global/types';
  import { getCoordinateOffset } from '../../../../utils/index';
  const props = defineProps({
    itemInfo: {
      type: Object as PropType<IDoneJson>,
      default: () => {}
    }
  });
  const globalStore = useGlobalStore();
  const offset = ref(5);
  const fill = ref('#4F80FF');
  const onHandleMouseDown = (type: EScaleInfoType, e: MouseEvent) => {
    const { clientX, clientY } = e;
    e.cancelBubble = true;
    globalStore.intention = EGlobalStoreIntention.Zoom;
    globalStore.setMouseInfo({
      state: EMouseInfoState.Down,
      position_x: clientX,
      position_y: clientY,
      now_position_x: clientX,
      now_position_y: clientY,
      new_position_x: 0,
      new_position_y: 0
    });
    globalStore.setScaleInfo({
      type: type,
      scale_times: {
        x: props.itemInfo.scale_x,
        y: props.itemInfo.scale_y
      },
      scale_item_info: {
        x: props.itemInfo.x,
        y: props.itemInfo.y
      }
    });
  };
</script>
<style scoped></style>
