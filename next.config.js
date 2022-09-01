// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
// module.exports = withBundleAnalyzer({});
module.exports = {
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { layers: true, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true
    return config;
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  images: {
    domains: ["https://master.d2174uzsw3epqk.amplifyapp.com"],
  },
  async redirects() {
    return [
      {
        source: "/prog_ver.php",
        destination: "/api/prog_ver.php",
        permanent: true,
      },
      {
        source: "/user/login",
        destination: "/services-portal",
        permanent: true,
      },
      {
        source: "/user/register",
        destination: "/services-portal",
        permanent: true,
      },
      {
        source: "/Webhelp/EZTitles",
        destination: "/Webhelp/EZTitles/index.html",
        permanent: true,
      },
      {
        source: "/Webhelp/EZConvert",
        destination: "/Webhelp/EZConvert/index.html",
        permanent: true,
      },
      {
        source: "/Webhelp/3DTitles",
        destination: "/Webhelp/3DTitles/index.html",
        permanent: true,
      },
      {
        source: "/Webhelp/EZTitles Plug-in for Adobe Premiere Pro",
        destination:
          "/Webhelp/EZTitles Plug-in for Adobe Premiere Pro/index.html",
        permanent: true,
      },
      {
        source: "/Webhelp/EZTitles Plug-in for Avid",
        destination: "/Webhelp/EZTitles Plug-in for Avid/index.html",
        permanent: true,
      },
      {
        source: "/Webhelp/EZTitles Plug-in for Cambria File Convert",
        destination:
          "/Webhelp/EZTitles Plug-in for Cambria File Convert/index.html",
        permanent: true,
      },
      {
        source: "/Webhelp/EZTitles Plug-in for ProMedia Carbon",
        destination: "/Webhelp/EZTitles Plug-in for ProMedia Carbon/index.html",
        permanent: true,
      },
    ];
  },
};
