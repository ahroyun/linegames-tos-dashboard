// Design: Dark Command Center — Intelligence Dashboard
// Colors: Deep navy bg (#0A0E1A), teal accent (#00D4AA), danger/warning/success indicators
// Layout: Fixed sidebar + scrollable main content

import { useState } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import OverviewSection from "@/components/dashboard/OverviewSection";
import UrlStatusSection from "@/components/dashboard/UrlStatusSection";
import RecentChangesSection from "@/components/dashboard/RecentChangesSection";
import ComparisonSection from "@/components/dashboard/ComparisonSection";
import RecommendationsSection from "@/components/dashboard/RecommendationsSection";

export type SectionId = "overview" | "url-status" | "recent-changes" | "kr-comparison" | "jp-comparison" | "en-comparison" | "recommendations";

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header onMenuToggle={() => setSidebarOpen(v => !v)} />
      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 56px)" }}>
        <Sidebar
          open={sidebarOpen}
          activeSection={activeSection}
          onNavigate={scrollToSection}
        />
        <main
          className="flex-1 overflow-y-auto"
          onScroll={(e) => {
            // Update active section based on scroll position
            const sections: SectionId[] = ["overview", "url-status", "recent-changes", "kr-comparison", "jp-comparison", "en-comparison", "recommendations"];
            const scrollTop = (e.target as HTMLElement).scrollTop;
            for (const id of [...sections].reverse()) {
              const el = document.getElementById(id);
              if (el && el.offsetTop - 100 <= scrollTop) {
                setActiveSection(id);
                break;
              }
            }
          }}
        >
          <div className="max-w-[1200px] mx-auto px-6 py-8 space-y-16">
            <OverviewSection />
            <UrlStatusSection />
            <RecentChangesSection />
            <ComparisonSection lang="KR" />
            <ComparisonSection lang="JP" />
            <ComparisonSection lang="EN" />
            <RecommendationsSection />
          </div>
        </main>
      </div>
    </div>
  );
}
