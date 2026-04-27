// Design: Dark Command Center — Fixed sidebar navigation
import { BarChart3, Globe, AlertTriangle, Table2, CheckSquare, TrendingUp } from "lucide-react";
import type { SectionId } from "@/pages/Home";

interface SidebarProps {
  open: boolean;
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

const NAV_ITEMS: { id: SectionId; label: string; sublabel?: string; icon: React.ReactNode; badge?: string; badgeColor?: string }[] = [
  { id: "overview", label: "개요", sublabel: "Executive Summary", icon: <BarChart3 size={15} /> },
  { id: "url-status", label: "URL 수집 현황", sublabel: "15개사 유효성 검증", icon: <Globe size={15} />, badge: "15/15", badgeColor: "text-green-400" },
  { id: "recent-changes", label: "타사 개정 특이사항", sublabel: "최근 업데이트", icon: <TrendingUp size={15} />, badge: "6건", badgeColor: "text-yellow-400" },
  { id: "kr-comparison", label: "KR 비교 분석", sublabel: "한국어 약관", icon: <Table2 size={15} /> },
  { id: "jp-comparison", label: "JP 비교 분석", sublabel: "일본어 약관", icon: <Table2 size={15} /> },
  { id: "en-comparison", label: "EN 비교 분석", sublabel: "영어 약관", icon: <Table2 size={15} /> },
  { id: "recommendations", label: "종합 권고사항", sublabel: "우선순위별 정리", icon: <CheckSquare size={15} />, badge: "필수 4건", badgeColor: "text-red-400" },
];

export default function Sidebar({ open, activeSection, onNavigate }: SidebarProps) {
  if (!open) return null;

  return (
    <aside
      className="w-56 shrink-0 border-r border-border flex flex-col overflow-y-auto"
      style={{ background: "oklch(0.10 0.022 250)" }}
    >
      <div className="px-3 pt-5 pb-2">
        <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase px-2 mb-2">
          섹션 네비게이션
        </p>
      </div>

      <nav className="flex-1 px-2 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md flex items-start gap-2.5 transition-all group ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <span className={`mt-0.5 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[13px] font-medium truncate">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] font-mono shrink-0 ${item.badgeColor}`}>{item.badge}</span>
                  )}
                </div>
                {item.sublabel && (
                  <p className="text-[10px] text-muted-foreground/70 truncate mt-0.5">{item.sublabel}</p>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom info */}
      <div className="px-4 py-4 border-t border-border mt-auto">
        <div className="text-[10px] text-muted-foreground space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span>모든 URL 유효</span>
          </div>
          <p className="text-muted-foreground/60">기준일: 2026.04.27</p>
        </div>
      </div>
    </aside>
  );
}
