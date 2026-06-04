import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const rounds = [
    {
      num: 1,
      title: "自我认知",
      desc: "6大题·树状追问",
      color: "#4a6d58",
      route: "/profile",
    },
    {
      num: 2,
      title: "知识挑战",
      desc: "25题·常识+逻辑",
      color: "#6b8f7a",
      route: "/result",
    },
    {
      num: 3,
      title: "防骗情景",
      desc: "20题·真实骗局",
      color: "#8baa96",
      route: "/result-r2",
    },
    {
      num: "4a",
      title: "软肋挑战·诈骗模拟",
      desc: "扮演诈骗犯",
      color: "#c4906a",
      route: "/result-r3",
    },
    {
      num: 4,
      title: "记忆与观察",
      desc: "20题·每题1.5分",
      color: "#4a6d58",
      route: "/soft-spot",
    },
    {
      num: 5,
      title: "创造力·发散思维",
      desc: "20题·每题2分",
      color: "#6b8f7a",
      route: "/result-r4",
    },
    {
      num: 6,
      title: "生活智慧",
      desc: "20题·每题2分",
      color: "#8baa96",
      route: "/result-r5",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5faf7" }}>
      <div className="max-w-[600px] mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🧠</div>
          <h1 className="text-3xl font-bold" style={{ color: "#1a1a1a" }}>
            全能力测试
          </h1>
          <p className="text-sm mt-2" style={{ color: "#999" }}>
            测的不只是智商
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="mt-6 px-10 py-3.5 rounded-xl text-white font-medium transition-all duration-200 cursor-pointer hover:scale-[1.02]"
            style={{ backgroundColor: "#4a6d58" }}
          >
            开始测试
          </button>
        </div>

        <div className="space-y-2.5">
          <p className="text-xs font-medium" style={{ color: "#999" }}>
            全部轮次
          </p>
          {rounds.map((r) => (
            <div
              key={r.num}
              className="flex items-center gap-4 p-4 rounded-xl bg-white border transition-all cursor-pointer hover:shadow-sm"
              style={{ borderColor: "#e5ede8" }}
              onClick={() => navigate(r.route)}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: r.color }}
              >
                {r.num}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
                  {r.title}
                </p>
                <p className="text-xs" style={{ color: "#999" }}>
                  {r.desc}
                </p>
              </div>
              <span className="text-lg" style={{ color: "#ccc" }}>
                →
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] mt-10" style={{ color: "#ccc" }}>
          项目累计 10,000+ 行代码 · 6 轮完整测试
        </p>
      </div>
    </div>
  );
};

export default Home;
