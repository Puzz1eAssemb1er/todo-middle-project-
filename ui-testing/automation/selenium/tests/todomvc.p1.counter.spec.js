var assert = require('assert');
var driver = require('../utils/driver').driver;
var TodoPage = require('../pages/todomvc.page').TodoPage;

describe('P1: Счётчик задач', function () {
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

  it('TC_UI_007: корректная работа счётчика', function (done) {
    page.addTask('A', function () {
      page.addTask('B', function () {
        page.toggleTask(0, function () {
          page.getCounter().then(function (count) {
            assert.strictEqual(count, 1);
            done();
          });
        });
      });
    });
  });
});
