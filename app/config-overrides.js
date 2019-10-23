const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
  libraryName: 'antd',
  libraryDirectory: 'es',
  style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { 
      '@primary-color': '#707070',
      '@heading-color': '#333',
      '@text-color': '#333'
    },
  })
);