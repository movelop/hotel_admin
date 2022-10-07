const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://heritage-resorts.herokuapp.com',
      // target: 'http://localhost:4000',
      changeOrigin: true,
    })
  );
};