import { useLocation, useNavigate } from "react-router-dom";
import { getRanking, questionReviews } from "../data/questions";

interface ResultState {
  userInfo: any;
  answers: any[];
  totalScore: number;
  fellIntoTrap: boolean;
}

const getLevel = (s: number) => {
  if (s >= 100) return { text: "非常优秀", color: "#4a6d58" };
  if (s >= 75) return { text: "良好", color: "#6b8f7a" };
  if (s >= 50) return { text: "中等", color: "#8baa96" };
  if (s >= 30) return { text: "需要提升", color: "#c4906a" };
  return { text: "要加强了", color: "#c46a6a" };
};

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultState;
  const { userInfo, answers, totalScore, fellIntoTrap } = state;
  const ranking = getRanking(totalScore);
  const level = getLevel(totalScore);

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{ backgroundColor: "#f5faf7" }}
    >
      <div className="max-w-[560px] mx-auto space-y-5">
        {/* 分数卡片 */}
        <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[40px] text-center">
          <h1
            className="text-[20px] font-bold mb-4"
            style={{ color: "#1a1a1a" }}
          >
            第一轮完成
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
          <p className="text-[13px] mt-2" style={{ color: "#999" }}>
            {userInfo?.nickname} · {userInfo?.age}岁 · {userInfo?.gender}
            {userInfo?.education && ` · ${userInfo.education}`}
          </p>
        </div>

        {/* 排名 */}
        <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[32px]">
          <h2
            className="text-[16px] font-bold mb-4"
            style={{ color: "#1a1a1a" }}
          >
            排名对比
          </h2>
          <div className="flex items-center justify-between mb-2 text-[14px]">
            <span style={{ color: "#666" }}>你的分数</span>
            <span
              className="font-bold text-[18px]"
              style={{ color: level.color }}
            >
              {totalScore}
            </span>
          </div>
          <div
            className="w-full h-2 rounded-full mb-1"
            style={{ backgroundColor: "#e5ede8" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, totalScore)}%`,
                backgroundColor: "#4a6d58",
              }}
            />
          </div>
          <div
            className="flex justify-between text-xs mb-4"
            style={{ color: "#999" }}
          >
            <span>0</span>
            <span>平均 {ranking.avg}</span>
          </div>
          <div
            className="rounded-xl p-4 text-center"
            style={{ backgroundColor: "#f5faf7" }}
          >
            <p style={{ color: "#4a6d58" }}>
              你超过了{" "}
              <span className="font-bold text-[20px]">
                {ranking.beatPercent}%
              </span>{" "}
              的测试者
            </p>
            <p className="text-xs mt-1" style={{ color: "#999" }}>
              排名：{ranking.rank}
            </p>
          </div>
        </div>

        {/* 逐大题分析 */}
        {questionReviews.map((review) => {
          const relatedAnswer = answers.find(
            (a: any) => a.questionId === review.id,
          );
          if (!relatedAnswer) return null;
          return (
            <div
              key={review.id}
              className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[32px]"
            >
              <h2
                className="text-[16px] font-bold mb-1"
                style={{ color: "#1a1a1a" }}
              >
                {review.title}
              </h2>
              <p className="text-[12px] mb-2" style={{ color: "#4a6d58" }}>
                {review.dimension}
              </p>
              <p className="text-[12px] mb-3" style={{ color: "#999" }}>
                {review.description}
              </p>
              <p
                className="text-[14px] leading-relaxed"
                style={{ color: "#666" }}
              >
                {review.getInterpretation(answers)}
              </p>
              {relatedAnswer.selected && (
                <div
                  className="mt-3 rounded-xl p-3 text-xs"
                  style={{ backgroundColor: "#f5faf7", color: "#999" }}
                >
                  你的回答：{relatedAnswer.selected}
                </div>
              )}
            </div>
          );
        })}

        {/* 安全意识 */}
        {fellIntoTrap ? (
          <div
            className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[32px] border-2"
            style={{ borderColor: "#c46a6a" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">⚠️</span>
              <h2 className="font-bold" style={{ color: "#c46a6a" }}>
                安全意识提醒
              </h2>
            </div>
            <p
              className="text-sm leading-relaxed mb-3"
              style={{ color: "#c46a6a" }}
            >
              你在答题过程中填写了身份证后四位！
            </p>
            <div
              className="rounded-xl p-3 text-sm mb-3"
              style={{ backgroundColor: "#fdf0f0" }}
            >
              {userInfo?.nickname && <p>- 姓名：{userInfo.nickname}</p>}
              {userInfo?.age && <p>- 年龄：{userInfo.age}岁</p>}
              {userInfo?.gender && <p>- 性别：{userInfo.gender}</p>}
              <p>- 身份证后4位：已提供</p>
            </div>
            <div
              className="rounded-xl p-3 text-sm"
              style={{ backgroundColor: "#fdf0f0" }}
            >
              <p className="font-medium mb-1">小知识：身份证号码构成</p>
              <p>前6位 — 地址码（出生地）</p>
              <p>7-14位 — 出生日期</p>
              <p>15-17位 — 顺序码（第17位奇数为男、偶数为女）</p>
              <p>第18位 — 校验码</p>
              <p className="mt-2">
                谨记：不要在任何不明网站填写你的真实个人信息！
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[32px] text-center">
            <span className="text-3xl">✅</span>
            <h2 className="font-bold mt-1" style={{ color: "#4a6d58" }}>
              安全意识良好
            </h2>
            <p className="text-sm mt-1" style={{ color: "#666" }}>
              你没有掉入身份信息陷阱，继续保持！
            </p>
          </div>
        )}

        {/* 按钮 */}
        <div className="flex gap-3 pb-8">
          <button
            onClick={() =>
              navigate("/round2", {
                state: { userInfo, answers, totalScore, fellIntoTrap },
              })
            }
            className="flex-1 py-3 rounded-xl text-white font-medium text-[15px] transition-all duration-200 cursor-pointer hover:scale-[1.01]"
            style={{ backgroundColor: "#4a6d58" }}
          >
            进入第二轮 → 常识+逻辑+冷知识
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

export default Result;
