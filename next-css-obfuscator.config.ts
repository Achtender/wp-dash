/** @type {import("next-css-obfuscator").Options} */
module.exports = {
  enable: true,
  mode: 'simplify', // random | simplify
  refreshClassConversionJson: true,
  allowExtensions: ['.jsx', '.tsx', '.js', '', '.html', '.rsc'],
  blackListedFolderPaths: ['./.next/cache', /\.next\/server\/pages\/api/],
};
