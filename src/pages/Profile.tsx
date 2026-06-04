import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevData = (location.state as any) || {};

  const [form, setForm] = useState({
    nickname: prevData.nickname || "",
    gender: prevData.gender || "",
    age: prevData.age || "",
    education: prevData.education || "",
    selfEval: prevData.selfEval ?? 50,
  });
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!form.nickname.trim()) {
      setError("请输入昵称");
      return;
    }
    if (!form.gender) {
      setError("请选择性别");
      return;
    }
    if (!form.age) {
      setError("请选择年龄");
      return;
    }
    if (!form.education) {
      setError("请选择学历");
      return;
    }
    setError("");
    navigate("/fortune", { state: form });
  };

  const selfEvalText = (val: number) => {
    if (val < 20) return "我啥也不懂";
    if (val < 40) return "略知一二";
    if (val < 60) return "中等水平";
    if (val < 80) return "知识丰富";
    return "我无所不知";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: "#f5faf7" }}
    >
      <div className="w-full max-w-[560px] bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[48px]">
        <div className="text-center mb-8">
          <h1 className="text-[24px] font-bold text-[#1a1a1a]">开始测试</h1>
          <p className="text-[#999] text-[13px] mt-2">先告诉我们一些基本信息</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-[13px] font-medium text-[#666] mb-1.5">
              昵称
            </label>
            <input
              type="text"
              placeholder="输入昵称（2-20字）"
              maxLength={20}
              value={form.nickname}
              onChange={(e) => setForm({ ...form, nickname: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition"
              style={{ borderColor: "#e5ede8", color: "#1a1a1a" }}
              onFocus={(e) => (e.target.style.borderColor = "#4a6d58")}
              onBlur={(e) => (e.target.style.borderColor = "#e5ede8")}
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#666] mb-2">
              性别
            </label>
            <div className="flex gap-3">
              {["男", "女", "不愿透露"].map((g) => (
                <button
                  key={g}
                  onClick={() => setForm({ ...form, gender: g })}
                  className="flex-1 py-2.5 rounded-xl border text-[14px] transition-all cursor-pointer"
                  style={{
                    borderColor: form.gender === g ? "#4a6d58" : "#e5ede8",
                    backgroundColor: form.gender === g ? "#e8f0ec" : "white",
                    color: form.gender === g ? "#4a6d58" : "#666",
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#666] mb-1.5">
              年龄
            </label>
            <select
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition bg-white"
              style={{ borderColor: "#e5ede8", color: "#1a1a1a" }}
            >
              <option value="">请选择年龄</option>
              {Array.from({ length: 73 }, (_, i) => i + 8).map((age) => (
                <option key={age} value={age}>
                  {age} 岁
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#666] mb-1.5">
              学历
            </label>
            <select
              value={form.education}
              onChange={(e) => setForm({ ...form, education: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition bg-white"
              style={{ borderColor: "#e5ede8", color: "#1a1a1a" }}
            >
              <option value="">请选择学历</option>
              {[
                "小学",
                "初中",
                "高中/中专",
                "大学/大专",
                "硕士",
                "博士",
                "其他",
              ].map((edu) => (
                <option key={edu} value={edu}>
                  {edu}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-[#666] mb-1.5">
              自我评估
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={form.selfEval}
              onChange={(e) =>
                setForm({ ...form, selfEval: Number(e.target.value) })
              }
              className="w-full accent-[#4a6d58]"
            />
            <div className="flex justify-between text-xs text-[#999] mt-1">
              <span>0% 啥也不懂</span>
              <span className="font-medium" style={{ color: "#4a6d58" }}>
                {selfEvalText(form.selfEval)}
              </span>
              <span>100% 无所不知</span>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div
            className="bg-[#f5faf7] rounded-xl p-3 text-xs text-center leading-relaxed"
            style={{ color: "#4a6d58" }}
          >
            请如实填写以上信息，这会影响你的最终评分和同龄人排名
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-xl text-white font-medium text-[15px] transition-all duration-200 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
            style={{ backgroundColor: "#4a6d58" }}
          >
            下一步
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
