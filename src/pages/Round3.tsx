import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { round3Questions } from "../data/round3";

const Round3 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prevData = (location.state as any) || {};

  const [sel, setSel] = useState<Record<number, number>>({});
  const bottomRef = useRef<HTMLDivElement>(null);

  const allAnswered = round3Questions.every((q) => q.id in sel);
  const answeredCount = Object.keys(sel).length;

  const handleSelect = (qId: number, idx: number) => {
    setSel((prev) => ({ ...prev, [qId]: idx }));
    const currentIdx = round3Questions.findIndex((q) => q.id === qId);
    if (currentIdx < round3Questions.length - 1) {
      const nextQ = round3Questions[currentIdx + 1];
      setTimeout(() => {
        document
          .getElementById(`q3-${nextQ.id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    }
  };

  const finish = () => {
    navigate("/result-r3", {
      state: {
        ...prevData,
        round3Answers: round3Questions.map((q) => ({
          qId: q.id,
          selected: sel[q.id] ?? -1,
        })),
        stage: "quick",
      },
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5faf7" }}>
      <div
        className="sticky top-0 z-10 py-3 px-4"
        style={{ backgroundColor: "#f5faf7" }}
      >
        <div className="max-w-[560px] mx-auto">
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] px-2 py-0.5 rounded-full whitespace-nowrap"
              style={{ backgroundColor: "#fbeee6", color: "#c4906a" }}
            >
              第三轮 · 防骗情景
            </span>
            <div
              className="flex-1 h-[4px] rounded-full"
              style={{ backgroundColor: "#e5ede8" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(answeredCount / round3Questions.length) * 100}%`,
                  backgroundColor: "#c4906a",
                }}
              />
            </div>
            <span
              className="text-[11px] whitespace-nowrap"
              style={{ color: "#999" }}
            >
              {answeredCount}/{round3Questions.length}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[560px] mx-auto px-4 pb-24">
        <div className="space-y-4 pt-2">
          {round3Questions.map((q) => {
            const isAnswered = q.id in sel;
            return (
              <div
                key={q.id}
                id={`q3-${q.id}`}
                className="bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-[24px]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[11px] px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: "#fdf0e8", color: "#c4906a" }}
                  >
                    {q.tag}
                  </span>
                  {isAnswered && (
                    <span
                      className="text-[11px] ml-auto"
                      style={{ color: "#c4906a" }}
                    >
                      已选 ✓
                    </span>
                  )}
                </div>
                <p
                  className="text-[14px] font-medium leading-relaxed mb-4"
                  style={{ color: "#1a1a1a" }}
                >
                  {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, idx) => {
                    const isSelected = sel[q.id] === idx;
                    const isSafe = idx === q.answer;
                    return (
                      <div
                        key={idx}
                        onClick={() => !isAnswered && handleSelect(q.id, idx)}
                        className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer hover:bg-[#fdf6f0]"
                        style={{
                          borderColor: isSelected ? "#c4906a" : "#e5ede8",
                          backgroundColor: isSelected ? "#fdf6f0" : "white",
                          opacity: isAnswered && !isSelected ? 0.6 : 1,
                        }}
                      >
                        <input
                          type="radio"
                          name={`q3-${q.id}`}
                          checked={isSelected}
                          readOnly
                          className="accent-[#c4906a]"
                        />
                        <div className="flex-1">
                          <span
                            className="text-[14px]"
                            style={{ color: "#1a1a1a" }}
                          >
                            {opt}
                          </span>
                          {isAnswered && isSelected && (
                            <span
                              className="text-[11px] ml-2"
                              style={{ color: isSafe ? "#4a6d58" : "#c46a6a" }}
                            >
                              {isSafe ? "✅ 正确" : "❌ 错误"}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {isAnswered && (
                  <div
                    className="mt-3 rounded-lg p-3 text-[12px] leading-relaxed"
                    style={{ backgroundColor: "#fdf6f0", color: "#666" }}
                  >
                    💡 {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {allAnswered && (
          <div
            className="sticky bottom-0 py-4"
            style={{ backgroundColor: "#f5faf7" }}
          >
            <button
              onClick={finish}
              className="w-full py-3 rounded-xl text-white font-medium text-[15px] transition-all duration-200 cursor-pointer shadow-lg"
              style={{ backgroundColor: "#c4906a" }}
            >
              提交答案 → 查看结果
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Round3;
