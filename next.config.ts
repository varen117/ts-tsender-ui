import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', //适用场景：静态托管、CDN、OSS等
  // output: 'standalone', //适用场景：Node服务器、Docker
  distDir: "out", //编译后的位置
  images: {
    //output: 'export' → 纯静态站点 → 没有服务器 → 不能用 Next.js 的图片优化
    unoptimized: true //关闭图片优化，保证图片正常显示
  },
  //设置 Next.js 应用的基础路径，所有页面、API 路由、静态资源都会自动加上这个前缀。如果你的应用部署在子目录（比如 https://example.com/myapp），就需要设置 basePath: '/myapp'
  basePath: '', 
  //设置 Next.js 应用的静态资源前缀，所有静态资源都会自动加上这个前缀。如果你的应用部署在子目录（比如 https://example.com/myapp），就需要设置 assetPrefix: '/myapp'
  assetPrefix: './',
  //当你用 output: 'export' 导出静态站点时，trailingSlash: true 会生成带斜杠的 URL，并生成对应的目录结构（如 about/index.html）。这样，无论用户访问 /about 还是 /about/，都能正确加载页面。
  trailingSlash: true,
};

export default nextConfig;
