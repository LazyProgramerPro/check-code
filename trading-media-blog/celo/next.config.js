const nextTranslate = require("next-translate");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins(
  [
    [
      nextTranslate,
      {
        webpack: (config, { isServer, webpack }) => {
          return config;
        },
      },
    ],
  ],
  {
    images: {
      domains: [
        "trading-nonprod-blogapi.edsolabs.com",
        "trading-public.s3.amazonaws.com",
        "trading-public.s3.ap-southeast-1.amazonaws.com",
      ],
    },
    reactStrictMode: true,
  }
);
