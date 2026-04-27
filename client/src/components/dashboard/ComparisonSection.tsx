// Design: Dark Command Center — Comparison Table with Heatmap
import { useState } from "react";
import { Table2, ChevronDown, ChevronUp, CheckCircle2, XCircle, Minus } from "lucide-react";
import { KR_COMPARISON, JP_COMPARISON, EN_COMPARISON, type ComparisonItem, type Priority } from "@/lib/data";

interface ComparisonSectionProps {
  lang: "KR" | "JP" | "EN";
}

const LANG_CONFIG = {
  KR: {
    id: "kr-comparison",
    title: "KR (한국어) 약관 상세 비교표",
    subtitle: "한국어 약관 분석 항목",
    color: "oklch(0.75 0.15 270)",
    data: KR_COMPARISON,
    companies: ["넥슨", "넷마블", "크래프톤", "엔씨소프트", "카카오게임즈"],
    companyKeys: ["nexon", "netmarble", "krafton", "ncsoft", "kakao"] as const,
  },
  JP: {
    id: "jp-comparison",
    title: "JP (일본어) 약관 상세 비교표",
    subtitle: "일본어 약관 분석 항목",
    color: "oklch(0.75 0.15 25)",
    data: JP_COMPARISON,
    companies: ["넥슨", "넷마블", "크래프톤", "엔씨소프트", "카카오게임즈"],
    companyKeys: ["nexon", "netmarble", "krafton", "ncsoft", "kakao"] as const,
  },
  EN: {
    id: "en-comparison",
    title: "EN (영어) 약관 상세 비교표",
    subtitle: "영어 약관 분석 항목",
    color: "oklch(0.72 0.18 145)",
    data: EN_COMPARISON,
    companies: ["넥슨", "넷마블", "크래프톤", "엔씨소프트", "카카오게임즈"],
    companyKeys: ["nexon", "netmarble", "krafton", "ncsoft", "kakao"] as const,
  },
};

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string; border: string }> = {
  필수: { label: "🔴 필수", color: "oklch(0.72 0.2 25)", bg: "oklch(0.62 0.22 25 / 12%)", border: "oklch(0.62 0.22 25 / 40%)" },
  권고: { label: "🟡 권고", color: "oklch(0.82 0.18 85)", bg: "oklch(0.78 0.18 75 / 12%)", border: "oklch(0.78 0.18 75 / 40%)" },
  참고: { label: "🟢 참고", color: "oklch(0.72 0.18 145)", bg: "oklch(0.72 0.18 145 / 12%)", border: "oklch(0.72 0.18 145 / 40%)" },
};

function CellValue({ value }: { value: string | null }) {
  if (value === null) {
    return (
      <div className="flex items-center justify-center">
        <XCircle size={14} className="text-muted-foreground/40" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-1">
      <CheckCircle2 size={13} style={{ color: "oklch(0.72 0.18 145)" }} />
      <span className="text-[10px] font-mono text-muted-foreground text-center leading-tight">{value}</span>
    </div>
  );
}

function ExpandedRow({ item }: { item: ComparisonItem }) {
  const pc = PRIORITY_CONFIG[item.priority];
  return (
    <tr>
      <td colSpan={8} className="px-4 py-4" style={{ background: "oklch(0.10 0.022 250)" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <p className="text-muted-foreground font-semibold mb-1 uppercase tracking-wide text-[10px]">자사 현황</p>
            <p className="text-foreground leading-relaxed">{item.lineGames}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-semibold mb-1 uppercase tracking-wide text-[10px]">법적 근거 / 리스크</p>
            <p className="text-foreground leading-relaxed">{item.legalBasis}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-semibold mb-1 uppercase tracking-wide text-[10px]">개정 권고안</p>
            <div className="flex items-start gap-2">
              <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded font-medium"
                style={{ background: pc.bg, color: pc.color, border: `1px solid ${pc.border}` }}>
                {pc.label}
              </span>
              <p className="text-foreground leading-relaxed">{item.recommendation}</p>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default function ComparisonSection({ lang }: ComparisonSectionProps) {
  const cfg = LANG_CONFIG[lang];
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [filterPriority, setFilterPriority] = useState<Priority | "전체">("전체");

  const toggleRow = (i: number) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const filtered = filterPriority === "전체"
    ? cfg.data
    : cfg.data.filter(item => item.priority === filterPriority);

  return (
    <section id={cfg.id} className="space-y-5">
      <div className="flex items-center gap-3 flex-wrap">
        <Table2 size={18} style={{ color: cfg.color }} />
        <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {cfg.title}
        </h2>
        <span className="pill-badge ml-auto" style={{ color: cfg.color, borderColor: `${cfg.color}40`, background: `${cfg.color}15` }}>
          {cfg.data.length}개 항목
        </span>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-muted-foreground">필터:</span>
        {(["전체", "필수", "권고", "참고"] as const).map(p => {
          const isActive = filterPriority === p;
          const pc = p !== "전체" ? PRIORITY_CONFIG[p] : null;
          return (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className="text-xs px-3 py-1 rounded-full transition-all"
              style={{
                background: isActive ? (pc?.bg || "oklch(0.72 0.18 178 / 15%)") : "oklch(0.14 0.025 250)",
                color: isActive ? (pc?.color || "oklch(0.72 0.18 178)") : "oklch(0.55 0.015 240)",
                border: `1px solid ${isActive ? (pc?.border || "oklch(0.72 0.18 178 / 40%)") : "oklch(1 0 0 / 8%)"}`,
              }}
            >
              {p === "전체" ? "전체 보기" : PRIORITY_CONFIG[p].label}
            </button>
          );
        })}
        <span className="text-xs text-muted-foreground ml-2">행 클릭 시 상세 내용 확인</span>
      </div>

      <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid oklch(1 0 0 / 8%)" }}>
        <table className="w-full text-sm border-collapse min-w-[800px]">
          <thead>
            <tr style={{ background: "oklch(0.14 0.025 250)", borderBottom: "1px solid oklch(1 0 0 / 8%)" }}>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-8"></th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">분석 항목</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">우선순위</th>
              {cfg.companies.map(c => (
                <th key={c} className="text-center px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => {
              const pc = PRIORITY_CONFIG[item.priority];
              const isExpanded = expandedRows.has(i);
              const originalIndex = cfg.data.indexOf(item);
              return (
                <>
                  <tr
                    key={`row-${i}`}
                    onClick={() => toggleRow(i)}
                    className="cursor-pointer transition-colors hover:bg-white/[0.03]"
                    style={{
                      borderBottom: "1px solid oklch(1 0 0 / 5%)",
                      background: isExpanded ? "oklch(0.13 0.025 250)" : undefined,
                      borderLeft: item.priority === "필수" ? `3px solid ${pc.color}` : item.priority === "권고" ? `3px solid ${pc.color}` : "3px solid transparent",
                    }}
                  >
                    <td className="px-3 py-3 text-center text-muted-foreground">
                      {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-foreground">{item.item}</span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span className="text-[11px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
                        style={{ background: pc.bg, color: pc.color, border: `1px solid ${pc.border}` }}>
                        {pc.label}
                      </span>
                    </td>
                    {cfg.companyKeys.map(key => (
                      <td key={key} className="px-3 py-3">
                        <CellValue value={item[key]} />
                      </td>
                    ))}
                  </tr>
                  {isExpanded && <ExpandedRow key={`expanded-${i}`} item={item} />}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 size={12} style={{ color: "oklch(0.72 0.18 145)" }} />
          <span>O = 해당 조항 있음 (조·항 번호 표시)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <XCircle size={12} className="text-muted-foreground/40" />
          <span>X = 해당 조항 없음</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Minus size={12} className="text-muted-foreground/40" />
          <span>행 클릭 시 상세 내용 확인</span>
        </div>
      </div>
    </section>
  );
}
