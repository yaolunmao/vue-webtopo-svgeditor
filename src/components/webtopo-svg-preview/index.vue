<!-- eslint-disable prettier/prettier -->
<template>
  <div
    class="canvas"
    @mousedown="onCanvasMouseDown"
    @mousemove="onCanvasMouseMove"
    @mouseup="onCanvasMouseUp"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :style="{ backgroundColor: preview_data.config.background_color }"
      width="100%"
      height="100%"
    >
      <g
        :transform="`translate(${
          preview_data.config.position_center.x + preview_data.layout_center.x
        },${
          preview_data.config.position_center.y + preview_data.layout_center.y
        })rotate(${0})scale(${preview_data.config.scale})`"
      >
        <g
          v-for="item in preview_data.done_json"
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
            >
              <connection-line
                v-if="item.type === EDoneJsonType.ConnectionLine"
                :item-info="item"
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
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>
<script setup lang="ts">
  import { getCurrentInstance, PropType, reactive } from 'vue';
  import { useGlobalStore } from '@/store/global';
  import { EGlobalStoreIntention, EMouseInfoState } from '@/store/global/types';
  import { prosToVBind, setArrItemByID, getCommonClass } from '@/utils';

  import { EDoneJsonType } from '@/config-center/types';
  import ConnectionLine from '@/components/webtopo-svg-edit/components/connection-line/index.vue';

  import { ComponentImport } from '@/config-center';
  import { IDataModel } from '../webtopo-svg-edit/types';
  import 'element-plus/dist/index.css';
  import 'animate.css';
  // import HandlePanel from '../handle-panel/index.vue';
  //注册所有组件
  const instance = getCurrentInstance();
  Object.keys(ComponentImport).forEach((key) => {
    if (!Object.keys(instance?.appContext?.components as any).includes(key)) {
      instance?.appContext.app.component(key, ComponentImport[key]);
    }
  });
  const props = defineProps({
    dataModel: {
      type: [Object, null] as PropType<IDataModel | null>,
      default: null
    },
    canvasDrag: {
      type: Boolean,
      default: true
    }
  });
  const preview_data = reactive(
    props.dataModel ?? {
      layout_center: {
        x: 0,
        y: 0
      },
      config: {
        background_color: '#fff',
        scale: 1,
        position_center: {
          x: -333,
          y: -113
        },
        svg_position_center: {
          x: 50,
          y: 50
        }
      },
      done_json: []
    }
  );
  const globalStore = useGlobalStore();
  const onCanvasMouseMove = (e: MouseEvent) => {
    //如果鼠标不是按下状态 连线除外
    if (
      globalStore.mouse_info.state != EMouseInfoState.Down &&
      globalStore.intention !== EGlobalStoreIntention.Connection
    ) {
      return;
    }
    if (!props.canvasDrag) {
      console.log(props.canvasDrag);

      return;
    }
    const { clientX, clientY } = e;
    globalStore.mouse_info.new_position_x =
      globalStore.mouse_info.now_position_x + clientX - globalStore.mouse_info.position_x;
    globalStore.mouse_info.new_position_y =
      globalStore.mouse_info.now_position_y + clientY - globalStore.mouse_info.position_y;
    if (globalStore.intention == EGlobalStoreIntention.MoveCanvas) {
      //移动画布
      preview_data.layout_center.x = globalStore.mouse_info.new_position_x;
      preview_data.layout_center.y = globalStore.mouse_info.new_position_y;
    }
  };
  const onCanvasMouseUp = () => {
    //如果鼠标不是按下状态
    if (globalStore.mouse_info.state != EMouseInfoState.Down) {
      return;
    }
    if (globalStore.intention != EGlobalStoreIntention.Select) {
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
    console.log('onCanvasMouseDown', e);
    const { clientX, clientY } = e;
    //点击画布 未选中组件 拖动画布
    globalStore.intention = EGlobalStoreIntention.MoveCanvas;
    globalStore.setMouseInfo({
      state: EMouseInfoState.Down,
      position_x: clientX,
      position_y: clientY,
      now_position_x: preview_data.layout_center.x,
      now_position_y: preview_data.layout_center.y,
      new_position_x: preview_data.layout_center.x,
      new_position_y: preview_data.layout_center.y
    });
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
  const setNodeAttrByID = (id: string, attr: string, val: any) => {
    return setArrItemByID(id, attr, val, preview_data.done_json);
  };
  defineExpose({
    setNodeAttrByID
  });
</script>
<style lang="less" scoped>
  .canvas {
    width: 100%;
    height: 100vh;
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
  .common-ani {
    transform-box: fill-box;
  }
</style>
