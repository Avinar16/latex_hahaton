# Редактор формул

## Описание проекта
"Редактор формул" – это микросервисное веб-приложение для создания и редактирования LaTeX формул с дополнительной функцией антиплагиата. Проект позволяет пользователям легко вводить и анализировать математические формулы без необходимости знания LaTeX благодаря удобному визуальному интерфейсу.

## Технологии
Проект разработан с использованием следующих технологий:
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Django REST Framework
- **База данных**: PostgreSQL
- **Web сервер и прокси**: Nginx
- **Контейнеризация**: Docker

## Требования
Для локального развертывания проекта требуется установленный Docker.

## Установка
1. Установите Docker на вашу систему.
2. Клонируйте репозиторий с проектом:
   ```bash
   git clone (https://github.com/Avinar16/latex_hahaton).git
   cd your-project-directory
   ```
3. Запустите сборку и развертывание используя Docker Compose:
   ```bash
   docker-compose up --build
   ```

## Использование
Для редактирования формул используйте блок визуального набора, который позволяет вводить и редактировать формулы без знания LaTeX синтаксиса:
- **Редактировать формулы**: Просто начните вводить или редактировать формулы через удобный пользовательский интерфейс.
- **Анализ формулы**:
 После создания или выбора формулы, нажмите на кнопку "Анализ формулы".
 Система проведет сравнение вашей формулы с базой данных формул для выявления совпадений в контексте антиплагиата.
 Вы получите отчет о результате сравнения, который поможет определить уникальность вашей формулы.

## Архитектура
Проект использует следующую структуру микросервисов:
- **Nginx**: Выступает в роли веб-сервера и прокси.
- **Frontend**: Реализован на Next.js с использованием Tailwind CSS для стилей.
- **Backend**: Обеспечивает API через Django REST Framework.
- **База данных**: Стандартные операции CRUD обрабатываются PostgreSQL.

## Лицензия
Проект распространяется под лицензией MIT, которая позволяет свободное использование, модификацию и распространение кода в личных и коммерческих целях.
