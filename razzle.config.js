const webpack = require('webpack');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

module.exports = {
  modify: (config, { target }) => {
    if (target === 'web') {
      return {
        ...config,
        plugins: [
          ...config.plugins,
          new ReactLoadablePlugin({
            filename: './build/react-loadable.json',
          }),
          new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'static/js/[name].[hash:8].js',
            minChunks: module => {
              // This prevents stylesheet resources with the .css or .scss extension
              // from being moved from their original chunk to the vendor chunk
              if (module.resource && /^.*\.css$/.test(module.resource)) {
                return false;
              }

              return module.context && module.context.includes('node_modules');
            },
          }),
        ],
      };
    }

    return config;
  },
};
