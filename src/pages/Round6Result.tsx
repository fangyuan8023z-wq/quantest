import { useLocation, useNavigate } from "react-router-dom";
import { round6Questions, getRound6Score } from "../data/round6";

const Round6Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;
  const answers = state?.round6Answers || [];
  const score = getRound6Score(answers);
  const correct = answers.filter((a: any) => {
    const q = round6Questions.find((q) => q.id === a.qId);
    if (!q) return false;
    const ca = Array.isArray(q.answer) ? q.answer : [q.answer];
    const ua = Array.isArray(a.selected) ? a.selected : [a.selected];
    return ca.length === ua.length && ca.every((v) => ua.includes(v));
  }).length;

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ backgroundColor: "#f5faf7" }}
    >
      <div className="max-w-[560px] mx-auto space-y-5">
        <div className="bg-white rounded-[20px] shadow p-[40px] text-center">
          <h1
            className="text-[20px] font-bold mb-4"
            style={{ color: "#1a1a1a" }}
          >
            第六轮 · 生活智慧完成
          </h1>
          <div
            className="text-[56px] font-bold mb-1"
            style={{ color: "#8baa96" }}
          >
            {score}
          </div>
          <p className="text-[15px]" style={{ color: "#8baa96" }}>
            {correct}/{round6Questions.length} 题正确（每题2分）
          </p>
        </div>

        <div className="bg-white rounded-[20px] shadow p-[24px]">
          <h2
            className="text-[14px] font-bold mb-3"
            style={{ color: "#1a1a1a" }}
          >
            逐题解析
          </h2>
          <div className="space-y-3">
            {round6Questions.map((q) => {
              const ua = answers.find((a: any) => a.qId === q.id);
              const ca = Array.isArray(q.answer) ? q.answer : [q.answer];
              const usa = ua?.selected;
              const isC =
                usa !== undefined
                  ? Array.isArray(usa)
                    ? ca.length === usa.length &&
                      ca.every((v) => (usa as number[]).includes(v))
                    : usa === q.answer
                  : false;
              return (
                <div
                  key={q.id}
                  className="rounded-xl p-4 border text-sm"
                  style={{
                    borderColor: isC ? "#c8e6c9" : "#ffcdd2",
                    backgroundColor: isC ? "#f1f8e9" : "#fff5f5",
                  }}
                >
                  <div className="flex items-start gap-2">
                    <span>{isC ? "✅" : "❌"}</span>
                    <div className="flex-1">
                      <p
                        className="text-[13px] font-medium mb-1"
                        style={{ color: "#1a1a1a" }}
                      >
                        {q.id}.{" "}
                        {q.question.length > 60
                          ? q.question.slice(0, 60) + "…"
                          : q.question}
                      </p>
                      <p className="text-[12px]" style={{ color: "#666" }}>
                        你的答案：
                        {usa !== undefined
                          ? Array.isArray(usa)
                            ? usa.map((i: number) => q.options[i]).join("、")
                            : q.options[usa]
                          : "未作答"}
                      </p>
                      <p
                        className="text-[12px] font-medium mt-0.5"
                        style={{ color: "#8baa96" }}
                      >
                        正确答案：
                        {ca.map((i: number) => q.options[i]).join("、")}
                      </p>
                      <div
                        className="mt-2 rounded-lg p-2.5 text-[12px] leading-relaxed"
                        style={{
                          backgroundColor: isC
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

        <div className="flex gap-3 pb-8">
          <button
            onClick={() =>
              navigate("/final-report", {
                state: {
                  r1: state?.scores?.r1 || 0,
                  r2: state?.scores?.r2 || 0,
                  r3: state?.scores?.r3 || 0,
                  scam: state?.scores?.scam || 0,
                  r4: state?.scores?.r4 || 0,
                  r5: state?.scores?.r5 || 0,
                  r6: score,
                },
              })
            }
            className="flex-1 py-3 rounded-xl text-white font-medium text-[15px] cursor-pointer"
            style={{ backgroundColor: "#4a6d58" }}
          >
            全部完成 🎉
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3 rounded-xl font-medium text-[15px] border cursor-pointer"
            style={{ borderColor: "#e5ede8", color: "#666" }}
          >
            重新答题
          </button>
        </div>
      </div>
    </div>
  );
};

export default Round6Result;
