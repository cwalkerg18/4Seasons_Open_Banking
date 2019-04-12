System.config({
  transpiler: 'plugin-babel',
  paths: {
    'npm:': 'https://unpkg.com/'
  },
  map: {
    vue: 'npm:vue@2.5.16/dist/vue.esm.browser.js',
    'vue-loader': 'npm:systemjs-vue-browser@latest/index.js',

    'devextreme': 'npm:devextreme@18.2',
    'devextreme-vue': 'npm:devextreme-vue@18.2',
    jszip: 'npm:jszip@3.1.3/dist/jszip.min.js',
    'quill': 'npm:quill@1.3.6/dist/quill.js',

    'plugin-babel': 'npm:systemjs-plugin-babel@0/plugin-babel.js',
    'systemjs-babel-build': 'npm:systemjs-plugin-babel@0/systemjs-babel-browser.js'
  },
  meta: {
    '*.vue': { loader: 'vue-loader' }
  },
  packages: {
    'devextreme-vue': {
      main: 'index.js'
    },
    'devextreme': {
      defaultExtension: 'js'
    }
  },
  babelOptions: {
    sourceMaps: false,
    stage0: true
  }
});
