// Design: Dark Command Center — Header bar
import { Menu, FileText, Download } from "lucide-react";
import { REPORT_META } from "@/lib/data";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="h-14 border-b border-border flex items-center px-4 gap-4 shrink-0 z-50"
      style={{ background: "oklch(0.10 0.022 250)" }}>
      <button
        onClick={onMenuToggle}
        className="p-1.5 rounded hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
        aria-label="메뉴 토글"
      >
        <Menu size={18} />
      </button>

      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded flex items-center justify-center"
          style={{ background: "oklch(0.72 0.18 178 / 20%)", border: "1px solid oklch(0.72 0.18 178 / 40%)" }}>
          <FileText size={14} style={{ color: "oklch(0.72 0.18 178)" }} />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-xs font-semibold tracking-wide" style={{ color: "oklch(0.72 0.18 178)", fontFamily: "'Space Grotesk', sans-serif" }}>
            LINE GAMES
          </span>
          <span className="text-[11px] text-muted-foreground">이용약관 벤치마킹 모니터링</span>
        </div>
      </div>

      <div className="h-5 w-px bg-border mx-1" />

      {/* Report meta */}
      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
        <span className="pill-badge">보고서 {REPORT_META.reportNo}</span>
        <span className="hidden sm:inline">{REPORT_META.createdAt} 기준</span>
        <span className="hidden md:inline">운영: {REPORT_META.team}</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span className="hidden lg:flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          다음 검토: {REPORT_META.nextReview}
        </span>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); alert("PDF 다운로드 기능은 보고서 파일을 통해 제공됩니다."); }}
          className="flex items-center gap-1.5 text-[11px] px-3 py-1.5 rounded border border-border hover:border-primary/50 hover:text-primary transition-all text-muted-foreground"
        >
          <Download size={12} />
          <span className="hidden sm:inline">PDF 다운로드</span>
        </a>
      </div>
    </header>
  );
}
