# 🧠 Supabase Edge Function: Recalculate Points

## 📌 Deploy:
```bash
supabase functions deploy recalculate-points
```

## 🔐 Required .env on Supabase:
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

## ✅ What it does:
- Resets all user points to 0
- Runs SQL function `calculate_points()` to recalculate leaderboard
