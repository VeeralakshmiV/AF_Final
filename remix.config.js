export default {
  future: {
    v2_dev: true,
    v2_routeConvention: true,
    v2_meta: true,
    v2_errorBoundary: true,
  },
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  serverPlatform: "node",
  appDirectory: "app",
  assetsBuildDirectory: "dist/client", // <- important
  publicPath: "/build/",
  serverBuildPath: "dist/server/index.js", // <- important
};
