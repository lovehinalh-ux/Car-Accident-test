
import React from 'react';
import { Step, Phase } from './types';

// Using React.createElement instead of JSX to fix syntax errors in .ts file
export const STEPS: Record<string, Step> = {
  'p1-s1': {
    id: 'p1-s1',
    phase: Phase.IMMEDIATE,
    title: 'Step 1｜事故現場應變',
    question: '現場是否有人受傷，且有立即就醫需求？（包含您自己或對方）',
    options: [
      { label: '有人受傷 / 需救護車', nextStepId: 'p1-s1-injured' },
      { label: '無人受傷或僅輕傷', nextStepId: 'p1-s2' }
    ]
  },
  'p1-s1-injured': {
    id: 'p1-s1-injured',
    phase: Phase.IMMEDIATE,
    title: 'Step 1-1｜優先處理傷患',
    alert: React.createElement('span', null, '請優先', React.createElement('b', null, '撥打 119'), ' 叫救護車，生命安全第一！'),
    primaryAction: {
      label: '立即撥打 119',
      phone: '119'
    },
    options: [
      { label: '已撥打 119 或確認安全', nextStepId: 'p1-s2' }
    ]
  },
  'p1-s2': {
    id: 'p1-s2',
    phase: Phase.IMMEDIATE,
    title: 'Step 2｜是否報警',
    content: [
      React.createElement('span', null, React.createElement('b', null, '撥打 110'), ' 請警方到場處理'),
      React.createElement('span', null, '切勿擅自離開現場，避免被認定為', React.createElement('b', null, '「肇事逃逸」'), '。'),
      React.createElement('span', null, '不建議於現場', React.createElement('b', null, '私下和解'), '，以免後續權益受損且保險不理賠。')
    ],
    primaryAction: {
      label: '立即撥打 110',
      phone: '110'
    },
    options: [
      { label: '已撥打 110 報警', nextStepId: 'p1-s3' }
    ]
  },
  'p1-s3': {
    id: 'p1-s3',
    phase: Phase.IMMEDIATE,
    title: 'Step 3｜現場蒐證',
    question: '請在確保安全的情況下完成以下紀錄：',
    checklist: [
      React.createElement('span', null, '拍攝雙方汽機車', React.createElement('b', null, '撞擊部位')),
      React.createElement('span', null, '拍攝', React.createElement('b', null, '現場位置'), '與', React.createElement('b', null, '道路狀況'), '（含遠景與近景）'),
      React.createElement('span', null, '記錄', React.createElement('b', null, '我方損失'), '（如：毀損的衣物、手機、筆電等）'),
      React.createElement('span', null, '留意周邊是否有', React.createElement('b', null, '監視器'), '或店家攝影機')
    ],
    options: [
      { label: '已完成蒐證紀錄', nextStepId: 'p1-s4' }
    ]
  },
  'p1-s4': {
    id: 'p1-s4',
    phase: Phase.IMMEDIATE,
    title: 'Step 4｜警方筆錄',
    content: [
      React.createElement('span', null, '筆錄請依照您的', React.createElement('b', null, '真實記憶'), '陳述即可。'),
      React.createElement('span', null, '避免', React.createElement('b', null, '自行推測'), '或過度解釋未確定的事故原因。'),
      React.createElement('span', null, '若有', React.createElement('b', null, '行車紀錄器'), '，請主動提供影片供警方參考。')
    ],
    options: [
      { label: '已完成筆錄', nextStepId: 'p1-s5' }
    ]
  },
  'p1-s5': {
    id: 'p1-s5',
    phase: Phase.IMMEDIATE,
    title: 'Step 5｜現場處理完成',
    content: [
      React.createElement('span', null, '警察處理完畢後，您會取得', React.createElement('b', null, '「交通事故登記聯單」'), '。'),
      React.createElement('span', null, '請妥善保存，這張單據是後續', React.createElement('b', null, '出險與理賠'), '的核心文件。')
    ],
    note: '💡 提示：即使傷勢看似輕微，也建議事後就醫檢查，並保留診斷書與收據以利後續求償。',
    options: [
      { label: '進入下一階段：保險處理', nextStepId: 'p2-s1' }
    ]
  },
  'p2-s1': {
    id: 'p2-s1',
    phase: Phase.INSURANCE,
    title: 'Step 6｜出險與保險（事故後 1–3 天）',
    question: '請儘速聯繫您的保險公司，並提供以下資料：',
    checklist: [
      React.createElement('span', null, '駕駛人', React.createElement('b', null, '駕照')),
      React.createElement('span', null, '汽機車', React.createElement('b', null, '行照')),
      React.createElement('span', null, React.createElement('b', null, '交通事故登記聯單'))
    ],
    content: [
      React.createElement('div', { className: "bg-blue-50/50 p-6 rounded-2xl border border-blue-100" },
        React.createElement('span', null, '出險後約 3–5 天，會收到理賠人員', React.createElement('b', null, '派案簡訊'), '。若未收到，請主動向保險公司確認。')
      )
    ],
    note: '💡 提示：駕駛人與車主若不同人，文件簽署方式會有差異。維修前請先拍照並等待保險人員完成勘車。',
    options: [
      { label: '進入下一階段：後續準備', nextStepId: 'p3-s1' }
    ]
  },
  'p3-s1': {
    id: 'p3-s1',
    phase: Phase.PREPARATION,
    title: 'Step 7｜為理賠做準備（事故後 1–2 個月）',
    content: [
      React.createElement('div', { className: "text-2xl font-black text-slate-800 pt-2 mb-1" }, "【醫療與傷勢】"),
      React.createElement('div', { className: "flex items-start gap-2" }, "✅ ", React.createElement('span', null, "持續就醫並保留所有", React.createElement('b', null, "診斷書"), "與", React.createElement('b', null, "醫療費用收據"), "。")),
      React.createElement('div', { className: "flex items-start gap-2" }, "✅ ", React.createElement('span', null, "診斷書註明內容越詳盡，越有助於傷勢認定。")),
      React.createElement('div', { className: "flex items-start gap-2" }, "✅ ", React.createElement('span', null, "在傷勢穩定前，不建議過早進行和解調解。")),
      React.createElement('div', { className: "text-2xl font-black text-slate-800 pt-6 mb-1" }, "【責任與證據】"),
      React.createElement('div', { className: "flex items-start gap-2" }, "✅ ", React.createElement('span', null, "事故 30 天後可向警方申請", React.createElement('b', null, "「初判表」"), "。")),
      React.createElement('div', { className: "flex items-start gap-2" }, "✅ ", React.createElement('span', null, "釐清責任歸屬後，才能更精確評估求償額度。"))
    ],
    options: [
      { label: '進入最後一階段：求償導引', nextStepId: 'p4-s1' },
      { label: '加入 LINE 諮詢', nextStepId: 'line-consult', isExternal: true, externalUrl: 'https://line.me/ti/p/your_line_id' }
    ]
  },
  'p4-s1': {
    id: 'p4-s1',
    phase: Phase.COMPENSATION,
    title: 'Step 8｜理賠求償項目導引',
    question: '常見的可求償項目如下：',
    content: [
      React.createElement('span', null, '1. ', React.createElement('b', null, '醫療費用'), '：含掛號費、自費藥物、住院費等。'),
      React.createElement('span', null, '2. ', React.createElement('b', null, '薪資損失'), '：依據醫院診斷書建議之休養天數。'),
      React.createElement('span', null, '3. ', React.createElement('b', null, '精神慰撫金'), '：視傷勢嚴重程度與對生活的影響。'),
      React.createElement('span', null, '4. ', React.createElement('b', null, '車輛維修費'), '：需扣除折舊或視責任比例分擔。'),
      React.createElement('span', null, '5. ', React.createElement('b', null, '財損賠償'), '：個人物品（安全帽、手機等）毀損。')
    ],
    alert: React.createElement('span', null, '實際求償金額需視', React.createElement('b', null, '肇事責任比例'), '進行折算。'),
    note: '本指引僅供參考，不具法律效力。重大案件建議諮詢法律專業人士或保險經紀人處理。',
    options: [
      { label: '重新檢視處理流程', nextStepId: 'p1-s1' },
      { label: '加入 LINE 諮詢', nextStepId: 'line-consult', isExternal: true, externalUrl: 'https://line.me/ti/p/your_line_id' }
    ]
  }
};
