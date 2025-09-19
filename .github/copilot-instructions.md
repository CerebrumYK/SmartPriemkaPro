# Project Overview

Проект **Buildings_control** — система для приёмки объектов недвижимости.  
Использует:

- Backend: PostgreSQL (через Supabase)
- Frontend: Next.js 14 (React + TypeScript)
- Автоматизация экспорта отчётов: DOCX
- CI/CD: GitHub Actions (lint + build + test)

## Build & Run

- Всегда выполняй `npm install` перед сборкой.
- Dev: `npm run dev`
- Build: `npm run build`
- Test: `npm run test` (если есть)
- Lint: `npm run lint`

## Project Layout

- `/src` — основной код
- `/db` — миграции/SQL
- `.github/workflows` — CI/CD
- `/templates` — DOCX/др.

# Coding Standards

- TypeScript strict mode
- ESLint + Prettier обязательны
- Именование файлов: kebab-case
- React компоненты — функциональные
