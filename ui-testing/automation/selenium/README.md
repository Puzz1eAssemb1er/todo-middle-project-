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


# UI Automation Framework — TodoMVC (Selenium + JavaScript ES5)

Этот проект содержит автоматизированные UI‑тесты для приложения **TodoMVC (JavaScript ES5)**.  
Фреймворк построен на **Selenium WebDriver**, **Mocha**, **Page Object**, **Allure Reports** и **GitHub Actions (CI)**.

---

# 📁 Структура проекта

ui-testing/
automation/
selenium/
pages/                 # Page Object
tests/                 # P1–P4 тесты + Allure setup
utils/                 # WebDriver
allure-results/        # Allure output (генерируется автоматически)
package.json
README.md


---

# 🚀 Запуск тестов локально
## 1. Установить зависимости
Перейти в директорию:

cd ui-testing/automation/selenium
npm install


## 2. Запустить тесты

npm test


После выполнения:

- тесты запустятся через Mocha  
- Allure соберёт результаты  
- в папке `allure-results/` появятся файлы:
  - `*.json`
  - `*.xml`
  - `*.txt`

Это означает, что Allure работает корректно.

---

# 📊 Просмотр Allure отчёта
Если установлен Allure CLI:

npm run allure:serve


Откроется интерактивный отчёт в браузере.

---

# 🔄 CI/CD — GitHub Actions

Файл workflow:

.github/workflows/selenium-tests.yml


CI автоматически:

- устанавливает Node.js  
- устанавливает Chrome  
- устанавливает зависимости  
- запускает тесты  
- отображает результаты в GitHub Actions  

CI запускается при:

- push в ветку `main`
- pull request в `main`

---

# 🧱 Архитектура фреймворка
## Page Object
Файл:
pages/todomvc.page.js


Содержит:

- базовые методы  
- методы для P1–P4  
- работу с DOM  
- взаимодействие с элементами  

## Тесты
Папка:
tests/


Содержит:

- P1 — базовая функциональность  
- P2 — редактирование, фильтры  
- P3 — UX, негативные сценарии  
- P4 — performance, stress, DOM stability  

## Allure
Файл:
tests/mocha-allure-setup.js


Добавляет метки и интеграцию с Allure.

---



---

# 👤 Автор
Sergey — QA Automation Engineer (JavaScript ES5 + Selenium + API + CI/CD)


Документ будет дополняться по мере расширения покрытия тестами.
