<!-- eslint-disable prettier/prettier -->
<template>
  <div
    class="canvas"
    @mousedown="onCanvasMouseDown"
    @mousemove="onCanvasMouseMove"
    @mouseup="onCanvasMouseUp"
  >
    <el-form style="width: 10%;">
      <el-form-item><el-input type="string" /></el-form-item>
      {{ currentData }}
      <el-button @click="bianli">设置</el-button>
    </el-form>    
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
          <g
            :transform="`translate(${item.actual_bound.x + item.actual_bound.width / 2},${
              item.actual_bound.y + item.actual_bound.height / 2
            })rotate(${item.rotate}) scale(1) translate(${-(
              item.actual_bound.x +
              item.actual_bound.width / 2
            )},${-(item.actual_bound.y + item.actual_bound.height / 2)})`"   
            class="animate__animated"
            :class="item.animations?.type.val"
            :style="{
              'animation-duration': item.animations?.dur.val + 's',
              'animation-iteration-count': item.animations?.repeatCount.val
            }"
            style="transform-box: fill-box"           
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
              v-on="event_attr" 
            >
            </use>
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
    </svg>
  </div>
</template>
<script setup lang="ts">
  import { getCurrentInstance, PropType, reactive, ref } from 'vue';
  import { useGlobalStore } from '@/store/global';
  import { useServerStore } from '@/store/server';
  import { EGlobalStoreIntention, EMouseInfoState } from '@/store/global/types';
  import { prosToVBind, setArrItemByID } from '@/utils';

  import { EDoneJsonType } from '@/config-center/types';
  import ConnectionLine from '@/components/webtopo-svg-edit/components/connection-line/index.vue';

  import { ComponentImport } from '@/config-center';
  import { IDataModel } from '../webtopo-svg-edit/types';
  import 'element-plus/dist/index.css';
  import { ElButton, ElInput, ElForm, ElFormItem } from 'element-plus';
  import { EConfigAnimationsType } from '@/config-center/types';
  // import HandlePanel from '../handle-panel/index.vue';
  //注册所有组件
  const instance = getCurrentInstance();
  const event_attr = ref<object>({});

  event_attr.value = {};
  const dynamicEvent = (params: string[], event_str: string) => {
    try {
      if (params?.length > 0) {
        return new Function(params.toString(), event_str);
      } else {
        return new Function(event_str);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //取出自定义函数
  event_attr.value = {
    ...event_attr.value,
    ...{
      ['click']: dynamicEvent([], "alert('点击了控件')")
    }
  };
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
          x: -295,
          y: -95
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
  const serverStore = useServerStore();
  const currentData = ref<any>();
  const dingshi = () => {
    setInterval(function () {
      serverStore.getData().then((a) => {
        currentData.value = a;
        console.log(currentData.value['price']);
        bianli();
      });
    }, 3000);
  };
  dingshi();
  const bianli = () => {
    console.log(preview_data.done_json);
    preview_data.done_json.forEach((element) => {
      if (element.triggerList && element.triggerList?.length > 0) {
        element.triggerList.forEach((item) => {
          //判断最小值 最大值
          if (
            item.min &&
            item.max &&
            currentData.value[item.tag] >= Number(item.min) &&
            currentData.value[item.tag] <= Number(item.max)
          ) {
            //执行动效
            if (element.animations) {
              element.animations.type.val = item.animationsType;
              console.log(item.animationsType);
              console.log(preview_data.done_json);
              console.log(preview_data);
            } else {
            }
          } else {
            element.animations.type.val = EConfigAnimationsType.None;
          }
        });
      }
    });
  };
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
  .svg-rorate {
    transform-box: fill-box;
    transform-origin: center;
  }

  .animate__rotateOut {
    -webkit-animation-name: rotateOut;
    animation-name: rotateOut;
    -webkit-transform-origin: center;
    transform-origin: center;
    animation-timing-function: linear;
  }
  @keyframes rotateOut {
    from {
      /*变换 transform;旋转 rotate */
      transform: rotate(360deg);
    }
    to {
      /*变换 transform;旋转 rotate */
      transform: rotate(0deg);
    }
  }
  .animate__rotateIn {
    -webkit-animation-name: rotateIn;
    animation-name: rotateIn;
    -webkit-transform-origin: center;
    transform-origin: center;
    animation-timing-function: linear;
  }
  @keyframes rotateIn {
    from {
      /*变换 transform;旋转 rotate */
      transform: rotate(0deg);
    }
    to {
      /*变换 transform;旋转 rotate */
      transform: rotate(360deg);
    }
  }
</style>
