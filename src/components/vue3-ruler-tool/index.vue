<!-- eslint-disable vue/html-indent -->
<template>
  <div :style="wrapperStyle" class="vue-ruler-wrapper" onselectstart="return false;" ref="el">
    <section v-show="$props.visible">
      <div ref="horizontalRuler" class="vue-ruler-h" @mousedown.stop="horizontalDragRuler">
        <span
          v-for="(item, index) in xScale"
          :key="index"
          :style="{ left: index * 50 + 2 + 'px' }"
          class="n"
          >{{ item.id }}</span
        >
      </div>
      <div ref="verticalRuler" class="vue-ruler-v" @mousedown.stop="verticalDragRuler">
        <span
          v-for="(item, index) in yScale"
          :key="index"
          :style="{ top: index * 50 + 2 + 'px' }"
          class="n"
          >{{ item.id }}</span
        >
      </div>
      <div :style="{ top: verticalDottedTop + 'px' }" class="vue-ruler-ref-dot-h" />
      <div :style="{ left: horizontalDottedLeft + 'px' }" class="vue-ruler-ref-dot-v" />
      <div
        v-for="item in lineList"
        :title="item.title"
        :style="getLineStyle(item)"
        :key="item.id"
        :class="`vue-ruler-ref-line-${item.type}`"
        @mousedown="handleDragLine(item)"
      ></div>
    </section>
    <div ref="content" class="vue-ruler-content" :style="contentStyle">
      <slot />
    </div>
    <div v-show="isDrag" class="vue-ruler-content-mask"></div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';
  export default defineComponent({
    name: 'V3RulerComponent',
    props: {
      position: {
        type: String,
        default: 'relative',
        validator: (val: string) => {
          return ['absolute', 'fixed', 'relative', 'static', 'inherit'].indexOf(val) !== -1;
        }
      }, // 规定元素的定位类型
      isHotKey: {
        type: Boolean,
        default: true
      }, // 热键开关
      isScaleRevise: {
        type: Boolean,
        default: false
      }, // 刻度修正(根据content进行刻度重置)
      value: {
        type: Array,
        default: () => {
          return [
            { type: 'h', site: 50 },
            { type: 'v', site: 180 }
          ]; //
        }
      }, // 预置参考线
      contentLayout: {
        type: Object,
        default: () => {
          return { top: 0, left: 0 };
        }
      }, // 内容部分布局
      parent: {
        type: Boolean,
        default: false
      },
      visible: {
        type: Boolean,
        default: true
      },
      stepLength: {
        type: Number,
        default: 50,
        validator: (val: number) => val % 10 === 0
      } // 步长
    },
    emits: ['input', 'update:visible'],
    setup(props, context) {
      /**
       * @description 绑定事件 on(element, event, handler)
       */
      const on = (function () {
        return function (element: any, event: any, handler: any) {
          if (element && event && handler) {
            element.addEventListener(event, handler, false);
          }
        };
      })();

      /**
       * @description 解绑事件 off(element, event, handler)
       */
      const off = (function () {
        return function (element: any, event: any, handler: any) {
          if (element && event) {
            element.removeEventListener(event, handler, false);
          }
        };
      })();
      const size = 17;
      let left_top = 18; // 内容左上填充
      let windowWidth = ref(0); // 窗口宽度
      let windowHeight = ref(0); // 窗口高度
      let xScale = ref<[{ id: number }]>([{ id: 0 }]); // 水平刻度
      let yScale = ref<[{ id: number }]>([{ id: 0 }]); // 垂直刻度
      let topSpacing = 0; // 标尺与窗口上间距
      let leftSpacing = 0; //  标尺与窗口左间距
      let isDrag = ref(false);
      let dragFlag = ''; // 拖动开始标记，可能值x(从水平标尺开始拖动);y(从垂直标尺开始拖动)
      let horizontalDottedLeft = ref(-999); // 水平虚线位置
      let verticalDottedTop = ref(-999); // 垂直虚线位置
      let rulerWidth = 0; // 垂直标尺的宽度
      let rulerHeight = 0; // 水平标尺的高度
      let dragLineId = ''; // 被移动线的ID
      //ref
      const content = ref(null);
      const el = ref(null);
      const verticalRuler = ref(null);
      const horizontalRuler = ref(null);
      const wrapperStyle: any = computed(() => {
        return {
          width: windowWidth.value + 'px',
          height: windowHeight.value + 'px',
          position: props.position
        };
      });
      const contentStyle = computed(() => {
        return {
          left: props.contentLayout.left + 'px',
          top: props.contentLayout.top + 'px',
          padding: left_top + 'px 0px 0px ' + left_top + 'px'
        };
      });
      const lineList = computed(() => {
        let hCount = 0;
        let vCount = 0;
        return props.value.map((item: any) => {
          const isH = item.type === 'h';
          return {
            id: `${item.type}_${isH ? hCount++ : vCount++}`,
            type: item.type,
            title: item.site.toFixed(2) + 'px',
            [isH ? 'top' : 'left']: item.site / (props.stepLength / 50) + size
          };
        });
      });
      onMounted(() => {
        on(document, 'mousemove', dottedLineMove);
        on(document, 'mouseup', dottedLineUp);
        init();
        on(window, 'resize', windowResize);
      });
      onBeforeUnmount(() => {
        off(document, 'mousemove', dottedLineMove);
        off(document, 'mouseup', dottedLineUp);
        off(window, 'resize', windowResize);
      });
      //function
      const init = () => {
        box();
        scaleCalc();
      };

      const windowResize = () => {
        xScale.value = [{ id: 0 }];
        yScale.value = [{ id: 0 }];
        init();
      };
      const getLineStyle = ({ type, top, left }: any) => {
        return type === 'h' ? { top: top + 'px' } : { left: left + 'px' };
      };
      const handleDragLine = ({ type, id }: any) => {
        return type === 'h' ? dragHorizontalLine(id) : dragVerticalLine(id);
      };
      //获取窗口宽与高
      const box = () => {
        if (props.isScaleRevise) {
          // 根据内容部分进行刻度修正
          const contentLeft = (content.value as any).offsetLeft;
          const contentTop = (content.value as any).offsetTop;
          getCalcRevise(xScale.value, contentLeft);
          getCalcRevise(yScale.value, contentTop);
        }
        if (props.parent) {
          const style = window.getComputedStyle((el.value as any).parentNode, null);
          windowWidth.value = parseInt(style.getPropertyValue('width'), 10);
          windowHeight.value = parseInt(style.getPropertyValue('height'), 10);
        } else {
          windowWidth.value = document.documentElement.clientWidth - leftSpacing;
          windowHeight.value = document.documentElement.clientHeight - topSpacing;
        }
        rulerWidth = (verticalRuler.value as any).clientWidth;
        rulerHeight = (horizontalRuler.value as any).clientHeight;
        setSpacing();
      };
      const setSpacing = () => {
        topSpacing = (horizontalRuler.value as any).getBoundingClientRect().y; //.offsetParent.offsetTop
        leftSpacing = (verticalRuler.value as any).getBoundingClientRect().x; // .offsetParent.offsetLeft
      };
      // 计算刻度
      const scaleCalc = () => {
        getCalc(xScale.value, windowWidth.value);
        getCalc(yScale.value, windowHeight.value);
      };

      //获取刻度
      const getCalc = (array: [{ id: number }], length: any) => {
        for (let i = 0; i < (length * props.stepLength) / 50; i += props.stepLength) {
          if (i % props.stepLength === 0 && i != 0) {
            array.push({ id: i });
          }
        }
        console.log(array, 225);
      };
      // 获取矫正刻度方法
      const getCalcRevise = (array: [{ id: number }], length: any) => {
        for (let i = 0; i < length; i += 1) {
          if (i % props.stepLength === 0 && i + props.stepLength <= length) {
            array.push({ id: i });
          }
        }
        console.log(array, 233);
      };
      //生成一个参考线
      const newLine = (val: any) => {
        isDrag.value = true;
        dragFlag = val;
      };
      //虚线移动
      const dottedLineMove = ($event: any) => {
        setSpacing();
        switch (dragFlag) {
          case 'x':
            if (isDrag.value) {
              verticalDottedTop.value = $event.pageY - topSpacing;
            }
            break;
          case 'y':
            if (isDrag.value) {
              horizontalDottedLeft.value = $event.pageX - leftSpacing;
            }
            break;
          case 'h':
            if (isDrag.value) {
              verticalDottedTop.value = $event.pageY - topSpacing;
            }
            break;
          case 'v':
            if (isDrag.value) {
              horizontalDottedLeft.value = $event.pageX - leftSpacing;
            }
            break;
          default:
            break;
        }
      };
      //虚线松开
      const dottedLineUp = ($event: any) => {
        setSpacing();
        if (isDrag.value) {
          isDrag.value = false;
          const cloneList = JSON.parse(JSON.stringify(props.value));
          switch (dragFlag) {
            case 'x':
              cloneList.push({
                type: 'h',
                site: ($event.pageY - topSpacing - size) * (props.stepLength / 50)
              });
              context.emit('input', cloneList);
              break;
            case 'y':
              cloneList.push({
                type: 'v',
                site: ($event.pageX - leftSpacing - size) * (props.stepLength / 50)
              });
              context.emit('input', cloneList);
              break;
            case 'h':
              dragCalc(cloneList, $event.pageY, topSpacing, rulerHeight, 'h');
              context.emit('input', cloneList);
              break;
            case 'v':
              dragCalc(cloneList, $event.pageX, leftSpacing, rulerWidth, 'v');
              context.emit('input', cloneList);
              break;
            default:
              break;
          }
          verticalDottedTop.value = horizontalDottedLeft.value = -10;
        }
      };
      const dragCalc = (list: any, page: any, spacing: any, ruler: any, type: any) => {
        if (page - spacing < ruler) {
          let Index;
          lineList.value.forEach((item: any, index: any) => {
            if (item.id === dragLineId) {
              Index = index;
            }
          });
          list.splice(Index, 1, {
            type: type,
            site: -600
          });
        } else {
          let Index;
          lineList.value.forEach((item, index) => {
            if (item.id === dragLineId) {
              Index = index;
            }
          });
          list.splice(Index, 1, {
            type: type,
            site: (page - spacing - size) * (props.stepLength / 50)
          });
        }
      };
      //水平标尺按下鼠标
      const horizontalDragRuler = () => {
        newLine('x');
      };
      //垂直标尺按下鼠标
      const verticalDragRuler = () => {
        newLine('y');
      };
      // 水平线处按下鼠标
      const dragHorizontalLine = (id: any) => {
        isDrag.value = true;
        dragFlag = 'h';
        dragLineId = id;
      };
      // 垂直线处按下鼠标
      const dragVerticalLine = (id: any) => {
        isDrag.value = true;
        dragFlag = 'v';
        dragLineId = id;
      };
      return {
        wrapperStyle,
        horizontalDragRuler,
        xScale,
        verticalDragRuler,
        yScale,
        verticalDottedTop,
        horizontalDottedLeft,
        lineList,
        getLineStyle,
        handleDragLine,
        contentStyle,
        isDrag,
        content,
        el,
        verticalRuler,
        horizontalRuler
      };
    }
  });
</script>
<style lang="less">
  .vue-ruler-wrapper {
    left: 0;
    top: 0;
    z-index: 999;
    user-select: none;
  }

  .vue-ruler-h,
  .vue-ruler-v,
  .vue-ruler-ref-line-v,
  .vue-ruler-ref-line-h,
  .vue-ruler-ref-dot-h,
  .vue-ruler-ref-dot-v {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    z-index: 999;
  }

  .vue-ruler-h {
    width: calc(100% - 18px);
    height: 18px;
    left: 18px;
    opacity: 0.6;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAASCAMAAAAuTX21AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACNJREFUeNpiYCAdMDKRCka1jGoBA2JZZGshiaCXFpIBQIABAAplBkCmQpujAAAAAElFTkSuQmCC)
      repeat-x;
    /*./image/ruler_h.png*/
  }

  .vue-ruler-v {
    width: 18px;
    height: calc(100% - 18px);
    top: 18px;
    opacity: 0.6;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAyCAMAAABmvHtTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMzMzAAAA////BqjYlAAAACBJREFUeNpiYGBEBwwMTGiAakI0NX7U9aOuHyGuBwgwAH6bBkAR6jkzAAAAAElFTkSuQmCC)
      repeat-y;
    /*./image/ruler_v.png*/
  }

  .vue-ruler-v .n,
  .vue-ruler-h .n {
    position: absolute;
    font: 10px/1 Arial, sans-serif;
    color: #333;
    cursor: default;
    top: 1px;
  }

  .vue-ruler-v .n {
    width: 8px;
    left: 3px;
    word-wrap: break-word;
  }

  .vue-ruler-ref-line-v,
  .vue-ruler-ref-line-h,
  .vue-ruler-ref-dot-h,
  .vue-ruler-ref-dot-v {
    z-index: 998;
  }

  .vue-ruler-ref-line-h {
    width: 100%;
    height: 3px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFSv//AAAAH8VRuAAAAA5JREFUeNpiYIACgAADAAAJAAE0lmO3AAAAAElFTkSuQmCC)
      repeat-x left center;
    /*./image/line_h.png*/
    cursor: n-resize;
    /*url(./image/cur_move_h.cur), move*/
  }

  .vue-ruler-ref-line-v {
    width: 3px;
    height: 100%;
    _height: 9999px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAICAMAAAAPxGVzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFSv//AAAAH8VRuAAAAA5JREFUeNpiYEAFAAEGAAAQAAGePof9AAAAAElFTkSuQmCC)
      repeat-y center top;
    /*./image/line_v.png*/
    cursor: w-resize;
    /*url(./image/cur_move_v.cur), move*/
  }

  .vue-ruler-ref-dot-h {
    width: 100%;
    height: 3px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFf39/////F3PnHQAAAAJ0Uk5T/wDltzBKAAAAEElEQVR42mJgYGRgZAQIMAAADQAExkizYQAAAABJRU5ErkJggg==)
      repeat-x left 1px;
    /*./image/line_dot.png*/
    cursor: n-resize;
    /*url(./image/cur_move_h.cur), move*/
    top: -10px;
  }

  .vue-ruler-ref-dot-v {
    width: 3px;
    height: 100%;
    _height: 9999px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFf39/////F3PnHQAAAAJ0Uk5T/wDltzBKAAAAEElEQVR42mJgYGRgZAQIMAAADQAExkizYQAAAABJRU5ErkJggg==)
      repeat-y 1px top;
    /*./image/line_dot.png*/
    cursor: w-resize;
    /*url(./image/cur_move_v.cur), move*/
    left: -10px;
  }

  .vue-ruler-content {
    position: absolute;
    z-index: 997;
    width: 100%;
    height: 100%;
  }

  .vue-ruler-content-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 998;
  }
</style>
