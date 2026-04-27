// Design: Dark Command Center — Overview / Executive Summary
import { useEffect, useState } from "react";
import { AlertCircle, AlertTriangle, Info, TrendingUp, CheckCircle2, Globe } from "lucide-react";
import { STATS, REPORT_META } from "@/lib/data";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663401356827/CGycDPA6sT8xnaEsiZ9ZtM/hero-bg-jZVpJfXFSsTnJf7tPfDWcE.webp";

function CountUp({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setValue(start);
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{value}</>;
}

const KPI_CARDS = [
  {
    label: "필수 개정 항목",
    value: STATS.mandatoryItems,
    icon: <AlertCircle size={18} />,
    color: "oklch(0.62 0.22 25)",
    bgColor: "oklch(0.62 0.22 25 / 12%)",
    borderColor: "oklch(0.62 0.22 25 / 40%)",
    desc: "즉시 검토 필요",
  },
  {
    label: "권고 개정 항목",
    value: STATS.recommendedItems,
    icon: <AlertTriangle size={18} />,
    color: "oklch(0.78 0.18 75)",
    bgColor: "oklch(0.78 0.18 75 / 12%)",
    borderColor: "oklch(0.78 0.18 75 / 40%)",
    desc: "차기 개정 시 반영",
  },
  {
    label: "단순 참고 항목",
    value: STATS.referenceItems,
    icon: <Info size={18} />,
    color: "oklch(0.72 0.18 145)",
    bgColor: "oklch(0.72 0.18 145 / 12%)",
    borderColor: "oklch(0.72 0.18 145 / 40%)",
    desc: "지속 모니터링",
  },
  {
    label: "타사 최근 개정",
    value: STATS.recentChanges,
    icon: <TrendingUp size={18} />,
    color: "oklch(0.72 0.18 178)",
    bgColor: "oklch(0.72 0.18 178 / 12%)",
    borderColor: "oklch(0.72 0.18 178 / 40%)",
    desc: `고영향 ${STATS.highImpact}건 포함`,
  },
  {
    label: "수집 URL",
    value: STATS.validUrls,
    icon: <Globe size={18} />,
    color: "oklch(0.65 0.15 220)",
    bgColor: "oklch(0.65 0.15 220 / 12%)",
    borderColor: "oklch(0.65 0.15 220 / 40%)",
    desc: `${STATS.totalUrls}개 중 전체 유효`,
  },
  {
    label: "독소 조항",
    value: 0,
    icon: <CheckCircle2 size={18} />,
    color: "oklch(0.72 0.18 145)",
    bgColor: "oklch(0.72 0.18 145 / 12%)",
    borderColor: "oklch(0.72 0.18 145 / 40%)",
    desc: "역방향 점검 이상 없음",
  },
];

const TOP3 = [
  {
    rank: 1,
    lang: "KR",
    priority: "필수",
    title: "게임산업법 개정에 따른 확률형 아이템 표시 의무 구체화",
    desc: "자사 약관 제16조 제3항은 선언적 수준에 머물러 있습니다. 크래프톤·엔씨소프트 등 5개사 모두 구체적 서술 방식을 채택. 표시 장소, 유·무상 결합 방식 등 세부 사항 명시 필요.",
    color: "oklch(0.62 0.22 25)",
    bgColor: "oklch(0.62 0.22 25 / 8%)",
  },
  {
    rank: 2,
    lang: "JP",
    priority: "필수",
    title: "자금결제법에 따른 선불식 지급수단 규정 정비 및 법률 용어 통일",
    desc: "약관 내 '返金'과 '払戻し' 혼용 문제, 유·무상 전자결제수단 정의 불명확, 特定商取引法 표기 누락 등 3가지 필수 개정 사항 확인.",
    color: "oklch(0.62 0.22 25)",
    bgColor: "oklch(0.62 0.22 25 / 8%)",
  },
  {
    rank: 3,
    lang: "EN",
    priority: "권고",
    title: "EU 디지털서비스법(DSA) 대응 조항 신설 검토",
    desc: "자사 EN 약관에 DSA 관련 조항 누락. 넥슨은 EEA+UK 보충 조항(Section XIII) 신설. EEA 이용자 서비스 확대 시 법적 리스크 존재.",
    color: "oklch(0.78 0.18 75)",
    bgColor: "oklch(0.78 0.18 75 / 8%)",
  },
];

export default function OverviewSection() {
  return (
    <section id="overview" className="space-y-8">
      {/* Hero banner */}
      <div
        className="relative rounded-xl overflow-hidden"
        style={{ minHeight: 200 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})`, opacity: 0.35 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.09 0.02 250 / 80%) 0%, oklch(0.09 0.02 250 / 40%) 100%)" }} />
        <div className="relative z-10 px-8 py-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="pill-badge">보고서 {REPORT_META.reportNo}</span>
                <span className="pill-badge" style={{ background: "oklch(0.72 0.18 178 / 10%)", color: "oklch(0.72 0.18 178)", borderColor: "oklch(0.72 0.18 178 / 30%)" }}>
                  {REPORT_META.cycle}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-foreground leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                이용약관 정기 벤치마킹<br />
                <span style={{ color: "oklch(0.72 0.18 178)" }}>모니터링 결과 보고서</span>
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                {REPORT_META.team} · 분석 기준일: {REPORT_META.createdAt} · 자사 약관 기준: {REPORT_META.baseVersion}
              </p>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p className="text-xs">벤치마킹 대상</p>
              <p className="font-semibold text-foreground mt-0.5">넥슨 · 넷마블 · 크래프톤</p>
              <p className="font-semibold text-foreground">엔씨소프트 · 카카오게임즈</p>
              <p className="text-xs mt-1">KR / JP / EN 3개 언어</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {KPI_CARDS.map((card, i) => (
          <div
            key={i}
            className="rounded-lg p-4 flex flex-col gap-2 animate-fade-in-up"
            style={{
              background: card.bgColor,
              border: `1px solid ${card.borderColor}`,
              animationDelay: `${i * 80}ms`,
              animationFillMode: "both",
            }}
          >
            <div className="flex items-center justify-between">
              <span style={{ color: card.color }}>{card.icon}</span>
            </div>
            <div className="text-3xl font-bold" style={{ color: card.color, fontFamily: "'Space Grotesk', sans-serif" }}>
              <CountUp target={card.value} />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground leading-tight">{card.label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Top 3 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="section-divider flex-1" />
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap px-2">
            이번 회차 핵심 개정 필요 항목 Top 3
          </h2>
          <div className="section-divider flex-1" style={{ background: "linear-gradient(270deg, oklch(0.72 0.18 178 / 40%), transparent)" }} />
        </div>
        <div className="space-y-3">
          {TOP3.map((item) => (
            <div
              key={item.rank}
              className="rounded-lg p-5 flex gap-4 animate-fade-in-up"
              style={{
                background: item.bgColor,
                border: `1px solid ${item.color}30`,
                borderLeft: `3px solid ${item.color}`,
                animationDelay: `${item.rank * 100}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40` }}>
                {item.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="pill-badge" style={{ background: `${item.color}15`, color: item.color, borderColor: `${item.color}40` }}>
                    [{item.lang}]
                  </span>
                  <span className="pill-badge" style={{ background: `${item.color}15`, color: item.color, borderColor: `${item.color}40` }}>
                    {item.priority}
                  </span>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
