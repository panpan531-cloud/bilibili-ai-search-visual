const queryDetails = {
  known: {
    title: "精确找视频 / 已知目标",
    copy:
      "用户知道自己要找什么：标题、UP主、番剧/影视资源、某个教程合集。AI 不应替用户聊天，而应更强地做纠错、别名识别、站内实体归并和精准排序。",
    tags: ["标题纠错", "官方资源优先", "老视频召回"],
  },
  explore: {
    title: "泛主题探索 / 兴趣消费",
    copy:
      "用户只给一个兴趣方向，例如“历史冷知识”“高燃剪辑”。AI 适合帮用户把主题拆成子方向，并解释为什么推荐这些内容。",
    tags: ["主题拆解", "兴趣扩展", "探索边界"],
  },
  learn: {
    title: "学习 / 攻略 / 问题解决",
    copy:
      "用户带着明确问题来，例如“剪映调色怎么学”“考研英语长难句”。AI 可以把多条视频整理为步骤、先后顺序和坑点。",
    tags: ["学习路径", "步骤总结", "合集整合"],
  },
  entity: {
    title: "UP主 / 人物 / 实体导航",
    copy:
      "用户搜索某个 UP、角色、作品或事件实体。AI 应合并别名、账号、系列、代表作和最近动态，减少同名/盗搬/二创干扰。",
    tags: ["实体卡", "别名归并", "系列导航"],
  },
  fuzzy: {
    title: "模糊记忆找内容",
    copy:
      "用户只记得一句台词、一个画面、一个梗或弹幕。AI 的价值在于跨字幕、OCR、弹幕和评论做语义召回，并给出时间点证据。",
    tags: ["ASR", "OCR", "弹幕语义"],
  },
  decision: {
    title: "测评 / 对比 / 消费决策",
    copy:
      "用户想知道“买哪个”“值不值”。AI 可以聚合多位 UP 的观点，拆出共识、分歧、适合人群和引用来源。",
    tags: ["观点聚合", "优缺点", "来源引用"],
  },
  hot: {
    title: "热点 / 时效事件",
    copy:
      "用户追踪一个事件或争议。AI 可以生成时间线、多方观点和事实/观点区分，但必须标注来源和时间，避免误导。",
    tags: ["时间线", "多方观点", "事实校验"],
  },
  other: {
    title: "交易型 / 噪声 / 边缘需求",
    copy:
      "包括站内功能、直播/会员/活动入口、低质量或违规边缘 query。AI 的角色更多是识别风险、路由到正确入口或不触发。",
    tags: ["功能路由", "风险识别", "低置信降级"],
  },
};

const scenarios = {
  clip: {
    query: "那个讲“工业糖精”的影视吐槽片段",
    title: "AI 精准找视频 / 片段定位",
    desc:
      "从标题、ASR字幕、OCR画面字、弹幕热词和评论中召回候选，给出可跳转时间点，而不是只返回整条视频列表。",
    user: "减少“明明看过但搜不到”的挫败感，把搜索从列表翻页变成定位。",
    platform: "提升老视频、长视频和优质 PUGV 的可发现性，增加有效播放与收藏。",
    tech: "ASR/OCR/弹幕评论索引、语义召回、时间点证据、结果解释。",
    results: [
      ["08:42", "UP主A：影视剧里的工业糖精套路", "字幕命中“工业糖精”，弹幕在 08:42-09:13 密集讨论。"],
      ["13:05", "UP主B：甜宠剧为什么让人出戏", "评论区高频提到“工业糖精”，相似语义命中。"],
    ],
  },
  learn: {
    query: "零基础怎么系统学 PR 剪辑",
    title: "AI 教程攻略聚合",
    desc:
      "把多条教程拆成阶段、步骤、常见坑和推荐观看顺序，保留每一步的原视频入口。",
    user: "不用在几十条教程里反复试错，能直接获得学习路径。",
    platform: "让教程类长尾内容被重新串联，提升收藏、连续播放和学习型留存。",
    tech: "教程结构抽取、视频章节识别、合集关系、用户水平判断。",
    results: [
      ["Step 1", "先看 20 分钟界面与素材管理", "推荐 2 条高完播入门视频，适合零基础。"],
      ["Step 2", "再练转场、字幕、调色三个小项目", "每个项目附对应时间点和素材建议。"],
    ],
  },
  review: {
    query: "小米平板和 iPad Air 哪个适合上课",
    title: "AI 测评 / 对比决策",
    desc:
      "聚合多位 UP 主观点，把参数、体验、价格、适合人群和争议点拆开，并展示来源。",
    user: "从“看一堆测评”变成“先看结论和分歧，再点进视频验证”。",
    platform: "提升测评视频的高意图流量质量，也能保护 UP 主的观点归属。",
    tech: "观点抽取、情绪/立场聚类、来源引用、商业合作识别。",
    results: [
      ["共识", "记笔记生态 iPad 更稳", "5/7 条测评提到 Apple Pencil 与软件生态优势。"],
      ["分歧", "价格与开放性小米更友好", "不同 UP 对安卓平板生产力评价差异较大。"],
    ],
  },
  hot: {
    query: "某游戏更新争议到底怎么回事",
    title: "AI 热点事件时间线",
    desc:
      "按时间组织官方声明、UP解读、玩家反馈和关键争议，把事实与观点分开。",
    user: "快速补课，不被单一情绪视频带偏。",
    platform: "让 B站成为社区热点的结构化入口，而不只是情绪推荐流。",
    tech: "时效排序、来源可信度、观点聚类、事实/观点分离。",
    results: [
      ["D1", "官方发布更新公告", "引用官方号视频与动态，标注发布时间。"],
      ["D3", "玩家反馈集中爆发", "多个 UP 视频评论区集中讨论数值与付费争议。"],
    ],
  },
  entity: {
    query: "罗翔 最近讲刑法",
    title: "AI UP主 / 实体聚合",
    desc:
      "识别人物、主题和时间约束，聚合官方账号、系列课程、近期视频和高相关片段。",
    user: "减少同名、搬运、切片和不相关内容干扰，快速到达可信实体。",
    platform: "增强官方号、系列内容和知识型 UP 的导航效率。",
    tech: "实体识别、账号权威性、系列归并、近期性 rerank。",
    results: [
      ["官方", "罗翔说刑法：近期公开视频", "优先展示认证账号和系列课程。"],
      ["片段", "3 个最近高相关刑法案例片段", "根据发布时间、标题和字幕语义排序。"],
    ],
  },
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);

document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

const donut = document.querySelector(".donut");
if (donut) {
  const donutObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        donut.classList.add("in-view");
        donutObserver.disconnect();
      }
    },
    { threshold: 0.3 },
  );
  donutObserver.observe(donut);
}

const typingElement = document.querySelector("[data-typing]");
const typingPhrases = ["搜不到之前看过的那个片段", "搜索结果一半是猜你喜欢", "B站 AI 搜应该先解决什么？"];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function tickTyping() {
  if (!typingElement) return;
  const phrase = typingPhrases[phraseIndex];
  typingElement.textContent = phrase.slice(0, charIndex);

  if (!deleting && charIndex < phrase.length) {
    charIndex += 1;
    setTimeout(tickTyping, 74);
    return;
  }

  if (!deleting && charIndex === phrase.length) {
    deleting = true;
    setTimeout(tickTyping, 1200);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(tickTyping, 28);
    return;
  }

  deleting = false;
  phraseIndex = (phraseIndex + 1) % typingPhrases.length;
  setTimeout(tickTyping, 260);
}

tickTyping();

document.querySelectorAll(".query-row").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.query;
    const detail = queryDetails[key];
    if (!detail) return;

    document.querySelectorAll(".query-row").forEach((row) => row.classList.remove("active"));
    button.classList.add("active");
    document.querySelector("[data-query-title]").textContent = detail.title;
    document.querySelector("[data-query-copy]").textContent = detail.copy;
    const tagWrap = document.querySelector("[data-query-tags]");
    tagWrap.innerHTML = detail.tags.map((tag) => `<span>${tag}</span>`).join("");
  });
});

function renderScenario(key) {
  const scenario = scenarios[key];
  if (!scenario) return;

  document.querySelector("[data-scenario-query]").textContent = scenario.query;
  document.querySelector("[data-scenario-title]").textContent = scenario.title;
  document.querySelector("[data-scenario-desc]").textContent = scenario.desc;
  document.querySelector("[data-scenario-user]").textContent = scenario.user;
  document.querySelector("[data-scenario-platform]").textContent = scenario.platform;
  document.querySelector("[data-scenario-tech]").textContent = scenario.tech;
  document.querySelector("[data-scenario-results]").innerHTML = scenario.results
    .map(
      ([label, title, copy]) => `
        <article>
          <span class="timecode">${label}</span>
          <strong>${title}</strong>
          <p>${copy}</p>
        </article>
      `,
    )
    .join("");
}

document.querySelectorAll(".scenario-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".scenario-tab").forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    renderScenario(button.dataset.scenario);
  });
});

const cursorOrbit = document.querySelector(".cursor-orbit");
let cursorVisible = false;

window.addEventListener("pointermove", (event) => {
  if (!cursorOrbit || window.matchMedia("(pointer: coarse)").matches) return;
  cursorOrbit.style.transform = `translate3d(${event.clientX - 110}px, ${event.clientY - 110}px, 0)`;
  if (!cursorVisible) {
    cursorOrbit.style.opacity = "1";
    cursorVisible = true;
  }
});

window.addEventListener("pointerleave", () => {
  if (!cursorOrbit) return;
  cursorOrbit.style.opacity = "0";
  cursorVisible = false;
});

if (window.lucide) {
  window.lucide.createIcons({
    attrs: {
      "stroke-width": 1.8,
    },
  });
}
