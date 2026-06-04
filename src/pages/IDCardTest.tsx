import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";

const IDCardTest = () => {
  const navigate = useNavigate();
  const q6 = questions[5]; // 第6题

  const [visibleQuestions, setVisibleQuestions] = useState<any[]>([
    {
      id: q6.id,
      question: q6.question,
      options: q6.options,
      selectedIndex: -1,
    },
  ]);
  const [idcardInput, setIdcardInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleQuestions]);

  const handleSelect = (qIdx: number, optIdx: number) => {
    const q = visibleQuestions[qIdx];
    const opt = q.options[optIdx];

    // 更新选中的
    const newQuestions = [...visibleQuestions];
    newQuestions[qIdx] = { ...newQuestions[qIdx], selectedIndex: optIdx };
    setVisibleQuestions(newQuestions);

    if (opt.isIdcardInput) {
      // 这就是身份证题了，等着用户操作
      newQuestions.push({
        id: "trap",
        question: "说到个人信息安全——你记得自己身份证后四位吗？",
        options: [
          { text: "记得！", score: 0, isIdcardInput: true },
          { text: "记不太清了", score: -5 },
          { text: "跳过此题", score: 10 },
        ],
        selectedIndex: -1,
      });
      setVisibleQuestions(newQuestions);
      return;
    }

    if (opt.next) {
      // 展开子题
      newQuestions.push({
        id: opt.next.id,
        question: opt.next.question,
        options: opt.next.options,
        selectedIndex: -1,
      });
      setVisibleQuestions(newQuestions);
    } else {
      // 没有子题，直接显示结果
    }
  };

  const handleIdcardAction = (action: "filled" | "forgot" | "skip") => {
    if (action === "filled" && idcardInput.trim().length > 0) {
      setResult(
        `✅ 你填了身份证后4位：${idcardInput} —— 掉入陷阱！结算页会显示红色警告，并扣20分`,
      );
    } else if (action === "forgot") {
      setResult("✅ 你选了「记不太清了」 —— 微扣分5分");
    } else {
      setResult("✅ 你跳过了 —— 正确操作，加10分！结算页显示绿色安全提示");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5faf7" }}>
      <div className="max-w-[560px] mx-auto px-4 py-8">
        <div className="bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-[24px] mb-4">
          <p className="text-[14px] font-medium" style={{ color: "#4a6d58" }}>
            身份证陷阱独立测试
          </p>
          <p className="text-[12px] mt-1" style={{ color: "#999" }}>
            只看第6题，选"好像没什么特别的爱好"最快触发身份证题
          </p>
          <button
            onClick={() => navigate("/quiz")}
            className="text-[12px] underline mt-2 cursor-pointer bg-transparent border-none"
            style={{ color: "#4a6d58" }}
          >
            回到正常答题
          </button>
        </div>

        <div className="space-y-4">
          {visibleQuestions.map((q: any, qIdx: number) => {
            const isCurrent = q.selectedIndex === -1;
            const isIdcard = q.id.startsWith("trap");

            return (
              <div
                key={qIdx}
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
                        onClick={() => handleIdcardAction("filled")}
                        disabled={idcardInput.trim().length < 4}
                        className="flex-1 py-3 rounded-xl text-white font-medium text-[14px] transition cursor-pointer disabled:opacity-30"
                        style={{ backgroundColor: "#4a6d58" }}
                      >
                        提交
                      </button>
                      <button
                        onClick={() => handleIdcardAction("skip")}
                        className="flex-1 py-3 rounded-xl font-medium text-[14px] cursor-pointer"
                        style={{ backgroundColor: "#e5ede8", color: "#666" }}
                      >
                        跳过
                      </button>
                      <button
                        onClick={() => handleIdcardAction("forgot")}
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
                      const isSelected = q.selectedIndex === idx;
                      return (
                        <label
                          key={idx}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${isCurrent ? "hover:bg-[#f5faf7]" : ""}`}
                          style={{
                            borderColor: isSelected ? "#4a6d58" : "#e5ede8",
                            backgroundColor: isSelected ? "#e8f0ec" : "white",
                            opacity: !isCurrent && !isSelected ? 0.6 : 1,
                          }}
                        >
                          <input
                            type="radio"
                            name={`test-${qIdx}`}
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

        {result && (
          <div className="bg-white rounded-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-[28px] mt-4 text-center">
            <p className="text-[15px]" style={{ color: "#4a6d58" }}>
              {result}
            </p>
            <button
              onClick={() => {
                setVisibleQuestions([
                  {
                    id: q6.id,
                    question: q6.question,
                    options: q6.options,
                    selectedIndex: -1,
                  },
                ]);
                setIdcardInput("");
                setResult(null);
              }}
              className="mt-4 px-6 py-2.5 rounded-xl text-white font-medium text-[14px] transition cursor-pointer"
              style={{ backgroundColor: "#4a6d58" }}
            >
              再试一次
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default IDCardTest;
