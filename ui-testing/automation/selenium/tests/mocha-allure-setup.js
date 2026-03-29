const allure = require('allure-mocha/runtime');

beforeEach(function () {
  allure.label('framework', 'selenium');
});
