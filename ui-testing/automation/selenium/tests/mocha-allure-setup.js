import * as allure from 'allure-mocha/runtime.js';

global.beforeEach(function () {
  allure.label('framework', 'selenium');
});
