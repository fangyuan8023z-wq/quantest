import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { questions } from "../data/questions";

// 拍平树：根据用户选择逐步展开
const flattenWithAnswers = (
  baseNode: any,
  selectedHistory: { optionIndex: number }[],
): {
  id: string;
  question: string;
  options: any[];
  selectedIndex?: number;
}[] => {
  const result: any[] = [];
  let node = baseNode;
  for (let i = 0; i <= selectedHistory.length; i++) {
    const sel = selectedHistory[i];
    result.push({
      id: node.id,
      question: node.question,
      options: node.options,
      selectedIndex: sel?.optionIndex ?? -1,
    });
    if (sel !== undefined && node.options[sel.optionIndex]?.next) {
      node = node.options[sel.optionIndex].next;
    } else {
      break;
    }
  }
  return result;
};

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = location.state as any;

  const [bigIdx, setBigIdx] = useState(0);
  // 每道大题的选项历史记录
  const [histories, setHistories] = useState<{ optionIndex: number }[][]>([[]]);
  const answersRef = useRef<any[]>([]);
  const trapRef = useRef(false);
  const [idcardInput, setIdcardInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const currentNode = questions[bigIdx];
  const visibleQuestions = flattenWithAnswers(
    currentNode,
    histories[bigIdx] || [],
  );
  const currentAnswering = visibleQuestions.find((q) => q.selectedIndex === -1);
  const isLastBig = bigIdx >= questions.length - 1;
  const progressValue = (bigIdx / questions.length) * 100;

  // 自动滚动到底部
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleQuestions]);

  const handleSelect = (qIdx: number, optIdx: number) => {
    const q = visibleQuestions[qIdx];
    if (!q) return;
    const opt = q.options[optIdx];
    if (!opt) return;

    // 更新该大题的选中历史
    const newHistory = [...(histories[bigIdx] || [])];
    // 截断到当前题
    while (newHistory.length > qIdx) newHistory.pop();
    newHistory[qIdx] = { optionIndex: optIdx };

    // 如果是身份证陷阱
    if (opt.isIdcardInput && qIdx === visibleQuestions.length - 1) {
      setHistories((prev) => {
        const copy = [...prev];
        copy[bigIdx] = newHistory;
        return copy;
      });
      // 显示输入框 — 在渲染层处理
      return;
    }

    // 记录分数
    const record = {
      questionId: q.id,
      question: q.question,
      selected: opt.text,
      score: opt.score,
    };
    answersRef.current = [...answersRef.current, record];

    // 如果有下一层且不是身份证题，更新历史
    if (opt.next) {
      if (opt.next.type === "idcard") {
        // 下一题是身份证题，特殊处理
        setHistories((prev) => {
          const copy = [...prev];
          copy[bigIdx] = newHistory;
          return copy;
        });
        return;
      }
      setHistories((prev) => {
        const copy = [...prev];
        copy[bigIdx] = newHistory;
        return copy;
      });
      return;
    }

    // 没有下一层 → 进入下一道大题
    const finalAnswers = [...answersRef.current, record];
    if (isLastBig) {
      const totalScore = finalAnswers.reduce(
        (sum: number, a: any) => sum + a.score,
        0,
      );
      navigate("/result", {
        state: {
          userInfo,
          answers: finalAnswers,
          totalScore: Math.max(0, totalScore),
          fellIntoTrap: trapRef.current,
        },
      });
    } else {
      answersRef.current = finalAnswers;
      setBigIdx((i) => i + 1);
      setHistories((prev) => [...prev, []]);
    }
  };

  const handleIdcardSelect = (action: "filled" | "forgot" | "skip") => {
    const lastQ = visibleQuestions[visibleQuestions.length - 1];
    if (!lastQ) return;

    if (action === "filled" && idcardInput.trim().length > 0) {
      trapRef.current = true;
      answersRef.current = [
        ...answersRef.current,
        {
          questionId: lastQ.id,
          question: lastQ.question,
          selected: `记得！填写了：${idcardInput}`,
          score: -20,
        },
      ];
    } else if (action === "forgot") {
      answersRef.current = [
        ...answersRef.current,
        {
          questionId: lastQ.id,
          question: lastQ.question,
          selected: "记不太清了",
          score: -5,
        },
      ];
    } else {
      answersRef.current = [
        ...answersRef.current,
        {
          questionId: lastQ.id,
          question: lastQ.question,
          selected: "跳过此题",
          score: 10,
        },
      ];
    }

    const finalAnswers = answersRef.current;
    if (isLastBig) {
      const totalScore = finalAnswers.reduce(
        (sum: number, a: any) => sum + a.score,
        0,
      );
      navigate("/result", {
        state: {
          userInfo,
          answers: finalAnswers,
          totalScore: Math.max(0, totalScore),
          fellIntoTrap: trapRef.current,
        },
      });
    } else {
      setBigIdx((i) => i + 1);
      setHistories((prev) => [...prev, []]);
      setIdcardInput("");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5faf7" }}>
      {/* 顶部固定进度条 */}
      <div
        className="sticky top-0 z-10 py-3 px-4"
        style={{ backgroundColor: "#f5faf7" }}
      >
        <div className="max-w-[560px] mx-auto">
          <div
            className="w-full h-[4px] rounded-full"
            style={{ backgroundColor: "#e5ede8" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, progressValue + 16)}%`,
                backgroundColor: "#4a6d58",
              }}
            />
          </div>
          <div
            className="flex justify-between text-[11px] mt-1.5"
            style={{ color: "#999" }}
          >
            <span>
              第 {bigIdx + 1} / {questions.length} 大题
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[560px] mx-auto px-4 pb-16">
        {/* 当前大题的题目展开 */}
        <div className="space-y-6 pt-4">
          {visibleQuestions.map((q, qIdx) => {
            const isAnswered = q.selectedIndex !== -1;
            const isCurrent =
              qIdx === visibleQuestions.length - 1 && !isAnswered;
            const isIdcard = q.id.startsWith("trap");

            return (
              <div
                key={q.id}
                className="bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-[28px]"
              >
                <p
                  className="text-[15px] font-semibold leading-relaxed mb-5"
                  style={{ color: "#1a1a1a" }}
                >
                  {q.question}
                </p>

                {isIdcard && isCurrent ? (
                  <div className="space-y-3">
                    <div
                      className="rounded-xl p-4 border"
                      style={{
                        backgroundColor: "#f5faf7",
                        borderColor: "#e5ede8",
                      }}
                    >
                      <p className="text-sm mb-3" style={{ color: "#4a6d58" }}>
                        请输入你的身份证后四位：
                      </p>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="后4位"
                        value={idcardInput}
                        onChange={(e) =>
                          setIdcardInput(e.target.value.replace(/\D/g, ""))
                        }
                        className="w-full px-4 py-3 rounded-xl border text-lg text-center tracking-[0.5em] font-mono outline-none bg-white"
                        style={{ borderColor: "#e5ede8" }}
                        autoFocus
                      />
                      <p
                        className="text-xs mt-2 text-center"
                        style={{ color: "#999" }}
                      >
                        * 可不填，直接点下方按钮跳过
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleIdcardSelect("filled")}
                        disabled={idcardInput.trim().length < 4}
                        className="flex-1 py-3 rounded-xl text-white font-medium text-[14px] transition cursor-pointer disabled:opacity-30"
                        style={{ backgroundColor: "#4a6d58" }}
                      >
                        提交
                      </button>
                      <button
                        onClick={() => handleIdcardSelect("skip")}
                        className="flex-1 py-3 rounded-xl font-medium text-[14px] cursor-pointer"
                        style={{ backgroundColor: "#e5ede8", color: "#666" }}
                      >
                        跳过
                      </button>
                      <button
                        onClick={() => handleIdcardSelect("forgot")}
                        className="flex-1 py-3 rounded-xl font-medium text-[14px] cursor-pointer"
                        style={{ backgroundColor: "#f0f0f0", color: "#999" }}
                      >
                        记不清
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {q.options.map((opt: any, idx: number) => {
                      const isSelected = isAnswered && q.selectedIndex === idx;
                      return (
                        <label
                          key={idx}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                            isCurrent ? "hover:bg-[#f5faf7]" : ""
                          } ${isSelected ? "" : ""}`}
                          style={{
                            borderColor: isSelected ? "#4a6d58" : "#e5ede8",
                            backgroundColor: isSelected ? "#e8f0ec" : "white",
                            opacity: isAnswered && !isSelected ? 0.6 : 1,
                          }}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            checked={isSelected}
                            disabled={!isCurrent}
                            onChange={() =>
                              isCurrent && handleSelect(qIdx, idx)
                            }
                          />
                          <span
                            className="text-[14px]"
                            style={{ color: "#1a1a1a" }}
                          >
                            {opt.text}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Quiz;
