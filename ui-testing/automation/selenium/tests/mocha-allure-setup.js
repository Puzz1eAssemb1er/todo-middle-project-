const allure = require('allure-mocha/runtime.js');

beforeEach(function () {
  allure.label('framework', 'selenium');
});
