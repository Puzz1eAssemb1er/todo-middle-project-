const allure = require('allure-mocha/runtime');

beforeEach(function () {
  allure.label('framework', 'selenium');
});


mocha tests/**/*.spec.js --require tests/mocha-allure-setup.js
