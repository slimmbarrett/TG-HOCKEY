import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const useTelegramUser = () => {
  const tg = (window as any).Telegram?.WebApp;
  return tg?.initDataUnsafe?.user;
};

function App() {
  const telegramUser = useTelegramUser();

  const [matchId, setMatchId] = useState("");
  const [scoreA, setScoreA] = useState<number | null>(null);
  const [scoreB, setScoreB] = useState<number | null>(null);
  const [status, setStatus] = useState("");
  const [matches, setMatches] = useState<any[]>([]);
  const [hasPredicted, setHasPredicted] = useState(false);

  useEffect(() => {
    if (!telegramUser) return;

    supabase.from("users").upsert({
      user_id: telegramUser.id.toString(),
      username: telegramUser.username || `${telegramUser.first_name || ""} ${telegramUser.last_name || ""}`.trim()
    });

    supabase
      .from("matches")
      .select("*")
      .then(({ data }) => {
        if (data) {
          const sorted = [...data].sort((a, b) => {
            const isAComplete = a.score_a !== null && a.score_b !== null;
            const isBComplete = b.score_a !== null && b.score_b !== null;
            if (isAComplete === isBComplete) {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            }
            return isAComplete ? 1 : -1;
          });
          setMatches(sorted);
        }
      });
  }, []);

  useEffect(() => {
    if (!matchId || !telegramUser) return;

    supabase
      .from("predictions")
      .select("*")
      .eq("match_id", matchId)
      .eq("user_id", telegramUser.id.toString())
      .then(({ data }) => {
        if (data && data.length > 0) {
          setHasPredicted(true);
          setScoreA(data[0].score_a);
          setScoreB(data[0].score_b);
        } else {
          setHasPredicted(false);
          setScoreA(null);
          setScoreB(null);
        }
      });
  }, [matchId, telegramUser]);

  if (!telegramUser) {
    return (
      <div className="p-4 text-red-600">
        🛑 Пожалуйста, откройте это приложение через Telegram WebApp.
      </div>
    );
  }

  return (
    <div>
      {/* Other components and JSX here */}
      <p className="p-4 text-green-600">
        ✅ Вы вошли как {telegramUser.username || telegramUser.first_name}.
      </p>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">📅 Список матчей</h2>
        {matches.map((match) => (
          <div
            key={match.id}
            className={`border rounded p-3 mb-2 ${match.score_a !== null && match.score_b !== null ? 'bg-gray-200 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-50'}`}
            onClick={() => {
              if (match.score_a === null && match.score_b === null) {
                setMatchId(match.id);
              }
            }}
          >
            <p className="font-semibold">
              {match.teama} vs {match.teamb}
              {match.score_a !== null && match.score_b !== null && (
                <span className="ml-2 text-green-600 font-normal">
                  ({match.score_a} : {match.score_b})
                </span>
              )}
            </p>
            <p className="text-sm text-gray-600">{new Date(match.date).toLocaleString()}</p>
            <p className="text-xs text-gray-400">ID: {match.id}</p>
          </div>
        ))}
      </div>
      {!hasPredicted ? (
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">📝 Сделать прогноз</h2>
          <input
            type="text"
            placeholder="ID матча"
            value={matchId}
            onChange={(e) => setMatchId(e.target.value)}
            className="border p-2 mb-2 block w-full"
          />
          <input
            type="number"
            placeholder="Счёт команды A"
            value={scoreA ?? ""}
            onChange={(e) => setScoreA(Number(e.target.value))}
            className="border p-2 mb-2 block w-full"
          />
          <input
            type="number"
            placeholder="Счёт команды B"
            value={scoreB ?? ""}
            onChange={(e) => setScoreB(Number(e.target.value))}
            className="border p-2 mb-2 block w-full"
          />
          <button
            onClick={async () => {
              if (!matchId || scoreA === null || scoreB === null) return;

              const { error } = await supabase.from("predictions").insert({
                match_id: matchId,
                user_id: telegramUser.id.toString(),
                username: telegramUser.username || telegramUser.first_name,
                score_a: scoreA,
                score_b: scoreB,
              });

              setStatus(error ? "❌ Ошибка" : "✅ Прогноз отправлен!");
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Отправить прогноз
          </button>

          {status && <p className="mt-2">{status}</p>}
        </div>
      ) : (
        <div className="p-4 text-gray-500">
          ✅ Вы уже сделали прогноз на этот матч:
          <div className="mt-2">
            <span className="font-semibold">Счёт:</span> {scoreA} : {scoreB}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;