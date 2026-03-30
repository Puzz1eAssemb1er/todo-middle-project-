var assert = require('assert');
var driver = require('../utils/driver').driver;
var TodoPage = require('../pages/todomvc.page.cjs').TodoPage;


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

  it('TC_UI_002: добавление нескольких задач', function (done) {
    page.addTask('Task 1', function () {
      page.addTask('Task 2', function () {
        page.addTask('Task 3', function () {
          page.getTasks().then(function (items) {
            assert.strictEqual(items.length, 3);
            done();
          });
        });
      });
    });
  });

  it('TC_UI_008: обрезка пробелов', function (done) {
    page.addTask('   Trim me   ', function () {
      page.getTaskText(0).then(function (text) {
        assert.strictEqual(text, 'Trim me');
        done();
      });
    });
  });
});
