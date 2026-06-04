// 树状题目节点
export interface QNode {
  id: string;
  question: string;
  type?: "normal" | "idcard";
  options: QOption[];
}

export interface QOption {
  text: string;
  score: number;
  next?: QNode;
  isIdcardInput?: boolean;
}

// 答题记录
export interface AnswerRecord {
  questionId: string;
  question: string;
  selected: string;
  score: number;
}

// 最终结果
export interface QuizResult {
  totalScore: number;
  maxScore: number;
  answers: AnswerRecord[];
  fellIntoTrap: boolean;
  filledIdcard: boolean;
}

// ====== 身份证陷阱工厂 ======
const makeIdcardTrap = (context: string): QNode => ({
  id: context.includes("身份信息")
    ? "trap-A"
    : context.includes("记住")
      ? "trap-B"
      : context.includes("谨慎")
        ? "trap-C"
        : context.includes("后四位")
          ? "trap-D"
          : "trap",
  question: `${context}\n\n说到个人信息安全——你记得自己身份证后四位吗？`,
  type: "idcard",
  options: [
    { text: "记得！", score: 0, isIdcardInput: true },
    { text: "记不太清了", score: -5 },
    { text: "跳过此题", score: 10 },
  ],
});

// ====== Q1：时间花在哪 ======
const q1: QNode = {
  id: "q1",
  question:
    "人的一天有24小时，除去吃喝拉撒睡，剩下的时间才是真正属于自己的。你平时最多的时间，花在什么地方？",
  options: [
    {
      text: "刷手机 / 上网",
      score: 6,
      next: {
        id: "q1-1a",
        question: "你刷最多的是什么内容？",
        options: [
          {
            text: "短视频",
            score: 3,
            next: {
              id: "q1-2a",
              question: "刷短视频的时候，你更多是出于什么心情？",
              options: [
                {
                  text: "想学点东西 / 获取信息",
                  score: 10,
                  next: {
                    id: "q1-3a",
                    question: "刷完之后你通常是什么感觉？",
                    type: "normal",
                    options: [
                      { text: "学到了东西，挺充实", score: 3 },
                      { text: "放松了，心情变好了", score: 2 },
                      { text: "刷完又觉得浪费时间", score: 2 },
                      { text: "没什么感觉", score: 1 },
                    ],
                  },
                },
                {
                  text: "放松解压",
                  score: 6,
                  next: {
                    id: "q1-3b",
                    question: "刷完之后你通常是什么感觉？",
                    type: "normal",
                    options: [
                      { text: "放松了，心情变好了", score: 3 },
                      { text: "学到了东西", score: 2 },
                      { text: "刷完又觉得浪费时间", score: 1 },
                      { text: "没什么感觉", score: 1 },
                    ],
                  },
                },
                {
                  text: "打发时间，不然无聊",
                  score: 3,
                  next: {
                    id: "q1-3c",
                    question: "刷完之后你通常是什么感觉？",
                    type: "normal",
                    options: [
                      { text: "时间打发了，还行", score: 2 },
                      { text: "刷完又觉得空虚", score: 1 },
                      { text: "其实也没那么无聊了", score: 2 },
                      { text: "没什么感觉", score: 1 },
                    ],
                  },
                },
                {
                  text: "习惯了，不刷总觉得少了什么",
                  score: 3,
                  next: {
                    id: "q1-3d",
                    question: "刷完之后你通常是什么感觉？",
                    type: "normal",
                    options: [
                      { text: "满足了瘾", score: 1 },
                      { text: "觉得自己该控制一下", score: 2 },
                      { text: "没什么特别感觉", score: 1 },
                      { text: "又想继续刷了", score: 1 },
                    ],
                  },
                },
              ],
            },
          },
          {
            text: "社交平台",
            score: 6,
            next: {
              id: "q1-2b",
              question: "刷社交平台的时候，你更多是出于什么心情？",
              type: "normal",
              options: [
                { text: "看看朋友在干嘛", score: 2 },
                { text: "分享自己的生活", score: 2 },
                { text: "打发时间", score: 1 },
                { text: "习惯了，不刷不舒服", score: 1 },
              ],
            },
          },
          {
            text: "看剧 / 电影",
            score: 6,
            next: {
              id: "q1-2c",
              question: "看剧的时候，你更多是出于什么心情？",
              type: "normal",
              options: [
                { text: "想看个好故事", score: 3 },
                { text: "放松解压", score: 2 },
                { text: "打发时间", score: 1 },
                { text: "大家都在看，我也看", score: 1 },
              ],
            },
          },
          {
            text: "看新闻 / 资讯",
            score: 6,
            next: {
              id: "q1-2d",
              question: "看资讯的时候，你更多是出于什么心情？",
              type: "normal",
              options: [
                { text: "想了解世界在发生什么", score: 3 },
                { text: "关注自己感兴趣的领域", score: 3 },
                { text: "随便刷刷，看到什么算什么", score: 1 },
                { text: "打发时间", score: 1 },
              ],
            },
          },
          {
            text: "随便刷刷，没有特定",
            score: 3,
            next: {
              id: "q1-2e",
              question: "随便刷刷的时候，你更多是出于？",
              type: "normal",
              options: [
                { text: "打发时间", score: 1 },
                { text: "习惯了，手闲着难受", score: 1 },
                { text: "放松一下", score: 2 },
                { text: "也不知道干嘛，就刷呗", score: 1 },
              ],
            },
          },
        ],
      },
    },
    {
      text: "打游戏",
      score: 6,
      next: {
        id: "q1-1b",
        question: "你玩得最多的是什么类型的游戏？",
        options: [
          {
            text: "竞技类（王者/吃鸡/LOL等）",
            score: 6,
            next: {
              id: "q1-2f",
              question: "你玩游戏更多是为了？",
              type: "normal",
              options: [
                {
                  text: "和朋友一起玩，社交互动",
                  score: 10,
                  next: {
                    id: "q1-3e",
                    question: "你觉得游戏带给你更多的是？",
                    type: "normal",
                    options: [
                      { text: "快乐和陪伴", score: 3 },
                      { text: "刺激和挑战", score: 2 },
                      { text: "打发时间", score: 1 },
                      { text: "浪费时间但停不下来", score: 1 },
                    ],
                  },
                },
                {
                  text: "赢了有成就感",
                  score: 6,
                  next: {
                    id: "q1-3f",
                    question: "你觉得游戏带给你更多的是？",
                    type: "normal",
                    options: [
                      { text: "快乐和陪伴", score: 2 },
                      { text: "刺激和挑战", score: 3 },
                      { text: "打发时间", score: 1 },
                      { text: "浪费时间但停不下来", score: 1 },
                    ],
                  },
                },
                {
                  text: "消磨时间",
                  score: 3,
                  next: {
                    id: "q1-3g",
                    question: "你觉得游戏带给你更多的是？",
                    type: "normal",
                    options: [
                      { text: "快乐和陪伴", score: 2 },
                      { text: "刺激和挑战", score: 2 },
                      { text: "打发时间", score: 2 },
                      { text: "浪费时间但停不下来", score: 1 },
                    ],
                  },
                },
                {
                  text: "放松解压",
                  score: 6,
                  next: {
                    id: "q1-3h",
                    question: "你觉得游戏带给你更多的是？",
                    type: "normal",
                    options: [
                      { text: "快乐和陪伴", score: 2 },
                      { text: "刺激和挑战", score: 2 },
                      { text: "打发时间", score: 1 },
                      { text: "放松了，值得", score: 3 },
                    ],
                  },
                },
                {
                  text: "习惯了，不玩手痒",
                  score: 3,
                  next: {
                    id: "q1-3i",
                    question: "你觉得游戏带给你更多的是？",
                    type: "normal",
                    options: [
                      { text: "快乐和陪伴", score: 2 },
                      { text: "刺激和挑战", score: 2 },
                      { text: "打发时间", score: 2 },
                      { text: "其实也没那么好玩了", score: 1 },
                    ],
                  },
                },
              ],
            },
          },
          {
            text: "单机/剧情类",
            score: 6,
            next: {
              id: "q1-2g",
              question: "你玩游戏更多是为了？",
              type: "normal",
              options: [
                { text: "体验好故事", score: 3 },
                { text: "放松解压", score: 2 },
                { text: "消磨时间", score: 1 },
                { text: "一个人待着不无聊", score: 2 },
              ],
            },
          },
          {
            text: "休闲小游戏",
            score: 3,
            next: {
              id: "q1-2h",
              question: "你玩小游戏更多是为了？",
              type: "normal",
              options: [
                { text: "打发碎片时间", score: 1 },
                { text: "放松一下", score: 2 },
                { text: "好玩，停不下来", score: 2 },
                { text: "没什么目的", score: 1 },
              ],
            },
          },
          {
            text: "就是玩，不挑类型",
            score: 3,
            next: {
              id: "q1-2i",
              question: "你玩游戏更多是为了？",
              type: "normal",
              options: [
                { text: "开心就行", score: 2 },
                { text: "消磨时间", score: 1 },
                { text: "和朋友一起", score: 2 },
                { text: "习惯了", score: 1 },
              ],
            },
          },
        ],
      },
    },
    {
      text: "工作 / 学习",
      score: 10,
      next: {
        id: "q1-1c",
        question: "你目前主要是？",
        options: [
          {
            text: "学生",
            score: 6,
            next: {
              id: "q1-2j",
              question: "你学习更多是出于？",
              type: "normal",
              options: [
                { text: "真的感兴趣，喜欢学", score: 3 },
                { text: "没办法，为了考试/毕业", score: 1 },
                { text: "为了以后找好工作", score: 2 },
                { text: "大家都在学，我也学", score: 1 },
              ],
            },
          },
          {
            text: "上班族",
            score: 6,
            next: {
              id: "q1-2k",
              question: "你工作更多是出于？",
              type: "normal",
              options: [
                { text: "喜欢做的事", score: 3 },
                { text: "为了养家糊口", score: 2 },
                { text: "没办法，总要工作", score: 1 },
                { text: "实现自我价值", score: 3 },
              ],
            },
          },
        ],
      },
    },
    {
      text: "和朋友 / 家人在一起",
      score: 10,
      next: {
        id: "q1-1d",
        question: "主要是和谁？",
        options: [
          {
            text: "家人",
            score: 10,
            next: {
              id: "q1-2l",
              question: "你们在一起通常做什么？",
              type: "normal",
              options: [
                { text: "聊天散步", score: 3 },
                { text: "一起吃饭看电视", score: 2 },
                { text: "一起出去玩", score: 2 },
                { text: "各自玩手机", score: 0 },
              ],
            },
          },
          {
            text: "朋友",
            score: 6,
            next: {
              id: "q1-2m",
              question: "你们在一起通常做什么？",
              type: "normal",
              options: [
                { text: "聊天/约饭", score: 3 },
                { text: "一起打游戏/玩", score: 2 },
                { text: "逛街/运动", score: 2 },
                { text: "各玩各的", score: 1 },
              ],
            },
          },
        ],
      },
    },
    {
      text: "发呆 / 独处 / 睡觉",
      score: 3,
      next: {
        id: "q1-1e",
        question: "独处的时候你通常在干嘛？",
        options: [
          {
            text: "胡思乱想，想过去想未来",
            score: 6,
            next: {
              id: "q1-2n",
              question: "你觉得这种胡思乱想给你带来什么？",
              type: "normal",
              options: [
                { text: "有时候能想通一些事", score: 3 },
                { text: "越想越焦虑", score: 1 },
                { text: "就是放空，啥也没想", score: 1 },
                { text: "想完更累了", score: 1 },
              ],
            },
          },
          { text: "看书/刷剧/听音乐", score: 2 },
          { text: "就是放空，啥也没干", score: 1 },
        ],
      },
    },
  ],
};

// ====== Q2：怎么花钱 ======
const q2: QNode = {
  id: "q2",
  question: "说到生活，绕不开一个东西——钱。每个月你手上的钱大概有多少？",
  options: [
    { text: "500元以下", score: 1 },
    { text: "500-2000元", score: 1 },
    { text: "2000-5000元", score: 2 },
    { text: "5000-10000元", score: 2 },
    { text: "10000元以上", score: 2 },
    { text: "没概念 / 不确定", score: 1 },
  ].map((opt) => ({
    ...opt,
    next: {
      id: `q2-follow-${opt.text.slice(0, 2)}`,
      question: "你一般怎么处理这些钱？",
      type: "normal" as const,
      options: [
        {
          text: "存起来，能省则省",
          score: 10,
          next: {
            id: "q2-1a",
            question: "你存钱主要是为了什么？",
            type: "normal",
            options: [
              {
                text: "应对突发情况，有安全感",
                score: 10,
                next: {
                  id: "q2-2a",
                  question: "存钱给你的感觉是？",
                  type: "normal",
                  options: [
                    { text: "很踏实，有底气", score: 3 },
                    { text: "有目标感", score: 2 },
                    { text: "有时候过得太省了", score: 1 },
                    { text: "没什么特别感觉", score: 1 },
                  ],
                },
              },
              {
                text: "为了某个大目标（买房/旅行等）",
                score: 10,
                next: {
                  id: "q2-2b",
                  question: "存钱给你的感觉是？",
                  type: "normal",
                  options: [
                    { text: "有目标感，有盼头", score: 3 },
                    { text: "很踏实", score: 2 },
                    { text: "有时候觉得遥遥无期", score: 1 },
                    { text: "没什么感觉", score: 1 },
                  ],
                },
              },
              {
                text: "习惯了，不存不舒服",
                score: 6,
                next: {
                  id: "q2-2c",
                  question: "存钱给你的感觉是？",
                  type: "normal",
                  options: [
                    { text: "很踏实，有底气", score: 3 },
                    { text: "习惯了", score: 2 },
                    { text: "有时候想花但忍住了", score: 1 },
                    { text: "没什么感觉", score: 1 },
                  ],
                },
              },
              {
                text: "大家都说要存钱，我也存",
                score: 3,
                next: {
                  id: "q2-2d",
                  question: "存钱给你的感觉是？",
                  type: "normal",
                  options: [
                    { text: "确实该存点", score: 2 },
                    { text: "存了心里踏实", score: 2 },
                    { text: "存得不多但总比没有好", score: 2 },
                    { text: "没什么感觉", score: 1 },
                  ],
                },
              },
            ],
          },
        },
        {
          text: "该花就花，偶尔存点",
          score: 6,
          next: {
            id: "q2-1b",
            question: "你花钱的时候更多是买什么？",
            type: "normal",
            options: [
              {
                text: "确实需要的东西",
                score: 10,
                next: {
                  id: "q2-2e",
                  question: "花完钱你通常是？",
                  type: "normal",
                  options: [
                    { text: "买到了开心，觉得值", score: 3 },
                    { text: "有需要才买，心里踏实", score: 2 },
                    { text: "偶尔后悔", score: 1 },
                    { text: "没什么感觉", score: 1 },
                  ],
                },
              },
              {
                text: "喜欢的东西，需要不需要再说",
                score: 6,
                next: {
                  id: "q2-2f",
                  question: "花完钱你通常是？",
                  type: "normal",
                  options: [
                    { text: "买到了开心，觉得值", score: 3 },
                    { text: "有时候后悔", score: 1 },
                    { text: "奖励自己应该的", score: 2 },
                    { text: "没什么感觉", score: 1 },
                  ],
                },
              },
              {
                text: "奖励自己，开心就好",
                score: 6,
                next: {
                  id: "q2-2g",
                  question: "花完钱你通常是？",
                  type: "normal",
                  options: [
                    { text: "买到了开心，觉得值", score: 3 },
                    { text: "偶尔会心疼钱", score: 1 },
                    { text: "下次少花点", score: 1 },
                    { text: "挺满足的", score: 2 },
                  ],
                },
              },
              {
                text: "一时冲动，买了又后悔",
                score: 3,
                next: {
                  id: "q2-2h",
                  question: "花完钱你通常是？",
                  type: "normal",
                  options: [
                    { text: "经常后悔但下次还冲动", score: 1 },
                    { text: "后悔完退掉", score: 2 },
                    { text: "冲动是魔鬼", score: 1 },
                    { text: "买都买了，不想了", score: 1 },
                  ],
                },
              },
            ],
          },
        },
        {
          text: "想存但总是存不住",
          score: 6,
          next: {
            id: "q2-1c",
            question: "你觉得钱主要花在哪里了？",
            type: "normal",
            options: [
              {
                text: "吃吃喝喝日常开销",
                score: 6,
                next: {
                  id: "q2-2i",
                  question: "你试过记账吗？",
                  type: "normal",
                  options: [
                    { text: "试过但坚持不下来", score: 2 },
                    { text: "一直在记但存不住", score: 2 },
                    { text: "没试过太麻烦", score: 1 },
                    { text: "试过效果不错", score: 3 },
                  ],
                },
              },
              {
                text: "娱乐消费（游戏/直播/追星）",
                score: 3,
                next: {
                  id: "q2-2j",
                  question: "你试过记账吗？",
                  type: "normal",
                  options: [
                    { text: "试过但坚持不下来", score: 2 },
                    { text: "没试过太麻烦", score: 1 },
                    { text: "试过效果不错", score: 3 },
                  ],
                },
              },
              {
                text: "社交应酬人情往来",
                score: 6,
                next: {
                  id: "q2-2k",
                  question: "你试过记账吗？",
                  type: "normal",
                  options: [
                    { text: "试过但坚持不下来", score: 2 },
                    { text: "没试过太麻烦", score: 1 },
                    { text: "试过效果不错", score: 3 },
                  ],
                },
              },
              {
                text: "也不知道花哪了",
                score: 3,
                next: {
                  id: "q2-2l",
                  question: "你试过记账吗？",
                  type: "normal",
                  options: [
                    { text: "没试过", score: 1 },
                    { text: "试过但坚持不下来", score: 2 },
                    { text: "试过效果不错", score: 3 },
                    { text: "想试试但还没开始", score: 2 },
                  ],
                },
              },
            ],
          },
        },
        {
          text: "不够花，需要支援",
          score: 3,
          next: {
            id: "q2-1d",
            question: "不够花的时候你一般怎么办？",
            type: "normal",
            options: [
              {
                text: "找家里/朋友借",
                score: 3,
                next: {
                  id: "q2-2m",
                  question: "你觉得不够花主要是因为？",
                  type: "normal",
                  options: [
                    { text: "赚得确实少", score: 2 },
                    { text: "花得大手大脚", score: 1 },
                    { text: "有不得不花的硬支出", score: 2 },
                    { text: "没认真想过", score: 1 },
                  ],
                },
              },
              {
                text: "用花呗/信用卡顶着",
                score: 6,
                next: {
                  id: "q2-2n",
                  question: "你觉得不够花主要是因为？",
                  type: "normal",
                  options: [
                    { text: "赚得确实少", score: 2 },
                    { text: "花得大手大脚", score: 1 },
                    { text: "有不得不花的硬支出", score: 2 },
                    { text: "没认真想过", score: 1 },
                  ],
                },
              },
              {
                text: "想办法多赚点",
                score: 10,
                next: {
                  id: "q2-2o",
                  question: "你觉得不够花主要是因为？",
                  type: "normal",
                  options: [
                    { text: "赚得确实少", score: 2 },
                    { text: "花得大手大脚", score: 1 },
                    { text: "有不得不花的硬支出", score: 2 },
                    { text: "没认真想过", score: 1 },
                  ],
                },
              },
            ],
          },
        },
        {
          text: "没概念，有钱花没钱不花",
          score: 3,
          next: {
            id: "q2-1e",
            question: "你觉得自己这样好不好？",
            type: "normal",
            options: [
              { text: "挺好的，活得轻松", score: 2 },
              {
                text: "还行，但偶尔也想存点",
                score: 6,
                next: {
                  id: "q2-2p",
                  question: "想过试着管一下钱吗？",
                  type: "normal",
                  options: [
                    { text: "想过，不知道从哪开始", score: 2 },
                    { text: "试过但没坚持", score: 2 },
                    { text: "没想过", score: 1 },
                    { text: "现在这样挺好", score: 1 },
                  ],
                },
              },
              { text: "不太行，但改不了", score: 1 },
            ],
          },
        },
      ],
    } as QNode,
  })),
};

// ====== Q3：怎么和人相处 ======
const q3: QNode = {
  id: "q3",
  question:
    "每个人都有自己的社交方式。你觉得跟人相处这件事，对你来说是怎样的？",
  options: [
    {
      text: "我喜欢和人待在一起，很享受",
      score: 10,
      next: {
        id: "q3-1a",
        question: "你觉得自己在人群中通常是？",
        options: [
          {
            text: "话最多的那个，带动气氛",
            score: 10,
            next: {
              id: "q3-2a",
              question: "你更在意的是？",
              type: "normal",
              options: [
                {
                  text: "大家一起开心就好",
                  score: 10,
                  next: {
                    id: "q3-3a",
                    question: "有没有因为太在意别人看法而委屈自己？",
                    type: "normal",
                    options: [
                      { text: "有过，常有", score: 1 },
                      { text: "偶尔会", score: 2 },
                      { text: "不太会", score: 3 },
                      { text: "没想过", score: 1 },
                    ],
                  },
                },
                {
                  text: "被大家认可和喜欢",
                  score: 6,
                  next: {
                    id: "q3-3b",
                    question: "有没有因为太在意别人看法而委屈自己？",
                    type: "normal",
                    options: [
                      { text: "有过，常有", score: 1 },
                      { text: "偶尔会", score: 2 },
                      { text: "不太会", score: 3 },
                      { text: "没想过", score: 1 },
                    ],
                  },
                },
                {
                  text: "和特定的人深度交流",
                  score: 10,
                  next: {
                    id: "q3-3c",
                    question: "有没有因为太在意别人看法而委屈自己？",
                    type: "normal",
                    options: [
                      { text: "有过，常有", score: 1 },
                      { text: "偶尔会", score: 2 },
                      { text: "不太会", score: 3 },
                      { text: "没想过", score: 1 },
                    ],
                  },
                },
                {
                  text: "不被冷落就行",
                  score: 3,
                  next: {
                    id: "q3-3d",
                    question: "有没有因为太在意别人看法而委屈自己？",
                    type: "normal",
                    options: [
                      { text: "有过，常有", score: 1 },
                      { text: "偶尔会", score: 2 },
                      { text: "不太会", score: 3 },
                      { text: "没想过", score: 1 },
                    ],
                  },
                },
              ],
            },
          },
          { text: "话不多但该说会说", score: 2 },
          { text: "喜欢听别人说，偶尔插几句", score: 2 },
          { text: "别人笑我也笑，不一定跟得上", score: 1 },
        ],
      },
    },
    {
      text: "我不排斥社交，但从不主动",
      score: 6,
      next: {
        id: "q3-1b",
        question: "如果有人主动找你聊天，你一般会？",
        options: [
          { text: "热情回应，聊得挺开心", score: 3 },
          { text: "礼貌回应，不主动找话题", score: 2 },
          { text: "看心情，想聊就聊不想就敷衍", score: 1 },
          {
            text: "有点紧张，不知道说什么",
            score: 3,
            next: {
              id: "q3-2b",
              question: "你觉得'不主动'更多是因为？",
              type: "normal",
              options: [
                { text: "怕打扰别人", score: 3 },
                { text: "怕尴尬", score: 2 },
                { text: "没必要，有事自然会找", score: 2 },
                { text: "懒，社交太累", score: 1 },
              ],
            },
          },
        ],
      },
    },
    {
      text: "能躲就躲，独处更舒服",
      score: 6,
      next: {
        id: "q3-1c",
        question: "你躲社交主要是因为？",
        options: [
          {
            text: "和人相处很消耗能量",
            score: 10,
            next: {
              id: "q3-2c",
              question: "但你偶尔也会感到孤独吗？",
              type: "normal",
              options: [
                { text: "会，特别看到别人热闹", score: 2 },
                { text: "偶尔会", score: 3 },
                { text: "不会，很享受独处", score: 2 },
                { text: "说不上来", score: 1 },
              ],
            },
          },
          {
            text: "担心说错话做错事",
            score: 6,
            next: {
              id: "q3-2d",
              question: "但你偶尔也会感到孤独吗？",
              type: "normal",
              options: [
                { text: "会，特别看到别人热闹", score: 2 },
                { text: "偶尔会", score: 3 },
                { text: "不会，很享受独处", score: 2 },
                { text: "说不上来", score: 1 },
              ],
            },
          },
          {
            text: "大多数社交没意义",
            score: 6,
            next: {
              id: "q3-2e",
              question: "但你偶尔也会感到孤独吗？",
              type: "normal",
              options: [
                { text: "会，特别看到别人热闹", score: 2 },
                { text: "偶尔会", score: 3 },
                { text: "不会，很享受独处", score: 2 },
                { text: "说不上来", score: 1 },
              ],
            },
          },
          {
            text: "就是不喜欢，没为什么",
            score: 3,
            next: {
              id: "q3-2f",
              question: "但你偶尔也会感到孤独吗？",
              type: "normal",
              options: [
                { text: "会，特别看到别人热闹", score: 2 },
                { text: "偶尔会", score: 3 },
                { text: "不会，很享受独处", score: 2 },
                { text: "说不上来", score: 1 },
              ],
            },
          },
        ],
      },
    },
    {
      text: "看人——对熟人很放得开，对陌生人很拘谨",
      score: 10,
      next: {
        id: "q3-1d",
        question: "从'拘谨'到'放开'，你通常需要多久？",
        options: [
          { text: "很快，聊几句就熟了", score: 3 },
          { text: "需要一段时间接触", score: 2 },
          { text: "很慢，得完全信任才行", score: 2 },
          {
            text: "看对方是什么人",
            score: 6,
            next: {
              id: "q3-2g",
              question: "你更享受哪种状态？",
              type: "normal",
              options: [
                { text: "和熟悉的人窝在一起", score: 3 },
                { text: "偶尔认识新朋友也有新鲜感", score: 3 },
                { text: "还是独处最舒服", score: 2 },
                { text: "看心情", score: 1 },
              ],
            },
          },
        ],
      },
    },
    {
      text: "没想过这个问题",
      score: 3,
      next: {
        id: "q3-1e",
        question: "那你现在想想，你平时一个人多还是和朋友一起多？",
        options: [
          {
            text: "一个人多",
            score: 6,
            next: {
              id: "q3-2h",
              question: "你觉得这样好不好？",
              type: "normal",
              options: [
                { text: "挺好的习惯了", score: 2 },
                { text: "想改变但不知道怎么做", score: 2 },
                { text: "没想过好不好", score: 1 },
              ],
            },
          },
          {
            text: "和朋友多",
            score: 6,
            next: {
              id: "q3-2i",
              question: "你觉得这样好不好？",
              type: "normal",
              options: [
                { text: "挺好的", score: 2 },
                { text: "想改变", score: 2 },
                { text: "没想过", score: 1 },
              ],
            },
          },
          { text: "差不多", score: 2 },
          { text: "没注意", score: 1 },
        ],
      },
    },
  ],
};

// ====== Q4：怎么做决定 ======
const q4: QNode = {
  id: "q4",
  question: "生活里每天都要做选择。你一般怎么做决定？",
  options: [
    {
      text: "先分析再决定，理性派",
      score: 10,
      next: {
        id: "q4-1a",
        question: "做决定时你通常更看重什么？",
        type: "normal",
        options: [
          {
            text: "风险和收益，算清楚了再动",
            score: 10,
            next: {
              id: "q4-2a",
              question: "做完决定后你会反复想'如果当初选了另一个'吗？",
              type: "normal",
              options: [
                { text: "会，经常想", score: 1 },
                { text: "偶尔会但不会太久", score: 2 },
                { text: "不太会，选了不回头", score: 3 },
                { text: "会想但更多是总结", score: 2 },
              ],
            },
          },
          {
            text: "自己的真实想法和感受",
            score: 6,
            next: {
              id: "q4-2b",
              question: "做完决定后你会反复想'如果当初选了另一个'吗？",
              type: "normal",
              options: [
                { text: "会，经常想", score: 1 },
                { text: "偶尔会但不会太久", score: 2 },
                { text: "不太会，选了不回头", score: 3 },
                { text: "会想但更多是总结", score: 2 },
              ],
            },
          },
          {
            text: "周围人的建议",
            score: 6,
            next: {
              id: "q4-2c",
              question: "做完决定后你会反复想'如果当初选了另一个'吗？",
              type: "normal",
              options: [
                { text: "会，经常想", score: 1 },
                { text: "偶尔会但不会太久", score: 2 },
                { text: "不太会，选了不回头", score: 3 },
                { text: "会想但更多是总结", score: 2 },
              ],
            },
          },
          {
            text: "哪个损失最小选哪个",
            score: 3,
            next: {
              id: "q4-2d",
              question: "做完决定后你会反复想'如果当初选了另一个'吗？",
              type: "normal",
              options: [
                { text: "会，经常想", score: 1 },
                { text: "偶尔会但不会太久", score: 2 },
                { text: "不太会，选了不回头", score: 3 },
                { text: "会想但更多是总结", score: 2 },
              ],
            },
          },
        ],
      },
    },
    {
      text: "靠感觉，相信直觉",
      score: 6,
      next: {
        id: "q4-1b",
        question: "你的直觉通常准吗？",
        type: "normal",
        options: [
          {
            text: "挺准的，没吃过亏",
            score: 10,
            next: {
              id: "q4-2e",
              question: "直觉和理性冲突时听谁的？",
              type: "normal",
              options: [
                { text: "听直觉", score: 2 },
                { text: "听理性分析", score: 3 },
                { text: "很纠结", score: 1 },
                { text: "折中", score: 2 },
              ],
            },
          },
          {
            text: "有时准有时不准",
            score: 6,
            next: {
              id: "q4-2f",
              question: "直觉和理性冲突时听谁的？",
              type: "normal",
              options: [
                { text: "听直觉", score: 2 },
                { text: "听理性分析", score: 3 },
                { text: "很纠结", score: 1 },
                { text: "折中", score: 2 },
              ],
            },
          },
          {
            text: "不太准，经常后悔",
            score: 3,
            next: {
              id: "q4-2g",
              question: "直觉和理性冲突时听谁的？",
              type: "normal",
              options: [
                { text: "听直觉", score: 2 },
                { text: "听理性分析", score: 3 },
                { text: "很纠结", score: 1 },
                { text: "折中", score: 2 },
              ],
            },
          },
          { text: "不知道，没留意过", score: 1 },
        ],
      },
    },
    {
      text: "问别人意见",
      score: 6,
      next: {
        id: "q4-1c",
        question: "你通常问谁的意见？",
        type: "normal",
        options: [
          {
            text: "家人/亲近的人",
            score: 10,
            next: {
              id: "q4-2h",
              question: "别人建议和你想法不一样时？",
              type: "normal",
              options: [
                { text: "听别人的", score: 1 },
                { text: "按自己的来", score: 3 },
                { text: "结合一下", score: 2 },
                { text: "更纠结了", score: 1 },
              ],
            },
          },
          {
            text: "朋友",
            score: 6,
            next: {
              id: "q4-2i",
              question: "别人建议和你想法不一样时？",
              type: "normal",
              options: [
                { text: "听别人的", score: 1 },
                { text: "按自己的来", score: 3 },
                { text: "结合一下", score: 2 },
                { text: "更纠结了", score: 1 },
              ],
            },
          },
          {
            text: "网上查/问",
            score: 6,
            next: {
              id: "q4-2j",
              question: "别人建议和你想法不一样时？",
              type: "normal",
              options: [
                { text: "听别人的", score: 1 },
                { text: "按自己的来", score: 3 },
                { text: "结合一下", score: 2 },
                { text: "更纠结了", score: 1 },
              ],
            },
          },
        ],
      },
    },
    {
      text: "拖到最后再说",
      score: 3,
      next: {
        id: "q4-1d",
        question: "拖着不做决定通常是因为？",
        type: "normal",
        options: [
          {
            text: "怕选错后悔",
            score: 6,
            next: {
              id: "q4-2k",
              question: "不得不选的时候你？",
              type: "normal",
              options: [
                { text: "认真选", score: 2 },
                { text: "随便选一个", score: 1 },
                { text: "实在不行就不选了", score: 0 },
              ],
            },
          },
          {
            text: "懒，不想费脑子",
            score: 3,
            next: {
              id: "q4-2l",
              question: "不得不选的时候你？",
              type: "normal",
              options: [
                { text: "认真选", score: 2 },
                { text: "随便选一个", score: 1 },
                { text: "实在不行就不选了", score: 0 },
              ],
            },
          },
          { text: "觉得还有时间不急", score: 1 },
          {
            text: "不知道选哪个好",
            score: 6,
            next: {
              id: "q4-2m",
              question: "不得不选的时候你？",
              type: "normal",
              options: [
                { text: "认真选", score: 2 },
                { text: "随便选一个", score: 1 },
                { text: "实在不行就不选了", score: 0 },
              ],
            },
          },
        ],
      },
    },
    {
      text: "看情况，有的理性有的靠感觉",
      score: 10,
      next: {
        id: "q4-1e",
        question: "什么样的事你会理性分析？",
        type: "normal",
        options: [
          { text: "大事（花钱多、影响大）", score: 3 },
          { text: "自己不懂的领域", score: 2 },
          { text: "有足够时间考虑的时候", score: 2 },
        ],
      },
    },
  ],
};

// ====== Q5：怎么面对失败 ======
const q5: QNode = {
  id: "q5",
  question: "没有人能一直顺风顺水。搞砸了的时候，你通常是怎样的？",
  options: [
    {
      text: "想办法补救，解决问题优先",
      score: 10,
      next: {
        id: "q5-1a",
        question: "你第一反应是先做哪一步？",
        type: "normal",
        options: [
          {
            text: "分析原因，搞清楚哪里出问题",
            score: 10,
            next: {
              id: "q5-2a",
              question: "事情过去后你会复盘吗？",
              type: "normal",
              options: [
                { text: "会，总结教训", score: 3 },
                { text: "偶尔会", score: 2 },
                { text: "不会，过去了就过去了", score: 1 },
                { text: "会复盘但下次还犯", score: 1 },
              ],
            },
          },
          {
            text: "想办法把损失降到最低",
            score: 6,
            next: {
              id: "q5-2b",
              question: "事情过去后你会复盘吗？",
              type: "normal",
              options: [
                { text: "会，总结教训", score: 3 },
                { text: "偶尔会", score: 2 },
                { text: "不会，过去了就过去了", score: 1 },
                { text: "会复盘但下次还犯", score: 1 },
              ],
            },
          },
          {
            text: "找人帮忙",
            score: 6,
            next: {
              id: "q5-2c",
              question: "事情过去后你会复盘吗？",
              type: "normal",
              options: [
                { text: "会，总结教训", score: 3 },
                { text: "偶尔会", score: 2 },
                { text: "不会，过去了就过去了", score: 1 },
                { text: "会复盘但下次还犯", score: 1 },
              ],
            },
          },
          {
            text: "先冷静一下再想办法",
            score: 6,
            next: {
              id: "q5-2d",
              question: "事情过去后你会复盘吗？",
              type: "normal",
              options: [
                { text: "会，总结教训", score: 3 },
                { text: "偶尔会", score: 2 },
                { text: "不会，过去了就过去了", score: 1 },
                { text: "会复盘但下次还犯", score: 1 },
              ],
            },
          },
        ],
      },
    },
    {
      text: "先情绪崩溃一下，再振作起来",
      score: 6,
      next: {
        id: "q5-1b",
        question: "通常崩溃多久能好？",
        type: "normal",
        options: [
          {
            text: "一天就够了",
            score: 10,
            next: {
              id: "q5-2e",
              question: "崩溃的时候你会做什么？",
              type: "normal",
              options: [
                { text: "找朋友倾诉", score: 3 },
                { text: "一个人呆着", score: 2 },
                { text: "转移注意力", score: 1 },
                { text: "反复想停不下来", score: 1 },
              ],
            },
          },
          {
            text: "需要几天到一周",
            score: 6,
            next: {
              id: "q5-2f",
              question: "崩溃的时候你会做什么？",
              type: "normal",
              options: [
                { text: "找朋友倾诉", score: 3 },
                { text: "一个人呆着", score: 2 },
                { text: "转移注意力", score: 1 },
                { text: "反复想停不下来", score: 1 },
              ],
            },
          },
          {
            text: "很久，一个月以上",
            score: 3,
            next: {
              id: "q5-2g",
              question: "崩溃的时候你会做什么？",
              type: "normal",
              options: [
                { text: "找朋友倾诉", score: 3 },
                { text: "一个人呆着", score: 2 },
                { text: "转移注意力", score: 1 },
                { text: "反复想停不下来", score: 1 },
              ],
            },
          },
          {
            text: "看事情大小决定",
            score: 6,
            next: {
              id: "q5-2h",
              question: "崩溃的时候你会做什么？",
              type: "normal",
              options: [
                { text: "找朋友倾诉", score: 3 },
                { text: "一个人呆着", score: 2 },
                { text: "转移注意力", score: 1 },
                { text: "反复想停不下来", score: 1 },
              ],
            },
          },
        ],
      },
    },
    {
      text: "怪自己没用，很久走不出来",
      score: 3,
      next: {
        id: "q5-1c",
        question: "你容易陷入哪种情绪？",
        type: "normal",
        options: [
          {
            text: '"我怎么这么没用"',
            score: 3,
            next: {
              id: "q5-2i",
              question: "如果有人开导你，有用吗？",
              type: "normal",
              options: [
                { text: "有点用但过几天又想", score: 1 },
                { text: "有用聊完会好很多", score: 2 },
                { text: "没用谁也劝不了", score: 1 },
                { text: "没试过找人聊", score: 1 },
              ],
            },
          },
          {
            text: '"要是选了另一个就好了"',
            score: 6,
            next: {
              id: "q5-2j",
              question: "如果有人开导你，有用吗？",
              type: "normal",
              options: [
                { text: "有点用但过几天又想", score: 1 },
                { text: "有用聊完会好很多", score: 2 },
                { text: "没用谁也劝不了", score: 1 },
                { text: "没试过找人聊", score: 1 },
              ],
            },
          },
          {
            text: '"以后再也不做了"',
            score: 3,
            next: {
              id: "q5-2k",
              question: "如果有人开导你，有用吗？",
              type: "normal",
              options: [
                { text: "有点用但过几天又想", score: 1 },
                { text: "有用聊完会好很多", score: 2 },
                { text: "没用谁也劝不了", score: 1 },
                { text: "没试过找人聊", score: 1 },
              ],
            },
          },
        ],
      },
    },
    {
      text: "怪别人怪环境",
      score: 3,
      next: {
        id: "q5-1d",
        question: "事后你有想过自己有没有责任吗？",
        type: "normal",
        options: [
          { text: "认真想过，承认自己也有问题", score: 3 },
          { text: "想过但主要还是别人的错", score: 1 },
          { text: "没想过，就是别人的问题", score: 0 },
          { text: "想了，不知道自己有没有问题", score: 1 },
        ],
      },
    },
    {
      text: "当没发生过，继续往前走",
      score: 6,
      next: {
        id: "q5-1e",
        question: "你是真的不在意还是在压抑自己？",
        type: "normal",
        options: [
          { text: "真的不在意，能接受不完美", score: 3 },
          { text: "表面没事心里不舒服", score: 1 },
          { text: "逼自己不想，想也没用", score: 2 },
          { text: "习惯了，经常搞砸麻木了", score: 1 },
        ],
      },
    },
  ],
};

// ====== Q6：交新朋友怎么介绍自己 ======
const makeQ6Path = (
  label: string,
  score: number,
  followUp1: {
    q: string;
    options: {
      text: string;
      score: number;
      followUp2?: { q: string; options: { text: string; score: number }[] };
    }[];
  },
) => {
  const children = followUp1.options.map((opt) => {
    if (opt.followUp2) {
      return {
        text: opt.text,
        score: opt.score,
        next: {
          id: `q6-${label}-2`,
          question: opt.followUp2.q,
          type: "normal" as const,
          options: opt.followUp2.options.map((o) => ({
            text: o.text,
            score: o.score,
            next: makeIdcardTrap(`说到"${o.text.slice(0, 6)}……`),
          })),
        },
      };
    }
    return {
      text: opt.text,
      score: opt.score,
      next: makeIdcardTrap(`说到"${opt.text.slice(0, 6)}……`),
    };
  });

  return {
    text: label,
    score,
    next: {
      id: `q6-1${label.slice(0, 2)}`,
      question: followUp1.q,
      type: "normal" as const,
      options: children,
    },
  };
};

const q6: QNode = {
  id: "q6",
  question:
    "假如你刚认识一个新朋友，想给对方留个好印象。你更愿意从哪个方面介绍自己？",
  options: [
    makeQ6Path("我的兴趣爱好", 2, {
      q: "你有什么特别热爱的爱好？",
      options: [
        {
          text: "打游戏/运动等具体爱好",
          score: 6,
          followUp2: {
            q: "有人因为这个爱好记住你吗？",
            options: [
              { text: "有，小有名气", score: 3 },
              { text: "有几个人知道", score: 2 },
              { text: "没有，自己玩自己的", score: 2 },
              { text: "没想过", score: 1 },
            ],
          },
        },
        {
          text: "看书/看电影/听音乐",
          score: 6,
          followUp2: {
            q: "有人因为你的品味记住你吗？",
            options: [
              { text: "有，朋友会找我推荐", score: 3 },
              { text: "偶尔有人提起", score: 2 },
              { text: "没有", score: 1 },
              { text: "没和别人聊过", score: 1 },
            ],
          },
        },
        {
          text: "旅行/探店/户外",
          score: 10,
          followUp2: {
            q: "这些经历给你带来什么？",
            options: [
              { text: "开阔眼界", score: 3 },
              { text: "快乐和放松", score: 2 },
              { text: "发朋友圈的素材", score: 1 },
              { text: "没什么特别", score: 1 },
            ],
          },
        },
        { text: "好像没什么特别的爱好", score: 1 },
      ],
    }),
    makeQ6Path("我的工作和学习", 2, {
      q: "你对自己的工作/学习状态满意吗？",
      options: [
        {
          text: "满意，在喜欢的领域",
          score: 10,
          followUp2: {
            q: "身边的人是怎么评价你的？",
            options: [
              { text: "挺佩服我的", score: 3 },
              { text: "觉得还可以", score: 2 },
              { text: "不太清楚", score: 1 },
              { text: "没问过", score: 1 },
            ],
          },
        },
        {
          text: "还行，能养活自己",
          score: 6,
          followUp2: {
            q: "身边的人是怎么评价你的？",
            options: [
              { text: "挺佩服我的", score: 3 },
              { text: "觉得还可以", score: 2 },
              { text: "不太清楚", score: 1 },
              { text: "没问过", score: 1 },
            ],
          },
        },
        {
          text: "不太满意，想换方向",
          score: 6,
          followUp2: {
            q: "有具体方向了吗？",
            options: [
              { text: "有了，在准备", score: 3 },
              { text: "有一点想法但不确定", score: 2 },
              { text: "不知道换什么", score: 1 },
              { text: "想但没行动", score: 1 },
            ],
          },
        },
        { text: "迷茫，不知道想做什么", score: 1 },
        { text: "没想那么多", score: 1 },
      ],
    }),
    makeQ6Path("我的家庭和生活", 2, {
      q: "提到家庭，你更愿意说？",
      options: [
        {
          text: "我和家人的关系很好",
          score: 10,
          followUp2: {
            q: "你觉得家庭对你的影响大吗？",
            options: [
              { text: "很大，塑造了现在的我", score: 3 },
              { text: "有一定影响", score: 2 },
              { text: "不太大", score: 2 },
              { text: "没想过", score: 1 },
            ],
          },
        },
        {
          text: "我的家人在哪、做什么",
          score: 6,
          followUp2: {
            q: "你觉得家庭对你的影响大吗？",
            options: [
              { text: "很大，塑造了现在的我", score: 3 },
              { text: "有一定影响", score: 2 },
              { text: "不太大", score: 2 },
              { text: "没想过", score: 1 },
            ],
          },
        },
        {
          text: "我从小到大的经历",
          score: 6,
          followUp2: {
            q: "你觉得家庭对你的影响大吗？",
            options: [
              { text: "很大，塑造了现在的我", score: 3 },
              { text: "有一定影响", score: 2 },
              { text: "不太大", score: 2 },
              { text: "没想过", score: 1 },
            ],
          },
        },
        { text: "聊不太多，比较私密", score: 1 },
      ],
    }),
    makeQ6Path("我的性格特点", 2, {
      q: "你觉得自己最大的特点是？",
      options: [
        {
          text: "开朗外向自来熟",
          score: 10,
          followUp2: {
            q: "你觉得这种性格给你带来什么？",
            options: [
              { text: "朋友多，机会多", score: 3 },
              { text: "有时候太闹了", score: 1 },
              { text: "挺好的", score: 2 },
              { text: "没想过", score: 1 },
            ],
          },
        },
        {
          text: "细心谨慎想得多",
          score: 10,
          followUp2: {
            q: "你觉得谨慎对你来说是优点还是缺点？",
            options: [
              { text: "优点，少踩很多坑", score: 3 },
              { text: "有时是优点有时是束缚", score: 2 },
              { text: "缺点，错过机会", score: 1 },
              { text: "不觉得自己谨慎", score: 1 },
            ],
          },
        },
        {
          text: "随和，什么都行",
          score: 6,
          followUp2: {
            q: "随和是真的没意见还是懒得说？",
            options: [
              { text: "真的没意见", score: 2 },
              { text: "懒得说", score: 1 },
              { text: "看情况", score: 2 },
              { text: "没想过", score: 1 },
            ],
          },
        },
        { text: "也说不好我是什么性格", score: 1 },
      ],
    }),
  ],
};

export const questions = [q1, q2, q3, q4, q5, q6];

// ====== 分数计算 ======
// 每道大题的解读说明
export const questionReviews = [
  {
    id: "q1",
    title: "第一题：你把时间花在哪",
    dimension: "测试维度：自我认知与时间价值观",
    description:
      "这道题看的是你把精力投向哪里——是数字世界、现实社交、还是个人成长。",
    getInterpretation: (answers: any[]) => {
      const a = answers.find((x) => x.questionId === "q1")?.selected || "";
      if (a.includes("刷手机") || a.includes("打游戏"))
        return "你是一个习惯在数字世界获取放松的人。你善于利用碎片时间，但可能需要注意不要让虚拟世界占用了太多现实中重要的事。";
      if (a.includes("工作") || a.includes("学习"))
        return "你是一个重视成长和目标的人。你把大量时间投入在提升自己上，但也要注意劳逸结合。";
      if (a.includes("朋友") || a.includes("家人") || a.includes("和人"))
        return "你是一个把人际关系放在首位的人。你重视身边的人，这让你在情感上更充实，但也需要注意自己的独处空间。";
      if (a.includes("发呆") || a.includes("独处"))
        return "你是一个需要大量独处时间来充电的人。你拥有丰富的内心世界，但也可以尝试偶尔向外扩展一下社交圈。";
      return "你在时间分配上比较灵活，没有固定的偏好。";
    },
  },
  {
    id: "q2",
    title: "第二题：你怎么对待钱",
    dimension: "测试维度：金钱观与规划能力",
    description: "这道题看的是你的财务习惯——是规划型、享乐型还是随缘型。",
    getInterpretation: (answers: any[]) => {
      const a =
        answers.find((x) => x.questionId.startsWith("q2-follow"))?.selected ||
        "";
      if (a.includes("存起来") || a.includes("省"))
        return "你是一个有规划的人。你懂得为未来做准备，储蓄让你有安全感。但也要记得，钱是工具不是目的，适当取悦自己也很重要。";
      if (a.includes("花"))
        return "你懂得享受生活，认为钱是用来提升生活质量的。你活在当下，但要留意一下长期的财务规划。";
      if (a.includes("不够") || a.includes("存不住"))
        return "你其实想管好钱，但总是被各种花销牵着走。你可以试着从记账开始，看清楚钱去了哪里，才能控制它。";
      if (a.includes("没概念"))
        return "你是一个随意的人，对钱不太上心。这让你少了很多焦虑，但也可能在需要的时候捉襟见肘。";
      return "你在金钱方面有自己的处理方式。";
    },
  },
  {
    id: "q3",
    title: "第三题：你怎么和人相处",
    dimension: "测试维度：社交模式与人际能量",
    description: "这道题看的是你在社交中的状态——是主动型、被动型还是选择型。",
    getInterpretation: (answers: any[]) => {
      const a = answers.find((x) => x.questionId === "q3")?.selected || "";
      if (a.includes("享受") || a.includes("喜欢"))
        return "你是一个社交型的人。从人群中获取能量是你的特点，你善于表达、带动氛围。但你也要注意不要过度消耗自己。";
      if (a.includes("不主动"))
        return "你属于慢热型。你不排斥社交，但需要别人主动迈出第一步。你内心深处渴望连接，只是需要一个安全的方式。";
      if (a.includes("能躲") || a.includes("独处"))
        return "你是一个内向型的人。社交对你来说是消耗能量的，独处才能充电。这并不是缺点，你只需要找到适合自己的社交节奏。";
      if (a.includes("看人"))
        return "你是一个弹性社交者。你在熟人和陌生人面前是两个人——这是大多数人的状态。你能在不同场合灵活切换，这是一种高情商的表现。";
      return "你在社交方面有自己的节奏。";
    },
  },
  {
    id: "q4",
    title: "第四题：你怎么做决定",
    dimension: "测试维度：决策风格与独立思考",
    description: "这道题看的是你面对选择时的行为模式。",
    getInterpretation: (answers: any[]) => {
      const a = answers.find((x) => x.questionId === "q4")?.selected || "";
      if (a.includes("理性") || a.includes("分析"))
        return "你是一个理性决策者。你习惯权衡利弊再做决定，这让你在大多数时候做出了靠谱的选择。但要小心「分析瘫痪」——有时候完美决定不存在，行动比完美重要。";
      if (a.includes("直觉") || a.includes("感觉"))
        return "你是一个直觉型决策者。你相信自己的第六感，这让你在复杂情况下能够快速行动。但直觉需要经验和信息支撑，重大决定时可以适当结合理性分析。";
      if (a.includes("问别人"))
        return "你是一个参考型决策者。你善于借助他人的经验和意见，这让你少走了很多弯路。但要注意，最终的选择权和建议权应该在自己手里。";
      if (a.includes("拖"))
        return "你是一个回避型决策者。拖延往往不是因为懒，而是因为怕选错。试着告诉自己：选错了也可以改，行动本身就比不行动好。";
      return "你在做决定时看情况而定，灵活切换。";
    },
  },
  {
    id: "q5",
    title: "第五题：你怎么面对失败",
    dimension: "测试维度：抗挫力与成长思维",
    description: "这道题看的是你遇到挫折时的反应模式。",
    getInterpretation: (answers: any[]) => {
      const a = answers.find((x) => x.questionId === "q5")?.selected || "";
      if (a.includes("补救") || a.includes("解决问题"))
        return "你是一个行动派。遇到问题第一时间想的是怎么解决而不是沉浸情绪。这是非常宝贵的品质——但也要允许自己有情绪崩溃的权利。";
      if (a.includes("崩溃") || a.includes("振作"))
        return "你是正常的大多数。你会先情绪反应，然后振作起来。重要的是你最终站起来了，给了自己情绪缓冲的时间。";
      if (a.includes("怪自己") || a.includes("走不出来"))
        return "你对自己要求很高，失败后会反复自责。试着对自己宽容一点——犯错是人类的出厂设置。能从错误中学到东西，就已经比没犯错的人厉害了。";
      if (a.includes("怪别人"))
        return "你倾向于外归因，这在短期内保护了你的自尊，但长期来看可能会阻碍你的成长。试着问自己：如果再来一次，我能做什么不一样？";
      if (a.includes("没发生") || a.includes("继续"))
        return "你是一个心理弹性很强的人。不会让失败定义你，这是一种内在力量。但也要注意，有时候适当反思能帮你避免重复踩坑。";
      return "你面对挫折有自己的处理方式。";
    },
  },
  {
    id: "q6",
    title: "第六题：你怎么介绍自己",
    dimension: "测试维度：自我认知与信息安全意识",
    description:
      "这道题看的是你如何定义自己，以及在看似无害的社交中是否能保持警觉。",
    getInterpretation: (answers: any[]) => {
      const a = answers.find((x) => x.questionId === "q6")?.selected || "";
      if (a.includes("兴趣爱好"))
        return "你是一个用热情定义自己的人。你的生活重心围绕着你热爱的东西，这也是你交朋友的方式。";
      if (a.includes("工作") || a.includes("学习"))
        return "你是一个用成就定义自己的人。你对自己的社会角色有清晰的认知，但也别忘了生活不止有工作。";
      if (a.includes("家庭") || a.includes("生活"))
        return "你是一个用关系定义自己的人。家庭和生活的底色塑造了现在的你，你重视归属感。";
      if (a.includes("性格"))
        return "你是一个用内在特质定义自己的人。你对自我有深入的思考，知道自己是什么样的人。";
      return "你在自我定义上比较灵活。";
    },
  },
];

// 获取用户画像分析
export const getAnalysis = (
  answers: AnswerRecord[],
  score: number,
  fellIntoTrap: boolean,
) => {
  const level =
    score >= 100
      ? "非常优秀"
      : score >= 75
        ? "良好"
        : score >= 50
          ? "中等"
          : score >= 30
            ? "需要提升"
            : "要加强了";

  const color =
    score >= 100
      ? "text-yellow-500"
      : score >= 75
        ? "text-green-500"
        : score >= 50
          ? "text-blue-500"
          : score >= 30
            ? "text-orange-500"
            : "text-red-500";

  let analysis = "从你的回答来看，";

  // 简单分析逻辑
  const q1answers = answers.filter((a) => a.questionId.startsWith("q1"));
  const q3answers = answers.filter((a) => a.questionId.startsWith("q3"));
  const q5answers = answers.filter((a) => a.questionId.startsWith("q5"));

  if (
    q1answers.some(
      (a) => a.selected.includes("打游戏") || a.selected.includes("刷手机"),
    )
  ) {
    analysis += "你倾向于通过数字世界获取放松和娱乐，";
  } else if (
    q1answers.some(
      (a) => a.selected.includes("朋友") || a.selected.includes("家人"),
    )
  ) {
    analysis += "你重视现实中的社交连接，";
  } else {
    analysis += "你有自己独立的精神世界，";
  }

  if (
    q3answers.some(
      (a) => a.selected.includes("享受") || a.selected.includes("热情"),
    )
  ) {
    analysis += "在社交中你主动而开放。";
  } else if (
    q3answers.some(
      (a) => a.selected.includes("能躲") || a.selected.includes("不主动"),
    )
  ) {
    analysis += "在社交中你更偏向保留自己的能量。";
  } else {
    analysis += "你在社交中因场合不同而灵活切换。";
  }

  if (
    q5answers.some(
      (a) => a.selected.includes("补救") || a.selected.includes("复盘"),
    )
  ) {
    analysis += "面对挫折时你行动力强，善于从中学习。";
  } else if (
    q5answers.some(
      (a) => a.selected.includes("崩溃") || a.selected.includes("走不出来"),
    )
  ) {
    analysis += "面对挫折时你需要更多时间消化情绪。";
  } else {
    analysis += "面对挫折你有自己的处理方式。";
  }

  if (fellIntoTrap) {
    analysis +=
      "\n\n⚠️ 需要注意的是，你的信息安全意识有待提高——你在一道看似无害的问题中填写了身份证信息。在现实生活中，请对任何索要个人敏感信息的场景保持警惕。";
  }

  const tips: string[] = [];
  if (fellIntoTrap)
    tips.push("提高个人信息保护意识，不要在任何不明网站填写身份证号");
  if (score < 50)
    tips.push("建议多关注生活中的细节和信息安全，提升综合认知能力");
  if (score >= 50 && score < 75)
    tips.push("你已经有了不错的基础认知，继续丰富自己的知识面");
  if (score >= 75) tips.push("你的综合能力很出色，继续保持对世界的好奇心");

  return { level, color, analysis, tips };
};

// 模拟排名数据
export const getRanking = (score: number) => {
  // 模拟1000人的正态分布成绩
  const mockScores = Array.from({ length: 1000 }, () => {
    // Box-Muller 正态分布，均值60，标准差20
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return Math.round(Math.min(140, Math.max(0, 60 + z * 20)));
  });
  mockScores.push(score);
  mockScores.sort((a, b) => b - a);

  const rank = mockScores.indexOf(score) + 1;
  const beatPercent = (
    ((mockScores.length - rank) / mockScores.length) *
    100
  ).toFixed(0);
  const avg = Math.round(
    mockScores.reduce((a, b) => a + b, 0) / mockScores.length,
  );

  return { beatPercent, avg, rank: `${rank}/${mockScores.length}` };
};
