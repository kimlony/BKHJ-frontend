const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:9200", // Replace with your Elasticsearch endpoint
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/product/_doc/_search?size=186", // Replace with your Elasticsearch path
      },
    })
  );
};
