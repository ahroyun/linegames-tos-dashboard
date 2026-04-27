# 라인게임즈 이용약관 벤치마킹 대시보드 — 디자인 구상

## 배경 및 목적
라이브기획팀 내부 운영 도구. 법무·기획 담당자가 반기별로 약관 갭 분석 결과를 열람하고, 타사 최근 개정 동향을 한눈에 파악하는 인터랙티브 대시보드.

---

<response>
<probability>0.07</probability>
<text>
## Approach A — Legal Precision / Bauhaus Grid

**Design Movement:** Bauhaus + Swiss International Style (법무 문서의 엄격함을 시각적으로 표현)

**Core Principles:**
1. 정보 위계를 타이포그래피 크기와 무게로만 표현 — 색상은 최소화
2. 8px 그리드 기반 완벽한 정렬, 여백이 곧 디자인
3. 위험도(🔴/🟡/🟢)만 색상으로 강조 — 나머지는 모노크롬
4. 표와 텍스트의 밀도를 조절하여 스캔 가능성(scannability) 극대화

**Color Philosophy:** 거의 흰 배경(#FAFAF9) + 짙은 차콜(#1C1C1E) 텍스트. 빨강/노랑/초록 3색만 위험도 표시에 사용. 브랜드 포인트는 라인게임즈 딥 네이비(#0D2B6E).

**Layout Paradigm:** 좌측 고정 사이드바(섹션 네비게이션) + 우측 메인 콘텐츠 영역. 사이드바는 섹션 진행도를 표시하는 progress indicator 포함.

**Signature Elements:**
- 조항 번호를 pill badge로 표시 (예: `제16조 ③항`)
- 위험도 카드에 좌측 4px 컬러 보더 라인
- 표 헤더에 얇은 상단 보더 라인 (divider 역할)

**Interaction Philosophy:** 클릭 없이 hover로 상세 정보 표시. 섹션 간 부드러운 스크롤. 필터로 언어(KR/JP/EN)와 우선순위(🔴/🟡/🟢) 조합 가능.

**Animation:** 페이지 진입 시 카드 stagger fade-in (50ms 간격). 테이블 행 hover 시 배경 미세 하이라이트.

**Typography System:**
- 헤딩: DM Serif Display (권위 있는 법무 문서 느낌)
- 본문: Pretendard (한국어 최적화, 가독성)
- 코드/조항번호: JetBrains Mono
</text>
</response>

<response>
<probability>0.06</probability>
<text>
## Approach B — Intelligence Dashboard / Dark Command Center

**Design Movement:** Dark Analytics Dashboard (Bloomberg Terminal 미학을 게임사 법무 도구에 적용)

**Core Principles:**
1. 어두운 배경 위 데이터 시각화 중심 — 차트와 히트맵이 주인공
2. 네온 액센트(청록색 #00D4AA)로 중요 수치 강조
3. 카드 기반 모듈형 레이아웃 — 각 카드는 독립적인 정보 단위
4. 실시간 모니터링 느낌의 타임라인 뷰

**Color Philosophy:** 딥 다크(#0A0E1A) 배경 + 청록 네온(#00D4AA) 액센트. 위험도는 빨강(#FF4757)/노랑(#FFA502)/초록(#2ED573). 카드 배경은 약간 밝은 #131929.

**Layout Paradigm:** 상단 KPI 카드 행 + 중앙 히트맵(게임사 × 항목 매트릭스) + 하단 타임라인. 완전한 비대칭 그리드.

**Signature Elements:**
- 게임사 × 분석항목 히트맵 (O/X를 색상 강도로 표현)
- 타사 개정 동향을 타임라인 형식으로 시각화
- 상단 스탯 카드 (필수 개정 N건, 권고 N건, 참고 N건)

**Interaction Philosophy:** 히트맵 셀 클릭 시 상세 패널 슬라이드인. 타임라인 이벤트 hover 시 툴팁.

**Animation:** 숫자 카운트업 애니메이션 (0 → 실제 수치). 히트맵 셀 fill 애니메이션.

**Typography System:**
- 헤딩: Space Grotesk (기술적이고 현대적)
- 본문: Noto Sans KR (한국어)
- 수치: Orbitron (모니터링 도구 느낌)
</text>
</response>

<response>
<probability>0.05</probability>
<text>
## Approach C — Editorial Legal Review / Warm Institutional

**Design Movement:** Editorial Design + Warm Institutional (하버드 로리뷰 × 현대 SaaS 대시보드)

**Core Principles:**
1. 따뜻한 크림 배경으로 장시간 열람 시 눈 피로 최소화
2. 좌우 여백을 충분히 확보한 editorial 레이아웃
3. 섹션별 색상 구분 (KR=파랑, JP=빨강, EN=초록) — 언어 정체성 강조
4. 인쇄 가능한 레이아웃 (PDF 내보내기 친화적)

**Color Philosophy:** 크림(#FAF7F2) 배경 + 다크 브라운(#2C1810) 텍스트. KR=#1E40AF, JP=#DC2626, EN=#059669. 섹션 헤더에 각 언어 색상 적용.

**Layout Paradigm:** 단일 컬럼 스크롤 레이아웃. 섹션 간 넓은 여백. 좌측 sticky 목차(TOC).

**Signature Elements:**
- 섹션 헤더에 언어 플래그 이모지 + 색상 언더라인
- 개정 권고안을 callout box로 강조
- 타사 비교 시 회사 로고 대신 이니셜 아바타

**Interaction Philosophy:** 목차 클릭 시 smooth scroll. 필터 없이 전체 내용을 순서대로 읽는 선형 경험.

**Animation:** 섹션 진입 시 fade-up. 목차 active 항목 하이라이트 전환.

**Typography System:**
- 헤딩: Playfair Display (학술적 권위)
- 본문: Source Serif 4 (가독성 높은 serif)
- 표: Noto Sans KR
</text>
</response>

---

## 선택: Approach B — Intelligence Dashboard / Dark Command Center

데이터 밀도가 높은 법무 벤치마킹 보고서를 시각적으로 임팩트 있게 전달하기 위해 다크 분석 대시보드 스타일을 채택한다. 히트맵과 타임라인이 핵심 시각화 요소로 작동하며, 라이브기획팀 담당자가 한눈에 현황을 파악할 수 있도록 설계한다.
