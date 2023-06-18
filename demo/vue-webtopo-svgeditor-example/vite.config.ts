import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/test-svgs')],
      // 指定symbolId格式
      symbolId: 'svg-[name]',
      // 禁用压缩 否则想要修改无状态组件的stroke或者fill会影响到预设样式 例如stroke-width
      svgoOptions: false
    })
  ]
});
