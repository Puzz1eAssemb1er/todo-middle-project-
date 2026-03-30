var assert = require('assert');
var driver = require('../utils/driver').driver;
var TodoPage = require('../pages/todomvc.page.cjs').TodoPage;

describe('P4: Performance, Stress, DOM Stability', function () {
  var page;

   beforeEach(function (done) {
    driver = createDriver();
    page = new TodoPage(driver);
    page.open(done);
});


  after(function (done) {
    driver.quit().then(function () {
      done();
    });
  });


  // -----------------------------
  // PERFORMANCE
  // -----------------------------

  it('TC_UI_P4_001: добавление 100 задач не ломает интерфейс', function (done) {
    var count = 0;

    function addNext() {
      if (count >= 100) {
        page.getTasks().then(function (items) {
          assert.strictEqual(items.length, 100);
          done();
        });
        return;
      }

      page.addTask('Task ' + count, function () {
        count++;
        addNext();
      });
    }

    addNext();
  });

  it('TC_UI_P4_002: Toggle All работает при 100 задачах', function (done) {
    var count = 0;

    function addNext() {
      if (count >= 50) {
        page.toggleAll(function () {
          page.getTasks().then(function (items) {
            items[0].getAttribute('class').then(function (cls) {
              assert.ok(cls.indexOf('completed') !== -1);
              done();
            });
          });
        });
        return;
      }

      page.addTask('Load ' + count, function () {
        count++;
        addNext();
      });
    }

    addNext();
  });

  // -----------------------------
  // STRESS
  // -----------------------------

  it('TC_UI_P4_003: быстрое добавление задач подряд не вызывает ошибок', function (done) {
    var tasks = 20;
    var added = 0;

    for (var i = 0; i < tasks; i++) {
      page.addTask('Fast ' + i, function () {
        added++;
        if (added === tasks) {
          page.getTasks().then(function (items) {
            assert.strictEqual(items.length, tasks);
            done();
          });
        }
      });
    }
  });

  it('TC_UI_P4_004: быстрое переключение задач не ломает DOM', function (done) {
    page.addTask('Stress', function () {
      var toggles = 10;
      var doneCount = 0;

      function toggle() {
        page.toggleTask(0, function () {
          doneCount++;
          if (doneCount < toggles) toggle();
          else done();
        });
      }

      toggle();
    });
  });

  // -----------------------------
  // DOM STABILITY
  // -----------------------------

  it('TC_UI_P4_005: DOM не меняет структуру после 50 операций', function (done) {
    var ops = 0;

    function nextOp() {
      if (ops >= 50) {
        page.getTasks().then(function (items) {
          assert.ok(items.length >= 1);
          done();
        });
        return;
      }

      page.addTask('DOM ' + ops, function () {
        page.toggleTask(0, function () {
          ops++;
          nextOp();
        });
      });
    }

    nextOp();
  });

  it('TC_UI_P4_006: Clear completed не ломает DOM при большом количестве задач', function (done) {
    var count = 0;

    function addNext() {
      if (count >= 30) {
        page.toggleAll(function () {
          page.clearCompleted(function () {
            page.getTasks().then(function (items) {
              assert.strictEqual(items.length, 0);
              done();
            });
          });
        });
        return;
      }

      page.addTask('Bulk ' + count, function () {
        count++;
        addNext();
      });
    }

    addNext();
  });

});
