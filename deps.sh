#!/bin/bash

echo "Установка зависимостей..."

cd django
pip install -r requirements.txt

cd ../react-amonic
npm install

echo "Зависимости установлены!"
echo

echo "Инструкции для запуска серверов:"

echo "1. Запуск Django сервера:"
echo "   - Перейти в директорию с Django проектом, выполнив команду: cd django/django_project"
echo "   - Запустить сервер Django, выполнив команду: python manage.py runserver"

echo "2. Запуск React сервера:"
echo "   - Перейти в директорию с React проектом, выполнив команду: cd ../react-amonic"
echo "   - Запустить сервер React, выполнив команду: npm run dev"

echo
echo "  - Django сервер: http://localhost:8000"
echo "  - React сервер: http://localhost:3000"
