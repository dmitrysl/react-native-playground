/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // var paths = {
  //   // paths serve as alias
  //   'npm:': 'node_modules/'
  // };

  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    
    // angular bundles
    // '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    // '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    // '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    // '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    // '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    // '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    // '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    // '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
   '@angular':                   'node_modules/@angular',
   '@angular2-material':         'node_modules/@angular2-material',

    // other libraries
    'rxjs':                       'node_modules/rxjs',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'moment':                     'node_modules/moment/min',
    // 'reflect-metadata':           'node_modules/reflect-metadata',
    // 'traceur': 'node_modules/traceur/bin',
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: './main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: './index.js', defaultExtension: 'js' },
    'moment':                     { main: 'moment.min.js', defaultExtension: 'js'},
    // 'reflect-metadata':           { main: 'Reflect.js', defaultExtension: 'js'},
    // 'traceur': { main: 'traceur.js' ,defaultExtension: 'js' },
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  var materialPackages=[
    'button',
    'button-toggle',
    'card',
    'checkbox',
    'core',
    'grid-list',
    'icon',
    'input',
    'list',
    'menu',
    'progress-bar',
    'progress-circle',
    'radio',
    'sidenav',
    'slide-toggle',
    'slider',
    'tabs',
    'toolbar',
    'tooltip',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  // var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  //Add package entries for angular packages
  ngPackageNames.forEach(packUmd);
  materialPackages.forEach(function(pkgName) {
    packages['@angular2-material/'+ pkgName] = { main: pkgName + '.umd' + '.js', format: 'cjs', defaultExtension: 'js' };
  });
  var config = {
    // transpiler: 'ts',
    // typescriptOptions: {
    //   tsconfig: true
    // },
    // meta: {
    //   'typescript': {
    //     "exports": "ts"
    //   }
    // },
    // meta: {
      // 'typescript': {
      //   "exports": "ts"
      // },
      // 'app/main': { format: 'register' }
    // },
    // paths: paths,
    map: map,
    packages: packages
  };
  System.defaultJSExtensions = true;
  System.config(config);
})(this);