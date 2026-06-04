import { useLocation, useNavigate } from "react-router-dom";

const FinalReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as any) || {};

  // 从state中获取各轮分数（这里只是展示示例，实际需要传递数据）
  const scores = [
    { round: 1, name: "自我认知", score: state.r1 || 0, max: 80 },
    { round: 2, name: "知识挑战", score: state.r2 || 0, max: 100 },
    { round: 3, name: "防骗情景", score: state.r3 || 0, max: 100 },
    { round: "4a", name: "诈骗模拟", score: state.scam || 0, max: 100 },
    { round: 4, name: "记忆与观察", score: state.r4 || 0, max: 30 },
    { round: 5, name: "创造力", score: state.r5 || 0, max: 40 },
    { round: 6, name: "生活智慧", score: state.r6 || 0, max: 40 },
  ];

  const total = scores.reduce((s, r) => s + r.score, 0);
  const maxTotal = scores.reduce((s, r) => s + r.max, 0);
  const pct = Math.round((total / maxTotal) * 100);

  const getLevel = (p: number) => {
    if (p >= 90) return { text: "非常优秀", color: "#4a6d58" };
    if (p >= 70) return { text: "良好", color: "#6b8f7a" };
    if (p >= 50) return { text: "中等", color: "#8baa96" };
    if (p >= 30) return { text: "需要提升", color: "#c4906a" };
    return { text: "要加强了", color: "#c46a6a" };
  };

  const level = getLevel(pct);

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ backgroundColor: "#f5faf7" }}
    >
      <div className="max-w-[560px] mx-auto space-y-5">
        <div className="bg-white rounded-[20px] shadow p-[40px] text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1
            className="text-[20px] font-bold mb-2"
            style={{ color: "#1a1a1a" }}
          >
            全部完成！
          </h1>
          <p className="text-[13px] mb-4" style={{ color: "#999" }}>
            你完成了全部6轮测试
          </p>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <p className="text-sm font-medium" style={{ color: "#4a6d58" }}>
              总得分
            </p>
            <p className="text-[40px] font-bold" style={{ color: level.color }}>
              {total}
            </p>
            <p className="text-[13px]" style={{ color: level.color }}>
              {level.text}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[20px] shadow p-[24px]">
          <h2
            className="text-[14px] font-bold mb-3"
            style={{ color: "#1a1a1a" }}
          >
            各轮得分
          </h2>
          <div className="space-y-3">
            {scores.map((s) => {
              const p = s.max > 0 ? Math.round((s.score / s.max) * 100) : 0;
              return (
                <div key={s.round}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "#666" }}>
                      第{s.round}轮 · {s.name}
                    </span>
                    <span style={{ color: "#4a6d58" }}>
                      {s.score}/{s.max}
                    </span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full"
                    style={{ backgroundColor: "#e5ede8" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${p}%`, backgroundColor: "#4a6d58" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-[20px] shadow p-[24px] text-center">
          <p className="text-sm" style={{ color: "#666" }}>
            感谢你完成了全部6轮测试！
            <br />
            每一轮都在测试你不同维度的能力。
            <br />
            最终得分反映了你的综合能力水平。
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full py-3 rounded-xl text-white font-medium text-[15px] cursor-pointer"
          style={{ backgroundColor: "#4a6d58" }}
        >
          返回首页
        </button>
      </div>
    </div>
  );
};

export default FinalReport;
