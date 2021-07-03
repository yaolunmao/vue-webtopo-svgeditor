<!-- 电路图编辑器页面 -->
<template>
  <div>
    <div id="components-layout">
      <a-layout>
        <!-- {{tableDefaultData}} -->
        <a-layout-header>
          <a-modal v-model:visible="addSvgVisible"
                   title="模拟添加组件"
                   @ok="addSvgHandleOk">
            <a-form layout="horizontal">
              <a-form-item label="类型">
                <a-input v-model:value="testAddSvg.type"
                         placeholder="请输入组件类型" />
              </a-form-item>
              <a-form-item label="标题">
                <a-input v-model:value="testAddSvg.title"
                         placeholder="请输入组件标题" />
              </a-form-item>
              <a-form-item label="svg代码">
                <a-input v-model:value="testAddSvg.template"
                         placeholder="请输入svg代码" />
              </a-form-item>
              <a-form-item label="默认颜色">
                <input type="color"
                       v-model="testAddSvg.default_attr.color">
              </a-form-item>
              <a-form-item label="预览图像">
                <a-input v-model:value="testAddSvg.priview_img"
                         placeholder="请输入预览图像地址" />
              </a-form-item>
            </a-form>
          </a-modal>
          <!-- <a-button type="primary"
                    @click="testD">导出数据</a-button>
          <a-button type="primary"
                    @click="testE">载入模板</a-button> -->

          <a-button type="danger">当前为2.1版本</a-button>

          <a-button type="primary"
                    @click="testH"
                    style="margin-left:20px">预览</a-button>

          <a style="margin-left:20px">
            <a-button type="primary"
                      style="margin-left:20px"
                      @click="showAddSvgModal">
              添加组件
            </a-button>
          </a>
          <a style="margin-left:20px"
             href="https://svgv1.yaolunmao.top">
            <a-button type="primary">1.0版本</a-button>
          </a>
          <a style="margin-left:20px"
             href="https://svgv2.yaolunmao.top">
            <a-button type="primary">2.0版本</a-button>
          </a>
          <a style="margin-left:20px"
             href="https://svgedit.yaolunmao.top">
            <a-button type="primary">在线绘图</a-button>
          </a>
          <a style="margin-left:20px"
             href="https://github.com/yaolunmao/vue-webtopo-svgeditor">
            <a-button type="primary">帮助</a-button>
          </a>
          <a style="margin-left:20px">
            <a-button type="primary"
                      @click="exportSvg">导出svg</a-button>
          </a>
        </a-layout-header>
        <span v-if="!shrink"
              @click="exitFullscreen"
              class="icon-shrink svgfont">&#xe62b;</span>
        <a-layout class="pageMain">
          <a-layout-sider class="leftNav">
            <LeftToolBar :svgInfoData=svgInfoData></LeftToolBar>
          </a-layout-sider>
          <a-layout-content class="centerContain"
                            :class="{ fixed: !shrink }">
            <div class="canvas-content"
                 id="canvas"
                 @mousemove="MouseMove"
                 @mousedown="MousedownCanvas"
                 @mouseup="MouseupCanvas"
                 @dblclick="DblClick"
                 @mousewheel="MouseWheel">
              <!--拖动辅助线-->
              <div id="guide-x"></div>
              <div id="guide-y"></div>
              <!-- 画布 -->
              <svg version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink"
                   style="background-color:#000000"
                   width="100%"
                   height="100%"
                   id="svgCanvas">
                <defs />
                <filter x="0"
                        y="0"
                        width="1"
                        height="1"
                        id="solid">
                  <feFlood flood-color="rgb(255,255,255)" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <g style="cursor:pointer"
                   v-for="(item,index) in svgLists"
                   :key="item"
                   :id=item.id
                   :class="selectSvgInfo.id==item.id?'topo-layer-view-selected':''"
                   @mousedown="MousedownSvg(item.id,index,item.svgPositionX,item.svgPositionY,$event)"
                   :title=item.title
                   :transform="'translate('+(item.svgPositionX)+','+(item.svgPositionY)+')' +'rotate('+item.angle+')' +'scale('+item.size+')'">
                  <SvgComponents :component_prop=item
                                 :svgInfoData=svgInfoData></SvgComponents>
                </g>
              </svg>
            </div>
          </a-layout-content>
          <a-layout-sider class="rightNav">
            <RightToolBar :svgInfo=selectSvgInfo
                          @setTableAttr="setTableAttr"></RightToolBar>
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
import SvgComponents from '@/components/SvgComponents.vue';
export default {
  components: { LeftToolBar, RightToolBar, SvgComponents },
  data () {
    return {
      testAddSvg: {
        type: "testAddSvg",
        title: "测试新增组件",
        template: "<path :fill=\"prop_data.svgColor\" :stroke=\"prop_data.svgColor\" stroke-width=\"5\" style=\"pointer-events:inherit\" d=\"m143.72081869586242,163.35565803158485 c14.617751633754164,-41.93617271978648 71.89058180534832,0 0,53.91793635401125 c-71.89058180534832,-53.91793635401125 -14.617751633754164,-95.85410907379776 0,-53.91793635401125 z\"  fill-opacity=\"1\" stroke-opacity=\"1\" transform=\"translate(-145,-180)\"></path>",
        props: ["prop_data"],
        default_attr: {
          "color": "#FF0000"
        },
        create_type:'draggable',
        priview_img: "https://svg.yaolunmao.top/test.png"
      },
      addSvgVisible: false,
      svgInfoData: [],//接口获取到的组件数据
      shrink: true,//收缩状态  true收缩  false展开
      svgLists: [],//svg列表
      //鼠标位置
      mousePosition: {
        positionX: '',
        positiony: ''
      },
      //辅助线元素
      guideX: '',
      guideY: '',
      selectSvg: {
        ID: '',//要移动的svg
        Index: 0,
        mPositionX: 0,//选中svg时鼠标的x轴坐标
        mPositionY: 0,//选中svg时鼠标的y轴坐标
        pointX: 0,//选中svg时svg的x轴坐标
        pointY: 0,//选中svg时svg的y轴坐标
      }
      ,
      mouseStatus: 0, // 鼠标状态 1按下； 0弹起
      selectSvgInfo: '',
      clickType: '',//鼠标点击行为
      tableRowCount: 2,//表格默认行数
      tableColCount: 2,//表格默认列数
      tableDefaultData: []
    }
  },
  methods: {
    showAddSvgModal () {
      this.addSvgVisible = true;
    },
    addSvgHandleOk () {
      this.svgInfoData[this.svgInfoData.length]=this.testAddSvg;
      console.log(this.svgInfoData);
      this.addSvgVisible = false;
    },
    exportSvg () {
      var exportStr = document.querySelector("#svgCanvas").outerHTML;
      console.log(exportStr);
      alert("请使用F12查看consolo面板");
    },
    MouseMove (e) {
      let _this = this;

      if (this.clickType == 'draggable') {
        if (this.mouseStatus == 0) {
          return;
        }
        const { clientX, clientY } = e

        // let svgID = this.svgLists[this.selectSvg.Index].id;
        let svgID = this.selectSvg.ID;
        //排除当前元素剩下的所有svg元素的列表
        let anyPositionList = this.svgLists.filter(function (list) {
          return list.id != svgID
        });
        //将要移动的元素坐标设备为鼠标坐标
        let svgPositionX = this.selectSvg.pointX;
        let svgPositionY = this.selectSvg.pointY;
        svgPositionX += (clientX - this.selectSvg.mPositionX);
        svgPositionY += (clientY - this.selectSvg.mPositionY);
        setTimeout(function () {
          //少于十个像素自动吸附
          //从所有的x坐标列表中查与当前坐标少于10个像素的组件是否存在
          let exitsAdsorbX = anyPositionList.filter(function (list) {
            return -10 < (list.svgPositionX - svgPositionX) && (list.svgPositionX - svgPositionX) < 10
          });
          if (exitsAdsorbX.length > 0) {
            svgPositionX = exitsAdsorbX[0].svgPositionX;
          }
          //y轴相同 横向坐标自动吸附
          let exitsAdsorbY = anyPositionList.filter(function (list) {
            return -10 < (list.svgPositionY - svgPositionY) && (list.svgPositionY - svgPositionY) < 10
          });
          if (exitsAdsorbY.length > 0) {
            svgPositionY = exitsAdsorbY[0].svgPositionY;
          }
          _this.svgLists[_this.selectSvg.Index].svgPositionX = svgPositionX;
          _this.svgLists[_this.selectSvg.Index].svgPositionY = svgPositionY;
          //从所有的x坐标列表中查当前坐标是否存在
          let exitsNowX = anyPositionList.filter(function (list) {
            return list.svgPositionX === svgPositionX
          });
          if (exitsNowX.length > 0) {
            _this.guideY.style.setProperty('left', svgPositionX - 1 + 'px');
            _this.guideY.style.display = 'inline';
          }
          else {
            _this.guideY.style.display = 'none';
          }
          //从所有的y坐标列表中查当前坐标是否存在
          let exitsNowY = anyPositionList.filter(function (list) {
            return list.svgPositionY === svgPositionY
          });
          if (exitsNowY.length > 0) {
            _this.guideX.style.setProperty('top', svgPositionY + 'px');
            _this.guideX.style.display = 'inline';
          }
          else {
            _this.guideX.style.display = 'none';
          }
        }, 1);
      }
      else if (this.clickType == 'click') {
        if (this.mouseStatus == 0) {
          return;
        }
        this.selectSvgInfo.mPoint.endX = e.offsetX;
        this.selectSvgInfo.mPoint.endY = e.offsetY;
      }
    },
    MousedownCanvas (e) {
      if (this.clickType == 'draggable') {
        return;
      }
      if (this.$store.state.CurrentlySelectedToolBar && this.$store.state.CurrentlySelectedToolBar.CreateType == 'click') {
        //根据类型和鼠标位置创建组件
        let svg_id = this.$UCore.GenUUid()
        let svgItem = {
          id: svg_id,
          title: this.$store.state.CurrentlySelectedToolBar.Title,
          type: this.$store.state.CurrentlySelectedToolBar.Type,
          typeName: this.$store.state.CurrentlySelectedToolBar.TypeName,
          svgColor: this.$store.state.CurrentlySelectedToolBar.Color,
          svgPositionX: e.offsetX,
          svgPositionY: e.offsetY,
          mPoint: {
            startX: e.offsetX,
            startY: e.offsetY,
            endX: e.offsetX,
            endY: e.offsetY
          },
          size: 1,
          angle: 0
          //translate:`translate(${this.mousePosition.positionX},${this.mousePosition.positionY})`
        };
        this.svgLists.push(svgItem);
        this.selectSvgInfo = svgItem;
        this.mouseStatus = 1;
        this.clickType = 'click';
      }

    },
    MousedownSvg (id, index, pointX, pointY, e) {
      this.$store.clearCurrentlySelectedToolBarAction();
      //从数组里面根据index找到当前元素
      this.selectSvg.ID = id;
      this.selectSvg.Index = index;
      this.mouseStatus = 1;
      this.selectSvg.mPositionX = e.clientX;
      this.selectSvg.mPositionY = e.clientY;
      this.selectSvg.pointX = pointX;
      this.selectSvg.pointY = pointY;
      this.selectSvgInfo = this.svgLists[index];
      this.clickType = 'draggable';

    },
    MouseupCanvas () {
      if (this.mouseStatus == 0) {
        return;
      }
      this.guideX.style.display = 'none';
      this.guideY.style.display = 'none';
      // if (this.$store.state.CurrentlySelectedToolBar.Type != '') {
      //   return;
      // }
      // this.selectSvg.ID = '';
      this.mouseStatus = 0;
      // this.clickType = '';
      if (this.clickType == 'draggable') {
        this.clickType = '';
      }
      if (this.clickType == 'click') {
        if (this.selectSvgInfo.mPoint.startX == this.selectSvgInfo.mPoint.endX && this.selectSvgInfo.mPoint.startY == this.selectSvgInfo.mPoint.endY) {
          //根据当前id找到当前元素的index
          let selectSvgIndex = this.svgLists.indexOf(this.svgLists.filter(f => f.id == this.selectSvgInfo.id)[0]);
          this.svgLists.splice(selectSvgIndex, 1);
          this.selectSvg = {};
          this.selectSvgInfo = {};
        }
      }
      // this.$store.state.CurrentlySelectedToolBar = {};
    },
    MouseWheel (e) {
      //获取当前选中组件
      let selectSvgInfo = this.selectSvgInfo;
      if (selectSvgInfo == undefined || selectSvgInfo == null || selectSvgInfo == '') {
        return;
      }
      e.preventDefault();
      //判断滚轮方向 -100是往上滑 100是下滑
      let svgZoom = e.deltaY < 0 ? 0.1 : -0.1;
      selectSvgInfo.size += svgZoom;
      selectSvgInfo.size = parseFloat(selectSvgInfo.size.toFixed(1));
      if (selectSvgInfo.size < 1) {
        selectSvgInfo.size = 1;
      }
    },
    DblClick () {
      this.selectSvgInfo = '';
      this.$store.clearCurrentlySelectedToolBarAction();
    },
    testD () {
      console.log(JSON.stringify(this.svgLists));
      alert(JSON.stringify(this.svgLists));
    },
    testE () {
    },
    testH () {
      localStorage.setItem('svginfo', JSON.stringify(this.svgLists));
      this.$router.push({
        path: "/CircuitPreview",
        name: "CircuitPreview"
      });
    },
    //设置表格属性
    setTableAttr (id, rowCount, colCount) {
      //根据当前id找到当前表格的index
      let tableIndex = this.svgLists.indexOf(this.svgLists.filter(f => f.id == id)[0]);
      if (tableIndex == -1) {
        return;
      }
      let svgType = this.svgLists.filter(f => f.id == id)[0].type;
      if (svgType != 'TableSvg') {
        return;
      }
      let tableData = [];
      for (let r = 0; r < rowCount; r++) {
        let tableColDataList = [];
        for (let c = 0; c < colCount; c++) {
          if (this.svgLists[tableIndex].tableData.length >= r + 1 && this.svgLists[tableIndex].tableData[r].cols.length >= c + 1) {
            tableColDataList.push(this.svgLists[tableIndex].tableData[r].cols[c]);
          }
          else {

            let tableColData = {
              "id": this.$UCore.GenUUid(),
              "val": `${r + 1}行${c + 1}列`
            }
            tableColDataList.push(tableColData);
          }

        }
        let tableRowData = {
          "cols": tableColDataList
        };
        tableData.push(tableRowData)
      }
      this.svgLists[tableIndex].tableData = tableData;
    }
  },
  mounted () {
    let _this = this;
    let canvasdiv = document.querySelector('#canvas');
    _this.guideX = document.querySelector('#guide-x');//辅助线x轴
    _this.guideY = document.querySelector('#guide-y');//辅助线y轴
    canvasdiv.addEventListener("dragover", function (e) {
      e.preventDefault();
    }, false);
    canvasdiv.addEventListener("drop", function (e) {
      e.preventDefault();
      if (_this.$store.state.CurrentlySelectedToolBar.Type == '' || _this.$store.state.CurrentlySelectedToolBar.CreateType != 'draggable') {
        return;
      }
      //根据类型和鼠标位置创建组件
      let svgItem = {
        id: _this.$UCore.GenUUid(),
        title: _this.$store.state.CurrentlySelectedToolBar.Title,
        type: _this.$store.state.CurrentlySelectedToolBar.Type,
        typeName: _this.$store.state.CurrentlySelectedToolBar.TypeName,
        svgColor: _this.$store.state.CurrentlySelectedToolBar.Color,
        svgPositionX: e.offsetX,
        svgPositionY: e.offsetY,
        size: 1,
        angle: 0
        //translate:`translate(${this.mousePosition.positionX},${this.mousePosition.positionY})`
      };
      _this.svgLists.push(svgItem);
      _this.selectSvgInfo = svgItem;
    }, false);
  },
  created () {
    let _this = this;
    //当前页面监视键盘输入
    document.onkeydown = function (e) {
      //获取当前选中组件
      let selectSvgInfo = _this.selectSvgInfo;
      if (selectSvgInfo == undefined || selectSvgInfo == null || selectSvgInfo == '') {
        return;
      }
      //事件对象兼容
      let e1 = e || window.event || arguments.callee.caller.arguments[0]
      //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
      if (e1 && e1.keyCode == 37) {
        e.preventDefault();
        selectSvgInfo.svgPositionX -= 1;
      } else if (e1 && e1.keyCode == 38) {
        e.preventDefault();
        selectSvgInfo.svgPositionY -= 1;
      } else if (e1 && e1.keyCode == 39) {
        e.preventDefault();
        selectSvgInfo.svgPositionX += 1;
      } else if (e1 && e1.keyCode == 40) {
        e.preventDefault();
        selectSvgInfo.svgPositionY += 1;
      }
      //ctrl  c
      else if (e1 && e1.ctrlKey && e1.keyCode == 67) {
        e.preventDefault();
        let copySvgInfoStr = JSON.stringify(selectSvgInfo);
        let copySvgInfo = JSON.parse(copySvgInfoStr);
        copySvgInfo.id = _this.$UCore.GenUUid();
        copySvgInfo.svgPositionX = selectSvgInfo.svgPositionX + 10;
        copySvgInfo.svgPositionY = selectSvgInfo.svgPositionY + 10;
        _this.svgLists.push(copySvgInfo);
        _this.selectSvgInfo = copySvgInfo;
      }
      //deleted
      else if (e1 && e1.keyCode == 46) {
        e.preventDefault();
        //根据当前id找到当前元素的index
        let selectSvgIndex = _this.svgLists.indexOf(_this.svgLists.filter(f => f.id == selectSvgInfo.id)[0]);
        _this.svgLists.splice(selectSvgIndex, 1);
      }

    }
    //请求接口获取组件
    this.$axios.get('/InterfaceReturn.json')
      .then(function (response) {
        _this.svgInfoData = response.data;
        // console.log(response.data);
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
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f2f2f2;
  box-shadow: 1px 1px 5px #333 inset;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #444;
}
#components-layout .ant-layout-header {
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
.pageMain {
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 0;
  overflow: auto;
}
.leftNav {
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
.centerContain {
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

  &.fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .canvas-content {
    width: 1920px;
    height: 1080px;
  }
  .btns-content {
    position: fixed;
    bottom: 10px;
    right: 320px;
    left: 280px;
    button {
      margin-left: 10px;
    }
  }
}
.rightNav {
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
.icon-shrink {
  position: fixed;
  right: 20px;
  top: 5px;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  background: #1890ff;
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
#guide-x {
  display: none;
  position: absolute;
  border-top: 1px dashed #55f;
  width: 100%;
  left: 0px;
  top: 500px;
}

#guide-y {
  display: none;
  position: absolute;
  border-left: 1px dashed #55f;
  height: 100%;
  left: 100px;
  top: 0px;
}
#canvas {
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

  background-image: linear-gradient(
      45deg,
      #ccc 25%,
      transparent 25%,
      transparent 75%,
      #ccc 75%,
      #ccc
    ),
    linear-gradient(
      45deg,
      #ccc 25%,
      transparent 25%,
      transparent 75%,
      #ccc 75%,
      #ccc
    );
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
