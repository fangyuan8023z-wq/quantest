export interface Round6Question {
  id: number;
  type: "single" | "judge" | "multiple";
  question: string;
  options: string[];
  answer: number | number[];
  explanation: string;
  category: "健康急救" | "法律常识" | "实用技巧" | "理财常识" | "环境与安全";
}

export const round6Questions: Round6Question[] = [
  // === 健康急救 1-4 ===
  {
    id: 1,
    type: "single",
    category: "健康急救",
    question: "被烫伤了，第一时间应该怎么做？",
    options: ["涂牙膏", "用冷水冲15-20分钟", "涂酱油", "戳破水泡"],
    answer: 1,
    explanation:
      "烫伤第一时间用流动冷水冲15-20分钟，可以降低皮肤温度、减轻损伤。涂牙膏/酱油会感染，戳破水泡会增加感染风险。",
  },
  {
    id: 2,
    type: "single",
    category: "健康急救",
    question: "发现有人晕倒，第一步应该做什么？",
    options: ["掐人中", "喂水", "确认环境和检查意识反应", "做心肺复苏"],
    answer: 2,
    explanation:
      "发现有人晕倒，先确保自己和患者安全，然后轻拍双肩大声呼唤判断意识，再呼救120。掐人中/喂水/直接心肺复苏都可能是错误操作。",
  },
  {
    id: 3,
    type: "judge",
    category: "健康急救",
    question: '"感冒了吃抗生素好得更快。"这个说法正确吗？',
    options: ["正确", "错误"],
    answer: 1,
    explanation:
      "感冒90%以上由病毒引起，抗生素只对细菌有效。乱吃抗生素会产生耐药性，真正需要时反而没用。",
  },
  {
    id: 4,
    type: "single",
    category: "健康急救",
    question: "流鼻血时正确的做法是？",
    options: ["头后仰", "举另一只手", "身体前倾捏住鼻翼", "用纸塞住鼻孔"],
    answer: 2,
    explanation:
      "头后仰会让血流到喉咙引起呛咳，正确做法是身体微微前倾，用手指捏住鼻翼5-10分钟。",
  },

  // === 法律常识 5-8 ===
  {
    id: 5,
    type: "single",
    category: "法律常识",
    question: "租房合同到期后，房东不退押金，最有效的维权途径是？",
    options: [
      "找警察抓房东",
      "把房东东西搬走",
      "向法院起诉或申请调解",
      "在网上曝光",
    ],
    answer: 2,
    explanation:
      "押金纠纷属于民事纠纷，报警一般不管。最有效的是向法院起诉或通过社区/房管部门调解。",
  },
  {
    id: 6,
    type: "single",
    category: "法律常识",
    question: "网购商品在快递途中丢失，谁承担责任？",
    options: [
      "买家自己承担",
      "快递公司承担",
      "卖家承担再补发",
      "快递员个人承担",
    ],
    answer: 2,
    explanation:
      "根据《电商法》，网购商品在运输途中损毁/丢失的风险由卖家承担，买家有权要求卖家补发或退款。",
  },
  {
    id: 7,
    type: "single",
    category: "法律常识",
    question: "朋友找你借钱打了借条，但没写还款日期，这个借条有效吗？",
    options: [
      "无效，没写日期就是废纸",
      "有效，可以随时要求还款",
      "无效，需要公证才有效",
      "有效但只能追回一半",
    ],
    answer: 1,
    explanation:
      "没有写还款日期的借条同样有效，债权人可以随时要求还款，但应给对方合理准备时间。最好还是写清楚日期避免纠纷。",
  },
  {
    id: 8,
    type: "judge",
    category: "法律常识",
    question: '"公园里摘几朵花带回家不犯法。"这个说法正确吗？',
    options: ["正确", "错误"],
    answer: 1,
    explanation:
      "公园里的花草属于公共财产，随意采摘属于破坏公共财物，轻则罚款，重则影响征信记录。",
  },

  // === 实用技巧 9-12 ===
  {
    id: 9,
    type: "single",
    category: "实用技巧",
    question: "衣服上沾了油渍，最快的去油方法是什么？",
    options: [
      "用水使劲搓",
      "用洗洁精涂在油渍上再洗",
      "用热水泡一晚上",
      "直接扔洗衣机",
    ],
    answer: 1,
    explanation:
      "洗洁精是去油神器——涂在干衣服的油渍上揉搓，再用清水冲洗，效果比洗衣液好得多。",
  },
  {
    id: 10,
    type: "single",
    category: "实用技巧",
    question: "手机掉水里了，第一步应该做什么？",
    options: [
      "立刻开机检查能不能用",
      "用吹风机吹",
      "关机擦干后放米袋里吸湿",
      "甩一甩把水甩出来",
    ],
    answer: 2,
    explanation:
      "手机掉水后应该立刻关机，擦干表面水分，放入密封袋装的大米中吸湿24小时以上。千万不要开机或充电，可能短路。",
  },
  {
    id: 11,
    type: "single",
    category: "实用技巧",
    question: "在超市购物，想看清最下层货架的商品，最好的姿势是？",
    options: [
      "弯腰看",
      "蹲下来平视看",
      "站着用脚把商品勾过来",
      "请工作人员帮忙",
    ],
    answer: 1,
    explanation:
      "蹲下来平视能看清整个货架的商品，而且不容易被上面的货架遮挡视线。超市最下层往往是性价比最高的商品。",
  },
  {
    id: 12,
    type: "judge",
    category: "实用技巧",
    question: '"冰箱里的食物只要没坏就可以无限期放。"这个说法正确吗？',
    options: ["正确", "错误"],
    answer: 1,
    explanation:
      "冰箱只能延缓细菌生长，不能阻止。即使食物没坏，放置太久营养也会流失，口感受影响。冷藏一般不超过3-5天。",
  },

  // === 理财常识 13-16 ===
  {
    id: 13,
    type: "single",
    category: "理财常识",
    question: "以下哪个是「基金定投」的核心优势？",
    options: [
      "稳赚不赔",
      "分散买入成本，降低择时风险",
      "收益比股票高",
      "随时可以取出本金",
    ],
    answer: 1,
    explanation:
      "基金定投的核心优势是「摊平成本」——在低位多买、高位少买，长期来看降低了择时风险。但它不是稳赚不赔的。",
  },
  {
    id: 14,
    type: "single",
    category: "理财常识",
    question: '"年化收益率15%"是什么意思？',
    options: [
      "每个月赚15%",
      "一年预期收益15%，但不是保证",
      "半年收益15%",
      "15%是固定的，一定会拿到",
    ],
    answer: 1,
    explanation:
      "年化收益率是「按年折算的预期收益率」，不是保证收益。而且年化≠实际，短期理财的实际收益要按持有天数折算。",
  },
  {
    id: 15,
    type: "single",
    category: "理财常识",
    question: "以下哪个是最安全的理财方式？",
    options: ["股票", "基金", "银行定期存款", "数字货币"],
    answer: 2,
    explanation:
      "银行定期存款受存款保险保障，50万以内本息全额赔付。股票/基金/数字货币都有亏损风险。",
  },
  {
    id: 16,
    type: "multiple",
    category: "理财常识",
    question: "以下哪些是「省钱」而不是「抠门」的做法？（多选）",
    options: [
      "等双十一再买需要的家电",
      "为了省几块钱走半小时去买菜",
      "学会自己做饭减少外卖",
      "用记账App记录每天开销",
    ],
    answer: [0, 2, 3],
    explanation:
      "省钱是「在该花的地方花，不该花的地方省」——等促销买刚需、自己做饭、记账都是好习惯。为了省几块钱走半小时去买菜，时间成本太高了。",
  },

  // === 环境与安全 17-20 ===
  {
    id: 17,
    type: "single",
    category: "环境与安全",
    question: "燃气泄漏时，以下哪个做法是正确的？",
    options: ["开灯检查", "打开抽油烟机", "关闭阀门开窗通风", "打电话报警"],
    answer: 2,
    explanation:
      "燃气泄漏时，任何电器开关（包括开灯、抽油烟机）都可能产生火花引发爆炸。应该先关阀门、开窗通风，然后到室外再打电话。",
  },
  {
    id: 18,
    type: "single",
    category: "环境与安全",
    question: "发生火灾时，以下哪个逃生方式是正确的？",
    options: [
      "坐电梯快速下楼",
      "用湿毛巾捂住口鼻弯腰走楼梯",
      "跳楼逃生",
      "躲进卫生间",
    ],
    answer: 1,
    explanation:
      "火灾时烟雾向上飘，弯腰可以减少吸入有毒烟雾。湿毛巾可以过滤部分有害气体。绝对不能坐电梯（可能断电）。",
  },
  {
    id: 19,
    type: "judge",
    category: "环境与安全",
    question: '"塑料瓶可以反复装水喝。"这个说法安全吗？',
    options: ["安全", "不安全"],
    answer: 1,
    explanation:
      "一次性塑料瓶（PET材质）反复使用会析出有害物质，尤其是装热水或暴晒后。建议用专门的耐热水瓶反复使用。",
  },
  {
    id: 20,
    type: "single",
    category: "环境与安全",
    question: "遇到雷雨天气在户外，以下哪个做法最安全？",
    options: [
      "在大树下躲雨",
      "在空旷的地方蹲下降低重心",
      "打手机叫车",
      "举着金属伞跑回家",
    ],
    answer: 1,
    explanation:
      "雷雨天气在户外，最好的做法是蹲下降低重心、减少与地面的接触面积。大树下、打手机、举金属伞都有雷击风险。",
  },
];

// 每题2分
export const getRound6Score = (
  answers: { qId: number; selected: number | number[] }[],
): number => {
  let correct = 0;
  answers.forEach((a) => {
    const q = round6Questions.find((q) => q.id === a.qId);
    if (!q) return;
    const ca = Array.isArray(q.answer) ? q.answer : [q.answer];
    const ua = Array.isArray(a.selected) ? a.selected : [a.selected];
    if (ca.length === ua.length && ca.every((v) => ua.includes(v))) correct++;
  });
  return correct * 2;
};
