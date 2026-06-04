import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { round2Questions } from "../data/round2";

// 长滚动模式：所有题一页显示，选完自动标记
const Round2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const round1Data = location.state as any;

  const [sel, setSel] = useState<Record<number, number | number[]>>({});
  const [done, setDone] = useState(false);
  const [showConfirm, setShowConfirm] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // 自动滚动到当前未答的题
  useEffect(() => {
    if (done) return;
    const firstUnanswered = round2Questions.find((q) => !(q.id in sel));
    if (firstUnanswered) {
      const el = document.getElementById(`q-${firstUnanswered.id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [sel, done]);

  const handleSelect = (qId: number, idx: number, isMultiple: boolean) => {
    if (done) return;
    if (isMultiple) {
      const current = (sel[qId] as number[]) || [];
      const newVal = current.includes(idx)
        ? current.filter((i) => i !== idx)
        : [...current, idx];
      setSel((prev) => ({ ...prev, [qId]: newVal }));
    } else {
      setSel((prev) => ({ ...prev, [qId]: idx }));
      // 非多选题 + 非最后一题 = 自动跳到下一题
      const currentQ = round2Questions.find((q) => q.id === qId);
      if (currentQ?.type !== "multiple") {
        const currentIdx = round2Questions.findIndex((q) => q.id === qId);
        if (currentIdx < round2Questions.length - 1) {
          // 自动滚到下一题
          const nextQ = round2Questions[currentIdx + 1];
          setTimeout(() => {
            document
              .getElementById(`q-${nextQ.id}`)
              ?.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 200);
        } else {
          setShowConfirm(qId);
        }
      }
    }
  };

  const finish = () => {
    const answers = round2Questions.map((q) => ({
      qId: q.id,
      selected:
        sel[q.id] !== undefined ? sel[q.id] : q.type === "multiple" ? [] : -1,
    }));
    navigate("/result-r2", {
      state: {
        round1: round1Data,
        round2Answers: answers,
        totalQuestions: round2Questions.length,
      },
    });
  };

  const categoryColors: Record<string, string> = {
    认知: "#6b8f7a",
    冷知识: "#8baa96",
    逻辑: "#4a6d58",
    常识: "#a0c4b0",
  };

  const allAnswered = round2Questions.every((q) => q.id in sel);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5faf7" }}>
      {/* 顶部进度 */}
      <div
        className="sticky top-0 z-10 py-3 px-4"
        style={{ backgroundColor: "#f5faf7" }}
      >
        <div className="max-w-[560px] mx-auto">
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] px-2 py-0.5 rounded-full whitespace-nowrap"
              style={{ backgroundColor: "#e8f0ec", color: "#4a6d58" }}
            >
              第二轮 · 知识挑战
            </span>
            <div
              className="flex-1 h-[4px] rounded-full"
              style={{ backgroundColor: "#e5ede8" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(Object.keys(sel).length / round2Questions.length) * 100}%`,
                  backgroundColor: "#4a6d58",
                }}
              />
            </div>
            <span
              className="text-[11px] whitespace-nowrap"
              style={{ color: "#999" }}
            >
              {Object.keys(sel).length}/{round2Questions.length}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[560px] mx-auto px-4 pb-24">
        <div className="space-y-4 pt-2">
          {round2Questions.map((q, qIdx) => {
            const isAnswered = q.id in sel;
            const isMultiple = q.type === "multiple";
            const selectedVals = isAnswered
              ? Array.isArray(sel[q.id])
                ? (sel[q.id] as number[])
                : [sel[q.id] as number]
              : [];

            return (
              <div
                key={q.id}
                id={`q-${q.id}`}
                className="bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-[24px]"
              >
                {/* 题头 */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[11px] px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: "#f0f0f0",
                      color: categoryColors[q.category] || "#999",
                    }}
                  >
                    {q.category}
                  </span>
                  <span className="text-[11px]" style={{ color: "#999" }}>
                    {qIdx + 1}/{round2Questions.length}
                  </span>
                  {isAnswered && (
                    <span
                      className="text-[11px] ml-auto"
                      style={{ color: "#4a6d58" }}
                    >
                      已选
                    </span>
                  )}
                </div>

                {/* 问题 */}
                <p
                  className="text-[14px] font-medium leading-relaxed mb-4"
                  style={{ color: "#1a1a1a" }}
                >
                  {q.question}
                </p>

                {/* 选项 */}
                <div className="space-y-2">
                  {q.options.map((opt, idx) => {
                    const isSelected = selectedVals.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() =>
                          !done && handleSelect(q.id, idx, isMultiple)
                        }
                        className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer hover:bg-[#f5faf7]"
                        style={{
                          borderColor: isSelected ? "#4a6d58" : "#e5ede8",
                          backgroundColor: isSelected ? "#e8f0ec" : "white",
                        }}
                      >
                        {isMultiple ? (
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="w-4 h-4 accent-[#4a6d58]"
                          />
                        ) : (
                          <input
                            type="radio"
                            name={`q-${q.id}`}
                            checked={isSelected}
                            readOnly
                            className="accent-[#4a6d58]"
                          />
                        )}
                        <span
                          className="text-[14px]"
                          style={{ color: "#1a1a1a" }}
                        >
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* 多选确认按钮 */}
                {isMultiple &&
                  isAnswered &&
                  selectedVals.length > 0 &&
                  qIdx === round2Questions.length - 1 && (
                    <div className="mt-3 text-right">
                      <span
                        className="text-[12px]"
                        style={{ color: "#4a6d58" }}
                      >
                        已选 {selectedVals.length} 项
                      </span>
                    </div>
                  )}
              </div>
            );
          })}
        </div>

        {/* 底部提交按钮 */}
        {allAnswered && !done && (
          <div
            className="sticky bottom-0 py-4"
            style={{ backgroundColor: "#f5faf7" }}
          >
            <button
              onClick={finish}
              className="w-full py-3 rounded-xl text-white font-medium text-[15px] transition-all duration-200 cursor-pointer shadow-lg"
              style={{ backgroundColor: "#4a6d58" }}
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

export default Round2;
