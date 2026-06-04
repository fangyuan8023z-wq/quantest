import { useLocation, useNavigate } from "react-router-dom";
import { round2Questions, getRound2Results } from "../data/round2";
import { getRanking } from "../data/questions";

const ResultR2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;

  const round1 = state.round1 || {};
  const round2Answers = state.round2Answers || [];

  const r1score = round1.totalScore || 0;
  const r2results = getRound2Results(round2Answers);
  const r2correct = r2results.filter((r) => r.correct).length;
  const r2score = r2correct * 4;
  const totalScore = r1score + r2score;
  const ranking = getRanking(totalScore);

  const getLevel = (s: number) => {
    if (s >= 140) return { text: "非常优秀", color: "#4a6d58" };
    if (s >= 100) return { text: "良好", color: "#6b8f7a" };
    if (s >= 70) return { text: "中等", color: "#8baa96" };
    if (s >= 40) return { text: "需要提升", color: "#c4906a" };
    return { text: "要加强了", color: "#c46a6a" };
  };
  const level = getLevel(totalScore);

  // 按类别统计
  const byCategory: Record<string, { correct: number; total: number }> = {};
  r2results.forEach((r) => {
    if (!byCategory[r.category])
      byCategory[r.category] = { correct: 0, total: 0 };
    byCategory[r.category].total++;
    if (r.correct) byCategory[r.category].correct++;
  });

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ backgroundColor: "#f5faf7" }}
    >
      <div className="max-w-[560px] mx-auto space-y-5">
        {/* 总分 */}
        <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[40px] text-center">
          <h1
            className="text-[20px] font-bold mb-4"
            style={{ color: "#1a1a1a" }}
          >
            测试完成
          </h1>
          <div
            className="text-[56px] font-bold mb-1"
            style={{ color: level.color }}
          >
            {totalScore}
          </div>
          <p className="text-[15px]" style={{ color: level.color }}>
            {level.text}
          </p>

          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div>
              <span className="text-xs" style={{ color: "#999" }}>
                第一轮
              </span>
              <p className="font-bold" style={{ color: "#4a6d58" }}>
                {r1score}
              </p>
            </div>
            <div>
              <span className="text-xs" style={{ color: "#999" }}>
                第二轮
              </span>
              <p className="font-bold" style={{ color: "#4a6d58" }}>
                {r2score} ({r2correct}/{r2results.length})
              </p>
            </div>
          </div>

          <div
            className="mt-4 rounded-xl p-3"
            style={{ backgroundColor: "#f5faf7" }}
          >
            <p style={{ color: "#4a6d58" }}>
              你超过了{" "}
              <span className="font-bold text-[20px]">
                {ranking.beatPercent}%
              </span>{" "}
              的测试者
            </p>
          </div>
        </div>

        {/* 分类得分 */}
        <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[24px]">
          <h2
            className="text-[14px] font-bold mb-3"
            style={{ color: "#1a1a1a" }}
          >
            各模块得分
          </h2>
          <div className="space-y-2.5">
            {Object.entries(byCategory).map(([cat, stats]) => {
              const pct =
                stats.total > 0
                  ? Math.round((stats.correct / stats.total) * 100)
                  : 0;
              return (
                <div key={cat}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "#666" }}>{cat}</span>
                    <span style={{ color: "#4a6d58" }}>
                      {stats.correct}/{stats.total}
                    </span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full"
                    style={{ backgroundColor: "#e5ede8" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: "#4a6d58" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 完整解析 */}
        <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[24px]">
          <h2
            className="text-[14px] font-bold mb-3"
            style={{ color: "#1a1a1a" }}
          >
            逐题解析
          </h2>

          <div className="space-y-3">
            {r2results.map((r) => {
              const isCorrect = r.correct;
              const userAns = r.selected;
              const correctAns = Array.isArray(r.answer)
                ? r.answer
                : [r.answer];

              return (
                <div
                  key={r.id}
                  className="rounded-xl p-4 border text-sm"
                  style={{
                    borderColor: isCorrect ? "#c8e6c9" : "#ffcdd2",
                    backgroundColor: isCorrect ? "#f1f8e9" : "#fff5f5",
                  }}
                >
                  <div className="flex items-start gap-2">
                    <span>{isCorrect ? "✅" : "❌"}</span>
                    <div className="flex-1">
                      <p
                        className="text-[13px] font-medium mb-1"
                        style={{ color: "#1a1a1a" }}
                      >
                        {r.id}. {r.question}
                      </p>
                      <p className="text-[12px]" style={{ color: "#666" }}>
                        你的答案：
                        {userAns !== undefined
                          ? Array.isArray(userAns)
                            ? userAns
                                .map((i: number) => r.options[i])
                                .join("、")
                            : r.options[userAns]
                          : "未作答"}
                      </p>
                      <p
                        className="text-[12px] font-medium mt-0.5"
                        style={{ color: "#4a6d58" }}
                      >
                        正确答案：
                        {correctAns.map((i: number) => r.options[i]).join("、")}
                      </p>
                      <div
                        className="mt-2 rounded-lg p-2.5 text-[12px] leading-relaxed"
                        style={{
                          backgroundColor: isCorrect
                            ? "rgba(74,109,88,0.08)"
                            : "rgba(196,106,106,0.08)",
                          color: "#555",
                        }}
                      >
                        💡 {r.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 按钮 */}
        <div className="flex gap-3 pb-8">
          <button
            onClick={() =>
              navigate("/round3", {
                state: { round1, round2: { round2Answers } },
              })
            }
            className="flex-1 py-3 rounded-xl text-white font-medium text-[15px] transition-all duration-200 cursor-pointer hover:scale-[1.01]"
            style={{ backgroundColor: "#4a6d58" }}
          >
            进入第三轮 → 信息甄别
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 rounded-xl font-medium text-[15px] border transition-all duration-200 cursor-pointer"
            style={{ borderColor: "#e5ede8", color: "#666" }}
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultR2;
