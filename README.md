# 🏒 Hockey WebApp (Vite + React + Tailwind)

## ✅ Установка

```bash
npm install
npm run dev
```

## 🚀 Деплой

### Vercel:
- Укажи переменную окружения:
  ```
  VITE_API_URL=https://your-api-url-from-railway.app
  ```

- Проект собирается автоматически с помощью `vercel.json`

### Railway (backend API):
- Используется как внешний API, должен отдавать:
  - `GET /matches`
  - `POST /submit_prediction`

