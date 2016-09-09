"use strict";
require('reflect-metadata');
require('zone.js/dist/zone');
require('zone.js/dist/sync-test');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/jasmine-patch');
var testContext = require.context('./src', true, /\.spec\.ts/);
testContext.keys().forEach(testContext);
var coverageContext = require.context('./src', true, /^(?=(?!.*[.]spec\.ts))(?=(?!.*[.]d\.ts))(?=(?!\.\/app\/main\.ts$))(?=(?!\.\/app\/rxjs-extensions\.ts$)).*\.ts$/);
coverageContext.keys().forEach(coverageContext);
//# sourceMappingURL=karma.entry.js.map