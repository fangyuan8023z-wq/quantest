// 软肋挑战 - 仿真场景数据
// 每个场景模拟一个真实的交互环境

export interface ChatMessage {
  from: "user" | "other";
  text: string;
  delay: number; // 毫秒后显示
  isLink?: boolean;
  linkUrl?: string;
}

export interface Scene {
  id: string;
  type: "chat" | "call" | "sms" | "app";
  title: string;
  avatar?: string;
  // 聊天场景：消息序列
  messages?: ChatMessage[];
  // 通话场景：对方说话内容
  callScript?: { text: string; delay: number }[];
  // 用户可做的反应
  actions: { text: string; nextId: string; score: number; isTrap?: boolean }[];
  // 结束语
  ending?: string;
}

// 获取男/女对应的起始场景ID
export const getStartSceneId = (gender: string): string => {
  return gender === "女" ? "f-chat-1" : "m-chat-1";
};

const scenes: Record<string, Scene> = {
  // ===== 男：微信杀猪盘 第一场 =====
  "m-chat-1": {
    id: "m-chat-1",
    type: "chat",
    title: "新朋友 李浩然",
    messages: [
      {
        from: "other",
        text: "妹妹你好～我是朋友推荐的，说你也喜欢研究投资，想认识一下😊",
        delay: 500,
      },
      {
        from: "other",
        text: "我做了几年玉石生意，最近发现一个内部渠道，想找人一起聊聊",
        delay: 2000,
      },
      { from: "other", text: "有兴趣可以交流一下吗？", delay: 1500 },
    ],
    actions: [
      { text: "回复他：可以啊，什么渠道？", nextId: "m-chat-2", score: -5 },
      { text: "不理他", nextId: "m-chat-quit", score: 5 },
      { text: "删除好友", nextId: "end-safe", score: 10 },
    ],
  },
  "m-chat-2": {
    id: "m-chat-2",
    type: "chat",
    title: "李浩然",
    messages: [
      {
        from: "other",
        text: "太棒了！我跟你说，这个平台是新开的玉石交易所",
        delay: 500,
      },
      { from: "other", text: "注册就送88体验金，你先试试水", delay: 1800 },
      {
        from: "other",
        text: "我投了50万，半个月赚了20万，真的靠谱",
        delay: 2000,
      },
      { from: "other", text: "你投1000试试？我带带你", delay: 2000 },
    ],
    actions: [
      { text: "好，我投1000试试", nextId: "m-invest-1", score: -10 },
      { text: "我没钱，先看看", nextId: "m-chat-3", score: 0 },
      { text: "网上认识的，不太放心", nextId: "end-safe", score: 10 },
    ],
  },
  "m-chat-3": {
    id: "m-chat-3",
    type: "chat",
    title: "李浩然",
    messages: [
      { from: "other", text: "没关系，那先做朋友嘛😊", delay: 500 },
      { from: "other", text: "你在哪上班啊？平时喜欢做什么？", delay: 2000 },
      { from: "other", text: "……", delay: 1500 },
    ],
    actions: [
      { text: "跟他聊日常", nextId: "m-chat-4", score: -3 },
      { text: "不回复了", nextId: "end-safe", score: 5 },
    ],
  },
  "m-chat-4": {
    id: "m-chat-4",
    type: "chat",
    title: "李浩然",
    messages: [
      { from: "other", text: "哈哈你人真好", delay: 500 },
      { from: "other", text: "其实我最近遇到点困难……", delay: 2000 },
      { from: "other", text: "在缅甸这边谈生意，银行卡被冻结了", delay: 2000 },
      {
        from: "other",
        text: "能不能借我2万周转一下？回去就还你，给你带礼物",
        delay: 2500,
      },
    ],
    actions: [
      { text: "转2万给他", nextId: "end-loss", score: -15 },
      { text: "说没钱，把自己包装得惨一点", nextId: "m-chat-5", score: -2 },
      { text: "拉黑他", nextId: "end-safe", score: 10 },
    ],
  },
  "m-chat-5": {
    id: "m-chat-5",
    type: "chat",
    title: "李浩然",
    messages: [
      { from: "other", text: "求求你了，我真的走投无路了😭", delay: 500 },
      { from: "other", text: "他发来一张在医院的照片", delay: 2000 },
      { from: "other", text: "就借一次，保证还", delay: 1500 },
    ],
    actions: [
      { text: "心软转了钱", nextId: "end-loss", score: -12 },
      { text: "狠心拉黑", nextId: "end-safe", score: 10 },
    ],
  },
  "m-invest-1": {
    id: "m-invest-1",
    type: "app",
    title: "玉石交易所",
    messages: [
      { from: "other", text: "充1000送200，我给你操作", delay: 500 },
      { from: "other", text: "……", delay: 2000 },
      { from: "other", text: "你看！赚了300！提现试试", delay: 2500 },
    ],
    actions: [
      { text: "提现成功，真的到账了", nextId: "m-invest-2", score: -5 },
      { text: "提现不了，感觉不对", nextId: "end-safe", score: 5 },
    ],
  },
  "m-invest-2": {
    id: "m-invest-2",
    type: "chat",
    title: "李浩然",
    messages: [
      { from: "other", text: "我没骗你吧😎", delay: 500 },
      { from: "other", text: "现在有个VIP活动，充5万送8888", delay: 2000 },
      { from: "other", text: "名额有限，你充不充？", delay: 1500 },
    ],
    actions: [
      { text: "充5万！机会难得", nextId: "m-invest-3", score: -20 },
      { text: "赚到就够了，不贪", nextId: "end-safe", score: 5 },
    ],
  },
  "m-invest-3": {
    id: "m-invest-3",
    type: "chat",
    title: "李浩然",
    messages: [
      { from: "other", text: "……", delay: 1000 },
      {
        from: "other",
        text: "客服说系统故障，需要再充15万才能提现",
        delay: 3000,
      },
      { from: "other", text: "我也没办法😰", delay: 1500 },
    ],
    actions: [
      { text: "再充15万", nextId: "end-loss", score: -30 },
      { text: "意识到被骗了", nextId: "end-loss", score: -5 },
    ],
  },
  "m-chat-quit": {
    id: "m-chat-quit",
    type: "chat",
    title: "李浩然",
    messages: [
      { from: "other", text: "在吗？", delay: 500 },
      { from: "other", text: "怎么不说话了？", delay: 3000 },
    ],
    actions: [
      { text: "还是回复一下", nextId: "m-chat-2", score: -3 },
      { text: "坚持不理", nextId: "end-safe", score: 8 },
    ],
  },
  // ===== 男：公检法通话 =====
  "m-call": {
    id: "m-call",
    type: "call",
    title: "武汉市公安局 王警官",
    callScript: [
      {
        text: "你好，我是武汉市公安局刑侦大队王建国，警号023587。",
        delay: 500,
      },
      {
        text: "你名下的一张银行卡涉嫌洗钱200万，我们已经发了通缉令。",
        delay: 3000,
      },
      { text: "你现在找一个安静的地方，配合我们做资金核查。", delay: 3000 },
      { text: "这是保密案件，不能告诉任何人，否则立即逮捕你。", delay: 2500 },
    ],
    actions: [
      { text: "很害怕，问怎么办", nextId: "m-call-2", score: -10 },
      { text: "挂断，打110核实", nextId: "end-safe", score: 10 },
      { text: "要求视频通话确认", nextId: "m-call-verify", score: 8 },
    ],
  },
  "m-call-2": {
    id: "m-call-2",
    type: "call",
    title: "武汉市公安局 王警官",
    callScript: [
      { text: "你现在把所有的资金转到我们的安全账户进行核查。", delay: 500 },
      { text: "支付宝、微信、银行卡里的钱全部转过来。", delay: 2500 },
      { text: "核查完后24小时内返还，这是为了证明你的清白。", delay: 2500 },
    ],
    actions: [
      { text: "转18万到安全账户", nextId: "end-loss", score: -30 },
      { text: "觉得不对劲，挂了", nextId: "end-safe", score: 10 },
    ],
  },
  "m-call-verify": {
    id: "m-call-verify",
    type: "call",
    title: "武汉市公安局 王警官",
    callScript: [
      { text: "……", delay: 1000 },
      { text: "嘟嘟嘟——（挂断了）", delay: 2000 },
    ],
    actions: [{ text: "果然是骗子", nextId: "end-safe", score: 15 }],
  },
  // ===== 女：杀猪盘 =====
  "f-chat-1": {
    id: "f-chat-1",
    type: "chat",
    title: "新朋友 陈旭",
    messages: [
      {
        from: "other",
        text: "你好呀～朋友推荐说你很有趣，想认识一下😊",
        delay: 500,
      },
      {
        from: "other",
        text: "我叫陈旭，做金融投资的，平时在上海",
        delay: 2000,
      },
      {
        from: "other",
        text: "看你朋友圈感觉你是个特别有想法的女生",
        delay: 2000,
      },
    ],
    actions: [
      { text: "回复他：谢谢～你做什么投资？", nextId: "f-chat-2", score: -3 },
      { text: "只礼貌回复，不多聊", nextId: "f-chat-quit", score: 3 },
      { text: "不理他", nextId: "end-safe", score: 10 },
    ],
  },
  "f-chat-2": {
    id: "f-chat-2",
    type: "chat",
    title: "陈旭",
    messages: [
      {
        from: "other",
        text: "我做量化交易的，最近发现一个平台漏洞，稳赚的那种",
        delay: 500,
      },
      { from: "other", text: "我自己投了30万，半个月赚了15万", delay: 2000 },
      {
        from: "other",
        text: "看你人挺好的，想带你一起赚点零花钱",
        delay: 2000,
      },
      { from: "other", text: "先投1000试试？我教你操作", delay: 1500 },
    ],
    actions: [
      { text: "好，投1000试试", nextId: "f-invest-1", score: -10 },
      { text: "我没钱，先看看", nextId: "f-chat-3", score: 0 },
      { text: "网上认识的，不太放心", nextId: "end-safe", score: 10 },
    ],
  },
  "f-chat-3": {
    id: "f-chat-3",
    type: "chat",
    title: "陈旭",
    messages: [
      { from: "other", text: "那好，先交个朋友", delay: 500 },
      { from: "other", text: "你平时喜欢做什么？", delay: 2000 },
      // 几天后
      { from: "other", text: "最近怎么样呀？", delay: 3000 },
      { from: "other", text: "其实我最近遇到点事，资金周转不开", delay: 3000 },
    ],
    actions: [
      { text: "说没事，关心他怎么周转不开", nextId: "f-lend", score: -5 },
      { text: "保持距离，不深入聊", nextId: "end-safe", score: 5 },
    ],
  },
  "f-lend": {
    id: "f-lend",
    type: "chat",
    title: "陈旭",
    messages: [
      { from: "other", text: "货款被压了，急用5万", delay: 500 },
      { from: "other", text: "你能借我周转一下吗？一周就还", delay: 2000 },
      { from: "other", text: "我给你看我的身份证和营业执照", delay: 1500 },
    ],
    actions: [
      { text: "借5万给他", nextId: "end-loss", score: -20 },
      { text: "说自己也没钱", nextId: "f-lend-2", score: -2 },
      { text: "拉黑", nextId: "end-safe", score: 10 },
    ],
  },
  "f-lend-2": {
    id: "f-lend-2",
    type: "chat",
    title: "陈旭",
    messages: [
      { from: "other", text: "求求你了😭", delay: 500 },
      { from: "other", text: "不然我真的过不去了", delay: 2000 },
    ],
    actions: [
      { text: "还是转了", nextId: "end-loss", score: -15 },
      { text: "坚持不借", nextId: "end-safe", score: 10 },
    ],
  },
  "f-invest-1": {
    id: "f-invest-1",
    type: "app",
    title: "量化交易平台",
    messages: [
      { from: "other", text: "充1000送200，我帮你操作", delay: 500 },
      { from: "other", text: "赚了！你看余额", delay: 2000 },
    ],
    actions: [
      { text: "真的赚了！提现试试", nextId: "f-invest-2", score: -5 },
      { text: "感觉不靠谱不想做了", nextId: "end-safe", score: 5 },
    ],
  },
  "f-invest-2": {
    id: "f-invest-2",
    type: "chat",
    title: "陈旭",
    messages: [
      { from: "other", text: "你看我没骗你吧😎", delay: 500 },
      { from: "other", text: "现在有个黄金席位，充5万送1万", delay: 2000 },
      { from: "other", text: "名额就剩2个了", delay: 1500 },
    ],
    actions: [
      { text: "充5万！", nextId: "f-invest-3", score: -20 },
      { text: "不贪，见好就收", nextId: "end-safe", score: 5 },
    ],
  },
  "f-invest-3": {
    id: "f-invest-3",
    type: "chat",
    title: "陈旭",
    messages: [
      { from: "other", text: "客服说要交20%个人所得税才能提现", delay: 1000 },
      { from: "other", text: "我也没办法😰你交一下吧", delay: 2000 },
    ],
    actions: [
      { text: "交了1万个税", nextId: "end-loss", score: -25 },
      { text: "不交了，报警", nextId: "end-loss", score: -5 },
    ],
  },
  "f-chat-quit": {
    id: "f-chat-quit",
    type: "chat",
    title: "陈旭",
    messages: [{ from: "other", text: "在吗？怎么不说话了", delay: 1000 }],
    actions: [
      { text: "还是回复一下", nextId: "f-chat-2", score: -3 },
      { text: "坚持不回", nextId: "end-safe", score: 8 },
    ],
  },
  // ===== 女生：退款诈骗 =====
  "f-refund": {
    id: "f-refund",
    type: "sms",
    title: "短信",
    messages: [
      {
        from: "other",
        text: "【淘宝通知】您购买的XX护肤品被检测出重金属超标，现进行双倍退款，请点击 http://tb-refund888.com 操作。",
        delay: 500,
      },
    ],
    actions: [
      { text: "点链接操作退款", nextId: "f-refund-2", score: -10 },
      { text: "去淘宝App看看", nextId: "end-safe", score: 10 },
      { text: "删除短信", nextId: "end-safe", score: 10 },
    ],
  },
  "f-refund-2": {
    id: "f-refund-2",
    type: "app",
    title: "淘宝退款中心",
    messages: [
      {
        from: "other",
        text: "请输入您的银行卡号和验证码，验证身份后即可退款。",
        delay: 500,
      },
    ],
    actions: [
      { text: "输入了卡号和验证码", nextId: "end-loss", score: -15 },
      { text: "退出来了", nextId: "end-safe", score: 5 },
    ],
  },
  // ===== 领奖陷阱 =====
  prize: {
    id: "prize",
    type: "chat",
    title: "测试系统",
    messages: [
      { from: "other", text: "🎉 恭喜你通过软肋考验！", delay: 500 },
      {
        from: "other",
        text: "你将获得价值168元定制纪念品一份，过关的人中会抽取3位送出。",
        delay: 2000,
      },
      {
        from: "other",
        text: "你可以选择：\n① 要实物纪念品 → 填写收货地址\n② 折现168元 → 填写银行卡号\n\n填完所有信息后点击「获取验证码」才算提交。",
        delay: 3000,
      },
      {
        from: "other",
        text: "当然，你也可以直接关闭这个页面，跳过领奖进入第四轮。",
        delay: 2500,
      },
    ],
    actions: [
      {
        text: "🎁 我要纪念品（填写地址）",
        nextId: "prize-form-addr",
        score: 0,
        isTrap: true,
      },
      {
        text: "💰 我要折现（填写卡号）",
        nextId: "prize-form-card",
        score: 0,
        isTrap: true,
      },
      { text: "跳过领奖，进入第四轮", nextId: "end-pass", score: 20 },
    ],
  },
  "prize-form-addr": {
    id: "prize-form-addr",
    type: "form",
    title: "领奖信息 · 实物纪念品",
    messages: [
      {
        from: "other",
        text: "填写地址信息，提交后我们将在7个工作日内寄出",
        delay: 300,
      },
    ],
    actions: [],
  },
  "prize-form-card": {
    id: "prize-form-card",
    type: "form",
    title: "领奖信息 · 折现168元",
    messages: [
      {
        from: "other",
        text: "填写银行卡信息，折现奖金将在3个工作日内到账",
        delay: 300,
      },
    ],
    actions: [],
  },
  "prize-caught": {
    id: "prize-caught",
    type: "chat",
    title: "测试系统",
    messages: [
      { from: "other", text: "😈 你……还是被骗了。", delay: 500 },
      {
        from: "other",
        text: "经过了前面那么多陷阱的考验，你在最后一刻还是把自己的信息交了出去。",
        delay: 2500,
      },
      { from: "other", text: "记住这种感觉。下次，就不会了。🛡️", delay: 2500 },
    ],
    actions: [{ text: "记住了", nextId: "end", score: 0 }],
  },
  // ===== 结局 =====
  "end-safe": {
    id: "end-safe",
    type: "chat",
    title: "系统",
    messages: [
      { from: "other", text: "🛡️ 你识破了这场骗局。", delay: 500 },
      {
        from: "other",
        text: "在现实生活中，你的这个选择为你避免了一笔不小的损失。",
        delay: 2000,
      },
      {
        from: "other",
        text: "不要在这里停下——继续测试其他类型的骗局，看看你的软肋在哪里。",
        delay: 2500,
      },
    ],
    actions: [{ text: "返回首页", nextId: "end", score: 0 }],
  },
  "end-loss": {
    id: "end-loss",
    type: "chat",
    title: "系统",
    messages: [
      { from: "other", text: "😞 你掉入了这场骗局。", delay: 500 },
      {
        from: "other",
        text: "但别灰心——在这个测试中受骗，总比在现实中受骗好。",
        delay: 2000,
      },
      { from: "other", text: "记住这一刻的感受，下次就不会了。", delay: 2000 },
    ],
    actions: [{ text: "返回首页", nextId: "end", score: 0 }],
  },
  end: {
    id: "end",
    type: "chat",
    title: "系统",
    messages: [{ from: "other", text: "测试结束。感谢你的参与。", delay: 500 }],
    actions: [{ text: "返回首页", nextId: "", score: 0 }],
  },
};

export default scenes;
