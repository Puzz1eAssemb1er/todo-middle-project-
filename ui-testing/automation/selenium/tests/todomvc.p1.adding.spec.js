var assert = require('assert');
var driver = require('../utils/driver').driver;
var TodoPage = require('../pages/todomvc.page').TodoPage;

describe('P1: Добавление задач', function () {
  var page;

  beforeEach(function (done) {
    page = new TodoPage(driver);
    page.open(done);
  });

  after(function (done) {
    driver.quit().then(function () {
      done();
    });
  });

  it('TC_UI_001: добавление одной задачи', function (done) {
    page.addTask('Test task', function () {
      page.getTaskText(0).then(function (text) {
        assert.strictEqual(text, 'Test task');
        done();
      });
    });
  });
});
