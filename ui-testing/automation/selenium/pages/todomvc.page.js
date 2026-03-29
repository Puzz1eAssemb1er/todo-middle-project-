// pages/todomvc.page.js
var By = require('selenium-webdriver').By;

function TodoPage(driver) {
  this.driver = driver;
  this.url = 'https://todomvc.com/examples/javascript-es5/';
}

TodoPage.prototype.open = function (done) {
  this.driver.get(this.url).then(function () {
    done();
  });
};

TodoPage.prototype.addTask = function (text, done) {
  var input = this.driver.findElement(By.css('.new-todo'));
  input.sendKeys(text + '\n').then(function () {
    done();
  });
};

TodoPage.prototype.getTasks = function () {
  return this.driver.findElements(By.css('.todo-list li'));
};

TodoPage.prototype.getTaskText = function (index) {
  return this.getTasks().then(function (items) {
    return items[index].findElement(By.css('label')).getText();
  });
};


var By = require('selenium-webdriver').By;
var Key = require('selenium-webdriver').Key;
var until = require('selenium-webdriver').until;

// -----------------------------
// P3: UX + Edge Cases + Negative Cases
// -----------------------------

// Получить значение поля ввода
TodoPage.prototype.getInputValue = function () {
  return this.driver.findElement(By.css('.new-todo')).getAttribute('value');
};

// Проверить, видна ли кнопка удаления (крестик)
TodoPage.prototype.isDeleteButtonVisible = function (index) {
  return this.getTasks().then(function (items) {
    return items[index]
      .findElement(By.css('.destroy'))
      .isDisplayed()
      .then(function (visible) {
        return visible;
      })
      .catch(function () {
        return false;
      });
  });
};

// Навести курсор на задачу
TodoPage.prototype.hoverTask = function (index, done) {
  var self = this;
  this.getTasks().then(function (items) {
    var task = items[index];
    self.driver
      .actions()
      .move({ origin: task })
      .perform()
      .then(function () {
        done();
      });
  });
};

// Попытка удалить без наведения (должно вернуть false)
TodoPage.prototype.tryDeleteWithoutHover = function (index, done) {
  this.getTasks().then(function (items) {
    var deleteBtn = items[index].findElement(By.css('.destroy'));
    deleteBtn
      .click()
      .then(function () {
        done(true);
      })
      .catch(function () {
        done(false);
      });
  });
};

// Войти в режим редактирования (двойной клик)
TodoPage.prototype.startEdit = function (index, done) {
  var self = this;
  this.getTasks().then(function (items) {
    var label = items[index].findElement(By.css('label'));
    self.driver
      .actions()
      .doubleClick(label)
      .perform()
      .then(function () {
        done();
      });
  });
};

// Проверить, что задача в режиме редактирования
TodoPage.prototype.isEditing = function (index) {
  return this.getTasks().then(function (items) {
    return items[index].getAttribute('class').then(function (cls) {
      return cls.indexOf('editing') !== -1;
    });
  });
};

// Редактировать задачу и сохранить через Enter
TodoPage.prototype.editTask = function (index, newText, done) {
  var self = this;
  this.getTasks().then(function (items) {
    var editInput = items[index].findElement(By.css('.edit'));
    editInput.clear().then(function () {
      editInput.sendKeys(newText + Key.ENTER).then(function () {
        done();
      });
    });
  });
};

// Отменить редактирование через Esc
TodoPage.prototype.cancelEdit = function (index, newText, done) {
  var self = this;
  this.getTasks().then(function (items) {
    var editInput = items[index].findElement(By.css('.edit'));
    editInput.clear().then(function () {
      editInput.sendKeys(newText + Key.ESCAPE).then(function () {
        done();
      });
    });
  });
};

// Получить список видимых задач (для фильтров)
TodoPage.prototype.getVisibleTasks = function () {
  return this.driver.findElements(By.css('.todo-list li')).then(function (items) {
    return items.filter(function (item) {
      return item.isDisplayed();
    });
  });
};

// Фильтр Active
TodoPage.prototype.filterActive = function (done) {
  this.driver.findElement(By.linkText('Active')).click().then(function () {
    done();
  });
};

// Фильтр Completed
TodoPage.prototype.filterCompleted = function (done) {
  this.driver.findElement(By.linkText('Completed')).click().then(function () {
    done();
  });
};

// Clear completed
TodoPage.prototype.clearCompleted = function (done) {
  this.driver
    .findElement(By.css('.clear-completed'))
    .click()
    .then(function () {
      done();
    })
    .catch(function () {
      done(); // если кнопки нет — тест проверит это
    });
};

// Проверить, видна ли кнопка Clear completed
TodoPage.prototype.isClearCompletedVisible = function () {
  return this.driver
    .findElement(By.css('.clear-completed'))
    .isDisplayed()
    .then(function (visible) {
      return visible;
    })
    .catch(function () {
      return false;
    });
};


module.exports.TodoPage = TodoPage;
