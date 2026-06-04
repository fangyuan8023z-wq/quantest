import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { round4Questions } from "../data/round4";

const Round4 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prevData = (location.state as any) || {};

  const [sel, setSel] = useState<Record<number, number | number[]>>({});
  const [showPassage, setShowPassage] = useState<Record<number, boolean>>({});
  const bottomRef = useRef<HTMLDivElement>(null);

  const allAnswered = round4Questions.every((q) => q.id in sel);
  const answeredCount = Object.keys(sel).length;

  // 自动切换：有passage的题默认先展示passage
  useEffect(() => {
    round4Questions.forEach((q) => {
      if (q.passage && !(q.id in showPassage)) {
        // 默认passage可见
        setShowPassage((prev) => ({ ...prev, [q.id]: true }));
      }
    });
  }, []);

  const handleSelect = (qId: number, idx: number, isMultiple: boolean) => {
    if (isMultiple) {
      const current = (sel[qId] as number[]) || [];
      const newVal = current.includes(idx)
        ? current.filter((i) => i !== idx)
        : [...current, idx];
      setSel((prev) => ({ ...prev, [qId]: newVal }));
      return;
    }
    setSel((prev) => ({ ...prev, [qId]: idx }));
    // 自动滚动到下一题
    const currentIdx = round4Questions.findIndex((q) => q.id === qId);
    if (currentIdx < round4Questions.length - 1) {
      const nextQ = round4Questions[currentIdx + 1];
      setTimeout(() => {
        document
          .getElementById(`q4-${nextQ.id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    }
  };

  const finish = () => {
    const answers = round4Questions.map((q) => ({
      qId: q.id,
      selected:
        sel[q.id] !== undefined ? sel[q.id] : q.type === "multiple" ? [] : -1,
    }));
    navigate("/result-r4", {
      state: { ...prevData, round4Answers: answers },
    });
  };

  const categoryColors: Record<string, string> = {
    短时记忆: "#4a6d58",
    观察力: "#6b8f7a",
    细节捕捉: "#8baa96",
    数字记忆: "#c4906a",
    逻辑记忆: "#a0c4b0",
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
              style={{ backgroundColor: "#e8f0ec", color: "#4a6d58" }}
            >
              第四轮 · 记忆挑战
            </span>
            <div
              className="flex-1 h-[4px] rounded-full"
              style={{ backgroundColor: "#e5ede8" }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(answeredCount / round4Questions.length) * 100}%`,
                  backgroundColor: "#4a6d58",
                }}
              />
            </div>
            <span
              className="text-[11px] whitespace-nowrap"
              style={{ color: "#999" }}
            >
              {answeredCount}/{round4Questions.length}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[560px] mx-auto px-4 pb-24">
        <div className="space-y-4 pt-2">
          {round4Questions.map((q) => {
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
                id={`q4-${q.id}`}
                className="bg-white rounded-[20px] shadow-sm p-[24px]"
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
                    {q.id}/{round4Questions.length}
                  </span>
                  {isAnswered && (
                    <span
                      className="text-[11px] ml-auto"
                      style={{ color: "#4a6d58" }}
                    >
                      已答
                    </span>
                  )}
                </div>

                {/* 文字记忆段落（如果有） */}
                {q.passage && showPassage[q.id] && (
                  <div className="bg-blue-50 rounded-xl p-3 mb-4 border border-blue-100">
                    <p
                      className="text-[12px] leading-relaxed"
                      style={{ color: "#555" }}
                    >
                      {q.passage}
                    </p>
                  </div>
                )}

                {/* 题型标签 */}
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded-full mb-3 inline-block"
                  style={{ backgroundColor: "#f0f0f0", color: "#999" }}
                >
                  {q.type === "single"
                    ? "单选"
                    : q.type === "multiple"
                      ? "多选"
                      : "判断"}
                </span>

                {/* 问题 */}
                <p
                  className="text-[14px] font-medium leading-relaxed mb-4 whitespace-pre-line"
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
                          !isAnswered && handleSelect(q.id, idx, isMultiple)
                        }
                        className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer hover:bg-[#f5faf7]"
                        style={{
                          borderColor: isSelected ? "#4a6d58" : "#e5ede8",
                          backgroundColor: isSelected ? "#e8f0ec" : "white",
                          opacity: isAnswered && !isSelected ? 0.6 : 1,
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
                            name={`q4-${q.id}`}
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

                {/* 答完不显示答案，提交后再显示 */}
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

export default Round4;
