// ── URL param helpers ──────────────────────────────────────────────────────

function getParam(names, fallback) {
  const p = new URLSearchParams(window.location.search);
  for (const name of names) {
    const v = p.get(name);
    if (v !== null) return v.toLowerCase();
  }
  return fallback;
}

function resolveLang(raw) {
  if (!raw) return 'zh';
  const v = raw.toLowerCase();
  if (['zh', 'zh-cn', 'zh-tw', 'chinese', 'cn'].includes(v)) return 'zh';
  if (['en', 'en-us', 'en-gb', 'english'].includes(v)) return 'en';
  if (['ja', 'ja-jp', 'japanese', 'jp'].includes(v)) return 'ja';
  return 'zh';
}

function resolveTheme(raw) {
  if (!raw) return 'light';
  const v = raw.toLowerCase();
  if (['dark', 'night', '1', 'true'].includes(v)) return 'dark';
  return 'light';
}

// ── Apply theme ────────────────────────────────────────────────────────────

function applyTheme(theme) {
  document.body.classList.toggle('dark', theme === 'dark');
}

// ── Apply language ─────────────────────────────────────────────────────────

function applyLang(lang) {
  const t = i18n[lang] || i18n.zh;
  const s = (sel, text) => {
    const el = document.querySelector(sel);
    if (el) el.textContent = text;
  };
  const sa = (sel, attr, val) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  };

  // eyebrow
  s('.eyebrow', t.eyebrow);
  // set lang attribute so fonts render correctly
  document.documentElement.lang = lang === 'ja' ? 'ja' : lang === 'en' ? 'en' : 'zh-CN';

  // hero h1
  const h1 = document.querySelector('.hero h1');
  if (h1) {
    h1.childNodes[0].textContent = t.h1_line1 + ' ';
    const span = h1.querySelector('span');
    if (span) span.textContent = t.h1_line2;
  }

  // hero p
  s('.hero > .container > div > p', t.hero_p);

  // buttons
  const btns = document.querySelectorAll('.hero-actions a');
  if (btns[0]) btns[0].textContent = t.btn_primary;
  if (btns[1]) btns[1].textContent = t.btn_docs;

  // stats
  const statSpans = document.querySelectorAll('.stat span');
  if (statSpans[0]) statSpans[0].textContent = t.stat_1_label;
  if (statSpans[1]) statSpans[1].textContent = t.stat_2_label;
  if (statSpans[2]) statSpans[2].textContent = t.stat_3_label;

  // floating card
  s('.floating-card h3', t.floating_h3);
  s('.floating-card p', t.floating_p);

  // section labels & titles helper
  const sections = document.querySelectorAll('section:not(.hero):not(.cta)');

  // pain section (index 0)
  if (sections[0]) {
    const sec = sections[0];
    sec.querySelector('.label').textContent = t.pain_label;
    const h2 = sec.querySelector('h2');
    h2.childNodes[0].textContent = t.pain_h2_1 + ' ';
    h2.querySelector('span').textContent = t.pain_h2_2;
    sec.querySelector('.section-title p').textContent = t.pain_p;
    const cards = sec.querySelectorAll('.feature-card');
    if (cards[0]) { cards[0].querySelector('h3').textContent = t.pain_card1_h3; cards[0].querySelector('p').textContent = t.pain_card1_p; }
    if (cards[1]) { cards[1].querySelector('h3').textContent = t.pain_card2_h3; cards[1].querySelector('p').textContent = t.pain_card2_p; }
    if (cards[2]) { cards[2].querySelector('h3').textContent = t.pain_card3_h3; cards[2].querySelector('p').textContent = t.pain_card3_p; }
  }

  // advantages section (index 1)
  if (sections[1]) {
    const sec = sections[1];
    sec.querySelector('.label').textContent = t.adv_label;
    const h2 = sec.querySelector('h2');
    h2.childNodes[0].textContent = t.adv_h2_1;
    h2.querySelector('span').textContent = t.adv_h2_2;
    sec.querySelector('.section-title p').textContent = t.adv_p;
    const cards = sec.querySelectorAll('.feature-card');
    if (cards[0]) { cards[0].querySelector('h3').textContent = t.adv_card1_h3; cards[0].querySelector('p').textContent = t.adv_card1_p; }
    if (cards[1]) { cards[1].querySelector('h3').textContent = t.adv_card2_h3; cards[1].querySelector('p').textContent = t.adv_card2_p; }
    if (cards[2]) { cards[2].querySelector('h3').textContent = t.adv_card3_h3; cards[2].querySelector('p').textContent = t.adv_card3_p; }
  }

  // compare section (index 2)
  if (sections[2]) {
    const sec = sections[2];
    sec.querySelector('.label').textContent = t.compare_label;
    const h2 = sec.querySelector('h2');
    h2.childNodes[0].textContent = t.compare_h2_1;
    h2.querySelector('span').textContent = t.compare_h2_2;
    sec.querySelector('.section-title p').textContent = t.compare_p;
    const cards = sec.querySelectorAll('.compare-card');
    if (cards[0]) cards[0].querySelector('h3').textContent = t.compare_official;
    if (cards[1]) {
      const h3 = cards[1].querySelector('h3');
      h3.childNodes[0].textContent = t.compare_relay + ' ';
      const badge = h3.querySelector('.badge');
      if (badge) badge.textContent = t.compare_badge;
    }
  }

  // models section (index 3)
  if (sections[3]) {
    const sec = sections[3];
    sec.querySelector('.label').textContent = t.models_label;
    const h2 = sec.querySelector('h2');
    h2.childNodes[0].textContent = t.models_h2_1;
    h2.querySelector('span').textContent = t.models_h2_2;
    sec.querySelector('.section-title p').textContent = t.models_p;

    const cards = sec.querySelectorAll('.model-card');
    const modelData = [
      { sub: t.opus_sub, desc: t.opus_desc, tags: [t.tag_reasoning, t.tag_analysis, t.tag_longdoc, t.tag_ctx] },
      { sub: t.sonnet_sub, desc: t.sonnet_desc, tags: [t.tag_recommended, t.tag_code, t.tag_fast, t.tag_ctx] },
      { sub: t.haiku_sub, desc: t.haiku_desc, tags: [t.tag_ultrafast, t.tag_value, t.tag_highfreq, t.tag_ctx] },
    ];
    cards.forEach((card, i) => {
      const d = modelData[i];
      if (!d) return;
      card.querySelector('.model-header p').textContent = d.sub;
      card.querySelector('.model-desc').textContent = d.desc;
      const tagEls = card.querySelectorAll('.model-tag');
      tagEls.forEach((el, j) => { if (d.tags[j]) el.textContent = d.tags[j]; });
    });
  }

  // CTA section
  const cta = document.querySelector('.cta');
  if (cta) {
    cta.querySelector('h2').textContent = t.cta_h2;
    cta.querySelector('p').textContent = t.cta_p;
    const ctaBtns = cta.querySelectorAll('.hero-actions a');
    if (ctaBtns[0]) ctaBtns[0].textContent = t.cta_btn;
    if (ctaBtns[1]) ctaBtns[1].textContent = t.cta_contact;
  }

  // footer
  s('.footer-note', t.footer);

  // modal
  s('#contactModal h3', t.modal_h3);
  s('#contactModal p', t.modal_p);

  // page title
  document.title = lang === 'en' ? 'Tiduyun API' : lang === 'ja' ? 'Tiduyun API' : '梯度云 API';
}

// ── i18n translations
const i18n = {
  zh: {
    eyebrow: '高稳定 · 低延迟 · 多模型 API 中转服务',
    h1_line1: '梯度云 API',
    h1_line2: '让模型调用更稳定、更专业',
    hero_p: '专注 Claude 模型接口服务。只需修改一行 base_url，即可获得更高可用性、更低接入门槛和更顺滑的开发体验。',
    btn_primary: '立即获取 API Key',
    btn_docs: '查看接入文档',
    stat_1_label: '服务可用率',
    stat_2_label: '平均响应延迟',
    stat_3_label: '技术支持',
    floating_h3: '只改一行 base_url',
    floating_p: '无需重构现有业务代码，兼容官方 SDK 调用方式。快速切换模型供应商，统一计费、统一管理、统一监控。',
    pain_label: '为什么需要 API 中转站？',
    pain_h2_1: '解决企业接入大模型时的',
    pain_h2_2: '三大难题',
    pain_p: '从账号、网络、成本到模型切换，我们帮你把复杂流程变简单。',
    pain_card1_h3: '网络不稳定，调用超时',
    pain_card1_p: '多节点智能调度与链路优化，降低请求失败率，提升业务系统调用成功率。',
    pain_card2_h3: '多模型接入复杂',
    pain_card2_p: '统一接口格式，统一 Key 管理，快速接入多个模型供应商，无需重复开发。',
    pain_card3_h3: '成本不可控',
    pain_card3_p: '透明用量统计、请求日志、额度管理和成本分析，让每一次调用都清晰可见。',
    adv_label: '核心能力',
    adv_h2_1: '一个 API Key，调用',
    adv_h2_2: '全系列模型',
    adv_p: '为开发者和企业团队提供稳定、安全、专业的模型 API 接入底座。',
    adv_card1_h3: '高可用中转',
    adv_card1_p: '多线路冗余、失败重试、自动切换节点，保障高并发场景下的稳定调用。',
    adv_card2_h3: '安全隔离',
    adv_card2_p: '用户 Key 独立隔离，传输全程加密，不保存对话内容，降低数据泄露风险。',
    adv_card3_h3: '用量可视化',
    adv_card3_p: '支持 Token 统计、调用记录、失败分析、额度提醒，让运营决策更有依据。',
    compare_label: '快速接入',
    compare_h2_1: '改一行 base_url，',
    compare_h2_2: '代码几乎零改动',
    compare_p: '保持官方 SDK 使用方式，降低迁移和维护成本。',
    compare_official: '官方接口',
    compare_relay: 'API 中转站',
    compare_badge: '仅多一行',
    models_label: 'Claude 模型系列',
    models_h2_1: '三款模型，',
    models_h2_2: '覆盖所有场景',
    models_p: '从轻量高频到旗舰推理，Anthropic Claude 系列模型全线接入，统一 API 格式，按需选用。',
    opus_sub: 'Anthropic · 旗舰',
    opus_desc: 'Anthropic 最强旗舰模型，拥有顶级推理、分析与创作能力。适合复杂研究、深度分析、高难度编程与长文档处理等任务。',
    sonnet_sub: 'Anthropic · 均衡',
    sonnet_desc: '性能与速度的最佳平衡点，代码生成能力突出，响应迅速。适合日常开发、内容生成与企业级业务自动化场景。',
    haiku_sub: 'Anthropic · 轻量',
    haiku_desc: '速度最快、成本最低的 Claude 模型，延迟极低。适合高频调用、实时对话、分类摘要等对响应速度要求高的场景。',
    tag_reasoning: '✦ 深度推理',
    tag_analysis: '复杂分析',
    tag_longdoc: '长文档处理',
    tag_ctx: '1M 上下文',
    tag_recommended: '● 推荐首选',
    tag_code: '✦ 代码生成',
    tag_fast: '⚡ 快速响应',
    tag_ultrafast: '⚡ 极速响应',
    tag_value: '● 高性价比',
    tag_highfreq: '高频调用',
    cta_h2: '现在开始，构建你的稳定 AI 应用',
    cta_p: '为产品、运营、研发和企业内部系统提供统一大模型 API 能力。从测试到上线，快速接入，稳定运行。',
    cta_btn: '免费获取 API Key',
    cta_contact: '联系技术顾问',
    footer: 'API Relay Platform © 2026 · 专业的大模型 API 中转服务',
    modal_h3: '联系技术顾问',
    modal_p: '扫码添加微信，获取专属接入支持',
  },
  en: {
    eyebrow: 'High Stability · Low Latency · Multi-Model API Relay',
    h1_line1: 'Tiduyun API',
    h1_line2: 'More Stable & Professional Model Calls',
    hero_p: 'Focused on Claude model API services. Just change one line of base_url to get higher availability, lower integration barrier, and a smoother developer experience.',
    btn_primary: 'Get API Key Now',
    btn_docs: 'View Documentation',
    stat_1_label: 'Uptime',
    stat_2_label: 'Avg Latency',
    stat_3_label: 'Support',
    floating_h3: 'Change Only base_url',
    floating_p: 'No need to refactor existing code. Compatible with official SDK. Easily switch model providers with unified billing, management, and monitoring.',
    pain_label: 'Why Use an API Relay?',
    pain_h2_1: 'Solving the',
    pain_h2_2: 'Three Key Challenges',
    pain_p: 'From accounts, networking, and cost to model switching — we simplify the complex.',
    pain_card1_h3: 'Unstable Network & Timeouts',
    pain_card1_p: 'Multi-node intelligent routing and link optimization to reduce request failures and improve success rates.',
    pain_card2_h3: 'Complex Multi-Model Integration',
    pain_card2_p: 'Unified API format and key management. Integrate multiple model providers quickly without duplicate development.',
    pain_card3_h3: 'Uncontrolled Costs',
    pain_card3_p: 'Transparent usage stats, request logs, quota management, and cost analysis — every call is visible.',
    adv_label: 'Core Capabilities',
    adv_h2_1: 'One API Key,',
    adv_h2_2: 'All Models',
    adv_p: 'Providing developers and enterprise teams with a stable, secure, and professional model API foundation.',
    adv_card1_h3: 'High Availability Relay',
    adv_card1_p: 'Multi-path redundancy, automatic failover, and retry logic ensure stable calls under high concurrency.',
    adv_card2_h3: 'Security Isolation',
    adv_card2_p: 'User keys are isolated, all transmissions are encrypted, and no conversation data is stored.',
    adv_card3_h3: 'Usage Visualization',
    adv_card3_p: 'Token stats, call logs, failure analysis, and quota alerts to support informed operational decisions.',
    compare_label: 'Quick Integration',
    compare_h2_1: 'Change One Line,',
    compare_h2_2: 'Near-Zero Code Changes',
    compare_p: 'Keep using the official SDK. Reduce migration and maintenance costs.',
    compare_official: 'Official API',
    compare_relay: 'API Relay',
    compare_badge: 'One line only',
    models_label: 'Claude Model Series',
    models_h2_1: 'Three Models,',
    models_h2_2: 'Every Use Case',
    models_p: 'From lightweight to flagship reasoning — the full Anthropic Claude lineup, unified API format, pick what you need.',
    opus_sub: 'Anthropic · Flagship',
    opus_desc: "Anthropic's most powerful model with top-tier reasoning, analysis, and creative capabilities. Ideal for complex research, deep analysis, advanced coding, and long documents.",
    sonnet_sub: 'Anthropic · Balanced',
    sonnet_desc: 'The best balance of performance and speed with outstanding code generation. Ideal for daily development, content generation, and enterprise automation.',
    haiku_sub: 'Anthropic · Lightweight',
    haiku_desc: 'The fastest and most cost-effective Claude model with ultra-low latency. Ideal for high-frequency calls, real-time chat, and classification tasks.',
    tag_reasoning: '✦ Deep Reasoning',
    tag_analysis: 'Complex Analysis',
    tag_longdoc: 'Long Docs',
    tag_ctx: '1M Context',
    tag_recommended: '● Recommended',
    tag_code: '✦ Code Gen',
    tag_fast: '⚡ Fast',
    tag_ultrafast: '⚡ Ultra Fast',
    tag_value: '● Best Value',
    tag_highfreq: 'High Frequency',
    cta_h2: 'Start Building Your Stable AI App',
    cta_p: 'Unified LLM API for products, operations, engineering, and internal enterprise systems. From testing to production — fast integration, stable operation.',
    cta_btn: 'Get Free API Key',
    cta_contact: 'Contact Sales',
    footer: 'API Relay Platform © 2026 · Professional LLM API Relay Service',
    modal_h3: 'Contact Sales',
    modal_p: 'Scan the QR code to add WeChat for dedicated integration support',
  },
  ja: {
    eyebrow: '高安定 · 低遅延 · マルチモデル API リレーサービス',
    h1_line1: 'Tiduyun API',
    h1_line2: 'より安定した · よりプロなモデル呼び出し',
    hero_p: 'Claude モデル API に特化。base_url を 1 行変えるだけで、より高い可用性、より低い統合コスト、よりスムーズな開発体験を実現。',
    btn_primary: 'API Key を取得',
    btn_docs: 'ドキュメントを見る',
    stat_1_label: '稼働率',
    stat_2_label: '平均レイテンシ',
    stat_3_label: 'サポート',
    floating_h3: 'base_url を 1 行変えるだけ',
    floating_p: '既存コードのリファクタリング不要。公式 SDK 互換。統一課金・管理・監視でモデルプロバイダーを簡単に切り替え。',
    pain_label: 'なぜ API リレーが必要か？',
    pain_h2_1: '大規模モデル導入の',
    pain_h2_2: '3 つの課題を解決',
    pain_p: 'アカウント、ネットワーク、コスト、モデル切り替えまで、複雑なフローをシンプルに。',
    pain_card1_h3: 'ネットワーク不安定・タイムアウト',
    pain_card1_p: 'マルチノードのスマートルーティングと最適化でリクエスト失敗率を低減し、成功率を向上。',
    pain_card2_h3: 'マルチモデル統合の複雑さ',
    pain_card2_p: '統一 API 形式と Key 管理で、複数プロバイダーへの重複開発なしに迅速統合。',
    pain_card3_h3: 'コスト管理が困難',
    pain_card3_p: '透明な使用統計・リクエストログ・クォータ管理・コスト分析で全呼び出しを可視化。',
    adv_label: 'コア機能',
    adv_h2_1: '1 つの API Key で',
    adv_h2_2: '全モデルを呼び出し',
    adv_p: '開発者と企業チームに安定・安全・プロなモデル API 基盤を提供。',
    adv_card1_h3: '高可用リレー',
    adv_card1_p: 'マルチパス冗長・自動フェイルオーバー・リトライで高並行下の安定呼び出しを保証。',
    adv_card2_h3: 'セキュリティ分離',
    adv_card2_p: 'ユーザー Key 独立分離、全通信暗号化、会話内容保存なしでデータ漏洩リスクを低減。',
    adv_card3_h3: '使用量の可視化',
    adv_card3_p: 'Token 統計・呼び出し記録・失敗分析・クォータ通知で運用判断をサポート。',
    compare_label: 'クイック統合',
    compare_h2_1: 'base_url を 1 行変えるだけ、',
    compare_h2_2: 'コード変更はほぼゼロ',
    compare_p: '公式 SDK の使い方はそのまま。移行・保守コストを削減。',
    compare_official: '公式 API',
    compare_relay: 'API リレー',
    compare_badge: '1 行追加のみ',
    models_label: 'Claude モデルシリーズ',
    models_h2_1: '3 つのモデルで',
    models_h2_2: '全シナリオをカバー',
    models_p: '軽量高頻度からフラッグシップ推論まで、Anthropic Claude シリーズを統一 API 形式で全ライン提供。',
    opus_sub: 'Anthropic · フラッグシップ',
    opus_desc: 'Anthropic 最強のフラッグシップモデル。トップクラスの推論・分析・創作能力。複雑なリサーチ・深い分析・高難度コーディング・長文書処理に最適。',
    sonnet_sub: 'Anthropic · バランス',
    sonnet_desc: 'パフォーマンスと速度の最適バランス。コード生成能力が優秀で応答も迅速。日常開発・コンテンツ生成・企業自動化に最適。',
    haiku_sub: 'Anthropic · 軽量',
    haiku_desc: '最速・最低コストの Claude モデル。超低遅延。高頻度呼び出し・リアルタイム対話・分類要約など速度重視の場面に最適。',
    tag_reasoning: '✦ 深い推論',
    tag_analysis: '複雑分析',
    tag_longdoc: '長文書処理',
    tag_ctx: '1M コンテキスト',
    tag_recommended: '● おすすめ',
    tag_code: '✦ コード生成',
    tag_fast: '⚡ 高速',
    tag_ultrafast: '⚡ 超高速',
    tag_value: '● コスパ最高',
    tag_highfreq: '高頻度呼び出し',
    cta_h2: '今すぐ始めて、安定した AI アプリを構築',
    cta_p: 'プロダクト・オペレーション・開発・社内システムに統一 LLM API を提供。テストから本番まで、迅速統合・安定稼働。',
    cta_btn: '無料で API Key を取得',
    cta_contact: '営業に問い合わせ',
    footer: 'API Relay Platform © 2026 · プロフェッショナル LLM API リレーサービス',
    modal_h3: '営業に問い合わせ',
    modal_p: 'QR コードをスキャンして WeChat を追加し、専用サポートを受けてください',
  },
};

// ── Init ───────────────────────────────────────────────────────────────────

(function init() {
  const rawLang = getParam(['lang', 'language', 'locale', 'lng'], 'zh');
  const rawTheme = getParam(['theme', 'mode', 'color-scheme', 'colorscheme', 'color_scheme'], 'light');
  applyTheme(resolveTheme(rawTheme));
  applyLang(resolveLang(rawLang));
})();

// ── Toolbar ────────────────────────────────────────────────────────────────

let currentLang = 'zh';
let currentTheme = 'light';

const langLabels = { zh: '中', en: 'EN', ja: '日' };

function toggleLangMenu() {
  document.getElementById('langDropdown').classList.toggle('open');
}

function switchLang(lang) {
  currentLang = lang;
  document.getElementById('langLabel').textContent = langLabels[lang];
  document.getElementById('langDropdown').classList.remove('open');
  applyLang(lang);
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
  document.getElementById('themeIcon').textContent = currentTheme === 'dark' ? '🌙' : '☀️';
}

document.addEventListener('click', (e) => {
  const menu = document.getElementById('langMenu');
  if (menu && !menu.contains(e.target)) {
    document.getElementById('langDropdown').classList.remove('open');
  }
});

// ── Modal ──────────────────────────────────────────────────────────────────

function openModal() {
  document.getElementById('contactModal').classList.add('active');
}

function closeModal() {
  document.getElementById('contactModal').classList.remove('active');
}

document.getElementById('contactModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ── Scroll ─────────────────────────────────────────────────────────────────

const pageSections = Array.from(document.querySelectorAll('.page section, .page .footer-note'));
let current = 0;
let locked = false;

function goTo(index) {
  if (index < 0 || index >= pageSections.length) return;
  current = index;
  pageSections[current].scrollIntoView({ behavior: 'smooth' });
  locked = true;
  setTimeout(() => { locked = false; }, 800);
}

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (locked) return;
  if (e.deltaY > 0) goTo(current + 1);
  else goTo(current - 1);
}, { passive: false });

window.addEventListener('keydown', (e) => {
  if (locked) return;
  if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); goTo(current + 1); }
  if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goTo(current - 1); }
});
