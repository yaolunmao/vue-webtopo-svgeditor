<!-- eslint-disable prettier/prettier -->
<!-- 连线组件 -->
<template>
  <g style="vector-effect: non-scaling-stroke">
    <circle
      id="connection_tc"
      :cx="props.itemInfo.actual_bound.x+props.itemInfo.actual_bound.width/2-offset+radius" 
      :cy="props.itemInfo.actual_bound.y-offset-getCoordinateOffset(props.itemInfo.actual_bound.height,props.itemInfo.scale_y)+radius" 
      :r="radius" 
      stroke="rgba(0,0,0,0)" 
      stroke-width="2"       
      :fill="fill"
      :style="{ 'vector-effect': 'non-scaling-stroke','cursor': 'pointer'}"
      pointer-events="all" 
      @mousedown="onConnectionMouseDown(ELineBindAnchors.TopCenter,$event)"/>
    <circle
      id="connection_l"
      :cx="props.itemInfo.actual_bound.x-offset-getCoordinateOffset(props.itemInfo.actual_bound.width,props.itemInfo.scale_x)+radius" 
      :cy="props.itemInfo.actual_bound.y-offset+props.itemInfo.actual_bound.height*props.itemInfo.scale_y/2-getCoordinateOffset(props.itemInfo.actual_bound.height,props.itemInfo.scale_y)+radius" 
      :r="radius" 
      stroke="rgba(0,0,0,0)" 
      stroke-width="2"       
      :fill="fill"
      :style="{ 'vector-effect': 'non-scaling-stroke','cursor': 'pointer'}"
      pointer-events="all" 
      @mousedown="onConnectionMouseDown(ELineBindAnchors.Left,$event)"/>
    <circle
      id="connection_r"
      :cx="props.itemInfo.actual_bound.x-offset+props.itemInfo.actual_bound.width+getCoordinateOffset(props.itemInfo.actual_bound.width,props.itemInfo.scale_x)+radius" 
      :cy="props.itemInfo.actual_bound.y-offset+props.itemInfo.actual_bound.height*props.itemInfo.scale_y/2-getCoordinateOffset(props.itemInfo.actual_bound.height,props.itemInfo.scale_y)+radius" 
      :r="radius" 
      stroke="rgba(0,0,0,0)" 
      stroke-width="2"       
      :fill="fill"
      :style="{ 'vector-effect': 'non-scaling-stroke','cursor': 'pointer'}"
      pointer-events="all" 
      @mousedown="onConnectionMouseDown(ELineBindAnchors.Right,$event)"/>
    <circle
      id="connection_bc"
      :cx="props.itemInfo.actual_bound.x-offset+props.itemInfo.actual_bound.width/2+radius" 
      :cy="props.itemInfo.actual_bound.y-offset+props.itemInfo.actual_bound.height+getCoordinateOffset(props.itemInfo.actual_bound.height,props.itemInfo.scale_y)+radius" 
      :r="radius" 
      stroke="rgba(0,0,0,0)" 
      stroke-width="2"       
      :fill="fill"
      :style="{ 'vector-effect': 'non-scaling-stroke','cursor': 'pointer'}"
      pointer-events="all" 
      @mousedown="onConnectionMouseDown(ELineBindAnchors.BottomCenter,$event)"/>

  </g>
</template>
<script lang="ts" setup>
  // import { IConfigItem } from '@/config-center/types';
  import { straight_line_system, connection_line_system } from '@/config-center/svg-file/system';
  import { ELineBindAnchors, ISystemStraightLine } from '@/config-center/svg-file/system/types';
  import { useConfigStore } from '@/store/config';
  import { PropType, ref } from 'vue';
  import { useGlobalStore } from '@/store/global';
  import { EGlobalStoreIntention, EMouseInfoState } from '@/store/global/types';
  import type { IDoneJson } from '@/store/global/types';
  import {
    getAnchorPosByAnchorType,
    getCoordinateOffset,
    objectDeepClone,
    randomString
  } from '@/utils/index';
  const props = defineProps({
    itemInfo: {
      type: Object as PropType<IDoneJson>,
      default: () => {}
    }
  });
  const globalStore = useGlobalStore();
  const configStore = useConfigStore();
  const offset = ref(4);
  const fill = ref('#4F80FF');
  const radius = ref(4);
  /**
   * 点了连线
   * @param bind_anchor_type 绑定锚点类型
   * @param e
   */
  const onConnectionMouseDown = (bind_anchor_type: ELineBindAnchors, e: MouseEvent) => {
    e.preventDefault();

    const { clientX, clientY } = e;
    let create_line_info = objectDeepClone<ISystemStraightLine>(connection_line_system);
    console.log('onConnectionMouseDown', connection_line_system, e);
    //以后顶部可以选择连线是哪种 直线先不做
    if (false) {
      create_line_info = straight_line_system;
    }
    create_line_info.bind_anchors.start = {
      type: bind_anchor_type,
      target_id: props.itemInfo.id
    };
    const { x, y } = getAnchorPosByAnchorType(bind_anchor_type, props.itemInfo);
    const done_item_json: IDoneJson = {
      id: straight_line_system.name + randomString(),
      x: x,
      y: y,
      client: {
        x: clientX,
        y: clientY
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
      ...create_line_info
    };
    done_item_json.props.point_position.val.push({
      x: configStore.svg.svg_position_center.x,
      y: configStore.svg.svg_position_center.y
    });
    globalStore.setHandleSvgInfo(done_item_json, globalStore.done_json.length);
    globalStore.setDoneJson(done_item_json);

    globalStore.intention = EGlobalStoreIntention.Connection;
    globalStore.setMouseInfo({
      state: EMouseInfoState.Down,
      position_x: clientX,
      position_y: clientY,
      now_position_x: clientX,
      now_position_y: clientY,
      new_position_x: 0,
      new_position_y: 0
    });
  };
</script>
<style scoped>
  .rotate-circle {
    stroke: v-bind('fill');
    stroke-width: 1;
    fill-opacity: 0;
    cursor: url('@/assets/icons/rotate.svg') 12 12, auto;
  }
</style>
