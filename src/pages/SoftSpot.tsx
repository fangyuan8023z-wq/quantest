import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PriestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as any) || {};
  const money = state.money || 0;
  const hasScammed = money > 0;
  // 前三轮分数（从prevData传过来）
  const r1 = state.prevData?.round1?.totalScore || 0;
  const r2 = state.prevData?.round2?.r2score || 0;
  const r3 = state.prevData?.round3?.r3score || 0;
  const prevTotal = r1 + r2 + r3;

  const scamScore = Math.min(100, Math.floor(money / 10000)); // 诈骗金额转积分
  const [step, setStep] = useState<"intro" | "choose" | "caught" | "passed">(
    "intro",
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [conclusion, setConclusion] = useState("");

  const allFilled = name && phone.length === 11;

  const handleGetCode = () => {
    if (!allFilled) return;
    if (hasScammed) setConclusion("scammed-bad");
    else setConclusion("scammed-naive");
    setStep("caught");
  };

  const handleSubmit = () => {
    if (!code) return;
    setStep("caught");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: "#f5faf7" }}
    >
      <div className="max-w-[400px] w-full bg-white rounded-[20px] shadow p-[32px] text-center space-y-5">
        {step === "intro" && (
          <>
            <div className="text-5xl mb-2">🎉</div>
            <h2 className="text-lg font-bold" style={{ color: "#1a1a1a" }}>
              恭喜通关！
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
              你已经通过了所有考验。
            </p>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <p className="text-2xl font-bold" style={{ color: "#c4906a" }}>
                ¥168
              </p>
              <p className="text-xs mt-1" style={{ color: "#666" }}>
                价值168元现金红包
              </p>
              <p className="text-[10px] mt-1" style={{ color: "#999" }}>
                过关者中抽取3位送出
              </p>
            </div>
            <button
              onClick={() => setStep("choose")}
              className="w-full py-3 rounded-xl text-white font-medium cursor-pointer transition hover:scale-[1.01]"
              style={{ backgroundColor: "#c4906a" }}
            >
              查看如何领取 →
            </button>
          </>
        )}

        {step === "choose" && (
          <>
            <h3 className="text-base font-bold" style={{ color: "#1a1a1a" }}>
              验证身份
            </h3>
            <p className="text-sm" style={{ color: "#666" }}>
              输入姓名和手机号，点击获取验证码即可参与抽奖。
            </p>
            <div className="space-y-3 text-left">
              <input
                type="text"
                placeholder="你的姓名"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                style={{ borderColor: "#e5ede8" }}
              />
              <input
                type="text"
                placeholder="手机号"
                maxLength={11}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                style={{ borderColor: "#e5ede8" }}
              />
              <button
                onClick={handleGetCode}
                disabled={!allFilled}
                className="w-full py-2.5 rounded-xl text-sm font-medium cursor-pointer disabled:opacity-30"
                style={{
                  backgroundColor: allFilled ? "#c4906a" : "#e5e5e5",
                  color: "white",
                }}
              >
                获取验证码
              </button>
              <button
                onClick={() => {
                  setStep("passed");
                  setConclusion("passed");
                }}
                className="w-full text-center text-xs pt-2 cursor-pointer bg-transparent border-none"
                style={{ color: "#999" }}
              >
                不参与，跳过
              </button>
            </div>
          </>
        )}

        {step === "caught" && conclusion === "scammed-bad" && (
          <>
            <div className="text-5xl mb-2">😈</div>
            <h2 className="text-lg font-bold" style={{ color: "#c46a6a" }}>
              黑吃黑！你被骗了。
            </h2>
            <p
              className="text-sm leading-relaxed whitespace-pre-line"
              style={{ color: "#666" }}
            >
              {`你骗了别人 ¥${money.toLocaleString()}，以为自己是个角色。

但这个「168红包」本身就是个钓🎣——你还是把自己的手机号和验证码交了出去。

黑吃黑，从来都不少见。你在诈骗模拟器里的积分已经清零。`}
            </p>
            <div
              className="bg-gray-50 rounded-xl p-3 text-xs"
              style={{ color: "#666" }}
            >
              <p>前三轮总分：{prevTotal}</p>
              <p>诈骗模拟器积分：清空（{scamScore}→0）</p>
              <p className="font-medium mt-1" style={{ color: "#4a6d58" }}>
                最终总分：{prevTotal}
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-xl text-white font-medium cursor-pointer"
              style={{ backgroundColor: "#4a6d58" }}
            >
              返回首页
            </button>
          </>
        )}

        {step === "caught" && conclusion === "scammed-naive" && (
          <>
            <div className="text-5xl mb-2">😔</div>
            <h2 className="text-lg font-bold" style={{ color: "#c46a6a" }}>
              你被骗了。
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
              你没有害人之心，但防人之心也没有。
              <br />
              <br />
              一个来路不明的页面让你输入手机号+验证码，你就真的输了。
              <br />
              <br />
              害人之心不可有，防人之心不可无。记住这一课。
            </p>
            <div
              className="bg-gray-50 rounded-xl p-3 text-xs"
              style={{ color: "#666" }}
            >
              <p>前三轮总分：{prevTotal}</p>
              <p className="font-medium mt-1" style={{ color: "#4a6d58" }}>
                最终总分：{prevTotal}
              </p>
            </div>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-xl text-white font-medium cursor-pointer"
              style={{ backgroundColor: "#4a6d58" }}
            >
              返回首页
            </button>
          </>
        )}

        {step === "passed" && conclusion === "passed" && (
          <>
            <div className="text-5xl mb-2">🛡️</div>
            <h2 className="text-lg font-bold" style={{ color: "#4a6d58" }}>
              {hasScammed ? "就算是同伴，也根本骗不到你。" : "你没有上当。"}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
              {hasScammed
                ? "你在诈骗模拟器里骗到了钱，但你知道那只是游戏。回到现实，你依然清醒。"
                : "你干干净净地进，干干净净地出。再狡猾的骗局也骗不到你。"}
            </p>
            <div
              className="bg-green-50 rounded-xl p-3 text-xs"
              style={{ color: "#666" }}
            >
              <p>前三轮总分：{prevTotal}</p>
              <p>诈骗模拟器积分：+{scamScore}</p>
              <p>
                守住底线奖励：
                <span className="font-bold" style={{ color: "#4a6d58" }}>
                  +100
                </span>
              </p>
              <p
                className="font-bold mt-1 text-sm"
                style={{ color: "#4a6d58" }}
              >
                最终总分：{prevTotal + scamScore + 100}
              </p>
            </div>
            <button
              onClick={() => navigate("/round4")}
              className="w-full py-3 rounded-xl text-white font-medium cursor-pointer"
              style={{ backgroundColor: "#4a6d58" }}
            >
              进入第四轮
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PriestPage;
