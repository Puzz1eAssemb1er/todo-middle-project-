var assert = require('assert');
var driver = require('../utils/driver').driver;
var TodoPage = require('../pages/todomvc.page').TodoPage;

describe('P3: UX, Edge Cases, Negative Cases', function () {
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

  // -----------------------------
  // UX BEHAVIOR
  // -----------------------------

  it('TC_UI_P3_001: поле ввода очищается после добавления задачи', function (done) {
    page.addTask('Clean input', function () {
      page.getInputValue().then(function (value) {
        assert.strictEqual(value, '');
        done();
      });
    });
  });

  it('TC_UI_P3_002: кнопка удаления появляется только при наведении', function (done) {
    page.addTask('Hover me', function () {
      page.isDeleteButtonVisible(0).then(function (beforeHover) {
        page.hoverTask(0, function () {
          page.isDeleteButtonVisible(0).then(function (afterHover) {
            assert.strictEqual(beforeHover, false);
            assert.strictEqual(afterHover, true);
            done();
          });
        });
      });
    });
  });

  it('TC_UI_P3_003: двойной клик переводит задачу в режим редактирования', function (done) {
    page.addTask('Edit mode', function () {
      page.startEdit(0, function () {
        page.isEditing(0).then(function (state) {
          assert.strictEqual(state, true);
          done();
        });
      });
    });
  });

  // -----------------------------
  // NEGATIVE CASES
  // -----------------------------

  it('TC_UI_P3_004: пустая задача не создаётся', function (done) {
    page.addTask('   ', function () {
      page.getTasks().then(function (items) {
        assert.strictEqual(items.length, 0);
        done();
      });
    });
  });

  it('TC_UI_P3_005: задача не сохраняется пустой при редактировании', function (done) {
    page.addTask('Not empty', function () {
      page.editTask(0, '', function () {
        page.getTaskText(0).then(function (text) {
          assert.strictEqual(text, 'Not empty');
          done();
        });
      });
    });
  });

  it('TC_UI_P3_006: нельзя удалить задачу без наведения', function (done) {
    page.addTask('Try delete', function () {
      page.tryDeleteWithoutHover(0, function (result) {
        assert.strictEqual(result, false);
        done();
      });
    });
  });

  // -----------------------------
  // EDGE CASES
  // -----------------------------

  it('TC_UI_P3_007: длинная задача отображается корректно', function (done) {
    var longText = new Array(200).join('A'); // 199 символов
    page.addTask(longText, function () {
      page.getTaskText(0).then(function (text) {
        assert.strictEqual(text, longText);
        done();
      });
    });
  });

  it('TC_UI_P3_008: задача с Unicode символами отображается корректно', function (done) {
    var unicode = '🔥 Тестовая задача 🚀';
    page.addTask(unicode, function () {
      page.getTaskText(0).then(function (text) {
        assert.strictEqual(text, unicode);
        done();
      });
    });
  });

  it('TC_UI_P3_009: Toggle All работает при 1 задаче', function (done) {
    page.addTask('Single', function () {
      page.toggleAll(function () {
        page.isTaskCompleted(0).then(function (state) {
          assert.strictEqual(state, true);
          done();
        });
      });
    });
  });

  it('TC_UI_P3_010: Clear completed не ломается при отсутствии выполненных задач', function (done) {
    page.addTask('A', function () {
      page.clearCompleted(function () {
        page.getTasks().then(function (items) {
          assert.strictEqual(items.length, 1);
          done();
        });
      });
    });
  });

});
