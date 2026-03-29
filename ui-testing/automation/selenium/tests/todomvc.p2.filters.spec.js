var assert = require('assert');
var driver = require('../utils/driver').driver;
var TodoPage = require('../pages/todomvc.page').TodoPage;

describe('P2: Фильтры', function () {
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

  it('TC_UI_P2_004: фильтр Active показывает только активные', function (done) {
    page.addTask('A', function () {
      page.addTask('B', function () {
        page.toggleTask(1, function () {
          page.filterActive(function () {
            page.getVisibleTasks().then(function (tasks) {
              assert.strictEqual(tasks.length, 1);
              done();
            });
          });
        });
      });
    });
  });

  it('TC_UI_P2_005: фильтр Completed показывает только выполненные', function (done) {
    page.addTask('A', function () {
      page.toggleTask(0, function () {
        page.filterCompleted(function () {
          page.getVisibleTasks().then(function (tasks) {
            assert.strictEqual(tasks.length, 1);
            done();
          });
        });
      });
    });
  });
});
