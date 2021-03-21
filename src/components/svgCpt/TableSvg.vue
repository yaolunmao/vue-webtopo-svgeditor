<!-- 表格svg组件 -->
<template>
    <foreignObject :x="0" :y="0">
        <div id="divtable" class="svgfont" :style="editable?'':'display:none'">&#xe633;</div>
        <table  border="0" cellpadding="0" cellspacing="0" style="pointer-events: none">
            <tr v-for="(tableDataRowItem,index) in tableDataList" :key="index" >
                <td v-for="(tableDataColItem) in tableDataRowItem.cols " :key="tableDataColItem.id" class="tdsvg">
                    <div class="add-tag">
                    <span>{{ tableDataColItem.val }}</span>
                    <a-input :disabled="!editable"  v-model:value="tableDataColItem.val" class="ainput" size="small"/>
                </div>
                </td>             
            </tr>           
        </table>
</foreignObject>
</template>
<script>
export default {
    props: ['tableDataList','x','y','editable'],
    methods:{

    }
};
</script>
<style lang="less" scoped>
foreignObject{
    width: 0px;
    height: 0px;
    // position:absolute;
    overflow: visible;
    cursor: pointer;
}
.add-tag {
    color: #333;
    padding: 0;
    position: relative;

    span {
        display: inline-block;
        height: 100%;
        padding: 0 32px;
    }

    .ainput {
        pointer-events: auto;
        display: inline-block;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        caret-color: #426BF2;
        ::-webkit-input-placeholder {
            color: #aaa;
        }
        border-style: none;
        padding: 0 32px;
        color: rgb(255, 255, 0);
        background-color: black;
    }
    }
    foreignObject #divtable{
        position: absolute;
        left: 0;
        top: 0;
        line-height: 20px;
        z-index: 111;
        color: #fff;
        // pointer-events: auto;
        display: none;
        cursor: pointer;
        font-size: 20px;
    }
    foreignObject:hover #divtable {
        pointer-events: none;
        display:block;
    }
    .tdsvg{
        border:1px solid rgb(255, 255, 0);
        white-space:nowrap;
        background:#fff;
        color:#999;
        text-align:center;
        font-size:16px;
        background-color: lawngreen;
    }
</style>