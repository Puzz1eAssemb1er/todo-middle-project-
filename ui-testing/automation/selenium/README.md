# UI Automation (Selenium + JavaScript ES5)

Этот раздел содержит автоматизированные UI‑тесты для приложения **ToDoMVC (JavaScript ES5)**.  
Тесты написаны в стиле **Page Object**, запускаются через **Mocha**, используют **Selenium WebDriver**.

---

## 📁 Структура проекта

selenium/
package.json
/config
webdriver.conf.js
/pages
todomvc.page.js
/tests
todomvc.p1.adding.spec.js
todomvc.p1.toggle.spec.js
todomvc.p1.delete.spec.js
todomvc.p1.counter.spec.js
/utils
driver.js

---

## 🚀 Запуск тестов
Установить зависимости:
npm install

Запустить тесты:
npm test

---

## 🧱 Технологии

- JavaScript ES5  
- Selenium WebDriver  
- Mocha  
- Page Object Model  

---

## 🎯 Покрытие тестами
Реализованы автотесты уровня **P1**:
- Добавление задач  
- Выполнение / снятие выполнения  
- Массовое выполнение (Toggle All)  
- Удаление задач  
- Корректность счётчика задач  

---

Документ будет дополняться по мере расширения покрытия тестами.
