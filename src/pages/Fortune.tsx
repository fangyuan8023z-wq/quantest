import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const zodiacList = [
  "鼠",
  "牛",
  "虎",
  "兔",
  "龙",
  "蛇",
  "马",
  "羊",
  "猴",
  "鸡",
  "狗",
  "猪",
];

const fortuneLib: Record<string, any> = {
  鼠: {
    luck: ["今天你的第六感特别准", "东南方向有好运气"],
    love: [
      "桃花运不错，今天可能会收到一条让你开心的消息",
      "有伴侣的话适合一起做饭",
    ],
    career: ["工作中你的灵活性今天格外突出"],
    wealth: ["偏财运不错，适合处理旧物换新钱"],
    health: ["注意久坐问题，记得每小时起来活动一下"],
    personality: "鼠年出生的你天生敏锐",
  },
  牛: {
    luck: ["踏实的人今天会有意外惊喜", "你的坚持将在今天得到回报"],
    love: [
      "今天的你特别有安全感，适合表白或者承诺",
      "单身的话留意身边那个常常帮你的人",
    ],
    career: ["之前的努力今天能看到成果"],
    wealth: ["正财运稳定，适合做长期理财规划"],
    health: ["注意颈椎，试试抬头看天花板30秒"],
    personality: "牛年出生的你稳重可靠",
  },
  虎: {
    luck: ["勇气会为你带来好运", "果断做决定的一天"],
    love: ["魅力值爆棚！今天的你特别有吸引力", "适合主动出击"],
    career: ["领导力在线，适合主持会议"],
    wealth: ["有机会通过副业获得额外收入"],
    health: ["精力旺盛，适合运动出汗"],
    personality: "虎年出生的你充满魄力",
  },
  兔: {
    luck: ["人际关系是你的幸运钥匙", "温和的态度会帮你化解一个小麻烦"],
    love: [
      "温柔是你的武器，今天容易给人留下好印象",
      "适合和伴侣来一次深入的谈心",
    ],
    career: ["沟通协调能力突出"],
    wealth: ["有人情财，朋友可能会还你一笔钱"],
    health: ["注意饮食规律，肠胃比较敏感"],
    personality: "兔年出生的你温和细腻",
  },
  龙: {
    luck: ["今天你自带主角光环", "自信带来好运"],
    love: [
      "气势太强可能会吓到对方，今天稍微收着点",
      "适合展现你的才华来吸引注意",
    ],
    career: ["创造力爆发，适合头脑风暴"],
    wealth: ["大财运需要等待，但小惊喜不断"],
    health: ["注意用眼过度，多看看远方"],
    personality: "龙年出生的你天生不凡",
  },
  蛇: {
    luck: ["你的直觉今天特别准", "冷静观察之后再行动"],
    love: [
      "今天适合欲擒故纵，保持神秘感更有吸引力",
      "有伴侣的话适合一起看场电影",
    ],
    career: ["你的分析能力今天在线"],
    wealth: ["投资眼光不错，但别贪心见好就收"],
    health: ["压力有点大，试试深呼吸放松"],
    personality: "蛇年出生的你智慧深沉",
  },
  马: {
    luck: ["动起来就有好运，今天不要宅着", "远方有好事"],
    love: ["自由奔放的你今天特别有魅力", "适合和伴侣一起户外活动"],
    career: ["行动力爆棚，适合推进搁置已久的项目"],
    wealth: ["奔波财，多跑动就有多收获"],
    health: ["体力充沛但小心扭伤，运动前记得热身"],
    personality: "马年出生的你自由奔放",
  },
  羊: {
    luck: ["温柔的人运气不会差", "适合在家附近活动"],
    love: ["今天的你特别温柔可爱，容易让人心动", "适合给伴侣准备一个小惊喜"],
    career: ["创意和审美在线"],
    wealth: ["细水长流型财运，适合存钱"],
    health: ["注意情绪波动，听听音乐放松"],
    personality: "羊年出生的你温柔善良",
  },
  猴: {
    luck: ["聪明是你的武器", "变化中藏着机会"],
    love: ["幽默感爆棚，今天的你特别有趣", "适合用轻松的方式接近喜欢的人"],
    career: ["随机应变能力强"],
    wealth: ["偏财运旺，但小心投机陷阱"],
    health: ["神经有点紧绷，做点放松的事情"],
    personality: "猴年出生的你机智灵活",
  },
  鸡: {
    luck: ["早起的人今天有好运", "做事认真会被贵人看到"],
    love: ["今天的你打扮一下会特别亮眼", "适合坦诚沟通"],
    career: ["执行力在线，适合处理积压的事务"],
    wealth: ["正财运不错，努力工作就有回报"],
    health: ["注意咽喉问题，多喝温水"],
    personality: "鸡年出生的你勤奋认真",
  },
  狗: {
    luck: ["忠诚和正直会为你带来好运", "今天适合和朋友聚聚"],
    love: ["今天的你特别可靠，让人想依赖", "适合和伴侣一起规划未来"],
    career: ["责任感和执行力是今天的王牌"],
    wealth: ["稳定财运，没有大起大落"],
    health: ["适当运动对身体好，别偷懒"],
    personality: "狗年出生的你忠诚可靠",
  },
  猪: {
    luck: ["心态好的人运气不会差", "吃好睡好就是今天的好运秘诀"],
    love: ["憨厚可爱是你的魅力所在，做自己就好", "适合和伴侣一起享受美食"],
    career: ["今天适合按部就班，急事缓办"],
    wealth: ["有口福财，可能会被人请吃饭"],
    health: ["注意控制饮食，别吃太撑"],
    personality: "猪年出生的你乐观豁达",
  },
};

const generateFortune = (zodiac: string, _province: string, _city: string) => {
  const lib = fortuneLib[zodiac];
  if (!lib) return null;
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  return {
    overall: pick(lib.luck),
    love: pick(lib.love),
    career: pick(lib.career),
    wealth: pick(lib.wealth),
    health: pick(lib.health),
  };
};

type RegionData = Record<string, Record<string, string[]>>;

const Fortune = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = location.state as any;
  const loaded = useRef(false);

  const [regionData, setRegionData] = useState<RegionData>({});
  const [provinces, setProvinces] = useState<string[]>([]);
  const [zodiac, setZodiac] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [fortune, setFortune] = useState<any>(null);
  const [showFortune, setShowFortune] = useState(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    fetch("/region-tree.json")
      .then((r) => r.json())
      .then((data: RegionData) => {
        setRegionData(data);
        setProvinces(Object.keys(data));
      });
  }, []);

  const cities = province ? Object.keys(regionData[province] || {}) : [];
  const counties = city ? regionData[province]?.[city] || [] : [];

  const handleFortune = () => {
    setFortune(generateFortune(zodiac, province, city));
    setShowFortune(true);
  };

  const handleStart = () => {
    navigate("/quiz", {
      state: { ...userInfo, zodiac, birthPlace: { province, city, county } },
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: "#f5faf7" }}
    >
      <div className="w-full max-w-[560px] bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-[48px]">
        <div className="text-center mb-8">
          <h1 className="text-[24px] font-bold" style={{ color: "#1a1a1a" }}>
            今日运势
          </h1>
          <p className="text-[13px] mt-2" style={{ color: "#999" }}>
            输入信息，开启今日运势
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label
              className="block text-[13px] font-medium mb-2"
              style={{ color: "#666" }}
            >
              属相
            </label>
            <div className="grid grid-cols-6 gap-2">
              {zodiacList.map((z) => (
                <button
                  key={z}
                  onClick={() => setZodiac(z)}
                  className="py-2 rounded-xl text-[13px] border transition-all cursor-pointer"
                  style={{
                    borderColor: zodiac === z ? "#4a6d58" : "#e5ede8",
                    backgroundColor: zodiac === z ? "#e8f0ec" : "white",
                    color: zodiac === z ? "#4a6d58" : "#666",
                  }}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              className="block text-[13px] font-medium mb-2"
              style={{ color: "#666" }}
            >
              出生地
            </label>
            <div className="grid grid-cols-3 gap-2">
              <select
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                  setCity("");
                  setCounty("");
                }}
                className="px-3 py-2.5 rounded-xl border text-[13px] outline-none bg-white"
                style={{ borderColor: "#e5ede8" }}
              >
                <option value="">省份</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setCounty("");
                }}
                disabled={!cities.length}
                className="px-3 py-2.5 rounded-xl border text-[13px] outline-none bg-white disabled:opacity-40"
                style={{ borderColor: "#e5ede8" }}
              >
                <option value="">城市</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                disabled={!counties.length}
                className="px-3 py-2.5 rounded-xl border text-[13px] outline-none bg-white disabled:opacity-40"
                style={{ borderColor: "#e5ede8" }}
              >
                <option value="">区/县</option>
                {counties.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {!showFortune && zodiac && province && (
            <button
              onClick={handleFortune}
              className="w-full py-3 rounded-xl text-white font-medium text-[15px] transition-all duration-200 cursor-pointer hover:scale-[1.01]"
              style={{ backgroundColor: "#4a6d58" }}
            >
              算一卦
            </button>
          )}

          {showFortune && fortune && (
            <div
              className="rounded-xl p-5 border"
              style={{ backgroundColor: "#f5faf7", borderColor: "#e5ede8" }}
            >
              <div className="text-center mb-3">
                <span className="text-3xl">🔮</span>
                <h3 className="font-bold mt-1" style={{ color: "#4a6d58" }}>
                  {zodiac}年 · {province}
                  {city}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {[
                  { label: "整体", text: fortune.overall },
                  { label: "桃花", text: fortune.love },
                  { label: "事业", text: fortune.career },
                  { label: "财运", text: fortune.wealth },
                  { label: "健康", text: fortune.health },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-2.5">
                    <span
                      className="text-[12px] font-medium"
                      style={{ color: "#4a6d58" }}
                    >
                      {item.label}
                    </span>
                    <p className="text-[12px] mt-1" style={{ color: "#666" }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <p
                className="text-[11px] text-center mt-3"
                style={{ color: "#999" }}
              >
                * 仅供娱乐
              </p>
            </div>
          )}

          {showFortune && (
            <button
              onClick={handleStart}
              className="w-full py-3 rounded-xl text-white font-medium text-[15px] transition-all duration-200 cursor-pointer hover:scale-[1.01]"
              style={{ backgroundColor: "#4a6d58" }}
            >
              开始答题！
            </button>
          )}

          <button
            onClick={() =>
              navigate("/profile", {
                state: {
                  ...userInfo,
                  zodiac,
                  birthPlace: { province, city, county },
                },
              })
            }
            className="w-full text-[13px] py-2 transition cursor-pointer bg-transparent border-none"
            style={{ color: "#999" }}
          >
            返回上一步
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fortune;
