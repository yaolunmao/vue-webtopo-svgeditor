<!-- 电路图编辑器页面 -->
<template>
  <div>
    <div id="components-layout">
    <a-layout>
      <!-- {{tableDefaultData}} -->
      <a-layout-header>
            <a-button type="primary" @click="testD">导出数据</a-button>     
            <a-button type="primary" @click="testE">载入模板</a-button>
            <a-button type="primary" @click="testH">预览</a-button>
      </a-layout-header>
      <span v-if="shrink" @click="fullScreen" class="icon-shrink svgfont">&#xe648;</span>
      <span v-if="!shrink" @click="exitFullscreen" class="icon-shrink svgfont">&#xe62b;</span>
      <a-layout class="pageMain">
        <a-layout-sider class="leftNav">
          <LeftToolBar :svgInfoData= svgInfoData></LeftToolBar>
        </a-layout-sider>
        <a-layout-content class="centerContain" :class="{ fixed: !shrink }">
          <div class="canvas-content" id="canvas"  @mousemove="MouseMove"  @mousedown="MousedownCanvas" @mouseup="MouseupCanvas" @dblclick="DblClick" @mousewheel="MouseWheel">
            <!--拖动辅助线-->
            <div id="guide-x"></div>
            <div id="guide-y"></div>
            <!-- 画布 -->
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background-color:#000000" width="100%" height="100%">
            <defs/>
            <filter x="0" y="0" width="1" height="1" id="solid">
            <feFlood flood-color="rgb(255,255,255)"/>
            <feComposite in="SourceGraphic"/>
            </filter>
            <g style="cursor:pointer" v-for="(item,index) in svgLists" :key="item" :id=item.id  @mousedown="MousedownSvg(item.id,index)" :title=item.title :transform="'translate('+(item.svgPositionX)+','+(item.svgPositionY)+')' +'rotate('+item.angle+')'" >
              <DynamicTest :svg_color= item.svgColor :svgtype= item.type :svgInfoData= svgInfoData></DynamicTest>
              <!-- <SvgComponents :color= item.svgColor :width= item.width :type= item.type :tableData= item.tableData :fontSize= item.fontSize :svgText= item.svgText :editable= editable></SvgComponents> -->
            </g>
            </svg>
          </div>
        </a-layout-content>
        <a-layout-sider class="rightNav">
          <RightToolBar :svgInfo = selectSvgInfo @setTableAttr="setTableAttr"></RightToolBar>
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </div>
  </div>
</template>
<script>
import LeftToolBar from '@/components/LeftToolBar.vue';
import RightToolBar from '@/components/RightToolBar.vue';
// import SvgComponents from '@/components/SvgComponents.vue';
import global from '@/global/global.js';//全局变量
import DynamicTest from '@/components/DynamicTest.vue';
export default {
  components: { LeftToolBar,RightToolBar,DynamicTest},
  data(){
    return{
      svgInfoData:[],//接口获取到的组件数据
      shrink:true,//收缩状态  true收缩  false展开
      svgLists:[
        ],
        //鼠标位置
        mousePosition:{
          positionX:'',
          positiony:''
        },
        //辅助线元素
        guideX:'',
        guideY:'',
        CurrentlySelectedToolBarType:'',//选中的工具栏svg类型
        CurrentlySelectedToolBarTypeName:'',//选中的工具栏svg类型名称
        CurrentlySelectedToolBarTitle:'',//选中的工具栏svg标题
        CurrentlySelectedToolBarColor:'',//选中的工具栏svg颜色
        CurrentlySelectedToolBarHeight:'',//选中的工具栏svg高度
        CurrentlySelectedToolBarFontSize:'',//选中的工具栏svg字体大小
        CurrentlySelectedToolBarText:'',//选中的工具栏svg文字
        CurrentlySelectedToolBarWidth:'',//选中的工具栏svg高度
        CurrentlySelectedToolBarAngle:'',//选中的工具栏svg角度
        moveSvgID:'',//要移动的svg
        moveSvgIndex:0,
        testvalue:0,
        selectSvgInfo:'',
        tableRowCount:2,//表格默认行数
        tableColCount:2,//表格默认列数
        tableDefaultData:[],
        canvasZoom:70,//画布缩放百分比
        userInfo:'',
        editable:true
    }
  },
  methods:{
      // 全屏  
      fullScreen() {
        let _this = this
          this.shrink = !this.shrink
          let element = document.documentElement;
          if (element.requestFullscreen) {
              element.requestFullscreen();
          } else if (element.msRequestFullscreen) {
              element.msRequestFullscreen();
          } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
          } else if (element.webkitRequestFullscreen) {
              element.webkitRequestFullscreen();
          }
          // 监听全屏后esc事件
          window.onresize = function() {
            if (!checkFull()) {
              _this.shrink = !_this.shrink
            }
          }
          function checkFull() {
            var isFull =
              document.fullscreenElement ||
              document.mozFullScreenElement ||
              document.webkitFullscreenElement
            if (isFull === undefined) isFull = false
            return isFull
          }
      }, 
      //退出全屏 
      exitFullscreen() {
          // this.shrink = !this.shrink
          if (document.exitFullscreen) {
              document.exitFullscreen();
          } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
          } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
          }
      },
      MouseMove(e){    
        if(e.offsetX==-1){
          return;
        }
        if(e.target.nodeName=='INPUT'){
          return;
        }
        if(e.offsetY==-1){
          return;
        }
        if(this.moveSvgID==''){
          return;
        }   
        this.mousePosition.positionX=e.offsetX;
        this.mousePosition.positionY=e.offsetY;
        if(this.mousePosition.positionX<1){
          this.mousePosition.positionX=10;
        }
        if(this.mousePosition.positionY<1){
          this.mousePosition.positionY=10;
        }
        let svgID=this.svgLists[this.moveSvgIndex].id;
        //排除当前元素剩下的所有svg元素的列表
        let anyPositionList=this.svgLists.filter(function(list){
          return list.id!=svgID
        });
        //将要移动的元素坐标设备为鼠标坐标
        let svgPositionX=this.mousePosition.positionX;
        let svgPositionY=this.mousePosition.positionY;
        let _this=this;
        setTimeout(function()
        {
          //少于十个像素自动吸附
          //从所有的x坐标列表中查与当前坐标少于10个像素的组件是否存在
          let exitsAdsorbX=anyPositionList.filter(function(list){
            return -10<(list.svgPositionX-svgPositionX)&&(list.svgPositionX-svgPositionX)<10
          });
          if(exitsAdsorbX.length>0){
            svgPositionX=exitsAdsorbX[0].svgPositionX;
          }
          //y轴相同 横向坐标自动吸附
          let exitsAdsorbY=anyPositionList.filter(function(list){
            return -10<(list.svgPositionY-svgPositionY)&&(list.svgPositionY-svgPositionY)<10
          });
          if(exitsAdsorbY.length>0){
            svgPositionY=exitsAdsorbY[0].svgPositionY;
          }
          _this.svgLists[_this.moveSvgIndex].svgPositionX=svgPositionX;
          _this.svgLists[_this.moveSvgIndex].svgPositionY=svgPositionY;
          //从所有的x坐标列表中查当前坐标是否存在
          let exitsNowX=anyPositionList.filter(function(list){
            return list.svgPositionX===svgPositionX
          });
          if(exitsNowX.length>0){
            _this.guideY.style.setProperty('left',svgPositionX-1+'px');
            _this.guideY.style.display='inline';
          }
          else{
            _this.guideY.style.display='none';
          }
          //从所有的y坐标列表中查当前坐标是否存在
          let exitsNowY=anyPositionList.filter(function(list){
            return list.svgPositionY===svgPositionY
          });
          if(exitsNowY.length>0){
            _this.guideX.style.setProperty('top',svgPositionY+'px');
            _this.guideX.style.display='inline';
          }
          else{
            _this.guideX.style.display='none';
          }
        },1);
      },      
      MousedownCanvas(){
        //console.log('点击了画布');

      },
      MousedownSvg(id,index){
        global.CurrentlySelectedToolBarType='';
        global.CurrentlySelectedToolBarTitle='';
        this.CurrentlySelectedToolBarType='';
        this.CurrentlySelectedToolBarTitle='';
        //从数组里面根据index找到当前元素
        this.moveSvgID=id;
        this.moveSvgIndex=index;
        this.selectSvgInfo=this.svgLists[index];
        //获取所有g标签 将当前标签追加选中样式
        let gAnyList=document.querySelectorAll('g');
        gAnyList.forEach(g=>{
          g.classList.remove("topo-layer-view-selected")
        });
        document.getElementById(id).classList.add("topo-layer-view-selected");
      },
      MouseupCanvas(){
        this.guideX.style.display='none';
        this.guideY.style.display='none';
        if(this.CurrentlySelectedToolBarTitle!=''||this.CurrentlySelectedToolBarType!=''){
          return;
        }
        this.moveSvgID='';
      },
      MouseWheel(e){
            //获取当前选中组件
            let selectSvgInfo= this.selectSvgInfo;
            if(selectSvgInfo==undefined||selectSvgInfo==null||selectSvgInfo==''){
              return;
            }
            e.preventDefault();
            //判断滚轮方向 -100是往上滑 100是下滑
            let svgZoom=e.deltaY=="-100"?"5":"-5";
            selectSvgInfo.height+=parseInt(svgZoom);
            if(selectSvgInfo.height<1){
              selectSvgInfo.height=1;
            }
      },
      DblClick(){
        //获取所有g标签 清除所有选中样式
        let gAnyList=document.querySelectorAll('g');
        gAnyList.forEach(g=>{
          g.classList.remove("topo-layer-view-selected")
        });
        this.selectSvgInfo='';
      },
      testD(){
        console.log(JSON.stringify(this.svgLists));
        alert(JSON.stringify(this.svgLists));
      },
      testE(){
        this.svgLists=global.AnalogData;
      },   
      testH(){
          localStorage.setItem('svginfo', JSON.stringify(this.svgLists));
          this.$router.push({
          path: "/CircuitPreview",
          name: "CircuitPreview"
        });
      },
      //设置表格属性
      setTableAttr(id,rowCount,colCount){
        //根据当前id找到当前表格的index
        let tableIndex=this.svgLists.indexOf(this.svgLists.filter(f=>f.id==id)[0]);
        if(tableIndex==-1){
          return;
        }
        let svgType=this.svgLists.filter(f=>f.id==id)[0].type;
        if(svgType!='TableSvg'){
          return;
        }
        let tableData=[];
        for(let r=0;r<rowCount;r++){
          let tableColDataList=[];
          for(let c=0;c<colCount;c++){
            if(this.svgLists[tableIndex].tableData.length>=r+1&&this.svgLists[tableIndex].tableData[r].cols.length>=c+1){
              tableColDataList.push(this.svgLists[tableIndex].tableData[r].cols[c]); 
            }
            else{
              
              let tableColData={
                "id": this.$UCore.GenUUid(),
                "val": `${r+1}行${c+1}列`
              }
              tableColDataList.push(tableColData); 
            }

        }
        let tableRowData={
          "cols":tableColDataList
        };
        tableData.push(tableRowData)
        }
        this.svgLists[tableIndex].tableData=tableData;
      }
  },
  mounted(){
      let _this=this;
      let canvasdiv=document.querySelector('#canvas');
      _this.guideX=document.querySelector('#guide-x');//辅助线x轴
      _this.guideY=document.querySelector('#guide-y');//辅助线y轴
      canvasdiv.addEventListener("dragover", function (e) {
        e.preventDefault();
        _this.CurrentlySelectedToolBarType=global.CurrentlySelectedToolBarType;
        _this.CurrentlySelectedToolBarTitle=global.CurrentlySelectedToolBarTitle;
        _this.CurrentlySelectedToolBarTypeName=global.CurrentlySelectedToolBarTypeName;
        _this.CurrentlySelectedToolBarColor=global.CurrentlySelectedToolBarColor;
        _this.CurrentlySelectedToolBarHeight=global.CurrentlySelectedToolBarHeight;
        _this.CurrentlySelectedToolBarFontSize=global.CurrentlySelectedToolBarFontSize;
        _this.CurrentlySelectedToolBarText=global.CurrentlySelectedToolBarText;
        _this.CurrentlySelectedToolBarWidth=global.CurrentlySelectedToolBarWidth;
        _this.CurrentlySelectedToolBarAngle=global.CurrentlySelectedToolBarAngle;
      }, false);
      canvasdiv.addEventListener("drop", function (e) {
        e.preventDefault();
        if(_this.CurrentlySelectedToolBarType==''){
          return;
        }
        let tableData=[];
        if(_this.CurrentlySelectedToolBarType=='TableSvg'){
        for(let r=0;r<_this.tableRowCount;r++){
          let tableColDataList=[];
          for(let c=0;c<_this.tableColCount;c++){
          let tableColData={
            "id": _this.$UCore.GenUUid(),
            "val": `${r+1}行${c+1}列`
          }
          tableColDataList.push(tableColData);
        }
        let tableRowData={
          "cols":tableColDataList
        };
        tableData.push(tableRowData)
        }
        }
        //根据类型和鼠标位置创建组件
        let svgItem={
          id:_this.$UCore.GenUUid(),
          sort:0,
          title:_this.CurrentlySelectedToolBarTitle,
          type:_this.CurrentlySelectedToolBarType,
          typeName:_this.CurrentlySelectedToolBarTypeName,
          svgColor:_this.CurrentlySelectedToolBarColor,
          svgPositionX:e.offsetX,
          svgPositionY:e.offsetY,
          height:_this.CurrentlySelectedToolBarHeight,
          width:_this.CurrentlySelectedToolBarWidth,
          fontSize:_this.CurrentlySelectedToolBarFontSize,
          svgText:_this.CurrentlySelectedToolBarText,
          tableRowCount:_this.tableRowCount,
          tableColCount:_this.tableColCount,
          tableData:tableData,
          angle:_this.CurrentlySelectedToolBarAngle
          //translate:`translate(${this.mousePosition.positionX},${this.mousePosition.positionY})`
        };
        _this.svgLists.push(svgItem);
        setTimeout(function()
        {
        //获取所有g标签 将当前标签追加选中样式
        let gAnyList=document.querySelectorAll('g');
        gAnyList.forEach(g=>{
          g.classList.remove("topo-layer-view-selected")
        });
        document.getElementById(svgItem.id).classList.add("topo-layer-view-selected");
        _this.selectSvgInfo=svgItem;
        },100);
      }, false);
    },
  created(){
    let _this=this;
      //当前页面监视键盘输入
      document.onkeydown = function(e) {
          //获取当前选中组件
          let selectSvgInfo= _this.selectSvgInfo;
          if(selectSvgInfo==undefined||selectSvgInfo==null||selectSvgInfo==''){
            return;
          }
          //事件对象兼容
          let e1 = e  || window.event || arguments.callee.caller.arguments[0]
          //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
          if (e1 && e1.keyCode == 37) {
            e.preventDefault();
            selectSvgInfo.svgPositionX-=1;
          } else if (e1 && e1.keyCode == 38) {
            e.preventDefault();
            selectSvgInfo.svgPositionY-=1;
          } else if (e1 && e1.keyCode == 39) {
            e.preventDefault();
            selectSvgInfo.svgPositionX+=1;
          } else if (e1 && e1.keyCode == 40) {
            e.preventDefault();
            selectSvgInfo.svgPositionY+=1;
          }
          //ctrl  c
          else if (e1 && e1.ctrlKey&&e1.keyCode == 67) {
            e.preventDefault();
            let copySvgInfoStr=JSON.stringify(selectSvgInfo);
            let copySvgInfo=JSON.parse(copySvgInfoStr);
            copySvgInfo.id=_this.$UCore.GenUUid();
            copySvgInfo.svgPositionX=selectSvgInfo.svgPositionX+10;
            copySvgInfo.svgPositionY=selectSvgInfo.svgPositionY+10;
            _this.svgLists.push(copySvgInfo);
            _this.selectSvgInfo=copySvgInfo;
            setTimeout(function()
            {
            //获取所有g标签 将当前标签追加选中样式
            let gAnyList=document.querySelectorAll('g');
            gAnyList.forEach(g=>{
              g.classList.remove("topo-layer-view-selected")
            });
            document.getElementById(copySvgInfo.id).classList.add("topo-layer-view-selected");
            },100);
          }
          //deleted
          else if (e1 &&e1.keyCode == 46) {
            e.preventDefault();
            //根据当前id找到当前元素的index
            let selectSvgIndex=_this.svgLists.indexOf(_this.svgLists.filter(f=>f.id==selectSvgInfo.id)[0]);
            _this.svgLists.splice(selectSvgIndex,1);
          }
          
      }
    //请求接口获取组件
    this.$axios.get('/InterfaceReturn.json')
      .then(function (response) {
        _this.svgInfoData=response.data;
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: #f2f2f2;
    box-shadow: 1px 1px 5px #333 inset;
}
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color:#444;
}
#components-layout .ant-layout-header{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  line-height: 50px;
  height: 50px;
  background: #fff;
  color: rgb(0, 0, 0);
  z-index: 2;
  box-shadow: 1px 1px 5px #ddd;
}
.pageMain{
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 0;
  overflow: auto;
}
.leftNav{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  min-width: unset !important;
  max-width: unset !important;
  width: 260px !important;
  z-index: 1;
  overflow: auto;
}
.centerContain{
  position: absolute;
  left: 260px;
  right: 300px;
  top: 0;
  bottom: 0;
  z-index: 1;
  overflow: auto !important;
  overflow-x: auto !important;
  transition: all 0.3s;
  z-index: 111;

  &.fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  
  .canvas-content{
    width: 1920px;
    height: 1080px;
  }
  .btns-content{
    position: fixed;
    bottom: 10px;
    right: 320px;
    left: 280px;
    button{
      margin-left: 10px;
    }
  }
}
.rightNav{
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  min-width: unset !important;
  max-width: unset !important;
  width: 300px !important;
  z-index: 1;
  overflow: auto;
}
.icon-shrink{
  position: fixed;
  right: 20px;
  top: 5px;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  background:#1890ff ;
  width: 38px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  border-radius: 50%;
  user-select: none;
  z-index: 1111;
}








#components-layout .ant-layout-sider {
  background: #fff;
  color: rgb(167, 164, 164);
}
#guide-x{
    display: none;
    position: absolute; 
    border-top: 1px dashed #55f; 
    width: 100%; 
    left: 0px; 
    top: 500px; 

}

#guide-y{
    display: none;
    position: absolute; 
    border-left: 1px dashed #55f; 
    height: 100%; 
    left: 100px; 
    top: 0px; 
    

}
#canvas{
   -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
.ant-slider {
  margin-bottom: 16px;
}
.topo-layer {
        width: 100%;
        height: 100%;
        position: absolute;
        transform-origin: left top;
        overflow: auto;


        background-image: 
        linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), 
        linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc); 
        background-size: 20px 20px;
        background-position: 0 0, 10px 10px;
}
            .resize-left-top {
                position: absolute;
                height: 10px;
                width: 10px;
                background-color: white;
                border: 1px solid #0cf;
                left: -5px;
                top: -5px;
                cursor: nwse-resize;
            }

            .resize-left-bottom {
                position: absolute;
                height: 10px;
                width: 10px;
                background-color: white;
                border: 1px solid #0cf;
                left: -5px;
                bottom: -5px;
                cursor: nesw-resize;
            }

            .resize-right-top {
                position: absolute;
                height: 10px;
                width: 10px;
                background-color: white;
                border: 1px solid #0cf;
                right: -5px;
                top: -5px;
                cursor: nesw-resize;
            }

            .resize-right-bottom {
                position: absolute;
                height: 10px;
                width: 10px;
                background-color: white;
                border: 1px solid #0cf;
                right: -5px;
                bottom: -5px;
                cursor: nwse-resize;
            } 

        .topo-layer-view-selected {
            outline: 1px solid #0cf;
        }
    
</style>
