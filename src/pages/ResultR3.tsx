import { useLocation, useNavigate } from "react-router-dom";
import { round3Questions } from "../data/round3";

const ResultR3 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;
  const {
    round1,
    round2,
    round3Answers,
    stage,
    storyAnswers,
    finalScore,
    conclusion,
  } = state || {};

  // 判断是哪个模式
  const isStoryMode = stage === "story";

  // 如果是故事模式（软肋挑战）
  if (isStoryMode) {
    const totalFromPrev =
      (round1?.totalScore || 0) + (round2?.round2Answers?.length || 0) * 4;
    const grandTotal = Math.max(0, totalFromPrev + (finalScore || 0));
    const userInfo = round1?.userInfo || {};

    return (
      <div
        className="min-h-screen px-4 py-8"
        style={{ backgroundColor: "#f5faf7" }}
      >
        <div className="max-w-[560px] mx-auto space-y-5">
          <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[40px] text-center">
            <h1
              className="text-[20px] font-bold mb-2"
              style={{ color: "#1a1a1a" }}
            >
              挑战结果
            </h1>
            <div
              className="text-[14px] leading-relaxed whitespace-pre-line mb-4"
              style={{ color: "#666" }}
            >
              {conclusion}
            </div>
            <div
              className="text-[24px] font-bold mb-1"
              style={{ color: "#c4906a" }}
            >
              {finalScore}
            </div>
            <p className="text-[13px]" style={{ color: "#999" }}>
              本次挑战得分
            </p>
          </div>

          <div className="flex gap-3 pb-8">
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3 rounded-xl text-white font-medium text-[15px] cursor-pointer"
              style={{ backgroundColor: "#4a6d58" }}
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 快速情景模式（原来的20题模式）
  const r1score = round1?.totalScore || 0;
  const r2answers = round2?.round2Answers || [];
  const r2correct = r2answers.filter((a: any) => {
    const q = round3Questions.find((q: any) => q.id === a.qId);
    if (!q) return false;
    return a.selected === q.answer;
  }).length;
  const r2score = r2correct * 4;

  const r3correct =
    round3Answers?.filter((a: any) => {
      const q = round3Questions.find((q) => q.id === a.qId);
      if (!q) return false;
      return a.selected === q.answer;
    }).length || 0;
  const r3score = r3correct * 5;

  const totalScore = r1score + r2score + r3score;

  const getLevel = (s: number) => {
    if (s >= 180) return { text: "非常优秀", color: "#4a6d58" };
    if (s >= 130) return { text: "良好", color: "#6b8f7a" };
    if (s >= 90) return { text: "中等", color: "#8baa96" };
    if (s >= 50) return { text: "需要提升", color: "#c4906a" };
    return { text: "要加强了", color: "#c46a6a" };
  };
  const level = getLevel(totalScore);
  const userInfo = round1?.userInfo || {};
  const userGender = userInfo.gender || "男";

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ backgroundColor: "#f5faf7" }}
    >
      <div className="max-w-[560px] mx-auto space-y-5">
        <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[40px] text-center">
          <h1
            className="text-[20px] font-bold mb-4"
            style={{ color: "#1a1a1a" }}
          >
            全部测试完成 🎉
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
                第一轮·自我认知
              </span>
              <p className="font-bold" style={{ color: "#4a6d58" }}>
                {r1score}
              </p>
            </div>
            <div>
              <span className="text-xs" style={{ color: "#999" }}>
                第二轮·知识挑战
              </span>
              <p className="font-bold" style={{ color: "#4a6d58" }}>
                {r2score}
              </p>
            </div>
            <div>
              <span className="text-xs" style={{ color: "#999" }}>
                第三轮·信息甄别
              </span>
              <p className="font-bold" style={{ color: "#c4906a" }}>
                {r3score}
              </p>
            </div>
          </div>
        </div>

        {/* 逐题解析 */}
        <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[24px]">
          <h2
            className="text-[14px] font-bold mb-3"
            style={{ color: "#1a1a1a" }}
          >
            第三轮逐题解析
          </h2>
          <div className="space-y-3">
            {round3Questions.map((q) => {
              const userAns = round3Answers?.find((a: any) => a.qId === q.id);
              const isCorrect = userAns?.selected === q.answer;
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
                        {userAns?.selected !== undefined
                          ? q.options[userAns.selected]
                          : "未作答"}
                      </p>
                      <p
                        className="text-[12px] font-medium mt-0.5"
                        style={{ color: "#4a6d58" }}
                      >
                        正确答案：{q.options[q.answer]}
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

        <div className="flex gap-3 pb-8">
          <button
            onClick={() =>
              navigate("/scam-game", {
                state: { round1, round2, round3: { round3Answers }, userInfo },
              })
            }
            className="w-full py-4 rounded-xl text-white font-bold text-[16px] transition-all duration-200 cursor-pointer shadow-md hover:scale-[1.01]"
            style={{ backgroundColor: "#c4906a" }}
          >
            ⚔️ 挑战你的软肋 — 诈骗模拟器
          </button>
        </div>
        <div className="flex gap-3 pb-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 rounded-xl text-white font-medium text-[15px] cursor-pointer"
            style={{ backgroundColor: "#4a6d58" }}
          >
            返回首页
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex-1 py-3 rounded-xl font-medium text-[15px] border cursor-pointer"
            style={{ borderColor: "#e5ede8", color: "#666" }}
          >
            换个人测试
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultR3;
