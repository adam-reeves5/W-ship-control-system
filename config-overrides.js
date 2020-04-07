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
      '@primary-color': 'rgb(111, 146, 162)',
      '@layout-body-background': '#2d2d2d',
      '@layout-header-height': '64px',
      '@layout-header-background': '#3d3d3d',
      '@body-background': '#2d2d2d',
      '@component-background': '#2d2d2d',
      '@menu-inline-toplevel-item-height': '40px',
      '@menu-item-height': '40px',
      '@menu-dark-submenu-bg': '#1d1d1d',
      '@menu-dark-item-active-bg': '#4d4d4d',
      '@font-size-base': '16px',
      '@layout-footer-padding': '16px 36px',
      '@layout-footer-background': '@layout-header-background',
      '@text-color': 'rgba(255,255,255, 0.75)',
      '@text-color-secondary': 'rgba(255,255,255, 0.55)',
    },
  }),
);
