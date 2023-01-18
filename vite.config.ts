import { defineConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import WindiCSS from 'vite-plugin-windicss';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let config: UserConfigExport = {
    plugins: [
      vue(),
      eslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'] // 检查的文件
      }),
      WindiCSS(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [
          resolve(process.cwd(), 'src/assets/svgs'),
          resolve(process.cwd(), 'src/assets/icons')
        ],
        // 指定symbolId格式
        symbolId: 'svg-[name]',
        // 禁用压缩 否则想要修改无状态组件的stroke或者fill会影响到预设样式 例如stroke-width
        svgoOptions: false
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  };
  if (mode === 'lib') {
    config = {
      ...config,
      ...{
        build: {
          lib: {
            entry: resolve(__dirname, 'src/export.ts'),
            name: 'webtopo-svg-edit',
            fileName: (format) => `webtopo-svg-edit.${format}.ts`
          },
          rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue', 'pinia'],
            output: {
              // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
              globals: {
                vue: 'Vue',
                pinia: 'Pinia'
              },
              inlineDynamicImports: true
            }
          }
        }
      }
    };
  }
  return config;
});
