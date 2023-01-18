# vue-webtopo-svgeditor

> 基于vue3.2+ts实现的svg可视化web组态编辑器。可直接把svg文件和vue组件作为编辑器图形库使用，赋予其缩放和旋转等功能，并支持自定义拓展参数，实时控制组件状态等



qq交流群：209048413

## 项目优点

### 组态软件核心功能都具备

没有特殊需求，只需要配置好图形库，即可开始您的组态世界

### 优越的性能

使用了svg的symbol技术，use方式加载svg图形，同样的svg图形不管数量多少，只会渲染一次

### 学习成本极低

svg文件即组件，引入之后无需进行额外配置，编辑器会自适应解析加载组件，添加自定义组件和传统html无差，前端er零学习成本上手

### 易拓展

配置文件采用开放式结构，属性支持自定义拓展。图形库支持添加svg文件或者vue组件，定制开发将变得容易

### 易于集成

项目已经编写好了库模式脚本，组件已经发布到npm，支持外部传入自定义组件，支持组件事件订阅等

### 免费开源

MIT开源协议 可商用

## 项目说明

### 组件库

编写中，敬请期待

### 工具栏

编写中，敬请期待

### 画布

编写中，敬请期待

### 属性面板

编写中，敬请期待


## 图形库说明

### 有状态组件

编写中，敬请期待

### 无状态组件

编写中，敬请期待

### 自带动画组件

编写中，敬请期待

### 自定义svg

编写中，敬请期待

### vue组件

编写中，敬请期待

## 集成到已有项目

```
# 创建项目(已有项目跳过此步骤)
npm init vite@latest

# 进入项目目录
cd projectname

# 安装插件
pnpm i webtopo-svg-edit

# 安装pinia
pnpm i pinia

# 修改main.ts 注册pinia
import { createPinia } from 'pinia';
const app = createApp(App);
app.use(createPinia());
app.mount('#app')

#引入插件
import { WebtopoSvgEdit,WebtopoSvgPreview } from 'webtopo-svg-edit';
import 'webtopo-svg-edit/dist/style.css'
```

如果集成有问题请参考示例项目[vue-webtopo-svgeditor-example](https://github.com/yaolunmao/vue-webtopo-svgeditor-example)

**请注意：插件方式引入会导致左侧工具栏的icon图标无法正确显示，请自行寻找您项目构建工具的svg加载器，将icon图标转换成symbol，并将名字命名为‘svg-xxx’即可正常显示**

## 贡献代码

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

**只接受github的pr，gitee为github镜像库**


## 声明

**本项目组件库来源均为网络，仅供学习交流使用，请勿将本项目里面的组件用于商业用途**

## 君子协议

开源版使用时请保留底部的版权声明，感谢支持

![](./readme-imgs/版权声明.png)

## 常见问题

行尾序列问题（error  Delete `␍`  prettier/prettier）
git config --global core.autocrlf false

## 捐助

如果这个项目对您有所帮助，请扫下方二维码打赏一杯咖啡。

![](./readme-imgs/捐赠.jpg)

## 感谢以下小伙伴为此项目做出的贡献

<a href="https://github.com/yaolunmao/vue-webtopo-svgeditor/graphs/contributors"><img src="https://contrib.rocks/image?repo=yaolunmao/vue-webtopo-svgeditor" /></a>