// const { defineConfig } = require('@vue/cli-service');
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave: false, //关闭语法检查

//   // 基本路径
//   publicPath: '/',
//   // 输出文件目录
//   outputDir: 'dist',
//   configureWebpack: {
//     externals: {}
//   },
//   devServer: {
//     proxy: {
//       '/': {
//         target: 'http://localhost:30000/', //请求对象
//         ws: true, //代理websocked
//         changeOrigin: true,
//         secure: false, //target是否为https接口
//         pathRewrite: {
//           '^/': '' //更改请求URL
//         }
//       }
//     }
//   }
// });
