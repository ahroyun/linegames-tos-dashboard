// ============================================================
// 라인게임즈 이용약관 벤치마킹 모니터링 대시보드 — 데이터 레이어
// Design: Dark Command Center / Intelligence Dashboard
// ============================================================

export const REPORT_META = {
  reportNo: "2026-H1",
  createdAt: "2026년 4월 27일",
  cycle: "연 2회 (상반기 4월 초)",
  team: "라이브기획팀",
  baseVersion: "KR/JP/EN 20250509 (2025년 5월 9일 시행)",
  nextReview: "2026년 10월 초 (하반기)",
};

// ── URL 수집 현황 ──────────────────────────────────────────
export type LangCode = "KR" | "JP" | "EN";
export type Priority = "필수" | "권고" | "참고";

export interface UrlStatus {
  company: string;
  lang: LangCode;
  valid: boolean;
  effectiveDate: string;
  note: string;
}

export const URL_STATUS: UrlStatus[] = [
  { company: "넥슨", lang: "KR", valid: true, effectiveDate: "2024-03-22", note: "확률형 아이템 관련 부칙 신설" },
  { company: "넥슨", lang: "JP", valid: true, effectiveDate: "2019-05-29", note: "일본 현지 약관 (최근 개정 미확인)" },
  { company: "넥슨", lang: "EN", valid: true, effectiveDate: "2026-03-19", note: "DSA 불법 콘텐츠 신고 메커니즘 추가" },
  { company: "넷마블", lang: "KR", valid: true, effectiveDate: "2025-05-21", note: "포인트 제공 시점 변경 (지연이자는 이전 버전에도 존재)" },
  { company: "넷마블", lang: "JP", valid: true, effectiveDate: "2025-05-21", note: "(추정)" },
  { company: "넷마블", lang: "EN", valid: true, effectiveDate: "2025-06-25", note: "" },
  { company: "크래프톤", lang: "KR", valid: true, effectiveDate: "2026-01-07", note: "서식 정규화 개정 (본문 실질 변경 없음)" },
  { company: "크래프톤", lang: "JP", valid: true, effectiveDate: "2026-01-07", note: "" },
  { company: "크래프톤", lang: "EN", valid: true, effectiveDate: "2026-01-07", note: "중재 및 Class Action Waiver 조항 포함" },
  { company: "엔씨소프트", lang: "KR", valid: true, effectiveDate: "2024-05-13", note: "게임산업법 개정 반영" },
  { company: "엔씨소프트", lang: "JP", valid: true, effectiveDate: "2026-04-15", note: "유·무상 전자결제수단 정의 상세화" },
  { company: "엔씨소프트", lang: "EN", valid: true, effectiveDate: "2025-10-22", note: "Section 11 중재·Class Action Waiver 조항 구체화" },
  { company: "카카오게임즈", lang: "KR", valid: true, effectiveDate: "2025-07-17", note: "제20조 크레딧 조항 신설 (이전 버전 2025-05-27 대비)" },
  { company: "카카오게임즈", lang: "JP", valid: true, effectiveDate: "2025-07-17", note: "" },
  { company: "카카오게임즈", lang: "EN", valid: true, effectiveDate: "2025-05-28", note: "" },
  { company: "라인게임즈 (자사)", lang: "KR", valid: true, effectiveDate: "2025-05-09", note: "분석 기준 버전" },
  { company: "라인게임즈 (자사)", lang: "JP", valid: true, effectiveDate: "2025-05-09", note: "분석 기준 버전" },
  { company: "라인게임즈 (자사)", lang: "EN", valid: true, effectiveDate: "2025-05-09", note: "분석 기준 버전" },
];

// ── 타사 최근 개정 동향 특이사항 ──────────────────────────
export type ImpactLevel = "high" | "medium" | "low";

export interface ClauseText {
  label: string;        // 조항 번호/제목
  original: string;     // 원문 (JP/EN은 원어, KR은 한국어)
  translation?: string; // JP/EN의 경우 한국어 번역
}

export interface RecentChange {
  company: string;
  lang: string;
  effectiveDate: string;
  summary: string;
  impact: ImpactLevel;
  impactLabel: string;
  sourceUrl: string;    // 출처 URL
  clauses: ClauseText[]; // 관련 조항 원문
}

export const RECENT_CHANGES: RecentChange[] = [
  {
    company: "엔씨소프트",
    lang: "JP",
    effectiveDate: "2026-04-15",
    summary: "유·무상 전자결제수단(有償/無償電子仮想決済手段) 정의 조항 대폭 강화, PURPLE 코인·포인트 명칭 변경 특약 신설",
    impact: "high",
    impactLabel: "🔴 높음",
    sourceUrl: "https://info.ncsoft.jp/terms/ncsoft/terms/service-policy",
    clauses: [
      {
        label: "제11조 (전자가상결제수단 정의)",
        original: "11.「電子仮想決済手段」とは、有料サービスにおいて利用可能な電子的データによる通貨をいいます。電子仮想決済手段のうち、価値保存性、権利行使性および対価発行性を有する電子仮想決済手段を「有償電子仮想決済手段」といい、対価発行性等の要件を満たさないそれ以外の電子仮想決済手段を「無償電子仮想決済手段」というものとします。電子仮想決済手段について、お客様が同種の電子仮想決済手段につき、有償電子仮想決済手段と無償電子仮想決済手段を同時に保有している場合、有償電子仮想決済手段が先に使用されるものとします。有償電子仮想決済手段は、資金決済に関する法律（資金決済法）で規定される「前払式支払手段」として取り扱われ、ゲーム内でのみ取得できる通貨を除く「前払式支払手段」で購入されるその他のアイテム等の仮想資産は、取得をもってこれにかかる商品・サービスの提供がなされたものとし、「前払式支払手段」には該当しないものとして取り扱います。なお、「無償電子仮想決済手段」は「前払式支払手段」には該当しません。",
        translation: "제11조 「전자가상결제수단」이란 유료 서비스에서 이용 가능한 전자 데이터 통화를 말합니다. 전자가상결제수단 중, 가치보존성·권리행사성·대가발행성을 갖춘 것을 「유상전자가상결제수단」이라 하고, 대가발행성 등의 요건을 충족하지 않는 나머지를 「무상전자가상결제수단」이라 합니다. 동일 종류의 전자가상결제수단을 유상·무상 동시 보유한 경우 유상이 먼저 사용됩니다. 유상전자가상결제수단은 자금결제법상 「선불식 지급수단」으로 취급됩니다.",
      },
      {
        label: "제29조 (PURPLE 코인·포인트 특약)",
        original: "第29条（PURPLEコイン）\n1.お客様は、PCゲームサービスをご利用する場合に、日本円1円につき1PURPLEコインの比率で設定されるPURPLEコインを電子仮想決済手段としてチャージし、お客様はチャージしたPURPLEコインを利用し、有料サービスの決済をすることができるものとします。\n3.当社は、お客様が一つのアカウントにおいて毎月チャージできるPURPLEコインの上限を次の号に定めるものとします。\n(1) PURPLEコインチャージ日においてお客様が20歳未満の場合、当月のチャージ限度額は日本円20,000円分\n(2) PURPLEコインチャージ日においてお客様が20歳以上の場合、当月のチャージ限度額に制限はありません。",
        translation: "제29조 (PURPLE코인) 1. 이용자는 PC게임 서비스 이용 시 일본 엔화 1엔당 1 PURPLE코인 비율로 충전하여 유료 서비스 결제에 사용할 수 있습니다. 3. 회사는 월 충전 한도를 정합니다: (1) 충전일 기준 20세 미만: 월 20,000엔 / (2) 20세 이상: 제한 없음.",
      },
    ],
  },
  {
    company: "크래프톤",
    lang: "KR/JP/EN",
    effectiveDate: "2026-01-07",
    summary: "약관 본문 실질 변경 없음 — 공백·들여쓰기 서식 정규화 개정. 확률형 아이템 정보 공개 페이지는 약관 개정 이전부터 별도 운영 중.",
    impact: "low",
    impactLabel: "🟢 낮음",
    sourceUrl: "https://pubg.com/ko/clause/term_of_service/label_steam/latest",
    clauses: [
      {
        label: "[diff 결과] 실질 변경 없음",
        original: "2026-01-07 개정본과 직전 버전(2025-07-09) 전체 diff 결과, 공백·들여쓰기 정규화 외 약관 본문의 실질적 내용 변경은 확인되지 않았습니다. 확률형 아이템 정보 공개 페이지(https://pubg.com/ko/randombox)는 약관 개정 이전부터 별도 운영 중입니다.",
        translation: "이전 버전 대비 실질 내용 변경 없음 (서식 정규화만 적용).",
      },
    ],
  },
  {
    company: "넥슨",
    lang: "EN",
    effectiveDate: "2026-03-19",
    summary: "EU 디지털서비스법(DSA) 대응 EEA+UK 보충 조항(Section XIII) 강화 — 기존 Section XIII에 DSA 준수 불법 콘텐츠 신고 메커니즘 및 반복 위반자 서비스 정지 조항 신규 추가. 계정 제재 이의신청 절차 및 중재 조항 EEA 예외는 이전 버전에도 존재.",
    impact: "medium",
    impactLabel: "🟡 중간",
    sourceUrl: "https://m.nexon.com/terms/304",
    clauses: [
      {
        label: "Section XIII — EEA/UK Supplemental Terms (계정 제재 및 이의신청)",
        original: "As a deviation from Sections I and VII of the Terms, Nexon may suspend your access to the Services at any time and without prior notice to you if Nexon has a reasonable belief that (i) you have breached these Terms or (ii) you are using the Services in a manner other than for its intended purpose, or illegally. Where Nexon suspends your access to the Services, it will let you know and explain any options you have to request a review, unless doing so may: (i) expose Nexon or others to legal liability; (ii) harm other users; (iii) compromise or interfere with the integrity or operation of any of Nexon's Services; (iv) be impracticable given technical limitations; or (v) be prohibited under applicable laws.",
        translation: "[Section XIII — EEA/UK 보충 조항] 넥슨은 이용자가 약관을 위반했거나 서비스를 불법적으로 이용한다고 합리적으로 판단하는 경우 사전 통지 없이 서비스 접근을 정지할 수 있습니다. 단, 정지 시 이용자에게 이의신청 방법을 안내해야 합니다(법적 책임 노출·타 이용자 피해·서비스 무결성 훼손 등의 경우 제외).",
      },
      {
        label: "Section XIII — DSA 불법 콘텐츠 신고 메커니즘",
        original: "To protect our community and comply with the DSA, we may suspend the provision of our services to any user who frequently provides manifestly illegal content. We may also suspend the processing of notices or complaints submitted via our notice-and-action mechanism and internal complaint-handling system where an individual or entity frequently submits manifestly unfounded notices or complaints.",
        translation: "[DSA 준수] 명백한 불법 콘텐츠를 반복 게시하는 이용자에 대해 서비스 제공을 정지할 수 있습니다. 또한 명백히 근거 없는 신고를 반복 제출하는 경우 신고 처리를 중단할 수 있습니다.",
      },
      {
        label: "Section XIII — 중재 조항 EEA 예외",
        original: "As a deviation from the introduction terms and Section X of the Terms, the binding arbitration clause and class action waiver do not apply.",
        translation: "[EEA 이용자 예외] EEA 이용자에게는 구속력 있는 중재 조항 및 집단소송 포기 조항이 적용되지 않습니다.",
      },
    ],
  },
  {
    company: "엔씨소프트",
    lang: "EN",
    effectiveDate: "2025-10-22",
    summary: "개인 중재 조항 강화 및 Class Action Waiver 명시, 1년 소멸시효 규정 신설 — 이전 버전 대비 Section 11 중재 조항 구체화. 2026-04-15 개정은 JP 버전만 실질 변경.",
    impact: "low",
    impactLabel: "🟢 낮음",
    sourceUrl: "https://www.plaync.com/policy/service/game_en",
    clauses: [
      {
        label: "Section 11.1 — Binding Arbitration (1년 소멸시효)",
        original: "To the fullest extent permissible by applicable law, all claims against NC, including but not limited to claims arising out of or relating in any way to the Services or the Terms, must be filed within one year after such claim or cause of action arose or it will be forever barred.",
        translation: "적용 법률이 허용하는 최대 범위 내에서, 서비스 또는 약관과 관련된 NC에 대한 모든 청구는 청구 원인 발생일로부터 1년 이내에 제기되어야 하며, 이를 경과하면 영구적으로 차단됩니다.",
      },
      {
        label: "Section 11.2 — Class Action / Jury Trial Waiver",
        original: "You and NC agree that, to the fullest extent permitted by law, each party is waiving the right to a trial by jury or to participate as a plaintiff, claimant, or class member in any class, collective, consolidated, private attorney general, or representative proceeding. This means that you and NC may not bring a claim on behalf of a class or group and may not bring a claim on behalf of any other person unless doing so as a parent, guardian, or ward of a minor.",
        translation: "이용자와 NC는 법이 허용하는 최대 범위 내에서 배심원 재판 권리 및 집단소송·대표소송에 원고·청구인·구성원으로 참여할 권리를 포기합니다. 미성년자의 법정대리인으로서 제기하는 경우는 예외입니다.",
      },
    ],
  },
  {
    company: "넷마블",
    lang: "KR",
    effectiveDate: "2025-05-21",
    summary: "포인트 제공 시점 변경 — '유료 콘텐츠 구매일로부터 14일 경과 후'에서 '포인트 서비스 규정에 따라'로 변경. 환불 지연이자 조항(제24조⑥)은 이전 버전(2024-04-16)에도 동일하게 존재.",
    impact: "medium",
    impactLabel: "🟡 중간",
    sourceUrl: "https://help.netmarble.com/ko/terms/terms_of_service_ko",
    clauses: [
      {
        label: "제17조 ③항 (포인트 제공 시점 변경)",
        original: "③ 회사는 포인트 서비스 규정에 따라 포인트를 제공하며, 제1항에 따라 무상으로 제공되는 포인트는 별도 명시한 기간을 따릅니다. 회사는 적립된 포인트의 유효기간을 설정하여 이용을 제한할 수 있습니다.",
      },
      {
        label: "[참고] 제24조 ⑥항 (환불 지연이자 — 이전 버전에도 존재)",
        original: "⑥ 제1항부터 제4항까지의 규정에 따라 청약철회가 이루어질 경우 회사는 지체 없이 회원의 유료 콘텐츠를 회수하고 3영업일 이내에 대금을 환급합니다. 이 경우 회사가 환급을 지연한 때에는 그 지연기간에 대하여 「전자상거래 등에서의 소비자보호에 관한 법률」 및 같은 법 시행령 제21조의3에서 정하는 이율을 곱하여 산정한 지연이자를 지급합니다.",
      },
    ],
  },
  {
    company: "카카오게임즈",
    lang: "KR",
    effectiveDate: "2025-07-17",
    summary: "제20조 크레딧 조항 신설 — 이전 버전(2025-05-27)에는 없던 크레딧 제공·유효기간·사용 제한·종료 시 30일 사전고지 조항이 신규 추가됨. 기존 제20조(회원에 대한 서비스 이용 제한)는 제21조로 번호 재정리.",
    impact: "medium",
    impactLabel: "🟡 중간",
    sourceUrl: "https://web-data-cdn.kakaogames.com/real/www/html/terms/index.html?service=S0018&type=T001&lang=ko",
    clauses: [
      {
        label: "제20조 크레딧 (신설)",
        original: "제20조 크레딧\n1. 회사는 회원의 서비스 이용 편의를 위해 크레딧을 제공할 수 있습니다.\n2. 크레딧의 유효기간은 개별 게임 서비스 내 또는 그 연결 화면을 통하여 고지하며, 회사가 정한 유효기간이 경과한 크레딧은 소멸합니다.\n3. 크레딧은 게임 서비스에 따라 명칭이 다를 수 있으며, 회원은 크레딧을 적립한 게임 서비스에서만 사용할 수 있습니다.\n4. 회사는 경영상, 기술상 이유로 크레딧 제공을 종료할 수 있으며, 최소한 30일 이전에 게임 서비스 내 또는 그 연결 화면을 통하여 사전 고지합니다.\n5. 본 조 제4항 또는 회원의 귀책 사유로 이용계약이 해지되면 크레딧은 소멸합니다.",
      },
    ],
  },
];

// ── KR 비교 분석 ──────────────────────────────────────────
export interface ComparisonItem {
  item: string;
  lineGames: string;
  nexon: string | null;
  netmarble: string | null;
  krafton: string | null;
  ncsoft: string | null;
  kakao: string | null;
  legalBasis: string;
  priority: Priority;
  recommendation: string;
}

export const KR_COMPARISON: ComparisonItem[] = [
  {
    item: "약관 변경 사전 고지",
    lineGames: "제3조 ④항: 불리한 변경 30일 전 고지",
    nexon: "제3조 ③항",
    netmarble: "제3조 ③항",
    krafton: "제3조 ②항",
    ncsoft: "제3조 ③항",
    kakao: "제3조 ③항",
    legalBasis: "전자상거래법",
    priority: "참고",
    recommendation: "현행 유지",
  },
  {
    item: "확률형 아이템 정보 공개",
    lineGames: "제16조 ③항: 선언적 명시",
    nexon: "제15조 ④항",
    netmarble: "제15조 ⑤항",
    krafton: "제14조",
    ncsoft: "제14조 ⑤항",
    kakao: "제15조 ④항",
    legalBasis: "게임산업법 개정(2024.3)",
    priority: "필수",
    recommendation: "조항 구체화 (표시 장소, 유·무상 결합 방식 명시)",
  },
  {
    item: "서비스 종료 사전 고지",
    lineGames: "제12조 ③항: 30일 전 고지",
    nexon: "제13조 ②항",
    netmarble: "제13조 ②항",
    krafton: "제13조 ②항",
    ncsoft: "제12조 ②항",
    kakao: "제13조 ②항",
    legalBasis: "공정위 표준약관",
    priority: "참고",
    recommendation: "현행 유지",
  },
  {
    item: "청약철회 및 환불",
    lineGames: "제27조: 7일 이내 청약철회",
    nexon: "제24조",
    netmarble: "제24조",
    krafton: "제23조",
    ncsoft: "제24조",
    kakao: "제24조",
    legalBasis: "전자상거래법 제17조",
    priority: "참고",
    recommendation: "현행 유지",
  },
  {
    item: "환불 지연이자",
    lineGames: "미명시",
    nexon: null,
    netmarble: "제24조 ⑥항",
    krafton: null,
    ncsoft: null,
    kakao: "제24조 ⑥항",
    legalBasis: "전자상거래법 시행령 §21의3",
    priority: "권고",
    recommendation: "제27조 ④항 등에 지연이자 지급 의무 추가",
  },
  {
    item: "이용제한 이의신청",
    lineGames: "제26조: 15일 이내 신청/답변",
    nexon: "제20조 ⑦항",
    netmarble: "제20조 ⑥항",
    krafton: "제18조 ⑤항",
    ncsoft: "제19조 ⑦항",
    kakao: "제20조 ⑥항",
    legalBasis: "콘텐츠이용자 보호지침",
    priority: "참고",
    recommendation: "현행 유지 (처리 기한 준수 모니터링)",
  },
  {
    item: "손해배상 (회사 귀책)",
    lineGames: "제32조 ①항: 고의·중과실 한정",
    nexon: "제28조",
    netmarble: "제28조",
    krafton: "제26조",
    ncsoft: "제28조",
    kakao: "제28조",
    legalBasis: "민법",
    priority: "참고",
    recommendation: "현행 유지",
  },
  {
    item: "개인정보 역외 이전 및 이동권",
    lineGames: "제21조: 개인정보처리방침 위임",
    nexon: "제22조",
    netmarble: "제22조",
    krafton: "제21조",
    ncsoft: "제22조",
    kakao: "제22조",
    legalBasis: "개인정보보호법 개정(2024.3)",
    priority: "권고",
    recommendation: "개인정보처리방침 내 관련 조항 현행화 확인",
  },
];

// ── JP 비교 분석 ──────────────────────────────────────────
export const JP_COMPARISON: ComparisonItem[] = [
  {
    item: "資金決済法 대응 (선불식 지급수단)",
    lineGames: "제9조 ②항: 前払式支払手段 명시",
    nexon: "제11조",
    netmarble: "제11조",
    krafton: "제11조",
    ncsoft: "제14조",
    kakao: "제11조",
    legalBasis: "일본 자금결제법",
    priority: "참고",
    recommendation: "현행 유지",
  },
  {
    item: "유·무상 전자결제수단 구분",
    lineGames: "제9조 ⑦항: 유상분 선 소비 명시",
    nexon: null,
    netmarble: null,
    krafton: null,
    ncsoft: "제14조 ①항 (상세 정의)",
    kakao: null,
    legalBasis: "일본 자금결제법",
    priority: "필수",
    recommendation: "제9조 내 유·무상 정의 명확화",
  },
  {
    item: "払戻し (환불) 규정",
    lineGames: "제9조 ④항: 払戻不可 원칙 명시",
    nexon: "제12조",
    netmarble: "제12조",
    krafton: "제12조",
    ncsoft: "제25조",
    kakao: "제12조",
    legalBasis: "일본 자금결제법",
    priority: "참고",
    recommendation: "현행 유지",
  },
  {
    item: "返金/払戻し 용어 통일",
    lineGames: "혼용 (返金, 払戻し 혼재)",
    nexon: "払戻し 사용",
    netmarble: "払戻し 사용",
    krafton: "払戻し 사용",
    ncsoft: "払戻し 사용",
    kakao: "払戻し 사용",
    legalBasis: "법률 용어 적합성",
    priority: "필수",
    recommendation: "약관 전체 '払戻し'로 통일",
  },
  {
    item: "特定商取引法 표기",
    lineGames: "미비",
    nexon: "제11조",
    netmarble: null,
    krafton: null,
    ncsoft: "제14조",
    kakao: null,
    legalBasis: "일본 특정상거래법",
    priority: "필수",
    recommendation: "표기 링크 또는 안내 문구 추가",
  },
  {
    item: "개인정보 역외 이전 (APPI)",
    lineGames: "제5조: 프라이버시 정책 참조",
    nexon: "정책 참조",
    netmarble: "정책 참조",
    krafton: "정책 참조",
    ncsoft: "정책 참조",
    kakao: "정책 참조",
    legalBasis: "일본 개인정보보호법",
    priority: "참고",
    recommendation: "현행 유지",
  },
  {
    item: "경품표시법(景品表示法) 대응",
    lineGames: "제10조: 일반적 면책",
    nexon: null,
    netmarble: null,
    krafton: null,
    ncsoft: null,
    kakao: null,
    legalBasis: "일본 경품표시법",
    priority: "권고",
    recommendation: "확률형 아이템의 경품류 해당 여부 모니터링",
  },
  {
    item: "소비자계약법(消費者契約法) 대응",
    lineGames: "제12조: 회사 면책 조항",
    nexon: null,
    netmarble: null,
    krafton: null,
    ncsoft: null,
    kakao: null,
    legalBasis: "일본 소비자계약법 개정(2022·2023)",
    priority: "권고",
    recommendation: "과도한 면책 조항 점검",
  },
];

// ── EN 비교 분석 ──────────────────────────────────────────
export const EN_COMPARISON: ComparisonItem[] = [
  {
    item: "GDPR 준수 명시",
    lineGames: "제9조 2항: GDPR 준수 명시",
    nexon: "제12조",
    netmarble: "제9조",
    krafton: "제11조",
    ncsoft: "제12조",
    kakao: "제11조",
    legalBasis: "EU GDPR",
    priority: "참고",
    recommendation: "현행 유지",
  },
  {
    item: "CCPA/COPPA 준수",
    lineGames: "제9조 2항: CCPA 준수 명시",
    nexon: "제12조",
    netmarble: "제9조",
    krafton: "제11조",
    ncsoft: "제12조",
    kakao: "제11조",
    legalBasis: "미국 CCPA/COPPA",
    priority: "참고",
    recommendation: "현행 유지",
  },
  {
    item: "EU DSA 대응 조항",
    lineGames: "없음",
    nexon: "Section XIII 보충 조항",
    netmarble: null,
    krafton: null,
    ncsoft: null,
    kakao: null,
    legalBasis: "EU DSA (2022/2065)",
    priority: "권고",
    recommendation: "EEA 이용자 보충 조항 신설",
  },
  {
    item: "계정 제재 이의신청 (Appeal)",
    lineGames: "없음",
    nexon: "Section XIII",
    netmarble: null,
    krafton: null,
    ncsoft: null,
    kakao: null,
    legalBasis: "EU DSA",
    priority: "권고",
    recommendation: "DSA 연계 이의신청 절차 마련",
  },
  {
    item: "분쟁 해결 (Arbitration)",
    lineGames: "제13조: 한국법 준거",
    nexon: null,
    netmarble: "제22조",
    krafton: "제12조",
    ncsoft: "제11조",
    kakao: null,
    legalBasis: "글로벌 분쟁 대응",
    priority: "권고",
    recommendation: "중재 및 Class Action Waiver 조항 도입 검토",
  },
  {
    item: "UK Online Safety Act 대응",
    lineGames: "없음",
    nexon: "Section XIII 보충 조항",
    netmarble: null,
    krafton: null,
    ncsoft: null,
    kakao: null,
    legalBasis: "UK Online Safety Act",
    priority: "권고",
    recommendation: "UK 이용자 불법 콘텐츠 처리 의무 명시",
  },
  {
    item: "EU AI Act 대응",
    lineGames: "없음",
    nexon: null,
    netmarble: null,
    krafton: null,
    ncsoft: null,
    kakao: null,
    legalBasis: "EU AI Act (2026년 적용)",
    priority: "참고",
    recommendation: "확률형 아이템 알고리즘 투명성 의무 모니터링",
  },
];

// ── 종합 권고 사항 ──────────────────────────────────────────
export interface FinalRecommendation {
  priority: Priority;
  lang: string;
  item: string;
  recommendation: string;
  legalBasis: string;
}

export const FINAL_RECOMMENDATIONS: FinalRecommendation[] = [
  { priority: "필수", lang: "KR", item: "확률형 아이템 정보 공개 구체화", recommendation: "별도 조항 신설 또는 현행 조항 상세화", legalBasis: "게임산업법 개정(2024)" },
  { priority: "필수", lang: "JP", item: "유·무상 전자결제수단 정의 명확화", recommendation: "엔씨소프트 JP 약관 참고하여 정의 조항 보강", legalBasis: "일본 자금결제법" },
  { priority: "필수", lang: "JP", item: "特定商取引法 표기 추가", recommendation: "약관 내 또는 별도 페이지 링크 제공", legalBasis: "일본 특정상거래법" },
  { priority: "필수", lang: "JP", item: "払戻し 용어 통일", recommendation: "약관 전체에서 '返金' → '払戻し' 통일", legalBasis: "법률 용어 적합성" },
  { priority: "권고", lang: "EN", item: "EU DSA 대응 조항 신설", recommendation: "EEA 이용자 보충 조항 신설 검토", legalBasis: "EU DSA (2022/2065)" },
  { priority: "권고", lang: "KR", item: "환불 지연이자 조항 신설", recommendation: "전자상거래법 시행령 §21의3 명시", legalBasis: "전자상거래법 시행령" },
  { priority: "권고", lang: "EN", item: "중재 조항 검토", recommendation: "글로벌 서비스 확대 시 Arbitration 조항 강화", legalBasis: "글로벌 분쟁 대응" },
  { priority: "참고", lang: "KR/EN", item: "서비스 종료 시 손해배상 제한", recommendation: "지속 모니터링", legalBasis: "약관규제법" },
];

// ── 통계 요약 ──────────────────────────────────────────────
export const STATS = {
  totalUrls: 15,
  validUrls: 15,
  mandatoryItems: FINAL_RECOMMENDATIONS.filter(r => r.priority === "필수").length,
  recommendedItems: FINAL_RECOMMENDATIONS.filter(r => r.priority === "권고").length,
  referenceItems: FINAL_RECOMMENDATIONS.filter(r => r.priority === "참고").length,
  recentChanges: RECENT_CHANGES.length,
  highImpact: RECENT_CHANGES.filter(r => r.impact === "high").length,
};
