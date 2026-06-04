// 第三轮软肋挑战 - 树状故事节点
// 每个节点是一个故事片段，通过 nextId 连接

const baseNodes: Record<string, any> = {
  end: {
    question: "故事结束。你的每个选择都反映了你在面对真实骗局时的判断力。",
    options: [{ text: "返回首页", score: 0, nextId: "" }],
  },
};

// ====== 男·学生 ======
const maleStudent: Record<string, any> = {
  "start-m-student": {
    question:
      "📍 你是一名大二学生，每个月生活费2000块。最近你看中了一双AJ，要1299，犹豫了好久没舍得买。\n\n今晚你在宿舍刷手机，收到一条消息……",
    options: [
      {
        text: "📱 短信：恭喜你被选为「校园体验官」，免费送一双AJ，点击领取",
        score: 0,
        nextId: "ms-1",
      },
      {
        text: "💬 QQ群：有人在群里发「急招游戏代练，日结200+」，是你玩的那款游戏",
        score: 0,
        nextId: "ms-game",
      },
      {
        text: "📞 陌生电话：自称是辅导员，说你申请的助学金有问题要核实",
        score: 0,
        nextId: "ms-3",
      },
    ],
  },
  // 免费AJ
  "ms-1": {
    question:
      "你点开链接，是一个看起来很正规的页面，写着「校园体验官招募」。客服说：「恭喜你被抽中！只需要先支付39元邮费，AJ免费送。」\n\n你付了39。过了两天没收到货，客服说海关清关需要再付128元关税。",
    options: [
      { text: "再付128，不然前面的39浪费了", score: -10, nextId: "ms-1a" },
      { text: "意识到被骗，39块算了", score: 5, nextId: "ms-1b" },
    ],
  },
  "ms-1a": {
    question:
      "你付了128。客服说还要付398元保证金，签收后退还。你付了398。然后人消失了。\n\n对方用了你的收货地址和手机号，之后你开始收到各种诈骗短信和电话。你的信息被卖了。",
    options: [{ text: "哎，不该贪小便宜", score: -15, nextId: "end" }],
  },
  "ms-1b": {
    question:
      "你意识到不对就没再付了。损失39块。你在网上一搜，发现好多人被同样的套路骗过。",
    options: [{ text: "举报这个网站", score: 10, nextId: "end" }],
  },
  // 游戏代练
  "ms-game": {
    question:
      "你加了群。群主说先做一单试试——用你的号帮他上分，一单50元。你打了3单，真的收到了150元。\n\n群主说：「现在有个大单，代打一个高端号，佣金800。但需要你先交300押金，打完退。」",
    options: [
      { text: "交300押金，反正之前的都到账了", score: -10, nextId: "ms-game1" },
      { text: "只接免费单，不交押金", score: 5, nextId: "ms-game2" },
    ],
  },
  "ms-game1": {
    question:
      "你交了300押金。打完号后申请佣金，群主说：「你这个号违规了，需要再交500解封。」\n\n你交了500。群主又说还要交800。你意识到被骗了。",
    options: [{ text: "不交了，报警", score: -5, nextId: "end" }],
  },
  "ms-game2": {
    question:
      "你拒绝交押金后群主没再理你。过了两天群被封了，好多人说被骗了。你庆幸自己没上钩。",
    options: [{ text: "聪明！", score: 10, nextId: "end" }],
  },
  // 助学金
  "ms-3": {
    question:
      "对方说：「你申请的助学金批下来了，但需要先激活账户。你把银行卡号发给我，我转进去。」\n\n你发了卡号。他说：「需要先转500元验证你的身份，验证成功后连同助学金5000块一起打给你。」",
    options: [
      { text: "转500验证", score: -10, nextId: "ms-3a" },
      { text: "打电话给辅导员确认", score: 10, nextId: "ms-3b" },
    ],
  },
  "ms-3a": {
    question: "你转了500。对方说验证失败要再转1500。你意识到不对了。损失500。",
    options: [{ text: "报警", score: -5, nextId: "end" }],
  },
  "ms-3b": {
    question: "辅导员说学校没有这个电话。这是冒充老师的诈骗。",
    options: [{ text: "举报这个号码", score: 10, nextId: "end" }],
  },
};

// ====== 男·打工人 ======
const maleWorker: Record<string, any> = {
  "start-m-worker": {
    question:
      "📍 你在一家公司干了3年，月薪8000。最近想跳槽但没找到合适的。今晚你下班回到家，收到几条消息……",
    options: [
      {
        text: "📧 猎头发来邮件：某大厂内推机会，月薪15K起，年薪20万+",
        score: 0,
        nextId: "mw-1",
      },
      {
        text: "📱 刷到一条广告：同城交友App，免费注册，附近小姐姐等你",
        score: 0,
        nextId: "mw-2",
      },
      {
        text: "📞 电话：自称老家派出所，说你妈涉嫌洗钱",
        score: 0,
        nextId: "mw-3",
      },
    ],
  },
  "mw-1": {
    question:
      "你加了猎头微信。对方说是一家知名互联网公司的内推机会，但需要先交800元培训费，入职后报销。\n\n你查了一下这家公司确实存在。",
    options: [
      { text: "交800培训费，好工作值得", score: -10, nextId: "mw-1a" },
      { text: "先打电话去那家公司HR核实", score: 10, nextId: "mw-1b" },
    ],
  },
  "mw-1a": {
    question:
      "你交了800。猎头发来一个培训链接让你学，你学完后他说可以安排面试了。但第二天他说需要再交2000元人才入库费。\n\n你意识到不对了。损失800。",
    options: [{ text: "报警举报", score: -5, nextId: "end" }],
  },
  "mw-1b": {
    question:
      "那家公司HR说他们从不收培训费，也没有这个猎头。你举报了这个假猎头。",
    options: [{ text: "举报得好", score: 10, nextId: "end" }],
  },
  "mw-2": {
    question:
      "你下载了App。注册后一个叫小优的美女加你，发了语音说做任务解锁等级就能约，充值返利20%。\n\n你充了38，返了45。充了168，返了201。小优说最后一单充880返1200。",
    options: [
      { text: "充880", score: -15, nextId: "mw-2a" },
      { text: "见好就收，不再充了", score: 5, nextId: "end" },
    ],
  },
  "mw-2a": {
    question:
      "充了880没返。小优说操作超时，要再充3800修复。\n\n你前后已投了4680。",
    options: [
      { text: "再充3800不然880拿不回来", score: -20, nextId: "mw-2b" },
      { text: "止损不充了", score: -5, nextId: "mw-2c" },
    ],
  },
  "mw-2b": {
    question:
      "你充了3800。小优又说要8000激活。你充了。然后人消失了。\n\n你一共被骗了1万2。这是色诱刷单。",
    options: [{ text: "报警但追不回来了", score: -25, nextId: "end" }],
  },
  "mw-2c": {
    question:
      "你损失880。第二天一个电话打来，说是反诈中心的要你配合调查。你差点二次上当。",
    options: [{ text: "挂断去派出所报警", score: 0, nextId: "end" }],
  },
  "mw-3": {
    question:
      "对方自称老家派出所，说你妈名下的银行卡涉嫌洗钱。他准确报出了你妈的姓名和身份证号。\n\n说需要你把所有资金转到安全账户核查。",
    options: [
      { text: "打114核实对方警号", score: 10, nextId: "mw-3b" },
      { text: "很慌，转钱到安全账户", score: -30, nextId: "mw-3a" },
    ],
  },
  "mw-3a": {
    question:
      "你转了5万。对方说还要转10万。你打电话问你妈有没有这回事，你妈说没有。你才意识到被骗了。损失5万。",
    options: [{ text: "报警", score: -15, nextId: "end" }],
  },
  "mw-3b": {
    question:
      "你打了114，查到这个警号是真的。但你又打了老家派出所电话——他们说这个警号是被人冒用了，是诈骗。你识破了。",
    options: [{ text: "好险", score: 15, nextId: "end" }],
  },
};

// ====== 男·中老年 ======
const maleElder: Record<string, any> = {
  "start-m-elder": {
    question:
      "📍 你已经退休了，每个月的退休金5000多。平时喜欢刷点养生视频，养养花。\n\n今天你刷手机时看到……",
    options: [
      {
        text: "📱 视频推荐：老中医秘方，根治高血压糖尿病，398元一疗程",
        score: 0,
        nextId: "me-1",
      },
      {
        text: "📞 电话：孙子在学校打架把别人打伤了，对方家长要私了",
        score: 0,
        nextId: "me-2",
      },
      {
        text: "💬 微信群：有人发免费领鸡蛋，扫码加微信",
        score: 0,
        nextId: "me-3",
      },
    ],
  },
  "me-1": {
    question:
      "你加了视频里的微信。对方说这是祖传秘方，一个疗程398，三个疗程保证断根。很多老同志都在用。",
    options: [
      { text: "买一个疗程试试", score: -10, nextId: "me-1a" },
      { text: "先问问孩子再说", score: 10, nextId: "me-1b" },
    ],
  },
  "me-1a": {
    question:
      "你付了398。收到货是一包粉末，冲了喝没任何效果。想找对方，发现微信被拉黑了。",
    options: [{ text: "哎，上当了", score: -10, nextId: "end" }],
  },
  "me-1b": {
    question: "你问了孩子，孩子说这是骗老人的套路。你没买。",
    options: [{ text: "明智的选择", score: 10, nextId: "end" }],
  },
  "me-2": {
    question:
      "电话里一个年轻人哭着喊爷爷说我在学校把人打伤了要赔钱。旁边一个自称老师的人接过电话说要3万私了。",
    options: [
      { text: "赶紧转账救人", score: -15, nextId: "me-2a" },
      { text: "先打孙子电话确认", score: 15, nextId: "me-2b" },
    ],
  },
  "me-2a": {
    question:
      "你转了3万。对方说不够还要2万。你凑了又转。然后打孙子电话，孙子说在学校上课呢。你才知道被骗了。\n\n这是AI拟声诈骗。",
    options: [{ text: "报警", score: -15, nextId: "end" }],
  },
  "me-2b": {
    question: "你打了孙子电话，孙子接起来说在上课啥事没有。你知道是骗子了。",
    options: [{ text: "好险！", score: 15, nextId: "end" }],
  },
  "me-3": {
    question:
      "你加了微信。对方把你拉进一个群，每天有人发红包。群里说投资1000元每天返利50元，很多人在晒收益。",
    options: [
      { text: "投1000试试反正群友都说赚了", score: -10, nextId: "me-3a" },
      { text: "觉得不对劲退群", score: 10, nextId: "end" },
    ],
  },
  "me-3a": {
    question:
      "你投了1000。前三天每天收到50块，你很高兴。第五天群主说有个大项目投1万返3万。你投了1万。然后群解散了。",
    options: [{ text: "被骗了", score: -15, nextId: "end" }],
  },
};

// ====== 女·学生 ======
const femaleStudent: Record<string, any> = {
  "start-f-student": {
    question:
      "📍 你是一名大二女生，每个月生活费2000。最近在看新手机，想换iPhone但舍不得。\n\n今晚你在宿舍刷小红书……",
    options: [
      {
        text: "📱 刷到「寄拍模特」：免费送衣服拍照，一单佣金200，很适合你",
        score: 0,
        nextId: "fs-1",
      },
      {
        text: "💬 同学群：有人推荐一个刷单群，日赚100+",
        score: 0,
        nextId: "fs-2",
      },
      { text: "📞 电话：你的快递丢了要理赔", score: 0, nextId: "fs-3" },
    ],
  },
  "fs-1": {
    question:
      "你加了对方微信。她说先交500元押金锁定名额，做满10单退。你交了500。\n\n第一单：一件衣服，让她拍照片发过去。你拍了发过去，她说要付200运费才能寄回商家。",
    options: [
      { text: "付200运费", score: -10, nextId: "fs-1a" },
      { text: "觉得不对要求退押金", score: 5, nextId: "fs-1b" },
    ],
  },
  "fs-1a": {
    question:
      "你付了200。对方说再交1000升级VIP才能接高佣金单。你交了1000。然后人消失了。",
    options: [{ text: "被骗了", score: -15, nextId: "end" }],
  },
  "fs-1b": {
    question:
      "对方不退把你拉黑了。你在小红书一搜，发现好多女生被同样的套路骗了。",
    options: [{ text: "举报她", score: 5, nextId: "end" }],
  },
  "fs-2": {
    question:
      "你加了群。第一单点赞收了5块，第二单关注收了8块。第三单要充值100元才能做联单任务。",
    options: [
      { text: "充100", score: -10, nextId: "fs-2a" },
      { text: "白嫖两单就够了", score: 10, nextId: "end" },
    ],
  },
  "fs-2a": {
    question:
      "充了100做了几单又赚了30。客服说VIP单充2000返2600。你充了2000，提现失败。客服说再充5000升级黄金会员。",
    options: [
      { text: "充5000", score: -25, nextId: "end" },
      { text: "不充了损失2000", score: -5, nextId: "end" },
    ],
  },
  "fs-3": {
    question:
      "对方说你的快递丢了要双倍赔付，让你点链接填银行卡号和验证码。你确实有个快递还没到。",
    options: [
      { text: "点链接操作", score: -10, nextId: "fs-3a" },
      { text: "先去淘宝看物流", score: 10, nextId: "end" },
    ],
  },
  "fs-3a": {
    question: "你输入了卡号和验证码。银行卡被刷走了5000块。",
    options: [{ text: "报警", score: -10, nextId: "end" }],
  },
};

// ====== 女·打工人 ======
const femaleWorker: Record<string, any> = {
  "start-f-worker": {
    question:
      "📍 你在一家公司做行政，月薪7000。最近压力大，常在社交软件上找人聊天。\n\n今晚你回到家刷手机……",
    options: [
      {
        text: "💬 交友软件有人搭讪：头像很帅，聊了几句很投缘",
        score: 0,
        nextId: "fw-1",
      },
      {
        text: "📱 小红书推荐：零基础学做跨境电商，月入3万+",
        score: 0,
        nextId: "fw-2",
      },
      { text: "📞 电话：你的信用卡逾期了要处理", score: 0, nextId: "fw-3" },
    ],
  },
  "fw-1": {
    question:
      "他叫李浩，自称做金融投资。每天早安晚安，聊生活聊理想，特别体贴。\n\n第7天他说：「我发现一个平台漏洞稳赚的，带你一起？」发来一个链接让你注册。",
    options: [
      { text: "注册看看，他应该不会骗我", score: -10, nextId: "fw-1a" },
      { text: "网上认识的，还没见过面", score: 10, nextId: "end" },
    ],
  },
  "fw-1a": {
    question:
      "你注册了，充1000送200，第二天赚了300提现。他说黄金席位充5万送1万。",
    options: [
      { text: "充5万", score: -20, nextId: "fw-1b" },
      { text: "见好就收", score: 5, nextId: "end" },
    ],
  },
  "fw-1b": {
    question:
      "充了5万。提现时客服说要交20%个税。你交了。又说卡号错误交解冻金。你交了。然后人消失了。",
    options: [{ text: "这是杀猪盘", score: -15, nextId: "end" }],
  },
  "fw-2": {
    question:
      "加了微信后对方说交980元课程费包教会。你交了。学了两天后她说要升级课程再交5000才有高收益订单。",
    options: [
      { text: "交5000升级", score: -15, nextId: "fw-2a" },
      { text: "不交了，网上搜一下", score: 5, nextId: "fw-2b" },
    ],
  },
  "fw-2a": {
    question: "交了5000。她消失了。群里几百个姐妹都被骗了。",
    options: [{ text: "报警但难追回", score: -15, nextId: "end" }],
  },
  "fw-2b": {
    question: "你一搜发现好多投诉，是骗局。损失980。",
    options: [{ text: "举报", score: 5, nextId: "end" }],
  },
  "fw-3": {
    question:
      "对方说你的信用卡逾期未还被冻结了，要交3000元解冻。对方准确报出了你的卡号后四位。",
    options: [
      { text: "交3000解冻", score: -10, nextId: "fw-3a" },
      { text: "挂断打银行客服核实", score: 10, nextId: "end" },
    ],
  },
  "fw-3a": {
    question: "你交了3000。他说还要交5000保证金。你意识到不对了。损失3000。",
    options: [{ text: "报警", score: -5, nextId: "end" }],
  },
};

// ====== 女·中老年 ======
const femaleElder: Record<string, any> = {
  "start-f-elder": {
    question:
      "📍 你已经退休了，平时帮带孙子，没事刷刷抖音。\n\n今天你在家里刷手机……",
    options: [
      {
        text: "📱 抖音直播间：养生专家推荐艾灸仪，原价5980限时2980",
        score: 0,
        nextId: "fe-1",
      },
      { text: "📞 电话：孙子在学校出事了，赶紧转钱", score: 0, nextId: "fe-2" },
      { text: "💬 微信群：免费领鸡蛋，加微信就能领", score: 0, nextId: "fe-3" },
    ],
  },
  "fe-1": {
    question: "主播说这个艾灸仪对腰腿痛特别好，今天下单买二送一。你心动了。",
    options: [
      { text: "买一个试试", score: -10, nextId: "fe-1a" },
      { text: "先问问子女", score: 10, nextId: "fe-1b" },
    ],
  },
  "fe-1a": {
    question:
      "你付了2980。收到货是一个塑料壳子根本不发热。退货发现卖家已经拉黑你了。",
    options: [{ text: "被骗了", score: -10, nextId: "end" }],
  },
  "fe-1b": {
    question: "子女说这是骗老人钱的。你没买。",
    options: [{ text: "还好问了", score: 10, nextId: "end" }],
  },
  "fe-2": {
    question: "电话里一个年轻人哭着喊奶奶说我在学校打架了要赔钱。",
    options: [
      { text: "转账救人", score: -15, nextId: "fe-2a" },
      { text: "先打孙子电话", score: 15, nextId: "fe-2b" },
    ],
  },
  "fe-2a": {
    question:
      "转了3万后骗子继续要钱。你打了孙子电话确认发现被骗了。这是AI拟声。",
    options: [{ text: "报警", score: -15, nextId: "end" }],
  },
  "fe-2b": {
    question: "孙子说在上课没事。你识破了。",
    options: [{ text: "好险", score: 15, nextId: "end" }],
  },
  "fe-3": {
    question: "加了微信后被拉进群，群里有人推荐投资理财说稳赚。",
    options: [
      { text: "投点试试", score: -10, nextId: "fe-3a" },
      { text: "退群", score: 10, nextId: "end" },
    ],
  },
  "fe-3a": {
    question: "投了1000赚了50。又投了1万然后群解散了。被骗了。",
    options: [{ text: "不该贪心", score: -15, nextId: "end" }],
  },
};

// 合并所有节点
export const nodes: Record<string, any> = {
  ...baseNodes,
  ...maleStudent,
  ...maleWorker,
  ...maleElder,
  ...femaleStudent,
  ...femaleWorker,
  ...femaleElder,
};

// 根据用户信息获取起始节点ID
export const getStartNodeId = (userInfo: any): string => {
  const gender = userInfo?.gender || "男";
  const age = parseInt(userInfo?.age) || 25;

  let group = "worker"; // 默认打工人
  if (age <= 22) group = "student";
  else if (age >= 51) group = "elder";

  const prefix = gender === "女" ? "f" : "m";
  return `start-${prefix}-${group}`;
};
