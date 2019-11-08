const path = require('path');

module.exports = {
  configureWebpack: {
    entry: './src/lib/index.js', // 打包发布时入口
    // entry: './src/main.js', // 开发时项目入口
    output: {
      // eslint-disable-next-line no-undef
      path: path.resolve(__dirname, './dist'),

      filename: 'vue-toast-c.js', // 打包生成的模块名
      library: 'vueToastC', // 你使用require时的模块名
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
  },
  publicPath: '/dist',
};
