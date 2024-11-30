// config-overrides.js
module.exports = function override(config) {
    // Add custom Webpack modifications here
    // Ignore source map loading for react-icons
    config.module.rules.push({
      test: /\.js$/,
      enforce: "pre",
      use: ["source-map-loader"],
      exclude: /node_modules\/react-icons/,
    });
  
    return config;
  };
  