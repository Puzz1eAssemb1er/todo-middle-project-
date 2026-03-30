var assert = require('assert');
var driver = require('../utils/driver').driver;
var TodoPage = require('../pages/todomvc.page.cjs').TodoPage;

describe('P1: Выполнение задач', function () {
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

  it('TC_UI_003: отметить задачу как выполненную', function (done) {
    page.addTask('Test', function () {
      page.toggleTask(0, function () {
        page.isTaskCompleted(0).then(function (state) {
          assert.strictEqual(state, true);
          done();
        });
      });
    });
  });

  it('TC_UI_004: снять выполнение', function (done) {
    page.addTask('Test', function () {
      page.toggleTask(0, function () {
        page.toggleTask(0, function () {
          page.isTaskCompleted(0).then(function (state) {
            assert.strictEqual(state, false);
            done();
          });
        });
      });
    });
  });

  it('TC_UI_010: Toggle All — выполнить все', function (done) {
    page.addTask('A', function () {
      page.addTask('B', function () {
        page.toggleAll(function () {
          page.isTaskCompleted(0).then(function (s1) {
            page.isTaskCompleted(1).then(function (s2) {
              assert.strictEqual(s1 && s2, true);
              done();
            });
          });
        });
      });
    });
  });

  it('TC_UI_011: Toggle All — снять выполнение', function (done) {
    page.addTask('A', function () {
      page.addTask('B', function () {
        page.toggleAll(function () {
          page.toggleAll(function () {
            page.isTaskCompleted(0).then(function (s1) {
              page.isTaskCompleted(1).then(function (s2) {
                assert.strictEqual(s1 || s2, false);
                done();
              });
            });
          });
        });
      });
    });
  });
});
