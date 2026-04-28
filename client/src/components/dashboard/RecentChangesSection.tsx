// Design: Dark Command Center — Recent Changes Timeline
// 타사 최근 개정 동향 특이사항: 원문 조항 텍스트 + 출처 URL 링크 포함
import { useState } from "react";
import { TrendingUp, Calendar, ChevronDown, ChevronUp, ExternalLink, FileText } from "lucide-react";
import { RECENT_CHANGES, type ImpactLevel, type RecentChange } from "@/lib/data";

const IMPACT_CONFIG: Record<ImpactLevel, { label: string; color: string; bg: string; border: string; dot: string }> = {
  high: {
    label: "🔴 높음",
    color: "oklch(0.72 0.2 25)",
    bg: "oklch(0.62 0.22 25 / 10%)",
    border: "oklch(0.62 0.22 25 / 35%)",
    dot: "oklch(0.62 0.22 25)",
  },
  medium: {
    label: "🟡 중간",
    color: "oklch(0.82 0.18 85)",
    bg: "oklch(0.78 0.18 75 / 10%)",
    border: "oklch(0.78 0.18 75 / 35%)",
    dot: "oklch(0.78 0.18 75)",
  },
  low: {
    label: "🟢 낮음",
    color: "oklch(0.72 0.18 145)",
    bg: "oklch(0.72 0.18 145 / 10%)",
    border: "oklch(0.72 0.18 145 / 35%)",
    dot: "oklch(0.72 0.18 145)",
  },
};

const LANG_BADGE: Record<string, { bg: string; text: string }> = {
  KR: { bg: "oklch(0.55 0.2 270 / 15%)", text: "oklch(0.75 0.15 270)" },
  JP: { bg: "oklch(0.62 0.22 25 / 15%)", text: "oklch(0.75 0.15 25)" },
  EN: { bg: "oklch(0.72 0.18 145 / 15%)", text: "oklch(0.72 0.18 145)" },
  "KR/JP/EN": { bg: "oklch(0.72 0.18 178 / 15%)", text: "oklch(0.72 0.18 178)" },
};

function ClauseCard({ clause, lang }: { clause: { label: string; original: string; translation?: string }; lang: string }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const isJpOrEn = lang !== "KR";

  return (
    <div className="rounded-md overflow-hidden"
      style={{ background: "oklch(1 0 0 / 3%)", border: "1px solid oklch(1 0 0 / 8%)" }}>
      {/* Clause header */}
      <div className="flex items-center gap-2 px-3 py-2"
        style={{ background: "oklch(1 0 0 / 4%)", borderBottom: "1px solid oklch(1 0 0 / 8%)" }}>
        <FileText size={11} style={{ color: "oklch(0.72 0.18 178)", flexShrink: 0 }} />
        <span className="text-[11px] font-semibold" style={{ color: "oklch(0.72 0.18 178)", fontFamily: "'Space Grotesk', sans-serif" }}>
          {clause.label}
        </span>
      </div>

      {/* Original text */}
      <div className="px-3 py-2.5">
        <p className="text-[11px] leading-relaxed whitespace-pre-line"
          style={{ color: "oklch(0.85 0.005 65)", fontFamily: isJpOrEn ? "'Noto Sans JP', 'Noto Sans KR', sans-serif" : "inherit" }}>
          {clause.original}
        </p>

        {/* Translation toggle (JP/EN only) */}
        {isJpOrEn && clause.translation && (
          <>
            <button
              onClick={() => setShowTranslation(v => !v)}
              className="flex items-center gap-1 mt-2 text-[10px] font-medium transition-opacity hover:opacity-80"
              style={{ color: "oklch(0.72 0.18 178)" }}>
              {showTranslation ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
              {showTranslation ? "한국어 번역 접기" : "한국어 번역 보기"}
            </button>
            {showTranslation && (
              <div className="mt-2 pt-2 text-[11px] leading-relaxed"
                style={{ borderTop: "1px solid oklch(1 0 0 / 8%)", color: "oklch(0.72 0.18 178 / 90%)" }}>
                {clause.translation}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ChangeCard({ change, index }: { change: RecentChange; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = IMPACT_CONFIG[change.impact];
  const langCfg = LANG_BADGE[change.lang] || LANG_BADGE["KR/JP/EN"];
  const hasClausees = change.clauses && change.clauses.length > 0;

  return (
    <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}>
      {/* Timeline dot */}
      <div className="relative z-10 shrink-0 w-11 flex justify-center">
        <div className="w-3 h-3 rounded-full mt-4 ring-2 ring-background"
          style={{ background: cfg.dot }} />
      </div>

      {/* Card */}
      <div className="flex-1 rounded-lg overflow-hidden"
        style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderLeft: `3px solid ${cfg.dot}` }}>

        {/* Card header */}
        <div className="p-4">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-sm font-bold text-foreground">{change.company}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: langCfg.bg, color: langCfg.text }}>
              {change.lang}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground ml-auto">
              <Calendar size={11} />
              <span className="font-mono">{change.effectiveDate}</span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full font-medium"
              style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
              {cfg.label}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{change.summary}</p>

          {/* Action row */}
          <div className="flex items-center gap-3 mt-3">
            {/* Source URL link */}
            <a
              href={change.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-medium transition-opacity hover:opacity-80"
              style={{ color: "oklch(0.72 0.18 178)" }}>
              <ExternalLink size={11} />
              원문 약관 페이지 바로가기
            </a>

            {/* Expand clauses button */}
            {hasClausees && (
              <button
                onClick={() => setExpanded(v => !v)}
                className="flex items-center gap-1 text-[11px] font-medium ml-auto transition-opacity hover:opacity-80"
                style={{ color: cfg.color }}>
                {expanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                {expanded ? "조항 원문 접기" : `조항 원문 보기 (${change.clauses.length}건)`}
              </button>
            )}
          </div>
        </div>

        {/* Expanded clause texts */}
        {expanded && hasClausees && (
          <div className="px-4 pb-4 space-y-2.5"
            style={{ borderTop: `1px solid ${cfg.border}`, paddingTop: "12px" }}>
            <div className="text-[10px] font-semibold uppercase tracking-wider mb-2"
              style={{ color: "oklch(0.6 0.01 286)" }}>
              관련 조항 원문
            </div>
            {change.clauses.map((clause, ci) => (
              <ClauseCard key={ci} clause={clause} lang={change.lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecentChangesSection() {
  const sorted = [...RECENT_CHANGES].sort((a, b) => b.effectiveDate.localeCompare(a.effectiveDate));

  return (
    <section id="recent-changes" className="space-y-5">
      <div className="flex items-center gap-3">
        <TrendingUp size={18} style={{ color: "oklch(0.72 0.18 178)" }} />
        <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          타사 최근 개정 동향 특이사항
        </h2>
        <span className="pill-badge ml-auto">{sorted.length}건</span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        최근 각 사의 약관 개정 이력을 분석한 결과입니다. 각 항목에서 <strong style={{ color: "oklch(0.72 0.18 178)" }}>조항 원문 보기</strong>를 클릭하면 실제 약관 텍스트를 확인할 수 있습니다.
      </p>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3">
        {(["high", "medium", "low"] as ImpactLevel[]).map(level => {
          const cfg = IMPACT_CONFIG[level];
          const count = RECENT_CHANGES.filter(c => c.impact === level).length;
          return (
            <div key={level} className="rounded-lg p-3 text-center"
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
              <div className="text-2xl font-bold" style={{ color: cfg.color, fontFamily: "'Space Grotesk', sans-serif" }}>{count}</div>
              <div className="text-xs mt-1" style={{ color: cfg.color }}>{cfg.label}</div>
            </div>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[22px] top-0 bottom-0 w-px" style={{ background: "oklch(1 0 0 / 8%)" }} />

        <div className="space-y-4">
          {sorted.map((change, i) => (
            <ChangeCard key={i} change={change} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
