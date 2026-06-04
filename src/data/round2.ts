export interface Round2Question {
  id: number;
  type: "single" | "multiple" | "judge";
  question: string;
  options: string[];
  answer: number | number[]; // 单选：index；多选：index数组；判断：0=错 1=对
  explanation: string;
  category: "认知" | "冷知识" | "逻辑" | "常识";
}

export const round2Questions: Round2Question[] = [
  // === 认知陷阱题 1-5 ===
  {
    id: 1,
    type: "judge",
    question: '以下说法是否正确——"人类的大脑只开发了10%。"',
    options: ["错", "对"],
    answer: 0,
    explanation:
      '这是经典误解。大脑几乎所有区域都在活动中，神经科学证实不存在"90%未开发"的情况。',
    category: "认知",
  },
  {
    id: 2,
    type: "single",
    question: "按每公里死亡率算，以下哪个最危险？",
    options: ["坐飞机", "坐汽车", "骑摩托车", "走路"],
    answer: 3,
    explanation:
      "按每公里死亡率算，走路比坐飞机危险得多。这就是「可得性启发」——空难新闻让人恐惧，但日常风险被忽略了。",
    category: "认知",
  },
  {
    id: 3,
    type: "single",
    question:
      "一个人连续抛硬币，前9次都是正面。第10次抛，出现正面的概率是多少？",
    options: ["小于50%", "50%", "大于50%", "看运气"],
    answer: 1,
    explanation:
      '每次抛硬币都是独立事件。这叫「赌徒谬误」——以为连续出现正面后反面"该出现了"。实际上每次都是50%。',
    category: "认知",
  },
  {
    id: 4,
    type: "judge",
    question: '以下说法是否正确——"金鱼的记忆只有3秒钟。"',
    options: ["错", "对"],
    answer: 0,
    explanation:
      "研究表明金鱼可以记住几个月的事情，甚至能识别不同的饲养者。这也是个经典误解。",
    category: "认知",
  },
  {
    id: 5,
    type: "single",
    question: "一杯25度的水倒进另一杯25度的水里，混合后的温度是多少？",
    options: ["25度", "50度", "12.5度", "接近0度"],
    answer: 0,
    explanation:
      "温度不叠加！两个相同温度的水混合，温度不变。25+25的结果是更多25度的水，不是50度的水。",
    category: "认知",
  },
  // === 冷知识题 6-13 ===
  {
    id: 6,
    type: "judge",
    question: '"孔子不姓孔，他姓子。"这个说法正确吗？',
    options: ["错", "对"],
    answer: 1,
    explanation:
      "正确！孔子是殷商后裔，本姓「子」氏「孔」——古代姓和氏是分开的，我们平时说的孔子姓子不姓孔。",
    category: "冷知识",
  },
  {
    id: 7,
    type: "judge",
    question: '"香蕉长在树上。"这个说法正确吗？',
    options: ["错", "对"],
    answer: 0,
    explanation:
      '香蕉长在巨型草本植物上，不是树。香蕉"树"实际上是世界上最大的草本植物。',
    category: "冷知识",
  },
  {
    id: 8,
    type: "judge",
    question: '"花生属于坚果类。"这个说法正确吗？',
    options: ["错", "对"],
    answer: 0,
    explanation: "花生是豆科植物，属于豆类而不是坚果。它是在地下生长的豆荚。",
    category: "冷知识",
  },
  {
    id: 9,
    type: "judge",
    question: '"北极熊的皮肤是白色的。"这个说法正确吗？',
    options: ["错", "对"],
    answer: 0,
    explanation:
      "北极熊的皮肤是黑色的！它的毛是透明中空的，看起来是白色，黑色皮肤能更好地吸收太阳热量。",
    category: "冷知识",
  },
  {
    id: 10,
    type: "judge",
    question: '"钻石是由煤炭在地底压缩而成的。"这个说法正确吗？',
    options: ["错", "对"],
    answer: 0,
    explanation:
      "钻石是地幔中的碳在高温高压下形成的，比地球上任何煤炭都古老得多。煤炭是古代植物变成的，钻石是无机碳。",
    category: "冷知识",
  },
  {
    id: 11,
    type: "single",
    question: '以下哪种动物其实是"海豚"的一种？',
    options: ["白鲸", "虎鲸（杀人鲸）", "海象", "儒艮（美人鱼）"],
    answer: 1,
    explanation:
      "虎鲸（俗称杀人鲸）其实是海豚科中体型最大的成员，从分类学上说它是海豚的一种！",
    category: "冷知识",
  },
  {
    id: 12,
    type: "single",
    question: "蜂蜜为什么可以保存数千年不变质？",
    options: ["含大量防腐剂", "低水分+高酸性", "会不断结晶", "需要密封冷藏"],
    answer: 1,
    explanation:
      "蜂蜜含水量极低（低于18%），pH值3-4.5，细菌根本无法存活。密封得当可永久保存——考古学家发现过3000年前的蜂蜜还能吃。",
    category: "冷知识",
  },
  {
    id: 13,
    type: "single",
    question: '英文字母"i"上面的那个点，在印刷术语中叫什么？',
    options: ["Dot", "Tittle", "Pixel", "Speck"],
    answer: 1,
    explanation:
      "印刷术语中「i」上面的点就叫tittle，「j」上面的也是。这个小点有自己的专业名称！",
    category: "冷知识",
  },
  // === 逻辑推理题 14-20 ===
  {
    id: 14,
    type: "single",
    question: "A比B高，B比C矮，C比D高，D比A矮。请问谁最矮？",
    options: ["A", "B", "C", "D"],
    answer: 1,
    explanation:
      "推理：A>B, B<C, C>D, D<A → 推出A最高，B<A, C>B, C>D → B是最小的那个。",
    category: "逻辑",
  },
  {
    id: 15,
    type: "single",
    question: "一个西瓜切三刀，最多能切成几块？",
    options: ["6块", "7块", "8块", "9块"],
    answer: 2,
    explanation:
      "三维切法：平面上两刀交叉成4块，再水平一刀把每块切成上下两片，总共8块！",
    category: "逻辑",
  },
  {
    id: 16,
    type: "single",
    question:
      "如果5台机器5分钟生产5个零件，那么100台机器生产100个零件需要多久？",
    options: ["5分钟", "20分钟", "100分钟", "1分钟"],
    answer: 0,
    explanation:
      "每台机器每5分钟生产1个零件。100台机器同时工作，5分钟就能生产100个——不需要更长的时间！",
    category: "逻辑",
  },
  {
    id: 17,
    type: "single",
    question: "以下数字中哪个与其他的不同类？2, 4, 8, 10, 16, 32",
    options: ["4", "8", "10", "16"],
    answer: 2,
    explanation:
      "10与其他数字不同。2、4、8、16、32都是2的幂次（2¹、2²、2³、2⁴、2⁵），10不是。",
    category: "逻辑",
  },
  {
    id: 18,
    type: "single",
    question:
      '一个人走进酒吧要了一杯水。酒保拿出一把枪指着他的头。他说了句"谢谢"然后离开了。为什么？',
    options: [
      "在测试酒保的反应",
      "在玩真心话大冒险",
      "他打嗝，被吓一下就好了",
      "没有逻辑，就是个笑话",
    ],
    answer: 2,
    explanation:
      "经典逻辑谜题：这个人正在打嗝，想要水来缓解。酒保意识到他的问题，用枪吓他一跳——打嗝就好了。",
    category: "逻辑",
  },
  {
    id: 19,
    type: "single",
    question:
      "一个班级里有25个学生。其中至少有两个人生日在同一个月的概率接近多少？",
    options: ["几乎不可能（<5%）", "接近100%", "大约50%", "大约1%"],
    answer: 1,
    explanation:
      "这就是「生日悖论」——25个人中，至少有两个人生日同月的概率接近100%。即使是同一天的概率也超过50%。直觉和数学往往差距很大！",
    category: "逻辑",
  },
  {
    id: 20,
    type: "single",
    question: "请选择正确的发明时间顺序（最早→最晚）",
    options: [
      "飞机→互联网→人类登月→智能手机",
      "互联网→飞机→智能手机→人类登月",
      "飞机→人类登月→互联网→智能手机",
      "互联网→飞机→人类登月→智能手机",
    ],
    answer: 0,
    explanation:
      "飞机1903年 → 互联网（ARPANET）1969年 → 人类登月1969年 → 智能手机（iPhone）2007年。",
    category: "逻辑",
  },
  // === 常识题 21-25 ===
  {
    id: 21,
    type: "single",
    question: "人的胃酸理论上可以溶解以下哪种东西？",
    options: ["铁钉", "塑料", "口香糖", "玻璃"],
    answer: 0,
    explanation:
      "胃酸pH值约1.5-3.5，理论上可以溶解铁钉（但需要时间）。塑料、口香糖无法被胃消化，但会正常排出。",
    category: "常识",
  },
  {
    id: 22,
    type: "single",
    question: "以下哪种可以安全放入微波炉加热？",
    options: ["不锈钢碗", "陶瓷碗", "铝箔纸", "带金边的盘子"],
    answer: 1,
    explanation:
      "金属（不锈钢、铝箔、金边）会反射微波，可能产生火花甚至引发火灾。陶瓷和玻璃是安全的。",
    category: "常识",
  },
  {
    id: 23,
    type: "multiple",
    question: "以下哪些行为容易导致个人信息泄露？（多选）",
    options: [
      "多个网站用同一密码",
      "在社交平台晒登机牌",
      "连接公共WiFi进行支付",
      "快递单直接扔垃圾桶",
    ],
    answer: [0, 1, 2, 3],
    explanation:
      "四种行为都是常见的信息泄露渠道！密码撞库、登机牌含姓名会员号、公共WiFi可被嗅探、快递单上姓名电话地址齐全。都要注意！",
    category: "常识",
  },
  {
    id: 24,
    type: "single",
    question: "以下哪个不属于中国四大发明？",
    options: ["造纸术", "火药", "陶瓷", "印刷术"],
    answer: 2,
    explanation:
      '四大发明是造纸术、指南针、火药、印刷术。陶瓷虽然也是中国伟大的发明，但不在"四大"之列。',
    category: "常识",
  },
  {
    id: 25,
    type: "judge",
    question: "人在打喷嚏的时候，眼睛一定是闭着的。这个说法正确吗？",
    options: ["错", "对"],
    answer: 1,
    explanation:
      "正确！打喷嚏时眼睛会自动闭合，这是人体的反射机制，无法控制。所以你不可能睁着眼睛打喷嚏。",
    category: "常识",
  },
];

export const getRound2Score = (
  answers: { qId: number; selected: number | number[] }[],
): number => {
  let score = 0;
  answers.forEach((a) => {
    const q = round2Questions.find((q) => q.id === a.qId);
    if (!q) return;
    const correct = Array.isArray(q.answer)
      ? Array.isArray(a.selected) &&
        q.answer.length === a.selected.length &&
        q.answer.every((v) => (a.selected as number[]).includes(v))
      : a.selected === q.answer;
    if (correct) score += 4;
  });
  return score;
};

export const getRound2Results = (
  answers: { qId: number; selected: number | number[] }[],
) => {
  return round2Questions.map((q) => {
    const userAnswer = answers.find((a) => a.qId === q.id);
    const selected = userAnswer?.selected;
    const correct = Array.isArray(q.answer)
      ? Array.isArray(selected) &&
        q.answer.length === selected.length &&
        q.answer.every((v) => (selected as number[]).includes(v))
      : selected === q.answer;
    return { ...q, selected, correct };
  });
};
