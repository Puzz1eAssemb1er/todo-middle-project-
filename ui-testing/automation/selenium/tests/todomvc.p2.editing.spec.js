var assert = require('assert');
var driver = require('../utils/driver').driver;
var TodoPage = require('../pages/todomvc.page').TodoPage;

describe('P2: Редактирование задач', function () {
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

  it('TC_UI_P2_001: вход в режим редактирования', function (done) {
    page.addTask('Edit me', function () {
      page.startEdit(0, function () {
        page.isEditing(0).then(function (state) {
          assert.strictEqual(state, true);
          done();
        });
      });
    });
  });

  it('TC_UI_P2_002: сохранить изменения через Enter', function (done) {
    page.addTask('Old', function () {
      page.editTask(0, 'New text', function () {
        page.getTaskText(0).then(function (text) {
          assert.strictEqual(text, 'New text');
          done();
        });
      });
    });
  });

  it('TC_UI_P2_003: отмена редактирования через Esc', function (done) {
    page.addTask('Original', function () {
      page.cancelEdit(0, 'Changed', function () {
        page.getTaskText(0).then(function (text) {
          assert.strictEqual(text, 'Original');
          done();
        });
      });
    });
  });
});
