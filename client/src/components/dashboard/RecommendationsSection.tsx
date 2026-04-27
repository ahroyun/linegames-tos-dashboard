// Design: Dark Command Center — Final Recommendations
import { CheckSquare, Shield, AlertCircle } from "lucide-react";
import { FINAL_RECOMMENDATIONS, type Priority } from "@/lib/data";

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string; border: string; leftBorder: string }> = {
  필수: {
    label: "🔴 필수",
    color: "oklch(0.72 0.2 25)",
    bg: "oklch(0.62 0.22 25 / 8%)",
    border: "oklch(0.62 0.22 25 / 30%)",
    leftBorder: "oklch(0.62 0.22 25)",
  },
  권고: {
    label: "🟡 권고",
    color: "oklch(0.82 0.18 85)",
    bg: "oklch(0.78 0.18 75 / 8%)",
    border: "oklch(0.78 0.18 75 / 30%)",
    leftBorder: "oklch(0.78 0.18 75)",
  },
  참고: {
    label: "🟢 참고",
    color: "oklch(0.72 0.18 145)",
    bg: "oklch(0.72 0.18 145 / 8%)",
    border: "oklch(0.72 0.18 145 / 30%)",
    leftBorder: "oklch(0.72 0.18 145)",
  },
};

const LANG_COLORS: Record<string, { bg: string; text: string }> = {
  KR: { bg: "oklch(0.55 0.2 270 / 15%)", text: "oklch(0.75 0.15 270)" },
  JP: { bg: "oklch(0.62 0.22 25 / 15%)", text: "oklch(0.75 0.15 25)" },
  EN: { bg: "oklch(0.72 0.18 145 / 15%)", text: "oklch(0.72 0.18 145)" },
  "KR/EN": { bg: "oklch(0.72 0.18 178 / 15%)", text: "oklch(0.72 0.18 178)" },
};

export default function RecommendationsSection() {
  const grouped: Record<Priority, typeof FINAL_RECOMMENDATIONS> = {
    필수: FINAL_RECOMMENDATIONS.filter(r => r.priority === "필수"),
    권고: FINAL_RECOMMENDATIONS.filter(r => r.priority === "권고"),
    참고: FINAL_RECOMMENDATIONS.filter(r => r.priority === "참고"),
  };

  return (
    <section id="recommendations" className="space-y-6 pb-16">
      <div className="flex items-center gap-3">
        <CheckSquare size={18} style={{ color: "oklch(0.72 0.18 178)" }} />
        <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          결론 및 종합 권고사항
        </h2>
      </div>

      <div className="p-4 rounded-lg text-sm leading-relaxed text-muted-foreground"
        style={{ background: "oklch(0.12 0.025 250)", border: "1px solid oklch(1 0 0 / 8%)" }}>
        이번 2026년 상반기 정기 벤치마킹 모니터링 결과, 라인게임즈의 이용약관은 전반적으로 관련 법령 및 업계 표준을 잘 준수하고 있으나,
        최근 개정된 국내외 법규의 세부 내용을 약관에 구체화하는 작업이 필요합니다. 벤치마킹 5개사 모두 2024~2026년에 걸쳐 지속적인 약관 개정을 진행하고 있으며,
        특히 <span className="text-foreground font-medium">게임산업법 개정(KR)</span>, <span className="text-foreground font-medium">자금결제법 강화(JP)</span>,{" "}
        <span className="text-foreground font-medium">EU DSA 시행(EN)</span>에 적극적으로 대응하고 있는 추세입니다.
      </div>

      {/* Priority groups */}
      {(["필수", "권고", "참고"] as Priority[]).map(priority => {
        const items = grouped[priority];
        const pc = PRIORITY_CONFIG[priority];
        return (
          <div key={priority} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${pc.leftBorder}60, transparent)` }} />
              <span className="text-sm font-bold px-3 py-1 rounded-full"
                style={{ background: pc.bg, color: pc.color, border: `1px solid ${pc.border}` }}>
                {pc.label} — {items.length}건
              </span>
              <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, ${pc.leftBorder}60, transparent)` }} />
            </div>
            <div className="space-y-2">
              {items.map((item, i) => {
                const langCfg = LANG_COLORS[item.lang] || LANG_COLORS.KR;
                return (
                  <div key={i} className="rounded-lg p-4 flex gap-4 animate-fade-in-up"
                    style={{
                      background: pc.bg,
                      border: `1px solid ${pc.border}`,
                      borderLeft: `3px solid ${pc.leftBorder}`,
                      animationDelay: `${i * 60}ms`,
                      animationFillMode: "both",
                    }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                          style={{ background: langCfg.bg, color: langCfg.text }}>
                          {item.lang}
                        </span>
                        <span className="text-sm font-semibold text-foreground">{item.item}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">권고 내용: </span>
                          <span className="text-foreground">{item.recommendation}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">관련 법령: </span>
                          <span className="font-mono text-foreground">{item.legalBasis}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Poison clause check */}
      <div className="rounded-lg p-5 space-y-3"
        style={{ background: "oklch(0.72 0.18 145 / 6%)", border: "1px solid oklch(0.72 0.18 145 / 25%)" }}>
        <div className="flex items-center gap-2">
          <Shield size={16} style={{ color: "oklch(0.72 0.18 145)" }} />
          <h3 className="text-sm font-bold text-foreground">독소 조항 역방향 점검 결과</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          타사에는 없으나 라인게임즈에만 있는 과도한 면책 조항 등 독소 조항에 대한 역방향 점검 결과,{" "}
          <span className="text-green-400 font-medium">특별히 우려할 만한 독소 조항은 발견되지 않았습니다.</span>{" "}
          다만 아래 항목은 지속적인 모니터링이 필요합니다.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded" style={{ background: "oklch(0.12 0.025 250)" }}>
            <div className="flex items-center gap-1.5 mb-1">
              <AlertCircle size={12} style={{ color: "oklch(0.78 0.18 75)" }} />
              <span className="font-semibold text-foreground">[KR] 제12조 제4항</span>
            </div>
            <p className="text-muted-foreground">서비스 종료 시 손해배상 청구 제한 — 영구 아이템 및 소모성 콘텐츠 처리 방식 이용자 고지 여부 점검 필요</p>
          </div>
          <div className="p-3 rounded" style={{ background: "oklch(0.12 0.025 250)" }}>
            <div className="flex items-center gap-1.5 mb-1">
              <AlertCircle size={12} style={{ color: "oklch(0.78 0.18 75)" }} />
              <span className="font-semibold text-foreground">[EN] 제14조 제1항</span>
            </div>
            <p className="text-muted-foreground">약관 변경 시 계속 이용 = 동의 간주 — EU DSA·GDPR 관점에서 명시적 동의 요건 충족 여부 검토 필요</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-xs text-muted-foreground border-t border-border mt-8">
        <p>본 보고서는 라이브기획팀의 이용약관 정기 벤치마킹 모니터링 프로젝트의 일환으로 작성되었습니다.</p>
        <p className="mt-1">다음 검토 시기: <span className="text-primary font-medium">2026년 10월 초 (하반기)</span></p>
      </div>
    </section>
  );
}
