// Design: Dark Command Center — Recent Changes Timeline
import { TrendingUp, Calendar } from "lucide-react";
import { RECENT_CHANGES, type ImpactLevel } from "@/lib/data";

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

export default function RecentChangesSection() {
  // Sort by date descending
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
        최근 각 사의 약관 개정 이력을 분석한 결과입니다. 영향도가 높은 항목은 자사 약관 개정 시 우선적으로 고려해야 합니다.
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
          {sorted.map((change, i) => {
            const cfg = IMPACT_CONFIG[change.impact];
            const langCfg = LANG_BADGE[change.lang] || LANG_BADGE["KR/JP/EN"];
            return (
              <div key={i} className="flex gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}>
                {/* Timeline dot */}
                <div className="relative z-10 shrink-0 w-11 flex justify-center">
                  <div className="w-3 h-3 rounded-full mt-4 ring-2 ring-background"
                    style={{ background: cfg.dot }} />
                </div>

                {/* Card */}
                <div className="flex-1 rounded-lg p-4"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderLeft: `3px solid ${cfg.dot}` }}>
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
