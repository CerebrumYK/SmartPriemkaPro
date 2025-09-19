#!/bin/bash

echo "=== Buildings_control: Автоматическая настройка среды ==="

# 1. Проверка наличия Node.js и npm
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js не найден. Пожалуйста, установите Node.js с https://nodejs.org/"
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  echo "npm не найден. Пожалуйста, установите npm (обычно входит вместе с Node.js)."
  exit 1
fi

echo "Node.js версия: $(node -v)"
echo "npm версия: $(npm -v)"

# 2. Клонирование репозитория (опционально)
# git clone https://github.com/CerebrumYK/Buildings_control.git
# cd Buildings_control

# 3. Установка зависимостей
echo "Устанавливаем npm зависимости..."
npm install

# 4. Проверка переменных окружения
if [ ! -f .env.local ]; then
  if [ -f .env.example ]; then
    echo ".env.local не найден. Копируем .env.example → .env.local"
    cp .env.example .env.local
    echo "Проверьте и заполните .env.local своими параметрами (например, ключи Supabase)!"
  else
    echo "Внимание: .env.local и .env.example не найдены. Создайте .env.local вручную."
  fi
else
  echo ".env.local найден."
fi

# 5. Линтинг и форматирование
echo "Запуск линтера (npm run lint)..."
npm run lint || echo "Линтинг завершился с ошибками. Проверьте их!"

# 6. Сборка проекта
echo "Собираем проект (npm run build)..."
npm run build || { echo "Ошибка сборки!"; exit 1; }

# 7. Запуск тестов (если реализовано)
if npm run | grep -q 'test'; then
  echo "Запуск тестов (npm run test)..."
  npm run test || echo "Внимание: не все тесты прошли успешно."
else
  echo "Тесты не настроены (нет скрипта test в package.json)."
fi

# 8. Запуск dev-сервера
echo "Запуск dev-сервера (npm run dev)..."
npm run dev

echo "=== Всё готово! Откройте http://localhost:3000 в браузере. ==="