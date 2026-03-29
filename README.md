# QA Middle Project: UI + API Testing

## Описание проекта

Этот репозиторий — учебно-практический проект уровня Middle QA Engineer.  
Цель проекта — продемонстрировать полный цикл тестирования веб-приложений:
- функциональное тестирование UI (ToDoMVC),
- тестирование REST API (Swagger Petstore),
- базовые проверки данных,
- автоматизация тестов (Python, pytest, requests, Selenium).

Проект оформлен так, чтобы им можно было делиться с рекрутерами и тимлидами как с примером реального рабочего подхода к тестированию.

---

## Стек и инструменты

- Язык: Python 3.x  
- Тестовый фреймворк: pytest  
- UI-автоматизация: Selenium WebDriver  
- API-автоматизация: requests  
- Инструменты для ручного тестирования:
  - Postman (API)
  - браузерные DevTools (UI)
- Контроль версий: Git + GitHub

---

## Объекты тестирования

### UI: ToDoMVC (React)
- Сайт: https://todomvc.com/examples/react/
- Основной функционал:
  - добавление задач,
  - редактирование,
  - удаление,
  - отметка выполнения,
  - фильтрация задач,
  - очистка выполненных задач.

### API: Swagger Petstore
- Сайт: https://petstore.swagger.io/
- Основной функционал:
  - создание сущностей (pet),
  - чтение данных,
  - обновление,
  - удаление,
  - позитивные и негативные сценарии.

---

## Структура репозитория

```text
ui-testing/
  test-cases/        # тест-кейсы для UI
  checklists/        # чек-листы для UI
  bug-reports/       # баг-репорты по UI
  automation/
    selenium/        # автотесты UI (Selenium + pytest)

api-testing/
  test-cases/        # тест-кейсы для API
  checklists/        # чек-листы для API
  bug-reports/       # баг-репорты по API
  postman/           # коллекции Postman
  automation/
    pytest/          # автотесты API (pytest + requests)
