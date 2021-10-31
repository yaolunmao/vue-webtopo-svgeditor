<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style="background-color:#000000;"
        width="100%"
        height="100%"
        :viewBox="`0 0 ${props.svgCanvas.width} ${props.svgCanvas.height}`"
    >
        <g
            v-for="(item,index) in props.svg_data"
            :key="item.id"
            :id="item.id"
            :transform="'translate(' + (item.svgPositionX) + ',' + (item.svgPositionY) + ')' + 'rotate(' + item.angle + ')' + 'scale(' + item.size + ')'"
        >
            <svg-dynamic
                :component_type="item.type"
                :component_template="props.component_infos.filter(f => f.type == item.type)[0].template"
                :component_props="props.component_infos.filter(f => f.type == item.type)[0].props"
                :component_attr="item"
            />
        </g>
    </svg>
</template>
<script setup lang="ts">
import SvgDynamic from "./SvgDynamic.vue";
import { ISvgDataLists, ISvgCanvas, IComponentInfo } from "../Model";

const props = defineProps({
    //组件的json格式
    component_infos: {
        type: Array as () => Array<IComponentInfo>,
        required: true,
        default: []
    },
    //要渲染的数据
    svg_data: {
        type: Array as () => Array<ISvgDataLists>,
        required: true,
        default: []
    },
    svgCanvas: {
        type: Object as () => ISvgCanvas,
        default: { width: 1520, height: 720 }
    }
});
</script>