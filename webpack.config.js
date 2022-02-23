const path = require('path');

module.exports = {
  mode: 'development',
  // The entry point file described above
  entry: '/Users/nikkig/portfolio_projects/todo_list/src/todo_list.js',
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  experiments: {
    topLevelAwait: true,
  },
  devtool: "eval-cheap-source-map"
};
