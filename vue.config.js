const path = require('path');
const webpack = require('webpack');

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}

module.exports = {
   outputDir: 'c:/project/winlog_web/web_app/public',
  publicPath: process.env.NODE_ENV === 'production'
      ? '/public/'
      : '/',
  lintOnSave: false,
  configureWebpack: {
    // Set up all the aliases we use in our app.

    resolve: {
      alias: {
        src: resolveSrc('src'),
        'chart.js': 'chart.js/dist/Chart.js'
      }
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
     ]
  },
  pwa: {
    name: 'Vue Light Bootstrap Dashboard',
    themeColor: '#344675',
    msTileColor: '#344675',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#344675'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production',
    // loaderOptions: {
    //   sass: {
    //     data: `
    //                 @import "./node_modules/vuetify/src/components/VRangeSlider/VRangeSlider.sass";
    //                 @import "./node_modules/vuetify/src/components/VSpeedDial/VSpeedDial.sass";
    //                 @import "./node_modules/vuetify/src/components/VAlert/VAlert.sass";
    //                 @import "./node_modules/vuetify/src/components/VBadge/VBadge.sass";
    //                 @import "./node_modules/vuetify/src/components/*";
    //                 @import "./node_modules/vuetify/src/styles/tools/_theme.sass";
    //             `
    //   }
    // }
  }
};
