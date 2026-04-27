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
  { company: "넥슨", lang: "EN", valid: true, effectiveDate: "2026-03-19", note: "DSA EEA 보충 조항 신설" },
  { company: "넷마블", lang: "KR", valid: true, effectiveDate: "2025-05-21", note: "환불 지연이자 조항 구체화" },
  { company: "넷마블", lang: "JP", valid: true, effectiveDate: "2025-05-21", note: "(추정)" },
  { company: "넷마블", lang: "EN", valid: true, effectiveDate: "2025-06-25", note: "" },
  { company: "크래프톤", lang: "KR", valid: true, effectiveDate: "2026-01-07", note: "확률형 아이템 정보 공개 조항 상세화" },
  { company: "크래프톤", lang: "JP", valid: true, effectiveDate: "2026-01-07", note: "" },
  { company: "크래프톤", lang: "EN", valid: true, effectiveDate: "2026-01-07", note: "중재 및 Class Action Waiver 조항 포함" },
  { company: "엔씨소프트", lang: "KR", valid: true, effectiveDate: "2024-05-13", note: "게임산업법 개정 반영" },
  { company: "엔씨소프트", lang: "JP", valid: true, effectiveDate: "2026-04-15", note: "유·무상 전자결제수단 정의 상세화" },
  { company: "엔씨소프트", lang: "EN", valid: true, effectiveDate: "2025-10-22", note: "" },
  { company: "카카오게임즈", lang: "KR", valid: true, effectiveDate: "2025-07-17", note: "" },
  { company: "카카오게임즈", lang: "JP", valid: true, effectiveDate: "2025-07-17", note: "" },
  { company: "카카오게임즈", lang: "EN", valid: true, effectiveDate: "2025-05-28", note: "" },
  { company: "라인게임즈 (자사)", lang: "KR", valid: true, effectiveDate: "2025-05-09", note: "분석 기준 버전" },
  { company: "라인게임즈 (자사)", lang: "JP", valid: true, effectiveDate: "2025-05-09", note: "분석 기준 버전" },
  { company: "라인게임즈 (자사)", lang: "EN", valid: true, effectiveDate: "2025-05-09", note: "분석 기준 버전" },
];

// ── 타사 최근 개정 동향 특이사항 ──────────────────────────
export type ImpactLevel = "high" | "medium" | "low";

export interface RecentChange {
  company: string;
  lang: string;
  effectiveDate: string;
  summary: string;
  impact: ImpactLevel;
  impactLabel: string;
}

export const RECENT_CHANGES: RecentChange[] = [
  {
    company: "엔씨소프트",
    lang: "JP",
    effectiveDate: "2026-04-15",
    summary: "유·무상 전자결제수단(有償/無償電子仮想決済手段) 정의 조항 대폭 강화, PURPLE 코인·포인트 명칭 변경 특약 신설",
    impact: "high",
    impactLabel: "🔴 높음",
  },
  {
    company: "크래프톤",
    lang: "KR/JP/EN",
    effectiveDate: "2026-01-07",
    summary: "확률형 아이템 정보 공개 메뉴를 별도 네비게이션 항목으로 분리, Class Action Waiver 조항 강화, 서비스 장애 보상 기준 구체화",
    impact: "high",
    impactLabel: "🔴 높음",
  },
  {
    company: "넥슨",
    lang: "EN",
    effectiveDate: "2026-03-19",
    summary: "EU DSA 대응 EEA+UK 보충 조항(Section XIII) 신설 — 불법 콘텐츠 신고 메커니즘, 계정 제재 이의신청 절차, 중재 조항 EEA 예외 명시",
    impact: "medium",
    impactLabel: "🟡 중간",
  },
  {
    company: "엔씨소프트",
    lang: "EN",
    effectiveDate: "2026-04-15",
    summary: "Class Action Waiver 및 개인 중재 조항 강화, 1년 소멸시효 명시",
    impact: "low",
    impactLabel: "🟢 낮음",
  },
  {
    company: "넷마블",
    lang: "KR",
    effectiveDate: "2025-05-21",
    summary: "환불 지연이자 조항 신설 (전자상거래법 시행령 §21의3 명시) — 이전 버전(2024-04-16) 대비 추가",
    impact: "medium",
    impactLabel: "🟡 중간",
  },
  {
    company: "카카오게임즈",
    lang: "KR",
    effectiveDate: "2025-07-17",
    summary: "환불 지연이자 조항 신설 (동일 법령 근거)",
    impact: "medium",
    impactLabel: "🟡 중간",
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
