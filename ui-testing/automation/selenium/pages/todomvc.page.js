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

module.exports.TodoPage = TodoPage;
