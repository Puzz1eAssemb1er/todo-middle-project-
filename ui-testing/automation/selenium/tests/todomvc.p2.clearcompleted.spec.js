var assert = require('assert');
var driver = require('../utils/driver').driver;
var TodoPage = require('../pages/todomvc.page.cjs').TodoPage;

describe('P2: Clear completed', function () {
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

  it('TC_UI_P2_006: Clear completed удаляет только выполненные', function (done) {
    page.addTask('A', function () {
      page.addTask('B', function () {
        page.toggleTask(1, function () {
          page.clearCompleted(function () {
            page.getTasks().then(function (tasks) {
              assert.strictEqual(tasks.length, 1);
              done();
            });
          });
        });
      });
    });
  });

  it('TC_UI_P2_007: кнопка Clear completed отображается только при наличии выполненных', function (done) {
    page.addTask('A', function () {
      page.isClearCompletedVisible().then(function (visible) {
        assert.strictEqual(visible, false);
        done();
      });
    });
  });
});
