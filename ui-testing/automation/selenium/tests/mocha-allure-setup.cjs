const allure = require('allure-mocha/runtime.js');

module.exports = function () {
  beforeEach(function () {
    allure.label('framework', 'selenium');
  });
};
