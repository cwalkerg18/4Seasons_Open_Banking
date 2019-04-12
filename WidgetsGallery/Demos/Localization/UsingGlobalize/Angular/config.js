// In real applications, you should not transpile code in the browser. You can see how to create your own application with Angular and DevExtreme here:
// https://github.com/DevExpress/devextreme-angular/blob/master/README.md

System.config({
    transpiler: 'ts',
    typescriptOptions: {
        module: "system",
        emitDecoratorMetadata: true,
        experimentalDecorators: true
    },
    meta: {
        'typescript': {
            "exports": "ts"
        }
    },
    paths: {
        'npm:': 'https://unpkg.com/'
    },
    map: {
        'ts': 'npm:plugin-typescript@7.0.6/lib/plugin.js',
        'typescript': 'npm:typescript@2.2.2/lib/typescript.js',

        '@angular/core': 'npm:@angular/core@7.1.3/bundles/core.umd.js',
        '@angular/common': 'npm:@angular/common@7.1.3/bundles/common.umd.js',
        '@angular/compiler': 'npm:@angular/compiler@7.1.3/bundles/compiler.umd.js',
        '@angular/platform-browser': 'npm:@angular/platform-browser@7.1.3/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@7.1.3/bundles/platform-browser-dynamic.umd.js',
        '@angular/router': 'npm:@angular/router@7.1.3/bundles/router.umd.js',
        '@angular/forms': 'npm:@angular/forms@7.1.3/bundles/forms.umd.js',
        '@angular/common/http': 'npm:@angular/common@7.1.3/bundles/common-http.umd.js',
        'tslib': 'npm:tslib/tslib.js',

        'rxjs': 'npm:rxjs@6.3.3',
        'rxjs/operators': 'npm:rxjs@6.3.3/operators',

        'devextreme': 'npm:devextreme@18.2',
        'jszip': 'npm:jszip@3.1.3/dist/jszip.min.js',
        'quill': 'npm:quill@1.3.6/dist/quill.js',
        'devextreme-angular': 'npm:devextreme-angular@18.2',

        'globalize': 'npm:globalize/dist/globalize',
        'cldr': 'npm:cldrjs/dist/cldr',
        'cldr-data': '../../../../js/cldr',
        'json': 'npm:systemjs-plugin-json/json.js'
    },
    packages: {
        'app': {
            main: './app.component.ts',
            defaultExtension: 'ts'
        },
        'devextreme': {
            defaultExtension: 'js'
        },
        'rxjs': { main: 'index.js', defaultExtension: 'js' },
        'rxjs/operators': { main: 'index.js', defaultExtension: 'js' },
        'devextreme-angular': {
            main: 'index.js',
            defaultExtension: 'js'
        },
        'globalize': {
            main: '../globalize.js',
            defaultExtension: 'js'
        },
        'cldr': {
            main: '../cldr.js',
            defaultExtension: 'js'
        }
    }
});