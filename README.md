# vue-webtopo-svgeditor

> 基于vue3.2+ts实现的svg可视化web组态编辑器。可无需修改代码动态添加组件、自定义拓展组件参数

当前主分支版本为3.0,该项目基于vue3.2+ts开发,ui使用了[naiveui](https://www.naiveui.com/zh-CN/os-theme)

## [本文图片挂了请点此查看](https://www.cnblogs.com/Hero-/p/14784744.html)

## 预览地址

[http://svg.yaolm.top](http://svg.yaolm.top)（请使用版本新一点的浏览器🤔）

## git地址

https://github.com/yaolunmao/vue-webtopo-svgeditor

https://gitee.com/yaolunmao/vue-webtopo-svgeditor

## 如何引用

```
# 创建项目(已有项目跳过此步骤)
npm init vite@latest

# 进入项目目录
cd projectname

# 安装插件
npm install vue-webtopo-svgeditor

#引入插件
import {SvgEditor,SvgPrview} from 'vue-webtopo-svgeditor';
import 'vue-webtopo-svgeditor/dist/style.css'
# 修改vite.config.ts使之可以进行运行时创建组件
  alias: {
    'vue': 'vue/dist/vue.esm-bundler.js' // 定义vue的别名，如果使用其他的插件，可能会用到别名
  },

```

## 如何使用

使用编辑器需要将配置好的插件列表传递给组件，插件列表可通过调用后台接口的方式或者定义在项目里，推荐使用接口方式，可使项目更加灵活，举例`demo.json`

```json
 [{
    "type": "TestAddSvg",//组件类型 可理解为组件的唯一id
    "title": "测试新增心形",//组件名称
    "panel_class": "common",//组件在左侧工具栏的分类
    "template": "<path :fill=\"prop_data.extend_attr.color.val\" :stroke=\"prop_data.extend_attr.color.val\" stroke-width=\"5\" style=\"pointer-events:inherit\" d=\"m143.72081869586242,163.35565803158485 c14.617751633754164,-41.93617271978648 71.89058180534832,0 0,53.91793635401125 c-71.89058180534832,-53.91793635401125 -14.617751633754164,-95.85410907379776 0,-53.91793635401125 z\"  fill-opacity=\"1\" stroke-opacity=\"1\" transform=\"translate(-145,-180)\"></path>    ",//svg元素
    "props": [
      "prop_data"
    ],
    "extend_attr": {//拓展参数
      "color": {
        "title": "心形颜色",
        "val": "#FF0000",
        "type": "colorinputbox"
      }
    },
    "create_type": "draggable",//创建方式 拖动还是绘制
    "priview_img": "http://svg.yaolm.top/test.png"//左侧工具栏的预览图像
  }
]
```

更多组件请参考`public\InterfaceReturn.json`

在vue里引入编辑器组件，然后将`demo.json`传递给组件的`component_infos`

```vue
      <svg-editor
        :component_infos="demo.json"
        @saveSvgInfo="saveSvgInfo"
        :svgCanvas="{ width: 1920, height: 1080 }"
      ></svg-editor>
```

| 属性名          | 说明                     | 默认值                       |
| --------------- | ------------------------ | ---------------------------- |
| component_infos | 预定义的组件列表         |                              |
| saveSvgInfo     | 编辑器点击保存的回调方法 |                              |
| svgCanvas       | 画板的大小               | { width: 1520, height: 720 } |

预览组件同理

```vue
      <svg-prview
        :component_infos="demo.json"
        :svg_data="prview_data"
        :svgCanvas="{ width: 1920, height: 1080 }"
      ></svg-prview>
```

| 属性名          | 说明                 | 默认值                       |
| --------------- | -------------------- | ---------------------------- |
| component_infos | 预定义的组件列表     |                              |
| svg_data        | 编辑器点击保存的数据 |                              |
| svgCanvas       | 画板的大小           | { width: 1520, height: 720 } |

## 如何进行开发

```
# 克隆项目
git clone https://github.com/yaolunmao/vue-webtopo-svgeditor.git

# 进入项目目录
cd vue-webtopo-svgeditor

# 安装依赖
npm install

# 启动服务
npm run dev

```



## 操作说明

- 常规组件和图表组件用鼠标左键选中并按住可拖动至画布
- 绘制组件需先选中 再将鼠标移至画布中按住左键开始绘制 松开左键结束绘制
- 在画布上单击左键并按住可以拖动组件改变位置
- 当组件选中时会有选中效果 此时右侧面板弹出 可使用快捷键和编辑右侧面板属性更改组件
- 键盘↑↓←→可移动选中组件 ctrl+c复制当前选中组件 deleted删除当前选中组件
- 点击画布空白处可以取消选中组件 并关闭属性面板
- 点击《 符号可以显示或隐藏左侧面板

## 动态添加组件

可使用任意生成svg代码的工具，我这里使用在线编译器进行模拟

点击[这里](http://svgedit.yaolm.top/)进行svg图像绘制，我这里以心形为例

![绘制心形图片](https://images.cnblogs.com/cnblogs_com/Hero-/1976969/o_2105190646421.png)

将svg代码复制下来，双引号进行转义，删除无用属性（比如id），你也可以直接使用我下面的代码

```
<path fill=\"#FF0000\" stroke=\"#000000\" stroke-width=\"5\" style=\"pointer-events:inherit\" d=\"m143.72081869586242,163.35565803158485 c14.617751633754164,-41.93617271978648 71.89058180534832,0 0,53.91793635401125 c-71.89058180534832,-53.91793635401125 -14.617751633754164,-95.85410907379776 0,-53.91793635401125 z\"  fill-opacity=\"1\" stroke-opacity=\"1\"></path>
```

将拓展字段进行双向绑定 我目前只做了颜色

```
<path :fill=\"prop_data.extend_attr.color.val\" :stroke=\"prop_data.extend_attr.color.val\" stroke-width=\"5\" style=\"pointer-events:inherit\" d=\"m143.72081869586242,163.35565803158485 c14.617751633754164,-41.93617271978648 71.89058180534832,0 0,53.91793635401125 c-71.89058180534832,-53.91793635401125 -14.617751633754164,-95.85410907379776 0,-53.91793635401125 z\"  fill-opacity=\"1\" stroke-opacity=\"1\" transform=\"translate(-145,-180)\"></path>
```

修改项目文件夹pubilc下的模拟接口返回的json，新增一项：

```json
{
    "type": "TestAddSvg",
    "title": "测试新增心形",
    "panel_class": "common",
    "template": "<path :fill=\"prop_data.extend_attr.color.val\" :stroke=\"prop_data.extend_attr.color.val\" stroke-width=\"5\" style=\"pointer-events:inherit\" d=\"m143.72081869586242,163.35565803158485 c14.617751633754164,-41.93617271978648 71.89058180534832,0 0,53.91793635401125 c-71.89058180534832,-53.91793635401125 -14.617751633754164,-95.85410907379776 0,-53.91793635401125 z\"  fill-opacity=\"1\" stroke-opacity=\"1\" transform=\"translate(-145,-180)\"></path>",
    "props": [
      "prop_data"
    ],
    "extend_attr": {
      "color": {
        "title": "心形颜色",
        "val": "#FF0000",
        "type": "colorinputbox"
      }
    },
    "create_type": "draggable",
    "priview_img": "http://svg.yaolm.top/test.png"
}
```



启动项目，就可以看到刚才添加的组件了

![预览界面](https://images.cnblogs.com/cnblogs_com/Hero-/1976969/o_211031113925_%E5%8A%A8%E6%80%81%E6%96%B0%E5%A2%9E%E7%9A%84%E7%BB%84%E4%BB%B6.gif)

也支持直接引入图片，只不过放大有失真，将下面的代码替换上面json文件的template值

```
<image x=\"-33\" y=\"-33\" width=\"66\" height=\"66\" xlink:href=\"http://svg.yaolm.top/test.png\" />
```

ps：目前中心辅助线的坐标取决于svg组件的中心坐标，请自行添加transform属性调整svg组件中心坐标

## 右侧属性面板的自定义属性说明

因为组件的多样性，所以增加了自定义拓展属性。例如文字组件可输入文字内容、修改字体样式等，开关组件则可以进行闭合，使用拓展属性可以针对某个组件显示不同的样式。

目前只封装了6种

- colorinputbox:颜色选择器
- radiogroup：单选
- numberinputbox：数字输入框
- textinputbox：文本输入框
- textareainputbox：文本域
- select：下拉选择器

具体配置可参考文件`public\InterfaceReturn.json`查看对象的`extend_attr`属性

## 关于vue2的特别说明

vue2想使用动态组件可以使用`Vue.component()`，此处感谢大佬[chj2020](https://github.com/chj2020)指导

### vue2如何支持多节点

首先安装vue-fragment

```vue
npm install vue-fragment
```

引用vue-fragment

```vue
//main.js
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)
```

然后在json文件的template属性值里面最外层使用标签

```vue
<fragment></fragment>
```

例如

```vue
<fragment><path :fill=\"prop_data.extend_attr.color.val\" :stroke=\"prop_data.extend_attr.color.val\" stroke-width=\"5\" style=\"pointer-events:inherit\" d=\"m143.72081869586242,163.35565803158485 c14.617751633754164,-41.93617271978648 71.89058180534832,0 0,53.91793635401125 c-71.89058180534832,-53.91793635401125 -14.617751633754164,-95.85410907379776 0,-53.91793635401125 z\"  fill-opacity=\"1\" stroke-opacity=\"1\" transform=\"translate(-145,-180)\"></path></fragment>
```



## 截图



## ![常规组件](https://images.cnblogs.com/cnblogs_com/Hero-/1976969/o_211031114029_%E5%B8%B8%E8%A7%84%E7%BB%84%E4%BB%B6.gif)

![绘制组件](https://images.cnblogs.com/cnblogs_com/Hero-/1976969/o_211031114035_%E7%BB%98%E5%88%B6%E7%BB%84%E4%BB%B6.gif)

![图表组件](https://images.cnblogs.com/cnblogs_com/Hero-/1976969/o_211031114040_%E5%9B%BE%E8%A1%A8%E7%BB%84%E4%BB%B6.gif)

![修改组件属性](https://images.cnblogs.com/cnblogs_com/Hero-/1976969/o_211031114045_%E4%BF%AE%E6%94%B9%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7.gif)

![](https://images.cnblogs.com/cnblogs_com/Hero-/2077550/o_211211080131_%E5%8A%A8%E7%94%BB%E7%BB%98%E5%88%B6.gif)

![预览界面](https://images.cnblogs.com/cnblogs_com/Hero-/2077550/o_211211075750_%E7%94%B5%E5%8A%9B%E9%A2%84%E8%A7%88.gif)

## License

[MIT](http://opensource.org/licenses/MIT)