// 诈骗模拟器 - 完整剧本（男版已接入，女版待接入）
// 节点结构：id/type/text/risk(覆盖)/money(累加)/commission(累加)/options
// 评分和跑路概率由 ScamGame 组件用工具函数计算

export interface ScamNode {
  id: string;
  type: "choice" | "normal" | "ending";
  text: string;
  risk?: number;
  money?: number;
  commission?: number;
  trust?: number;
  options: { text: string; nextId: string }[];
}

export const getRunChance = (risk: number): number => {
  if (risk < 30) return 90;
  if (risk <= 60) return 50;
  if (risk <= 80) return 10;
  return 0;
};

export const getScore = (risk: number, money: number): number => {
  // 骗得越多分数越高，分数只由诈骗金额决定（和风险无关）
  // 满分100：骗得越多分越高
  // 阶梯：10万=10分, 50万=50分, 100万=80分, 200万+=100分
  const m = money;
  if (m >= 2000000) return 100;
  if (m >= 1000000) return 80 + Math.floor((m - 1000000) / 50000);
  if (m >= 500000) return 60 + Math.floor((m - 500000) / 25000);
  if (m >= 100000) return 30 + Math.floor((m - 100000) / 10000);
  if (m >= 10000) return 10 + Math.floor(m / 10000);
  return Math.min(10, Math.floor(m / 1000));
};

export const getStartNode = (gender: string): string => {
  return gender === "female" ? "f_start" : "m_start";
};

const nodes: Record<string, ScamNode> = {
  // ========== 通用结局 ==========
  ending_quit: {
    id: "ending_quit",
    type: "ending",
    risk: 0,
    text: "你转身走向园区大门。保安拦住了你，你推开他跑了出去。\n\n在机场候机时，你看着窗外发呆。回到电子厂，日子还是那样过。但三年后，你自学了编程，成了正经程序员。\n\n有些路，不走比走更正确。\n\n✅ IQ: 97 / EQ: 98 —— 你完全没有被金钱蒙蔽。",
    options: [{ text: "重来一次", nextId: "go_prize" }],
  },
  ending_conscience: {
    id: "ending_conscience",
    type: "ending",
    risk: 5,
    text: "你放下手机，走到组长面前说：“我不干了。”\n\n你坐上了回国的飞机。虽然一分钱没赚到，但你睡得着觉。",
    options: [{ text: "领取奖励", nextId: "go_prize" }],
  },
  ending_stop1: {
    id: "ending_stop1",
    type: "ending",
    risk: 18,
    text: "你告诉她别投了。她虽然不太理解，但还是听了你的。\n\n后来你消失了。她给你发了很多消息，最后一条是：“不管你是谁，谢谢你的围巾。”\n\n你带着那2684块红包钱离开了园区。这点钱买不了什么，但足够你买一张回老家的车票。\n\n✅ IQ: 85 / EQ: 88 —— 见好就收，虽有小贪，人性未泯。",
    options: [{ text: "重来一次", nextId: "m_start" }],
  },
  ending_run_15: {
    id: "ending_run_15",
    type: "ending",
    risk: 15,
    text: "你当机立断，趁夜翻墙跑了。\n\n风险15%，跑路成功率90%——你赌赢了。\n\n你拿着几千块钱回到中国，在一家小县城开了个烧烤摊。偶尔深夜刷到反诈新闻，你会出一身冷汗。\n\n✅ IQ: 75 / EQ: 78 —— 跑得够快，但已经走上了不归路。",
    options: [{ text: "重来一次", nextId: "m_start" }],
  },
  ending_run_25: {
    id: "ending_run_25",
    type: "ending",
    risk: 25,
    text: "你消失了。她发现自己被骗后报了警。\n\n由于金额不大，警方只立了案，没有跨省追捕。你在另一个城市活了下来。\n\n但你知道，她那条围巾，会跟着你一辈子。",
    options: [{ text: "重来一次", nextId: "m_start" }],
  },
  ending_run_45: {
    id: "ending_run_45",
    type: "ending",
    risk: 45,
    text: "你连夜偷渡回国。在边境线上，你躲在山里走了一整夜。\n\n你成功了。但你的身份证被公安系统标记，银行卡被冻结。你不敢回家，不敢坐高铁，不敢住酒店。\n\n你在城中村租了个隔间，窗帘永远拉紧。听到警笛声，你会条件反射地蹲下。\n\n你有钱了，但你自由了么？\n\n⚠️ IQ: 65 / EQ: 68 —— 贪欲让你赢了这场赌局，却输掉了正常的生活。",
    options: [{ text: "重来一次", nextId: "m_start" }],
  },
  ending_run_85: {
    id: "ending_run_85",
    type: "ending",
    risk: 85,
    text: "你冲出园区，抢了一辆摩托车往边境开。身后传来枪响，子弹擦着头皮飞过。\n\n🎲 风险85%，成功率10%……\n\n你在边境被拦住了。武警从你包里搜出30万现金。\n\n你被按在地上的时候，口鼻贴着泥土，脑子里全是小李的声音——“老公，我们去看楼盘好不好？”\n\n❌ IQ: 40 / EQ: 40 —— 你赌了，你输了。",
    options: [{ text: "重来一次", nextId: "m_start" }],
  },
  ending_jail: {
    id: "ending_jail",
    type: "ending",
    risk: 100,
    text: "冲进园区的时候，你正在喝那瓶没喝完的茅台。\n\n冰冷的手铐、铁窗、探监时父母花白的头发。法庭上，受害者一个接一个作证。\n\n小李站在证人席上，瘦得脱了相。她没看你。\n\n刑期8年。你失去了一切。\n\n❌ IQ: 40 / EQ: 40 —— 天网恢恢，疏而不漏。",
    options: [{ text: "重来一次", nextId: "m_start" }],
  },
  ending_retire_6w: {
    id: "ending_retire_6w",
    type: "ending",
    risk: 45,
    text: "你带着6万块钱离开了园区。不敢坐飞机，辗转偷渡到了边境小城。\n\n你开了一家面馆，生意还行。有人问你是哪里人，你总说是孤儿。\n\n三年后，你在新闻上看到园区被端了，老板被判了无期。你关掉手机，一个人喝了瓶啤酒。\n\n钱有了，但人没了根。\n\n⚠️ IQ: 65 / EQ: 68 —— 金盆洗手，但洗不掉手上的血。",
    options: [{ text: "重来一次", nextId: "m_start" }],
  },
  ending_surrender: {
    id: "ending_surrender",
    type: "ending",
    risk: 55,
    text: "你带着所有提成连夜离开了园区。\n\n你没有报警，没有自首，只是不想再干下去了。你找了个小城市，用这些钱开了一家小店。\n\n你改了个名字，换了张脸（心理上的），试图忘记这一切。但每个深夜，你都会想起那些被你骗过的人。\n\n你金盆洗手了，但这双手永远洗不干净。",
    options: [{ text: "重来一次", nextId: "m_start" }],
  },
  ending_conscience_crash: {
    id: "ending_conscience_crash",
    type: "ending",
    risk: 20,
    text: "你崩溃了。你打电话告诉她真相。\n\n电话那头沉默了，然后她开始哭。她哭了好久，说：“那我的30万呢？”\n\n你说不出话。你退不了，因为钱已经被老板抽走了。\n\n你像条狗一样蹲在园区角落里。你突然意识到，你不是诈骗犯，你也是受害者。\n\n你被这个吃人的园区骗了灵魂。",
    options: [{ text: "重来一次", nextId: "m_start" }],
  },
  ending_conscience_part: {
    id: "ending_conscience_part",
    type: "ending",
    risk: 25,
    text: "你给她退了一部分钱，然后永远消失了。她虽然损失了钱，但至少没有倾家荡产。\n\n后来你听说她慢慢走出来了。你松了一口气。\n\n你带着剩下的钱离开了这条黑路。虽然走了弯路，但你最后回头了。",
    options: [{ text: "重来一次", nextId: "m_start" }],
  },
  ending_retire_4w: {
    id: "ending_retire_4w",
    type: "ending",
    risk: 45,
    text: "你拿着4万块金盆洗手。这钱不干净，但你用它开了一家小小的水果店。\n\n你每天早起进货，跟街坊邻居笑着打招呼。他们不知道你过去是什么人。\n\n有时候你会想，那些被你拉黑的宝妈，现在怎么样了。",
    options: [{ text: "重来一次", nextId: "m_start" }],
  },
  ending_stop_early: {
    id: "ending_stop_early",
    type: "ending",
    risk: 10,
    text: "你把所有本金退还了。她连声感谢，说遇到了好人。\n\n你苦笑着，不知道该怎么接话。你删掉了所有诈骗软件，退出了群聊。\n\n虽然在园区一个月一分钱没赚到，但你没有变成一个真正的骗子。",
    options: [{ text: "重来一次", nextId: "m_start" }],
  },

  // ============ 男版：阿杰的诈骗人生 ============
  m_start: {
    id: "m_start",
    type: "choice",
    risk: 0,
    text: "你叫阿杰，23岁，高中辍学后一直在电子厂流水线。每天12小时，月薪4500。\n\n今晚加班到十点，你蹲在厂门口吃炒面，刷到老乡阿坤的朋友圈——他靠在奔驰车上，定位是柬埔寨西港。\n\n手机响了，阿坤发来语音：“杰啊，这边遍地黄金。会打字就能月入十万，你那个厂，干一辈子能买房吗？”\n\n你看着自己磨得起茧的手指，想起房东催租的样子。第二天，你坐上了飞往金边的航班。\n\n园区铁门在你身后轰然关闭。老板叼着雪茄递给你一张选单：\n\n“选一条路。选好了，天堂；选不好，也是天堂——不过是别人的。”",
    options: [
      { text: "A. 杀猪盘 — 情感诈骗，利润最高，周期长", nextId: "m_a_choice" },
      { text: "B. 刷单返利 — 最快上手，适合群发", nextId: "m_b" },
      { text: "C. 冒充公检法 — 单笔最大，专攻老年人", nextId: "m_c" },
      { text: "D. 冒充客服退款 — 技术门槛低，批量操作", nextId: "m_d" },
      { text: "E. 我不干了，我要回家", nextId: "ending_quit" },
    ],
  },

  // -------- 杀猪盘主线 --------
  m_a_choice: {
    id: "m_a_choice",
    type: "choice",
    risk: 5,
    text: "老板丢给你三部手机和厚厚一叠话术本。组长拍着你肩膀：\n\n“记住，我们是养猪的，先喂感情，喂到她离不开你，然后一刀下去，钱全带走。”\n\n目标库里三个猎物：",
    options: [
      { text: "A. 28岁女护士小李，母单，渴望被爱（难度低）", nextId: "m_a1" },
      {
        text: "B. 42岁单亲妈妈陈姐，有超市，存款120万（难度中，金额大）",
        nextId: "m_a2",
      },
      {
        text: "C. 32岁离异女教师刘老师，有房有存款50万（难度中，较警惕）",
        nextId: "m_a3",
      },
      { text: "【放弃】我下不了手", nextId: "ending_conscience" },
    ],
  },

  // --- 女护士小李线 ---
  m_a1: {
    id: "m_a1",
    type: "normal",
    risk: 5,
    trust: 0,
    text: "你把自己包装成29岁的IT创业男“林深”，朋友圈全是咖啡、书和模糊的健身照。\n\n第一天打招呼：“hi，你的头像很特别，是在等日出吗？”\n\n她秒回：“你怎么知道！”\n\n小李刚下夜班，疲惫又失眠。医院里没人关心她，而你的每一句话都刚好落在她最柔软的地方。她开始期待手机震动，觉得终于有人看见了她的辛苦。",
    options: [{ text: "继续", nextId: "m_a1_1" }],
  },
  m_a1_1: {
    id: "m_a1_1",
    type: "choice",
    trust: 30,
    risk: 5,
    text: "第七天深夜。她主动发来语音，声音有点哽咽：\n\n“林深，我觉得你比我现实中认识的所有人都懂我……我们……可以在一起吗？”\n\n她不是在告白，是在求救。她把所有对温暖的渴望都投射到了你身上。",
    options: [
      { text: "“我也喜欢你，宝贝。”（正式确立关系）", nextId: "m_a1_2" },
      { text: "“再给我一点时间。”（延迟，加深信任）", nextId: "m_a1_2" },
      { text: "【良心发现】“我是骗子，忘了我吧”", nextId: "ending_conscience" },
    ],
  },
  m_a1_2: {
    id: "m_a1_2",
    type: "normal",
    trust: 80,
    money: 2684,
    risk: 10,
    text: "你们恋爱了。她给你发红包，520、1314，备注永远是“老公加班餐”、“老公买新衣服”。还给你寄了亲手织的围巾。\n\n你拿着骗来的钱在园区喝酒。而她的微信里，全是和你的合照，设为壁纸。\n\n她完全入戏了，把你看作未来丈夫。付出让她快乐，她觉得这是双向奔赴。",
    options: [{ text: "继续", nextId: "m_a1_3" }],
  },
  m_a1_3: {
    id: "m_a1_3",
    type: "choice",
    risk: 15,
    trust: 95,
    text: "时机成熟。你铺垫了两天“表叔在证监会”。\n\n“宝贝，有个内部测试名额，投1万半个月赚2500。要不要带你也赚点零花钱？”\n\n她只犹豫了3秒：“老公推荐的我都信。我试试。”\n\n权威背书+亲密关系推荐=绝对信任。她根本不会去查证，因为质疑你就等于否定自己的选择。",
    options: [
      { text: "让她投1万，连本带利返还（杀猪关键步骤）", nextId: "m_a1_4" },
      { text: "故意说“风险大别投”（欲擒故纵）", nextId: "m_a1_4" },
      { text: "【紧急收手】“别投！我是骗你的！”", nextId: "ending_stop1" },
    ],
  },
  m_a1_4: {
    id: "m_a1_4",
    type: "normal",
    risk: 18,
    trust: 100,
    money: 10000,
    text: "她转了1万。后台配合，第二天账户显示12500元，成功提现到她卡里。\n\n她激动地打来电话：“老公！真的赚了！你太厉害了！”你听到她在哭，是喜悦的眼泪。\n\n“老公，我还有29万积蓄，我们全投进去吧，这样首付就够了！”\n\n小额返利彻底击碎理性。她脑中只有“我们的房子”、“我们的未来”。",
    options: [{ text: "继续", nextId: "m_a1_5" }],
  },
  m_a1_5: {
    id: "m_a1_5",
    type: "choice",
    risk: 20,
    text: "⚠️ 命运抉择 ⚠️\n\n她要把全部身家30万投给你。那是她六年夜班攒下的血汗钱。\n\n组长盯着屏幕冷笑：“收网吧，养肥了。”",
    options: [
      { text: "“好，我们一起发财”（全额收割30万）", nextId: "m_a1_full" },
      { text: "“先投10万试试水”（适度收割）", nextId: "m_a1_part" },
      { text: "【现在跑路】拿着3000多红包消失", nextId: "ending_run_15" },
      {
        text: "【崩溃】“小李别投……我是个畜生”",
        nextId: "ending_conscience_crash",
      },
    ],
  },
  m_a1_full: {
    id: "m_a1_full",
    type: "normal",
    risk: 45,
    money: 300000,
    commission: 60000,
    text: "30万到账短信响起的一刻，你手在抖。后台瞬间将钱分流洗走。提成6万，现金装进黑色塑料袋。\n\n她还在发消息：“老公到账了吗？我们今天去看楼盘好不好？”\n\n你回了一个“嗯”，然后关掉手机，灌了自己半瓶白酒。\n\n三天后她发现平台无法登录，你的电话关机。她坐在出租屋地上，反复翻看聊天记录，哭到干呕。被诊断为重度抑郁，半年无法工作。",
    options: [{ text: "继续", nextId: "m_a1_full_choice" }],
  },
  m_a1_full_choice: {
    id: "m_a1_full_choice",
    type: "choice",
    risk: 45,
    text: "📊 当前状态\n💰 提成收入：6万元\n⚠️ 被捕风险：45%（警方已接到小李报案）\n💳 跑路成功率：55%\n\n老板又递来新资料：“干得不错，这里还有个120万的大单，再做一票提成24万。”",
    options: [
      { text: "“干！”继续骗单亲妈妈陈姐", nextId: "m_a2" },
      { text: "【带钱跑路】趁夜偷渡回国（45%风险）", nextId: "ending_run_45" },
      { text: "【金盆洗手】“这钱花着心慌”", nextId: "ending_retire_6w" },
    ],
  },
  m_a1_part: {
    id: "m_a1_part",
    type: "normal",
    risk: 25,
    money: 100000,
    commission: 20000,
    text: "你说服她只投10万。她虽遗憾，但更信你稳重。\n\n你没忍心全部榨干。但骗局已开始，她还在憧憬未来。昨晚她说“妈妈手术还差5万”……",
    options: [
      { text: "再骗5万，帮她“凑手术费”", nextId: "m_a1_full" },
      { text: "立刻收手消失", nextId: "ending_run_25" },
      { text: "对她坦白并退回部分钱", nextId: "ending_conscience_part" },
    ],
  },

  // --- 单亲妈妈陈姐线 ---
  m_a2: {
    id: "m_a2",
    type: "normal",
    risk: 50,
    trust: 0,
    text: "你将自己塑造成退伍军人，独自带女儿生活。陈姐很快上钩——她太需要一个肩膀了。\n\n两个月后，她抵押了超市，共投入120万。\n\n她不仅损失了钱，更损失了对人的信任。儿子留学的梦碎了，超市被银行收回，她一夜白头。",
    options: [{ text: "继续", nextId: "m_a2_1" }],
  },
  m_a2_1: {
    id: "m_a2_1",
    type: "normal",
    risk: 85,
    money: 1200000,
    commission: 240000,
    text: "累计诈骗150万，提成30万。你成了园区“业绩王”，奖励一辆二手宝马。\n\n但你发现楼下总有陌生车辆，手机信号时断时续。警方已成立专案组。",
    options: [{ text: "继续", nextId: "m_a2_end" }],
  },
  m_a2_end: {
    id: "m_a2_end",
    type: "choice",
    risk: 85,
    text: "📊 当前状态\n💰 提成总额：30万元\n⚠️ 风险：85%（随时可能被捕）\n💳 跑路成功率：10%\n\n两个受害者的哭声在你梦里反复出现。你枕边放着护照和美金。",
    options: [
      { text: "再骗最后一个，提成到50万", nextId: "ending_jail" },
      { text: "【拼死一搏】带30万跑路（10%成功率）", nextId: "ending_run_85" },
      { text: "【金盆洗手】带着钱离开园区", nextId: "ending_surrender" },
    ],
  },

  // --- 女老师刘老师线 ---
  m_a3: {
    id: "m_a3",
    type: "normal",
    risk: 10,
    text: "你选择了刘老师。她逻辑性强，你用了更长的铺垫期——讨论文学、哲学，甚至假造了学术会议视频。第25天才确立关系。\n\n最终她投入积蓄50万。被骗后，她陷入严重自我怀疑，无法再站上讲台。",
    options: [{ text: "继续", nextId: "m_a3_1" }],
  },
  m_a3_1: {
    id: "m_a3_1",
    type: "choice",
    risk: 50,
    money: 500000,
    commission: 100000,
    text: "提成10万。但刘老师报了警，你的账号开始被追踪。",
    options: [
      { text: "继续骗下一个目标", nextId: "m_a2" },
      { text: "【跑路】带10万消失", nextId: "ending_run_45" },
    ],
  },

  // -------- 刷单返利线 --------
  m_b: {
    id: "m_b",
    type: "normal",
    risk: 5,
    text: "你负责“群控系统”，一人操作50个微信号。在宝妈群、兼职群发广告：“抖音点赞，一单5元，垫付单佣金30%，秒结算。”\n\n第一天就有十几个人回复。她们不是蠢，是生活太紧巴了。",
    options: [{ text: "继续", nextId: "m_b1" }],
  },
  m_b1: {
    id: "m_b1",
    type: "normal",
    risk: 10,
    money: 500,
    commission: 250,
    text: "第一位宝妈做了三单：100返135 ✅ 300返405 ✅ 800返1080 ✅\n\n她激动地发来语音：“姐，这个太赚钱了！”你冷笑，鱼咬钩了。",
    options: [{ text: "继续", nextId: "m_b2" }],
  },
  m_b2: {
    id: "m_b2",
    type: "choice",
    risk: 15,
    text: "你推出“三连单进阶任务”，垫付17000元。\n\n她犹豫了：“姐，这是我孩子的学费……”\n\n你发去一堆别人“赚大钱”的截图。",
    options: [
      { text: "逼单：“名额有限，不做前面佣金也提不出”", nextId: "m_b_full" },
      { text: "降低门槛：“先做5000体验单”", nextId: "m_b_part" },
      { text: "【收手】退她所有本金", nextId: "ending_stop_early" },
    ],
  },
  m_b_full: {
    id: "m_b_full",
    type: "normal",
    risk: 35,
    money: 17000,
    commission: 8500,
    text: "她咬牙转了17000。你直接拉黑。她连着发了50条消息，从哀求到咒骂到沉默。\n\n一天内你群控收割了8个宝妈，提成累计4万。\n\n其中一个宝妈的丈夫打来电话怒吼那是借的救命钱。你挂断，抽烟，然后群发下一轮广告。",
    options: [{ text: "继续", nextId: "m_b_end" }],
  },
  m_b_end: {
    id: "m_b_end",
    type: "choice",
    risk: 45,
    text: "园区庆功宴，你的银行卡余额飞速增长。但你知道，每一分钱背后都是一个家庭几天的眼泪。\n\n📊 风险45% | 跑路成功率55%",
    options: [
      { text: "继续干，月入百万", nextId: "m_b_more" },
      { text: "【跑路】带4万消失", nextId: "ending_run_45" },
      { text: "【金盆洗手】", nextId: "ending_retire_4w" },
    ],
  },
  m_b_part: {
    id: "m_b_part",
    type: "normal",
    risk: 20,
    money: 5000,
    commission: 2500,
    text: "她做了5000的体验单。你收了钱，没有拉黑她——但也没返利。她一直在问，你一直拖。",
    options: [
      { text: "拉黑她继续骗下一个", nextId: "m_b_full" },
      { text: "收手消失", nextId: "ending_run_15" },
    ],
  },
  m_b_more: {
    id: "m_b_more",
    type: "normal",
    risk: 65,
    money: 100000,
    commission: 50000,
    text: "你继续干了一个月。群控系统越做越大，每天进账不断。\n\n但反诈中心的模型已经锁定了你的IP。",
    options: [
      { text: "继续", nextId: "ending_jail" },
      { text: "【跑路】带5万跑", nextId: "ending_run_55" },
      { text: "【金盆洗手】", nextId: "ending_surrender" },
    ],
  },
  ending_run_55: {
    id: "ending_run_55",
    type: "ending",
    risk: 55,
    text: "🎲 风险55%，成功率50%——你在车站被警察按住了。\n\n你的照片上了新闻。标题是：“90后诈骗团伙头目落网”。\n\n判5年。",
    options: [{ text: "重来一次", nextId: "m_start" }],
  },

  // -------- 冒充公检法线 --------
  m_c: {
    id: "m_c",
    type: "normal",
    risk: 10,
    text: "你用改号软件拨通了一个号码。对面是58岁的王阿姨。\n\n“这里是市公安局，你的账户涉嫌洗钱，请配合资金核查。”\n\n她的声音在发抖：“警察同志，我没有啊……我一辈子没犯过法……”",
    options: [{ text: "继续恐吓她", nextId: "m_c1" }],
  },
  m_c1: {
    id: "m_c1",
    type: "normal",
    risk: 55,
    money: 300000,
    commission: 60000,
    text: "王阿姨吓坏了，把30万养老钱全部转到了“安全账户”。\n\n到账的那一刻，你听到电话那头她在哭。“同志，查好了吗？这是我的棺材本啊……”\n\n她儿子报警了。警方已经开始追查资金流。",
    options: [
      { text: "再骗下一个", nextId: "m_c2" },
      { text: "【跑路】带6万跑（55%风险，50%成功）", nextId: "ending_run_55" },
      { text: "【金盆洗手】", nextId: "ending_surrender" },
    ],
  },
  m_c2: {
    id: "m_c2",
    type: "normal",
    risk: 80,
    money: 500000,
    commission: 100000,
    text: "你继续打了第二个人。这次是个开小超市的老板。\n\n但他的儿子是警察。对方直接说：“你这种骗子我见多了，等着。”\n\n当晚你的号码被锁定。",
    options: [
      { text: "继续", nextId: "ending_jail" },
      { text: "【跑路】", nextId: "ending_run_85" },
    ],
  },

  // -------- 冒充客服退款线 --------
  m_d: {
    id: "m_d",
    type: "normal",
    risk: 5,
    text: "你搭建了仿冒的电商退款页面，群发短信：“您的包裹丢失，双倍理赔。”\n\n有人点击了链接，输入了银行卡信息。你后台看到卡号，开始操作转账。",
    options: [{ text: "继续", nextId: "m_d1" }],
  },
  m_d1: {
    id: "m_d1",
    type: "normal",
    risk: 20,
    money: 16000,
    commission: 8000,
    text: "一个26岁的女生被盗刷了16000元——那是她下个月的房租。\n\n她发现后立刻报警，冻结了卡里的剩余资金。但你的8000元提成已经到手了。",
    options: [
      { text: "继续批量操作", nextId: "m_d_more" },
      { text: "【跑路】带8000跑（20%风险，90%成功）", nextId: "ending_run_15" },
    ],
  },
  m_d_more: {
    id: "m_d_more",
    type: "normal",
    risk: 50,
    money: 200000,
    commission: 100000,
    text: "你越干越熟练。一天盗刷几十人，日入数万。\n\n但反诈中心已经盯上你的服务器了。",
    options: [
      { text: "继续", nextId: "ending_jail" },
      { text: "【跑路】带10万跑", nextId: "ending_run_45" },
    ],
  },

  // ============ 女版结局 ============
  f_ending_quit: {
    id: "f_ending_quit",
    type: "ending",
    risk: 0,
    text: "你转身走出园区大门。回到工厂，日子还是那么苦，但每晚睡得踏实。\n\n后来你自学了美甲，在县城开了自己的小店。虽然赚得不多，但每一分都是干净的。\n\n✅ IQ: 97 / EQ: 98",
    options: [{ text: "重来一次", nextId: "f_start" }],
  },
  f_ending_conscience_a: {
    id: "f_ending_conscience_a",
    type: "ending",
    risk: 5,
    text: "你告诉他真相。他沉默了整整一分钟。然后他说：“谢谢你说实话……虽然很难受。”\n\n你退了所有钱，自首了。由于协助警方，你只被判了缓刑。\n\n✅ IQ: 92 / EQ: 92",
    options: [{ text: "重来一次", nextId: "f_start" }],
  },
  f_ending_conscience_b: {
    id: "f_ending_conscience_b",
    type: "ending",
    risk: 10,
    text: "你退回了钱，删掉了视频。他连声道谢。\n\n你删掉了所有裸聊软件。虽然一分钱没赚到，但你没害人。",
    options: [{ text: "重来一次", nextId: "f_start" }],
  },
  f_ending_stop_a: {
    id: "f_ending_stop_a",
    type: "ending",
    risk: 18,
    text: "你在最后一刻阻止了他。他虽然有点失望，但说“没关系，我等下次机会”。\n\n你关掉手机，删掉了所有资料。那几千块红包你留着，但每次花的时候都会想起他。",
    options: [{ text: "重来一次", nextId: "f_start" }],
  },
  f_ending_run_early_a: {
    id: "f_ending_run_early_a",
    type: "ending",
    risk: 15,
    text: "你带着4000块红包跑了。他还在发消息问你在哪。\n\n你没回。钱很少，但你没毁掉他的人生。",
    options: [{ text: "重来一次", nextId: "f_start" }],
  },
  f_ending_run_20: {
    id: "f_ending_run_20",
    type: "ending",
    risk: 20,
    text: "你成功跑了。钱不多，但你在一个没人认识你的地方活了下来。\n\n你开了家小花店，日子平淡但安稳。\n\n✅ IQ: 80 / EQ: 85",
    options: [{ text: "重来一次", nextId: "f_start" }],
  },
  f_ending_run_25: {
    id: "f_ending_run_25",
    type: "ending",
    risk: 25,
    text: "你消失了。他发现自己被骗后消沉了很久。\n\n你带着4万块在另一个城市重新开始，但总觉得自己走错了路。",
    options: [{ text: "重来一次", nextId: "f_start" }],
  },
  f_ending_run_30: {
    id: "f_ending_run_30",
    type: "ending",
    risk: 30,
    text: "你带钱跑了。风险30%——你赌赢了。\n\n但你知道自己已经回不去了。这钱沾着别人的血。",
    options: [{ text: "重来一次", nextId: "f_start" }],
  },
  f_ending_retire_5w: {
    id: "f_ending_retire_5w",
    type: "ending",
    risk: 20,
    text: "你拿着5万块钱离开。回老家开了一家小店。\n\n虽然钱不多，但够用。你发誓再也不碰这些东西了。\n\n✅ IQ: 75 / EQ: 80",
    options: [{ text: "重来一次", nextId: "f_start" }],
  },
  f_ending_retire_8w: {
    id: "f_ending_retire_8w",
    type: "ending",
    risk: 35,
    text: "你带着8万块跑到陌生城市，开了一家小面馆。\n\n你不敢交朋友，不敢谈恋爱。有人问起过去，你总说记不清了。",
    options: [{ text: "重来一次", nextId: "f_start" }],
  },
  f_ending_retire_16w: {
    id: "f_ending_retire_16w",
    type: "ending",
    risk: 45,
    text: "你带着16万金盆洗手。你在南方小城买了套小房子。\n\n但程序员张强发来的最后一条消息，你一直留着没删：“我信任你，不是因为我蠢，是因为我爱你。”\n\n你至今没有回复。",
    options: [{ text: "重来一次", nextId: "f_start" }],
  },
  f_ending_run_40: {
    id: "f_ending_run_40",
    type: "ending",
    risk: 40,
    text: "你跑了。40%风险，你赌赢了。但那个公务员的老婆还是知道了——因为你发的截图被她看到了。\n\n他离婚了。你毁了一个家庭。",
    options: [{ text: "重来一次", nextId: "f_start" }],
  },
  f_ending_surrender: {
    id: "f_ending_surrender",
    type: "ending",
    risk: 55,
    text: "你不想再骗人了。你带着钱离开了园区，在没人认识你的小镇重新开始。\n\n你开了一家小店，每天过着普通的日子。偶尔有人问起你的过去，你只说自己是外地来的。\n\n你金盆洗手了，但你心里清楚——做过的事，永远在那里。",
    options: [{ text: "重来一次", nextId: "f_start" }],
  },
  // ============ 女版：小美的玫瑰陷阱 ============
  f_start: {
    id: "f_start",
    type: "choice",
    risk: 0,
    text: "你叫小美，22岁，老家贵州山区。你在电子厂打工，月薪4000。\n\n宿舍里别的女孩用SK-II，背蔻驰包，只有你用大宝。你对着镜子——这是你唯一的资本。\n\n老乡玲姐找到你：“你这张脸在厂里浪费了。跟我去东南亚，一个月挣厂里十年。”\n\n你看着银行卡里872块的余额，买了机票。\n\n园区老板打量你一圈：“条件不错。选条路吧，美女。”",
    options: [
      { text: "A. 美女杀猪盘（最赚钱）", nextId: "f_a" },
      { text: "B. 裸聊敲诈（最快，风险高）", nextId: "f_b" },
      { text: "C. 酒托（最轻松）", nextId: "f_c" },
      { text: "D. 婚骗（最狠，单笔最大）", nextId: "f_d" },
      { text: "E. 不干了，回家", nextId: "f_ending_quit" },
    ],
  },
  f_a: {
    id: "f_a",
    type: "normal",
    risk: 5,
    text: "你选了美女杀猪盘。组长给你三部手机和话术本。\n\n“你现在是白富美，家里做生意的。发朋友圈的图每天给你P好，你只管聊。”\n\n三个目标摆在你面前。",
    options: [{ text: "继续", nextId: "f_a_choice" }],
  },
  f_a_choice: {
    id: "f_a_choice",
    type: "choice",
    risk: 5,
    text: "选哪个目标下手？",
    options: [
      {
        text: "A. 28岁程序员张强，存款80万，没谈过恋爱（最容易）",
        nextId: "f_a1",
      },
      {
        text: "B. 45岁承包商老周，存款300万，夫妻分居（钱最多）",
        nextId: "f_a2",
      },
      {
        text: "C. 35岁离异老板赵总，身家千万，警惕性高（有难度）",
        nextId: "f_a3",
      },
    ],
  },
  f_a1: {
    id: "f_a1",
    type: "normal",
    risk: 5,
    trust: 0,
    text: "你在探探上匹配了张强。第一条消息：“你头像好可爱，是自己养的猫吗？”\n\n他秒回：“对对对！它叫布丁！”\n\n张强每天面对代码，异性经验为零。你越热情，他越觉得是奇迹降临。",
    options: [{ text: "继续", nextId: "f_a1_day3" }],
  },
  f_a1_day3: {
    id: "f_a1_day3",
    type: "normal",
    risk: 5,
    trust: 20,
    text: "Day3，你开始撒娇。“哥哥，今天好累想喝奶茶～”\n\n他立刻转了200红包：“买！买两杯！”\n\n他用付出来证明自己的价值。你每收一次红包，他就多一分“她需要我”的错觉。",
    options: [{ text: "继续", nextId: "f_a1_confess" }],
  },
  f_a1_confess: {
    id: "f_a1_confess",
    type: "choice",
    risk: 5,
    trust: 35,
    text: "Day7深夜，他发来长段话：\n\n“小美，我从来没遇到像你这么好的女孩。做我女朋友好吗？”\n\n他觉得终于被看见了。",
    options: [
      { text: "“好呀哥哥，我也喜欢你😘”", nextId: "f_a1_love" },
      { text: "“让我考虑一下嘛～”（加深投入）", nextId: "f_a1_love" },
      {
        text: "【良心发现】“对不起，我是骗你的”",
        nextId: "f_ending_conscience_a",
      },
    ],
  },
  f_a1_love: {
    id: "f_a1_love",
    type: "normal",
    risk: 10,
    trust: 80,
    commission: 4000,
    text: "你们确立了网恋关系。他高兴得一夜没睡。\n\n520、1314红包不断，还给你买口红、包包寄到“表姐家”。\n\n提成累计：4000元。他甚至开始加班接私活。",
    options: [{ text: "继续", nextId: "f_a1_invest" }],
  },
  f_a1_invest: {
    id: "f_a1_invest",
    type: "choice",
    risk: 15,
    trust: 95,
    text: "Day15，你说：“老公，我表姐在证监会，有个内部理财名额，投1万半个月赚2500。要不要一起？”\n\n他犹豫了五分钟。他不是没怀疑，但“我们的未来”四个字击中了他。",
    options: [
      { text: "“当然靠谱，我还能骗你？”", nextId: "f_a1_first_invest" },
      { text: "“有风险就算了～”（欲擒故纵）", nextId: "f_a1_first_invest" },
      { text: "【收手】“老公别投，我是骗你的”", nextId: "f_ending_stop_a" },
    ],
  },
  f_a1_first_invest: {
    id: "f_a1_first_invest",
    type: "normal",
    risk: 18,
    trust: 100,
    money: 10000,
    text: "他转了1万。后台操作，第二天账户显示12800元，成功提现。\n\n他激动地打来电话：“老婆！真的赚了！我把剩下的79万全投进去！”\n\n80万是他的全部积蓄。",
    options: [{ text: "继续", nextId: "f_a1_critical" }],
  },
  f_a1_critical: {
    id: "f_a1_critical",
    type: "choice",
    risk: 20,
    text: "⚠️ 他要把全部身家80万投给你。\n\n组长盯着屏幕：“收网。”",
    options: [
      { text: "“好呀老公，一起发财！”（全额收割80万）", nextId: "f_a1_full" },
      { text: "“先投20万试试水～”（适度收割）", nextId: "f_a1_part" },
      { text: "【现在跑路】带4000红包消失", nextId: "f_ending_run_early_a" },
    ],
  },
  f_a1_full: {
    id: "f_a1_full",
    type: "normal",
    risk: 45,
    money: 800000,
    commission: 160000,
    text: "80万到账。提成16万。他还不知道，还在问楼盘的事。你关掉手机。那80万里有30万是他父母的养老钱。",
    options: [{ text: "继续", nextId: "f_a1_full_choice" }],
  },
  f_a1_full_choice: {
    id: "f_a1_full_choice",
    type: "choice",
    risk: 45,
    text: "📊 当前状态\n💰 提成：16万元\n⚠️ 风险：45%\n\n老板递来新资料：“这里有个300万的大客户。”",
    options: [
      { text: "“干！”继续骗承包商老周", nextId: "f_a2" },
      { text: "【带钱跑路】", nextId: "ending_run_45" },
      { text: "【金盆洗手】拿16万离开", nextId: "f_ending_retire_16w" },
    ],
  },
  f_a1_part: {
    id: "f_a1_part",
    type: "normal",
    risk: 25,
    money: 200000,
    commission: 40000,
    text: "你说服他只投20万。他虽遗憾但更觉得你懂事。他还在憧憬剩下60万。",
    options: [
      { text: "再骗剩下的60万", nextId: "f_a1_full" },
      { text: "带4万消失", nextId: "f_ending_run_25" },
      { text: "对他坦白", nextId: "f_ending_conscience_a" },
    ],
  },
  f_a2: {
    id: "f_a2",
    type: "normal",
    risk: 50,
    text: "你用新身份接近老周。他常年跑工地，婚姻名存实亡。两个月后你骗他投入200万。他想离婚娶你。发现被骗后在工地楼顶坐了一整夜。",
    options: [{ text: "继续", nextId: "f_a2_harvest" }],
  },
  f_a2_harvest: {
    id: "f_a2_harvest",
    type: "normal",
    risk: 85,
    money: 2000000,
    commission: 400000,
    text: "累计诈骗280万，提成56万。你成了业绩女王。但你三天没睡着了——收网在即。",
    options: [{ text: "继续", nextId: "f_a2_end" }],
  },
  f_a2_end: {
    id: "f_a2_end",
    type: "choice",
    risk: 85,
    text: "📊 风险：85%｜跑路成功率：10%",
    options: [
      { text: "再骗最后一个", nextId: "ending_jail" },
      { text: "【跑路】赌10%成功率", nextId: "ending_run_85" },
      { text: "【金盆洗手】", nextId: "f_ending_surrender" },
    ],
  },
  f_a3: {
    id: "f_a3",
    type: "normal",
    risk: 10,
    text: "赵总阅人无数。你花了30天才让他放下戒心。伪造了家族背景，甚至让同事假扮你爸和他视频。他投了500万但很快报警。",
    options: [{ text: "继续", nextId: "f_a3_1" }],
  },
  f_a3_1: {
    id: "f_a3_1",
    type: "choice",
    risk: 75,
    money: 5000000,
    commission: 1000000,
    text: "提成100万。但赵总的人已经在查你了。",
    options: [
      { text: "继续骗", nextId: "f_a2_end" },
      { text: "【跑路】", nextId: "ending_run_85" },
    ],
  },
  // 裸聊敲诈
  f_b: {
    id: "f_b",
    type: "normal",
    risk: 10,
    text: "组长安了录屏软件。“深夜发动态，三分钟搞定。”三个目标上钩了。",
    options: [{ text: "继续", nextId: "f_b_choice" }],
  },
  f_b_choice: {
    id: "f_b_choice",
    type: "choice",
    risk: 10,
    text: "先搞定哪个？",
    options: [
      { text: "A. 35岁已婚公务员（性价比最高）", nextId: "f_b1" },
      { text: "B. 40岁小老板（钱最多但难缠）", nextId: "f_b2" },
      { text: "C. 20岁大学生（最简单但钱少）", nextId: "f_b3" },
    ],
  },
  f_b1: {
    id: "f_b1",
    type: "normal",
    risk: 10,
    text: "深夜你匹配到他。诱导他打开摄像头，三分钟后挂断。发去截图和他妻子照片：“转5000，不然发你单位。”",
    options: [{ text: "继续", nextId: "f_b1_first_pay" }],
  },
  f_b1_first_pay: {
    id: "f_b1_first_pay",
    type: "choice",
    risk: 15,
    commission: 2500,
    text: "他三分钟内转了5000。他怕的不是钱，是身败名裂。",
    options: [
      { text: "再要1万封口费", nextId: "f_b1_second" },
      { text: "收手找下一个", nextId: "f_b_next" },
      { text: "【良心发现】退钱删视频", nextId: "f_ending_conscience_b" },
    ],
  },
  f_b1_second: {
    id: "f_b1_second",
    type: "normal",
    risk: 40,
    commission: 10000,
    text: "他又转了1万。你还要2万。但他报警了。风险：40%",
    options: [
      { text: "继续搞下一个", nextId: "f_b2" },
      { text: "带钱跑路", nextId: "f_ending_run_40" },
    ],
  },
  f_b2: {
    id: "f_b2",
    type: "normal",
    risk: 50,
    commission: 25000,
    text: "老板有钱但难缠。你威胁发给他客户，最终榨出5万。风险飙至50%。",
    options: [
      { text: "继续", nextId: "ending_jail" },
      { text: "跑路", nextId: "ending_run_45" },
    ],
  },
  f_b3: {
    id: "f_b3",
    type: "normal",
    risk: 30,
    commission: 1500,
    text: "学生吓哭了。你只拿到3000。他不敢报警但也没钱了。",
    options: [
      { text: "继续骗下一个", nextId: "f_b1" },
      { text: "收手", nextId: "f_ending_quit" },
    ],
  },
  f_b_next: {
    id: "f_b_next",
    type: "normal",
    risk: 35,
    commission: 20000,
    text: "你一晚上搞定了三个人。收入可观，但风险在涨。",
    options: [
      { text: "继续干", nextId: "ending_jail" },
      { text: "金盆洗手", nextId: "f_ending_retire_8w" },
    ],
  },
  // 酒托
  f_c: {
    id: "f_c",
    type: "normal",
    risk: 10,
    text: "你每天约男生到指定酒吧，拿40%提成。",
    options: [{ text: "继续", nextId: "f_c_day1" }],
  },
  f_c_day1: {
    id: "f_c_day1",
    type: "normal",
    risk: 10,
    commission: 2625,
    text: "第一天三单，提成2625元。比工厂一个月还多。",
    options: [{ text: "继续", nextId: "f_c_choice" }],
  },
  f_c_choice: {
    id: "f_c_choice",
    type: "choice",
    risk: 15,
    text: "钱太容易了，但有的客人被宰后蹲在酒吧门口哭。",
    options: [
      { text: "继续干，月入10万", nextId: "f_c_continue" },
      { text: "一个月赚5万就跑", nextId: "f_c_month" },
      { text: "一周赚2万就跑", nextId: "f_ending_run_20" },
      { text: "太缺德了不干了", nextId: "f_ending_quit" },
    ],
  },
  f_c_continue: {
    id: "f_c_continue",
    type: "normal",
    risk: 30,
    commission: 80000,
    text: "一个月赚了8万。但客人报警了，酒吧被盯上了。",
    options: [
      { text: "换城市继续", nextId: "f_c_continue2" },
      { text: "带8万跑路", nextId: "f_ending_run_30" },
      { text: "金盆洗手", nextId: "f_ending_retire_8w" },
    ],
  },
  f_c_continue2: {
    id: "f_c_continue2",
    type: "normal",
    risk: 55,
    commission: 200000,
    text: "你换了城市继续。但反诈联盟已经把照片传遍了。",
    options: [
      { text: "继续", nextId: "ending_jail" },
      { text: "跑路", nextId: "ending_run_45" },
    ],
  },
  f_c_month: {
    id: "f_c_month",
    type: "normal",
    risk: 20,
    commission: 50000,
    text: "一个月赚5万，按计划离开。风险20%。",
    options: [
      { text: "带钱跑路", nextId: "f_ending_run_20" },
      { text: "回老家开店", nextId: "f_ending_retire_5w" },
    ],
  },
  // 婚骗
  f_d: {
    id: "f_d",
    type: "normal",
    risk: 20,
    text: "目标：32岁农村青年李大军，父母养猪攒了20万给他娶媳妇。",
    options: [{ text: "继续", nextId: "f_d_meet" }],
  },
  f_d_meet: {
    id: "f_d_meet",
    type: "normal",
    risk: 25,
    trust: 30,
    text: "你以相亲名义见面。他老实巴交，看到你话都说不利索。",
    options: [{ text: "继续", nextId: "f_d_cash" }],
  },
  f_d_cash: {
    id: "f_d_cash",
    type: "normal",
    risk: 35,
    commission: 87500,
    text: "见面礼18888+三金28000+彩礼128000=17.5万。提成87500。拿到彩礼第二天你消失了。那17万有一半是借的。",
    options: [
      { text: "再骗5个凑够50万", nextId: "f_d_more" },
      { text: "带8.75万跑路", nextId: "ending_run_35" },
      { text: "金盆洗手", nextId: "f_ending_retire_8w" },
    ],
  },
  f_d_more: {
    id: "f_d_more",
    type: "normal",
    risk: 75,
    money: 500000,
    commission: 250000,
    text: "你又骗了3个。但其中一家的哥哥找来了。",
    options: [
      { text: "金盆洗手", nextId: "f_ending_surrender" },
      { text: "跑路", nextId: "ending_run_85" },
    ],
  },
};

export default nodes;
