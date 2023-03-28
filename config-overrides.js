const {
  override,
  addWebpackAlias,
  overrideDevServer,
} = require('customize-cra')
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path')

const { REACT_APP_API } = process.env

const devServer = () => config => ({
  ...config,
  host: true,
  proxy: {
    'admin-test.myfana.com': {
      target: REACT_APP_API,
      changeOrigin: true,
      // pathRewrite: {
      //   "^/lg": "/"
      // }
    },
  }
})

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    })
  ),
  devServer: overrideDevServer(
    devServer()
    // (config) => {
    //   config.before = (app) => {
    //     app.use(
    //       '/api',
    //       createProxyMiddleware({
    //         target: 'http://localhost:3001',
    //         changeOrigin: true,
    //       })
    //     );
    //   }
    //   return config
    // }
  )
}

// module.exports = {
  // overrideDevServer: (devServerConfig, _devServerProvider) => {
  //   devServerConfig.before = function (app, server) {
  //     app.use(
  //       REACT_APP_API,
  //       createProxyMiddleware({
  //         target: REACT_APP_API,
  //         changeOrigin: true,
  //       })
  //     );
  //   };
  //   return devServerConfig;
  // }
// };