// Design: Dark Command Center — URL Status Table
import { CheckCircle2, Globe } from "lucide-react";
import { URL_STATUS, type LangCode } from "@/lib/data";

const LANG_COLORS: Record<LangCode, { bg: string; text: string; border: string }> = {
  KR: { bg: "oklch(0.55 0.2 270 / 15%)", text: "oklch(0.75 0.15 270)", border: "oklch(0.55 0.2 270 / 40%)" },
  JP: { bg: "oklch(0.62 0.22 25 / 15%)", text: "oklch(0.75 0.15 25)", border: "oklch(0.62 0.22 25 / 40%)" },
  EN: { bg: "oklch(0.72 0.18 145 / 15%)", text: "oklch(0.72 0.18 145)", border: "oklch(0.72 0.18 145 / 40%)" },
};

const COMPANIES = ["넥슨", "넷마블", "크래프톤", "엔씨소프트", "카카오게임즈", "라인게임즈 (자사)"];

export default function UrlStatusSection() {
  return (
    <section id="url-status" className="space-y-5">
      <div className="flex items-center gap-3">
        <Globe size={18} style={{ color: "oklch(0.72 0.18 178)" }} />
        <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          벤치마킹 대상 약관 수집 현황 및 URL 유효성 검증
        </h2>
        <span className="pill-badge ml-auto">수집일: 2026.04.27</span>
      </div>

      <div className="flex items-center gap-2 p-3 rounded-lg text-sm"
        style={{ background: "oklch(0.72 0.18 145 / 8%)", border: "1px solid oklch(0.72 0.18 145 / 25%)" }}>
        <CheckCircle2 size={15} style={{ color: "oklch(0.72 0.18 145)" }} />
        <span className="text-foreground font-medium">모든 URL 정상 접속 확인</span>
        <span className="text-muted-foreground text-xs ml-1">— 15개 URL 전체 유효 (KR 5개 · JP 5개 · EN 5개)</span>
      </div>

      <div className="overflow-x-auto rounded-lg" style={{ border: "1px solid oklch(1 0 0 / 8%)" }}>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr style={{ background: "oklch(0.14 0.025 250)", borderBottom: "1px solid oklch(1 0 0 / 8%)" }}>
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">대상 기업</th>
              {(["KR", "JP", "EN"] as LangCode[]).map(lang => (
                <th key={lang} className="text-center px-3 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: LANG_COLORS[lang].text }}>
                  {lang}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPANIES.map((company, ci) => {
              const isLinegames = company.includes("라인게임즈");
              return (
                <tr
                  key={company}
                  className="transition-colors hover:bg-white/[0.03]"
                  style={{
                    borderBottom: ci < COMPANIES.length - 1 ? "1px solid oklch(1 0 0 / 5%)" : undefined,
                    background: isLinegames ? "oklch(0.72 0.18 178 / 5%)" : undefined,
                  }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {isLinegames && (
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "oklch(0.72 0.18 178)" }} />
                      )}
                      <span className={`font-medium ${isLinegames ? "text-primary" : "text-foreground"}`}>
                        {company}
                      </span>
                    </div>
                  </td>
                  {(["KR", "JP", "EN"] as LangCode[]).map(lang => {
                    const entry = URL_STATUS.find(u => u.company === company && u.lang === lang);
                    if (!entry) return <td key={lang} className="px-3 py-3 text-center text-muted-foreground">—</td>;
                    return (
                      <td key={lang} className="px-3 py-3">
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 size={12} style={{ color: "oklch(0.72 0.18 145)" }} />
                            <span className="text-xs font-mono text-foreground">{entry.effectiveDate}</span>
                          </div>
                          {entry.note && (
                            <span className="text-[10px] text-muted-foreground text-center leading-tight max-w-[140px]">
                              {entry.note}
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
