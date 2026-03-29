TodoPage.prototype.toggleTask = function (index, done) {
  this.getTasks().then(function (items) {
    items[index].findElement(By.css('.toggle')).click().then(function () {
      done();
    });
  });
};

TodoPage.prototype.isTaskCompleted = function (index) {
  return this.getTasks().then(function (items) {
    return items[index].getAttribute('class').then(function (cls) {
      return cls.indexOf('completed') !== -1;
    });
  });
};

TodoPage.prototype.toggleAll = function (done) {
  this.driver.findElement(By.css('.toggle-all')).click().then(function () {
    done();
  });
};

TodoPage.prototype.deleteTask = function (index, done) {
  this.getTasks().then(function (items) {
    var task = items[index];
    var deleteBtn = task.findElement(By.css('.destroy'));

    // наведение курсора
    page.driver.actions().move({ origin: task }).perform().then(function () {
      deleteBtn.click().then(function () {
        done();
      });
    });
  });
};

TodoPage.prototype.getCounter = function () {
  return this.driver.findElement(By.css('.todo-count strong')).getText().then(function (text) {
    return parseInt(text, 10);
  });
};
