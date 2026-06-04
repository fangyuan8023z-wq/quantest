import { useLocation, useNavigate } from "react-router-dom";
import { round4Questions, getRound4Score } from "../data/round4";

const ResultR4 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;
  const prevData = state || {};

  // 只取当前轮次的答题
  const currentAnswers = state?.round4Answers || [];
  const score = getRound4Score(currentAnswers);
  const correct = currentAnswers.filter((a: any) => {
    const q = round4Questions.find((q) => q.id === a.qId);
    if (!q) return false;
    const correctAns = Array.isArray(q.answer) ? q.answer : [q.answer];
    const userAns = Array.isArray(a.selected) ? a.selected : [a.selected];
    return (
      correctAns.length === userAns.length &&
      correctAns.every((v) => userAns.includes(v))
    );
  }).length;

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ backgroundColor: "#f5faf7" }}
    >
      <div className="max-w-[560px] mx-auto space-y-5">
        {/* 分数卡片 */}
        <div className="bg-white rounded-[20px] shadow p-[40px] text-center">
          <h1
            className="text-[20px] font-bold mb-4"
            style={{ color: "#1a1a1a" }}
          >
            第四轮 · 记忆挑战完成
          </h1>
          <div
            className="text-[56px] font-bold mb-1"
            style={{ color: "#4a6d58" }}
          >
            {score}
          </div>
          <p className="text-[15px]" style={{ color: "#4a6d58" }}>
            {correct}/{round4Questions.length} 题正确（每题1.5分）
          </p>
        </div>

        {/* 完整解析 */}
        <div className="bg-white rounded-[20px] shadow p-[24px]">
          <h2
            className="text-[14px] font-bold mb-3"
            style={{ color: "#1a1a1a" }}
          >
            逐题解析
          </h2>
          <div className="space-y-3">
            {round4Questions.map((q) => {
              const userAns = currentAnswers.find((a: any) => a.qId === q.id);
              const correctAnswer = Array.isArray(q.answer)
                ? q.answer
                : [q.answer];
              const userAnswer = userAns?.selected;
              const isCorrect =
                userAnswer !== undefined
                  ? Array.isArray(userAnswer)
                    ? correctAnswer.length === userAnswer.length &&
                      correctAnswer.every((v) =>
                        (userAnswer as number[]).includes(v),
                      )
                    : userAnswer === q.answer
                  : false;

              return (
                <div
                  key={q.id}
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
                        {q.id}. {q.question}
                      </p>
                      <p className="text-[12px]" style={{ color: "#666" }}>
                        你的答案：
                        {userAnswer !== undefined
                          ? Array.isArray(userAnswer)
                            ? userAnswer
                                .map((i: number) => q.options[i])
                                .join("、")
                            : q.options[userAnswer]
                          : "未作答"}
                      </p>
                      <p
                        className="text-[12px] font-medium mt-0.5"
                        style={{ color: "#4a6d58" }}
                      >
                        正确答案：
                        {correctAnswer
                          .map((i: number) => q.options[i])
                          .join("、")}
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
                        💡 {q.explanation}
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
              navigate("/round5", {
                state: { scores: state?.scores, r4: score },
              })
            }
            className="flex-1 py-3 rounded-xl text-white font-medium text-[15px] cursor-pointer"
            style={{ backgroundColor: "#4a6d58" }}
          >
            进入第五轮 · 创造力挑战
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 rounded-xl font-medium text-[15px] border cursor-pointer"
            style={{ borderColor: "#e5ede8", color: "#666" }}
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultR4;
