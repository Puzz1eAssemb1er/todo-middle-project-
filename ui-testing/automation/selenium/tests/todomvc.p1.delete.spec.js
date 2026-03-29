var assert = require('assert');
var driver = require('../utils/driver').driver;
var TodoPage = require('../pages/todomvc.page').TodoPage;

describe('P1: Удаление задач', function () {
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

  it('TC_UI_005: удалить задачу', function (done) {
    page.addTask('Delete me', function () {
      page.deleteTask(0, function () {
        page.getTasks().then(function (items) {
          assert.strictEqual(items.length, 0);
          done();
        });
      });
    });
  });

  it('TC_UI_012: удалить выполненную задачу', function (done) {
    page.addTask('Done', function () {
      page.toggleTask(0, function () {
        page.deleteTask(0, function () {
          page.getTasks().then(function (items) {
            assert.strictEqual(items.length, 0);
            done();
          });
        });
      });
    });
  });
});
