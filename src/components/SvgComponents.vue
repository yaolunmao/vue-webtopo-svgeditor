<!-- 箭头向下svg组件 -->
<template>
    <CircuitBreakerSvg :height = height :color= color :width= width  v-if="type=='CircuitBreakerSvg'"></CircuitBreakerSvg>
    <VerticalLineSvg :height = height :color= color :width= width v-else-if="type=='VerticalLineSvg'"></VerticalLineSvg>
    <TextSvg :fontSize= fontSize :color= color :text= svgText v-else-if="type=='TextSvg'"></TextSvg>
    <IsolatingSwitchSvg  :height = height :color= color :width= width v-else-if="type=='IsolatingSwitchSvg'"></IsolatingSwitchSvg>
    <LightningArresterSvg :height = height :color= color :width= width v-else-if="type=='LightningArresterSvg'"></LightningArresterSvg>
    <StandardCapacitorSvg :height = height :color= color :width= width v-else-if="type=='StandardCapacitorSvg'"></StandardCapacitorSvg>
    <WireConnectionSvg :height = height :color= color :width= width v-else-if="type=='WireConnectionSvg'"></WireConnectionSvg>
    <WireBreakOffSvg :height = height :color= color :width= width v-else-if="type=='WireBreakOffSvg'"></WireBreakOffSvg>
    <TableSvg :tableDataList = tableData :editable= editable v-else-if="type=='TableSvg'"></TableSvg>
    <HorizontalLineSvg :height = height :color= color :width= width v-else-if="type=='HorizontalLineSvg'"></HorizontalLineSvg>
    <PolylineUpSvg :height = height :color= color :width= width v-else-if="type=='PolylineUpSvg'"></PolylineUpSvg>
    <PolylineDownSvg :height = height :color= color :width= width v-else-if="type=='PolylineDownSvg'"></PolylineDownSvg>
    <ArrowUpSvg :height = height :color= color :width= width v-else-if="type=='ArrowUpSvg'"></ArrowUpSvg>
    <ArrowDownSvg :height = height :color= color :width= width v-else-if="type=='ArrowDownSvg'"></ArrowDownSvg>
    <GroundGraySvg :height = height :color= color :width= width v-else-if="type=='GroundGraySvg'"></GroundGraySvg>
    <SignalLamp :height = height :color= color :width= width v-else-if="type=='SignalLamp'"></SignalLamp>
    <RectSvg :height = height :color= color :width= width v-else-if="type=='RectSvg'"></RectSvg>
    <TwoCircleSvg :height = height :color= color :width= width v-else-if="type=='TwoCircleSvg'"></TwoCircleSvg>
    <TransformerY :height = height :color= color :width= width v-else-if="type=='TransformerYSvg'"></TransformerY>
    <TransformerTriphaseOpen :height = height :color= color :width= width v-else-if="type=='TransformerTriphaseOpenSvg'"></TransformerTriphaseOpen>
    <DoubleWindingSvg :height = height :color= color :width= width v-else-if="type=='DoubleWindingSvg'"></DoubleWindingSvg>
    <DoubleWindingSvgB :height = height :color= color :width= width v-else-if="type=='DoubleWindingSvgB'"></DoubleWindingSvgB>
    <GGJ :height = height :color= color :width= width v-else-if="type=='GGJSvg'"></GGJ>
    <StandardReactance :height = height :color= color :width= width v-else-if="type=='StandardReactanceSvg'"></StandardReactance>
    <Alternator :height = height :color= color :width= width v-else-if="type=='AlternatorSvg'"></Alternator>
    <SmartTerminalSvg :height = height :color= color :width= width v-else-if="type=='SmartTerminalSvg'"></SmartTerminalSvg>
</template>
<script>
import CircuitBreakerSvg from '@/components/svgCpt/CircuitBreakerSvg.vue';//断路器svg
import VerticalLineSvg from '@/components/svgCpt/VerticalLineSvg.vue';//竖线svg
import TextSvg from '@/components/svgCpt/TextSvg.vue';//文字svg
import IsolatingSwitchSvg from '@/components/svgCpt/IsolatingSwitchSvg.vue';//隔离开关svg
import LightningArresterSvg from '@/components/svgCpt/LightningArresterSvg.vue';//避雷器svg
import StandardCapacitorSvg from '@/components/svgCpt/StandardCapacitorSvg.vue';//标准电容器svg
import WireConnectionSvg from '@/components/svgCpt/WireConnectionSvg.vue';//电线连接svg
import WireBreakOffSvg from '@/components/svgCpt/WireBreakOffSvg.vue';//电线断开svg
import TableSvg from '@/components/svgCpt/TableSvg.vue';//表格svg
import HorizontalLineSvg from '@/components/svgCpt/HorizontalLineSvg.vue';//横线svg
import PolylineUpSvg from '@/components/svgCpt/PolylineUpSvg.vue';//多段向上折线
import PolylineDownSvg from '@/components/svgCpt/PolylineDownSvg.vue';//多段向下折线
import ArrowUpSvg from '@/components/svgCpt/ArrowUpSvg.vue';//箭头向上
import ArrowDownSvg from '@/components/svgCpt/ArrowDownSvg.vue';//箭头向下
import GroundGraySvg from '@/components/svgCpt/GroundGraySvg.vue';//接地灰白
import SignalLamp from '@/components/svgCpt/SignalLamp.vue';//接地灰白
import RectSvg from '@/components/svgCpt/RectSvg.vue';//长方形
import TwoCircleSvg from '@/components/svgCpt/TwoCircleSvg.vue';//双圆
import TransformerY from '@/components/svgCpt/TransformerY.vue';//电流互感器y
import TransformerTriphaseOpen from '@/components/svgCpt/TransformerTriphaseOpen.vue';//三相互感器开口
import DoubleWindingSvg from '@/components/svgCpt/DoubleWindingSvg.vue';//双绕组变压器
import DoubleWindingSvgB from '@/components/svgCpt/DoubleWindingSvgB.vue';//双绕组变压器
import GGJ from '@/components/svgCpt/GGJ.vue';//电容柜
import StandardReactance from '@/components/svgCpt/StandardReactance.vue';//标准电抗
import Alternator from '@/components/svgCpt/Alternator.vue';//发电机
import SmartTerminalSvg from '@/components/svgCpt/SmartTerminalSvg.vue';//发电站
export default {
    props: ['height','color','width','type','fontSize','tableData','svgText','editable'],
    components: {CircuitBreakerSvg ,VerticalLineSvg,TextSvg,IsolatingSwitchSvg,LightningArresterSvg,StandardCapacitorSvg,WireConnectionSvg,WireBreakOffSvg,TableSvg
  ,HorizontalLineSvg,PolylineUpSvg,PolylineDownSvg,ArrowUpSvg,ArrowDownSvg,GroundGraySvg,SignalLamp,RectSvg,TwoCircleSvg,TransformerY,TransformerTriphaseOpen,DoubleWindingSvg,DoubleWindingSvgB,GGJ
  ,StandardReactance,Alternator,SmartTerminalSvg},
};
</script>