# vue-webtopo-svgeditor

> 纯vue3实现的svg可视化web组态编辑器。主要用于物联网mqtt实时系统图

## 预览地址

[https://svg.yaolunmao.top](https://svg.yaolunmao.top)

## 如何使用

```
# 克隆项目
git clone https://github.com/yaolunmao/vue-webtopo-svgeditor.git

# 进入项目目录
cd vue-webtopo-svgeditor

# 安装依赖
yarn install

# 启动服务
yarn serve

```

## 操作

点击载入模板  进入预览页点击模拟硬件 等待两秒钟即可看到动态效果

- 鼠标左键选中组件 按住可拖动至画布
- 鼠标双击画布取消选中组件
- 右侧工具栏调整选中组件样式
- 键盘↑↓←→可移动选中组件
- ctrl+c复制当前选中组件
- deleted删除当前选中组件
- 鼠标滚轮放大缩小选中组件

## Todo

- 鼠标框选批量选中
- 画布绑定mqtt平台
- 组件旋转
- 画布缩放
- 编辑器撤销、重做

## 截图

![编辑器页面](https://p.130014.xyz/2021/03/19/svgedit.png)

![预览界面](https://p.130014.xyz/2021/03/19/svgview.png)

## License

[MIT](http://opensource.org/licenses/MIT)