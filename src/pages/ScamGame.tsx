import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import nodes, { getRunChance, getScore } from "../data/scam-data";

const ScamGame = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prevData = (location.state as any) || {};

  const [currentId, setCurrentId] = useState("m_start");
  const [risk, setRisk] = useState(0);
  const [money, setMoney] = useState(0); // 诈骗金额
  const [commission, setCommission] = useState(0); // 提成
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  const node = nodes[currentId];
  if (!node) return null;

  const handleSelect = (nextId: string) => {
    setHistory((h) => [...h, currentId]);
    const n = nodes[nextId];

    // 累计状态
    if (n) {
      if (n.risk !== undefined && n.risk > risk) setRisk(n.risk);
      if (n.money) setMoney((m) => m + n.money);
      if (n.commission) setCommission((c) => c + n.commission);
    }

    if (n && n.type === "ending") {
      const finalScore = getScore(risk, money);
      setScore(finalScore);
      setShowResult(true);
      // 被抓的结局也跳168（积分清零）
      if (nextId === "go_prize" || n.risk === 0 || n.risk >= 100) {
        navigate("/soft-spot", {
          state: { money, scores: prevData?.scores },
        });
        return;
      }
      return;
    }

    setCurrentId(nextId);
  };

  const runChance = getRunChance(risk);
  const isEnding = showResult;

  const getRiskColor = (r: number) =>
    r >= 70 ? "#c46a6a" : r >= 40 ? "#c4906a" : r >= 20 ? "#8baa96" : "#4a6d58";

  // 能否继续（未被捕就能继续）
  const canContinue = !showResult && risk < 100 && node.type !== "ending";

  // 结局页
  if (isEnding) {
    const escaped =
      risk < 100 &&
      !node.text.includes("被捕") &&
      !node.text.includes("刑期") &&
      !node.text.includes("被抓");
    const getLevel = (s: number) => {
      if (s >= 80) return { text: "顶级诈骗师", color: "#c46a6a" };
      if (s >= 60) return { text: "专业水准", color: "#c4906a" };
      if (s >= 40) return { text: "初出茅庐", color: "#8baa96" };
      return { text: "不及格", color: "#666" };
    };
    const level = getLevel(score);
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 py-8"
        style={{ backgroundColor: "#f5faf7" }}
      >
        <div className="max-w-[480px] w-full bg-white rounded-[20px] shadow p-[32px] text-center space-y-5">
          <div
            className="text-[14px] leading-relaxed whitespace-pre-line text-left"
            style={{ color: "#333" }}
          >
            {node.text}
          </div>
          <div className="border-t pt-4 space-y-2">
            <p className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
              你的诈骗能力评分
            </p>
            <p className="text-4xl font-bold" style={{ color: level.color }}>
              {score}
            </p>
            <p className="text-sm" style={{ color: level.color }}>
              {level.text}
            </p>
            <p className="text-xs" style={{ color: "#999" }}>
              骗取 ¥{money.toLocaleString()} · 提成 ¥
              {commission.toLocaleString()} · 风险 {risk}%
            </p>
          </div>
          <div className="space-y-2">
            {/* 只要未被捕就可以继续 */}
            {risk > 0 && risk < 100 && escaped && (
              <button
                onClick={() => {
                  setShowResult(false);
                  setRisk((r) => Math.max(0, r - 5));
                }}
                className="w-full py-3 rounded-xl text-white font-medium cursor-pointer transition hover:scale-[1.01]"
                style={{ backgroundColor: "#c4906a" }}
              >
                继续诈骗（风险降低至 {Math.max(0, risk - 5)}%）
              </button>
            )}
            {/* 真不干了：再次风险判定 */}
            {risk > 0 && risk < 100 && escaped && (
              <button
                onClick={() => {
                  const caught = Math.random() * 100 < risk;
                  if (caught) {
                    let years = 0;
                    if (money >= 500000)
                      years = 10 + Math.floor(Math.random() * 3);
                    else if (money >= 30000)
                      years = 3 + Math.floor(Math.random() * 5);
                    else years = 1 + Math.floor(Math.random() * 2);
                    if (years > 12) years = 12;
                    alert(
                      `🚨 你被捕了！\n\n⚖️ 判决：诈骗罪\n金额：¥${money.toLocaleString()}\n刑期：${years}年有期徒刑`,
                    );
                  } else {
                    alert(
                      `✅ 你成功逃脱了！风险${risk}%你赌赢了。\n\n累计诈骗 ¥${money.toLocaleString()}`,
                    );
                  }
                  // 不管被捕还是逃脱，最终都跳领奖页
                  setShowResult(false);
                  setRisk(0);
                  setMoney(0);
                  setCommission(0);
                  setHistory([]);
                  navigate("/soft-spot", {
                    state: { money, scores: prevData?.scores },
                  });
                }}
                className="w-full py-3 rounded-xl font-medium cursor-pointer transition hover:scale-[1.01] border"
                style={{
                  borderColor: "#e5ede8",
                  color: "#666",
                  backgroundColor: "white",
                }}
              >
                真不干了（{risk}%概率被捕）
              </button>
            )}
            <button
              onClick={() => {
                setShowResult(false);
                setRisk(0);
                setMoney(0);
                setCommission(0);
                setHistory([]);
                setCurrentId("m_start");
              }}
              className="w-full py-3 rounded-xl text-white font-medium cursor-pointer transition hover:scale-[1.01]"
              style={{ backgroundColor: "#4a6d58" }}
            >
              重来一次
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5faf7" }}>
      {/* 顶部状态栏 */}
      <div
        className="sticky top-0 z-20"
        style={{ backgroundColor: getRiskColor(risk) }}
      >
        <div className="max-w-[560px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">阿杰</p>
              <p className="text-white/80 text-xs mt-0.5">
                💰 诈骗 ¥{money.toLocaleString()} · 提成 ¥
                {commission.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white text-xs font-medium">风险 {risk}%</p>
              <div className="w-24 h-2 bg-white/30 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${risk}%` }}
                />
              </div>
              <p className="text-white/60 text-[10px] mt-0.5">
                跑路成功率 {runChance}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[560px] mx-auto px-4 pt-6 pb-32">
        <div className="bg-white rounded-[20px] shadow-sm p-[28px]">
          {/* 标签 */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className="text-[11px] px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "#f0f0f0", color: getRiskColor(risk) }}
            >
              {history.length === 0 ? "开局" : `第${history.length}步`}
            </span>
            <span
              className="text-[11px] px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: node.type === "choice" ? "#e8f0ec" : "#f0f0f0",
                color: "#666",
              }}
            >
              {node.type === "choice" ? "选择" : "剧情"}
            </span>
          </div>

          {/* 金额跳入提示 */}
          {node.money && node.money > 0 && (
            <div
              className="rounded-xl p-3 mb-4 text-center text-sm font-bold animate-pulse border"
              style={{
                backgroundColor: "#fff5f5",
                borderColor: "#ffcdd2",
                color: "#c46a6a",
              }}
            >
              💳 到账 ¥{node.money.toLocaleString()} · 提成 +¥
              {(node.commission || 0).toLocaleString()}
            </div>
          )}

          {/* 风险提示条 */}
          {risk > 10 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${risk}%`,
                    backgroundColor: getRiskColor(risk),
                  }}
                />
              </div>
              <span
                className="text-[11px] font-medium whitespace-nowrap"
                style={{ color: getRiskColor(risk) }}
              >
                ⚠️ 风险 {risk}% · 逃脱率 {runChance}%
              </span>
            </div>
          )}

          {/* 正文 */}
          <div
            className="text-[14px] leading-relaxed whitespace-pre-line mb-6"
            style={{ color: "#1a1a1a" }}
          >
            {node.text}
          </div>

          {/* 选项 */}
          <div className="space-y-2.5">
            {node.options.map((opt, idx) => {
              const isQuit =
                opt.text.includes("收手") ||
                opt.text.includes("跑路") ||
                opt.text.includes("不干") ||
                opt.text.includes("回去");
              const isBad =
                opt.text.includes("骗") ||
                opt.text.includes("干") ||
                opt.text.includes("再来");
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(opt.nextId)}
                  className="p-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    borderColor: isQuit
                      ? "#ffe082"
                      : isBad
                        ? "#ffcdd2"
                        : "#e5ede8",
                    backgroundColor: isQuit
                      ? "#fffef5"
                      : isBad
                        ? "#fff5f5"
                        : "white",
                  }}
                >
                  <span
                    className="text-[14px] font-medium"
                    style={{
                      color: isQuit ? "#c4906a" : isBad ? "#c46a6a" : "#1a1a1a",
                    }}
                  >
                    {opt.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScamGame;
