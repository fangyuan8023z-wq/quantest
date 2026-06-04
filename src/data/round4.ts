export interface Round4Question {
  id: number;
  type: "single" | "judge" | "multiple";
  question: string;
  // 如果是文字记忆类，需要先展示一段文字
  passage?: string;
  options: string[];
  answer: number | number[];
  explanation: string;
  category: "短时记忆" | "观察力" | "细节捕捉" | "数字记忆" | "逻辑记忆";
}

export const round4Questions: Round4Question[] = [
  // === 数字记忆 1-3 ===
  {
    id: 1,
    type: "single",
    category: "数字记忆",
    question:
      "请记住这串数字：\n\n📌 3 9 1 7 5 2 8 4 6\n\n看完后点击选项回答——这串数字中，第5位是什么？",
    options: ["7", "5", "2", "8", "4"],
    answer: 1,
    explanation:
      "数字序列是 3-9-1-7-5-2-8-4-6，第5位是5。短期记忆的容量通常在7±2个数字之间。",
  },
  {
    id: 2,
    type: "single",
    category: "数字记忆",
    question:
      "请记住以下手机号：\n\n📌 189 4527 6308\n\n下面哪个选项是正确的号码？",
    options: [
      "189 4527 6308",
      "189 5427 6308",
      "189 4527 6380",
      "198 4527 6308",
    ],
    answer: 0,
    explanation:
      "正确答案是189 4527 6308。人的短时记忆对数字分组后更容易记住。",
  },
  {
    id: 3,
    type: "single",
    category: "数字记忆",
    question:
      "一段密码：\n\n📌 XJ 742 KM 859\n\n哪个选项完全正确地还原了这段密码？",
    options: [
      "XJ 724 KM 895",
      "XJ 742 KM 859",
      "XJ 742 MK 859",
      "XJ 742 KM 958",
    ],
    answer: 1,
    explanation:
      "正确答案是XJ 742 KM 859。混合数字和字母的信息需要更多的注意力来记忆。",
  },

  // === 短时记忆 4-7 ===
  {
    id: 4,
    type: "single",
    category: "短时记忆",
    passage:
      "李明早上7点起床，先喝了一杯温水，然后出门跑步20分钟。回家后他吃了两片吐司和一个煎蛋，喝了一杯牛奶。出门前他在门口停了下来，确认带好了钥匙、手机和钱包。今天他约了王医生10点复查。",
    question: "根据上面的文字，李明出门前确认带了哪三样东西？",
    options: [
      "手机、钱包、充电器",
      "钥匙、手机、钱包",
      "钥匙、手机、公交卡",
      "钥匙、钱包、手表",
    ],
    answer: 1,
    explanation:
      "文中明确提到：确认带好了钥匙、手机和钱包。这是对阅读细节的短期记忆考察。",
  },
  {
    id: 5,
    type: "single",
    category: "短时记忆",
    passage:
      "李明的早餐是两片吐司和一个煎蛋，喝了一杯牛奶。他出门前确认带了钥匙、手机和钱包。",
    question: "李明早餐吃了什么？",
    options: [
      "一份煎饼果子和一杯豆浆",
      "两片吐司和一个煎蛋",
      "一碗粥和一个包子",
      "一个三明治和一杯咖啡",
    ],
    answer: 1,
    explanation: "文中明确说：吃了两片吐司和一个煎蛋，喝了一杯牛奶。",
  },
  {
    id: 6,
    type: "single",
    category: "短时记忆",
    passage:
      "张阿姨去菜市场买菜：她先买了1斤排骨（35元），又买了3条鲫鱼（18元），还买了2斤西红柿（6元）和一把葱（2元）。她给了100元，应该找零多少？",
    question: "张阿姨一共花了多少钱？",
    options: ["58元", "61元", "59元", "63元"],
    answer: 1,
    explanation: "35+18+6+2=61元。这既考了记忆力也考了心算能力。",
  },
  {
    id: 7,
    type: "single",
    category: "短时记忆",
    passage:
      "超市打折信息：今天鸡蛋每斤4.8元，大米每斤2.5元，花生油每桶49.9元。王阿姨买了2斤鸡蛋、5斤大米和1桶油，给了100元。",
    question: "王阿姨买的东西中，最贵的是哪样？",
    options: ["鸡蛋", "大米", "花生油", "无法判断"],
    answer: 2,
    explanation: "鸡蛋共9.6元，大米共12.5元，花生油49.9元。最贵的是花生油。",
  },

  // === 观察力 8-13 ===
  {
    id: 8,
    type: "single",
    category: "观察力",
    question: "以下数字中，哪一个与其他不同类？\n\n2, 4, 8, 12, 16, 32, 64",
    options: ["4", "8", "12", "16", "32"],
    answer: 2,
    explanation:
      "除了12以外，其他数字都是2的n次方（2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32, 2⁶=64）。12不是2的幂次。",
  },
  {
    id: 9,
    type: "single",
    category: "观察力",
    question: "请问：一个正方体有6个面、8个顶点。它有几条棱？",
    options: ["10条", "12条", "14条", "16条"],
    answer: 1,
    explanation: "一个正方体有12条棱。这是空间观察力和几何常识的综合考察。",
  },
  {
    id: 10,
    type: "judge",
    category: "观察力",
    question:
      "以下说法是否正确？\n\n一个正常的钟表上，从12:00到12:15，分针转了90度。",
    options: ["错", "对"],
    answer: 1,
    explanation: "分针走15分钟，正好是一个圆（360度）的四分之一，=90度。",
  },
  {
    id: 11,
    type: "single",
    category: "观察力",
    question:
      "请在10秒内观察以下序列：\n\n★ ☆ ★ ★ ☆ ★ ★ ★ ☆\n\n请问这个序列中，★出现了多少次？",
    options: ["5次", "6次", "7次", "8次"],
    answer: 1,
    explanation:
      "序列中★分别在第1、3、4、6、7、8位，共6次。考察快速观察和计数能力。",
  },
  {
    id: 12,
    type: "single",
    category: "观察力",
    question: "如果你发现自己正在犯同一个错误第二次，这说明什么？",
    options: [
      "你记性太差了",
      "你根本没从第一次错误中学习",
      "你不适合做这件事",
      "你在尝试中自然会重复，重要的是第三次改过来",
    ],
    answer: 3,
    explanation:
      "人的成长过程就是不断试错。发现自己在犯同样的错误，说明你已经开始觉察了——这是改变的第一步。",
  },
  {
    id: 13,
    type: "single",
    category: "观察力",
    question: "请观察这个模式：\n\nA1, B2, C3, D4, ?\n\n问号处应该是什么？",
    options: ["E5", "F5", "E6", "D5"],
    answer: 0,
    explanation:
      "字母按ABCDEF顺序递增，数字按123456递增。D4的下一个是E5。这是字母数列混合的规律观察题。",
  },

  // === 细节捕捉 14-17 ===
  {
    id: 14,
    type: "single",
    category: "细节捕捉",
    passage:
      "小明在超市买了一瓶酱油16.8元，一包盐3.5元，一瓶醋9.9元，一袋糖7.2元，一盒味精5.5元。他还买了一包茶叶38元。他给了收银员100元。",
    question: "小明买的最贵的东西是什么？",
    options: ["酱油", "茶叶", "醋", "糖"],
    answer: 1,
    explanation: "茶叶38元是最贵的，其他分别是16.8、3.5、9.9、7.2、5.5元。",
  },
  {
    id: 15,
    type: "single",
    category: "细节捕捉",
    passage:
      "陈老师早上8:15到学校。上午她上了两节课（语文、数学），批改了30份作业。中午她吃了一份盒饭，用15分钟休息。下午她开了1小时会议，参加了2个学生家长会谈，写了一份教学总结。她下午5:40离开学校。",
    question: "陈老师下午离开学校的时间是？",
    options: ["5:30", "5:40", "6:00", "5:20"],
    answer: 1,
    explanation: "文中最后一句话明确指出：她下午5:40离开学校。",
  },
  {
    id: 16,
    type: "multiple",
    category: "细节捕捉",
    passage:
      "小王去快递站取包裹，快递站有四个货架：A架（1-200号）、B架（201-400号）、C架（401-600号）、D架（601-800号）。他的包裹编号317号。",
    question: "小王的包裹在哪个货架？",
    options: ["A架", "B架", "C架", "D架"],
    answer: [1],
    explanation: "317号在201-400号之间，所以是B架。",
  },
  {
    id: 17,
    type: "single",
    category: "细节捕捉",
    passage:
      "周一到周五的天气：周一晴、周二多云、周三雨、周四阴、周五晴。其中周三气温最高（32°C），周二最低（18°C）。",
    question: "下面哪项描述是正确的？",
    options: ["周一的气温最高", "周三下雨了", "周五是阴天", "周二的气温是32°C"],
    answer: 1,
    explanation: "文中说周三下雨且气温最高32°C。其他三项与文中描述不符。",
  },

  // === 逻辑记忆 18-20 ===
  {
    id: 18,
    type: "single",
    category: "逻辑记忆",
    passage: "一行密码：PYTHON-3.9-v2。如果你需要记住这个密码，最好的方式是？",
    question: "哪个选项是PYTHON-3.9-v2的正确写法？",
    options: [
      "PHYTHON-3.9-v2",
      "PYTHON-3.9-v2",
      "PYTHON-3.8-v2",
      "PYTHON-3.9-v3",
    ],
    answer: 1,
    explanation:
      "正确答案是PYTHON-3.9-v2。密码中任何一个字符的差异都会导致错误。",
  },
  {
    id: 19,
    type: "single",
    category: "逻辑记忆",
    passage:
      "请记住这个地址：\n📌 四川省成都市锦江区红星路三段1号 IFS国际金融中心 5楼502室\n\n这是哪个城市？",
    question: "该地址位于哪个城市？",
    options: ["重庆", "成都", "武汉", "西安"],
    answer: 1,
    explanation: "地址中明确写着「成都市」，这是四川省省会。",
  },
  {
    id: 20,
    type: "single",
    category: "逻辑记忆",
    passage:
      "以下是一个故事：\n\n爷爷每天早上6:30起床，先去公园打太极到7:30。然后买早餐回家，8:00叫孙子起床。孙子吃完早餐后，爷爷送他去学校，大概8:30到校。回家路上爷爷会去菜市场买菜。",
    question: "爷爷打太极打了多久？",
    options: ["30分钟", "45分钟", "1小时", "1.5小时"],
    answer: 2,
    explanation: "6:30到7:30刚好1小时。这是故事中的时间细节记忆考察。",
  },
];

// 第四轮每题1.5分
export const getRound4Score = (
  answers: { qId: number; selected: number | number[] }[],
): number => {
  let correct = 0;
  answers.forEach((a) => {
    const q = round4Questions.find((q) => q.id === a.qId);
    if (!q) return;
    const correctAns = Array.isArray(q.answer) ? q.answer : [q.answer];
    const userAns = Array.isArray(a.selected) ? a.selected : [a.selected];
    const isCorrect =
      correctAns.length === userAns.length &&
      correctAns.every((v) => userAns.includes(v));
    if (isCorrect) correct++;
  });
  // 每题1.5分，满分30分
  return Math.round(correct * 1.5 * 10) / 10;
};
