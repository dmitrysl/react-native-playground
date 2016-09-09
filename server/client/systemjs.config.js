/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    '@angular2-material':         'node_modules/@angular2-material',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs',
    'moment':                     'node_modules/moment/min',
    // 'reflect-metadata':           'node_modules/reflect-metadata',
    // 'traceur': 'node_modules/traceur/bin',
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
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
    '@angular2-material/button',
    '@angular2-material/button-toggle',
    '@angular2-material/card',
    '@angular2-material/checkbox',
    '@angular2-material/core',
    '@angular2-material/grid-list',
    '@angular2-material/icon',
    '@angular2-material/input',
    '@angular2-material/list',
    '@angular2-material/menu',
    '@angular2-material/progress-bar',
    '@angular2-material/progress-circle',
    '@angular2-material/radio',
    '@angular2-material/sidenav',
    '@angular2-material/slide-toggle',
    '@angular2-material/slider',
    '@angular2-material/tabs',
    '@angular2-material/toolbar',
    '@angular2-material/tooltip',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  materialPackages.forEach(function(pkgName) {
    var pkg=pkgName.split('/');
    packages[pkgName] = { main: pkg[1] + '.umd' + '.js', format: 'cjs', defaultExtension: 'js' };
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
    map: map,
    packages: packages
  };
  System.defaultJSExtensions = true;
  System.config(config);
})(this);