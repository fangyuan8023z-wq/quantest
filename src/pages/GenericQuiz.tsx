import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Question {
  id: number;
  type: "single" | "judge" | "multiple";
  question: string;
  options: string[];
  answer: number | number[];
  explanation: string;
  category: string;
}

const GenericQuiz = ({
  questions,
  title,
  route,
}: {
  questions: Question[];
  title: string;
  route: string;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const prevData = (location.state as any) || {};

  const [sel, setSel] = useState<Record<number, number | number[]>>({});
  const [showExpl, setShowExpl] = useState<Record<number, boolean>>({});
  const bottomRef = useRef<HTMLDivElement>(null);

  const allAnswered = questions.every((q) => q.id in sel);
  const answeredCount = Object.keys(sel).length;

  const handleSelect = (qId: number, idx: number, isMultiple: boolean) => {
    if (showExpl[qId]) return; // 答过锁住
    if (isMultiple) {
      const current = (sel[qId] as number[]) || [];
      const newVal = current.includes(idx)
        ? current.filter((i) => i !== idx)
        : [...current, idx];
      setSel((prev) => ({ ...prev, [qId]: newVal }));
      return;
    }
    setSel((prev) => ({ ...prev, [qId]: idx }));
    setShowExpl((prev) => ({ ...prev, [qId]: true }));
    // 滚动到下一题
    const curIdx = questions.findIndex((q) => q.id === qId);
    if (curIdx < questions.length - 1) {
      setTimeout(() => {
        document
          .getElementById(`q-${questions[curIdx + 1].id}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 200);
    }
  };

  const finish = () => {
    const answers = questions.map((q) => ({
      qId: q.id,
      selected:
        sel[q.id] !== undefined ? sel[q.id] : q.type === "multiple" ? [] : -1,
    }));
    navigate(route, { state: { ...prevData, [`${title}Answers`]: answers } });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5faf7" }}>
      <div
        className="sticky top-0 z-10 py-3 px-4"
        style={{ backgroundColor: "#f5faf7" }}
      >
        <div className="max-w-[560px] mx-auto flex items-center gap-3">
          <span
            className="text-[11px] px-2 py-0.5 rounded-full whitespace-nowrap"
            style={{ backgroundColor: "#e8f0ec", color: "#4a6d58" }}
          >
            {title}
          </span>
          <div
            className="flex-1 h-[4px] rounded-full"
            style={{ backgroundColor: "#e5ede8" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(answeredCount / questions.length) * 100}%`,
                backgroundColor: "#4a6d58",
              }}
            />
          </div>
          <span
            className="text-[11px] whitespace-nowrap"
            style={{ color: "#999" }}
          >
            {answeredCount}/{questions.length}
          </span>
        </div>
      </div>
      <div className="max-w-[560px] mx-auto px-4 pb-24">
        <div className="space-y-4 pt-2">
          {questions.map((q) => {
            const isMul = q.type === "multiple";
            const selectedVals =
              q.id in sel
                ? Array.isArray(sel[q.id])
                  ? (sel[q.id] as number[])
                  : [sel[q.id] as number]
                : [];
            const isAnswered = showExpl[q.id];
            const isCorrect = (() => {
              if (!(q.id in sel)) return false;
              const ca = Array.isArray(q.answer) ? q.answer : [q.answer];
              return (
                ca.length === selectedVals.length &&
                ca.every((v) => selectedVals.includes(v))
              );
            })();

            return (
              <div
                key={q.id}
                id={`q-${q.id}`}
                className="bg-white rounded-[20px] shadow-sm p-[24px]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[11px] px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: "#f0f0f0", color: "#666" }}
                  >
                    {q.category}
                  </span>
                  {isAnswered && (
                    <span
                      className="text-[11px] ml-auto"
                      style={{ color: isCorrect ? "#4a6d58" : "#c46a6a" }}
                    >
                      {isCorrect ? "✅" : "❌"}
                    </span>
                  )}
                </div>
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
                <p
                  className="text-[14px] font-medium leading-relaxed mb-4 whitespace-pre-line"
                  style={{ color: "#1a1a1a" }}
                >
                  {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, idx) => {
                    const isSelected = selectedVals.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelect(q.id, idx, isMul)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer hover:bg-[#f5faf7] ${isAnswered ? "pointer-events-none" : ""}`}
                        style={{
                          borderColor: isSelected ? "#4a6d58" : "#e5ede8",
                          backgroundColor: isSelected ? "#e8f0ec" : "white",
                          opacity: isAnswered && !isSelected ? 0.5 : 1,
                        }}
                      >
                        {isMul ? (
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
                {isAnswered && (
                  <div
                    className="mt-3 rounded-lg p-3 text-[12px] leading-relaxed"
                    style={{
                      backgroundColor: isCorrect
                        ? "rgba(74,109,88,0.08)"
                        : "rgba(196,106,106,0.08)",
                      color: "#555",
                    }}
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

export default GenericQuiz;
