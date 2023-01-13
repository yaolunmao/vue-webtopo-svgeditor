<!-- eslint-disable vue/html-indent -->
<template>
  <g>
    <path
      :id="props.itemInfo.id"
      :d="positionArrarToPath(props.itemInfo.props.point_position.val)"
      fill="none"
      :stroke="
        props.itemInfo.animations?.type.val === EConfigAnimationsType.Electricity
          ? props.itemInfo.animations.color.val
          : props.itemInfo.props.stroke.val
      "
      stroke-width="2"
      style="cursor: move"
      stroke-dashoffset="0"
      :stroke-dasharray="
        props.itemInfo.animations?.type.val === EConfigAnimationsType.Electricity ? 6 : 0
      "
    >
      <animate
        v-if="props.itemInfo.animations?.type.val === EConfigAnimationsType.Electricity"
        attributeName="stroke-dashoffset"
        :from="props.itemInfo.animations.reverse.val ? 0 : 1000"
        :to="props.itemInfo.animations.reverse.val ? 1000 : 0"
        :dur="`${props.itemInfo.animations.dur.val}s`"
        :repeatCount="props.itemInfo.animations.repeatCount.val"
      />
    </path>
    <!-- 水珠 -->
    <path
      v-if="props.itemInfo.animations?.type.val === EConfigAnimationsType.WaterDrop"
      :d="positionArrarToPath(props.itemInfo.props.point_position.val)"
      fill="none"
      fill-opacity="0"
      :stroke="props.itemInfo.animations.color.val"
      stroke-width="2"
      stroke-dasharray="6"
      stroke-dashoffset="0"
      stroke-linecap="round"
    >
      <animate
        attributeName="stroke-dashoffset"
        :from="props.itemInfo.animations.reverse.val ? 0 : 1000"
        :to="props.itemInfo.animations.reverse.val ? 1000 : 0"
        :dur="`${props.itemInfo.animations.dur.val}s`"
        :repeatCount="props.itemInfo.animations.repeatCount.val"
        fill="freeze"
      />
    </path>
    <!-- 轨迹 -->
    <circle
      v-else-if="props.itemInfo.animations?.type.val === EConfigAnimationsType.Track"
      cx="0"
      cy="0"
      r="5"
      :fill="props.itemInfo.animations.color.val"
    >
      <animateMotion
        :path="
          positionArrarToPath(
            props.itemInfo.animations.reverse.val
              ? [...props.itemInfo.props.point_position.val].reverse()
              : props.itemInfo.props.point_position.val
          )
        "
        :dur="`${props.itemInfo.animations.dur.val}s`"
        :repeatCount="props.itemInfo.animations.repeatCount.val"
      >
      </animateMotion>
    </circle>
    <!-- 更改线段 -->
    <g v-if="props.pointVisiable">
      <circle
        v-for="(item, index) in props.itemInfo.props.point_position.val"
        :key="index"
        :cx="item.x"
        :cy="item.y"
        r="4"
        stroke-width="1"
        :stroke="props.itemInfo.props.stroke.val"
        fill="#fff"
        style="cursor: pointer"
        @mousedown="setConnectionLineNode(index, $event, item.x, item.y)"
    /></g>
  </g>
</template>
<script setup lang="ts">
  import { EMouseInfoState, IDoneJson } from '@/store/global/types';
  import { EGlobalStoreIntention } from '@/store/global/types';
  import { PropType } from 'vue';
  import { positionArrarToPath } from '@/utils';
  import { useGlobalStore } from '@/store/global';
  import { EConfigAnimationsType } from '@/config-center/types';
  const props = defineProps({
    itemInfo: {
      type: Object as PropType<IDoneJson>,
      default: () => {}
    },
    pointVisiable: {
      type: Boolean,
      default: false
    }
  });
  const globalStore = useGlobalStore();
  const setConnectionLineNode = (point_index: number, e: MouseEvent, x: number, y: number) => {
    if (globalStore.intention === EGlobalStoreIntention.Connection) {
      return;
    }
    globalStore.setHandleSvgInfo(props.itemInfo);
    const { clientX, clientY } = e;
    e.stopPropagation();
    globalStore.connection_line_node_info = {
      init_pos: { x, y },
      point_index: point_index
    };
    globalStore.intention = EGlobalStoreIntention.SetConnectionLineNode;
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
