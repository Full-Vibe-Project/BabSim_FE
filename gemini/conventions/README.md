# 📘 Conventions

이 디렉토리는 **프로젝트 전체가 따르는 개발 컨벤션(Convention) 모음집**입니다.
AI 전용 규칙은 `ai-guidelines/`에 따로 분리되어 있으며, 이곳은 **사람과 AI 모두가 참조해야 하는 개발 표준**을 다룹니다.

---

## 📌 목적

* **Git / 협업**을 위한 브랜치 전략, 커밋 메시지, PR 규칙을 정의한다.
* **Frontend 개발**에 필요한 디렉토리 구조, 네이밍, 코딩 스타일, 상태 관리, 테스트 전략을 표준화한다.
* 팀 내에서 코드 품질과 일관성을 유지하고, 리뷰/자동화 도구가 원활히 동작하도록 돕는다.
* 새로운 팀원이 들어와도 **README 한 곳에서 빠르게 컨벤션을 이해**할 수 있도록 한다.

---

## 📂 컨벤션 목차

### 1. Git 규칙 (`01-git/`)

1. **[01-branch-strategy.md](./01-git/01-branch-strategy.md)**
   → 브랜치 전략 (예약 브랜치, release/dev/feat/hotfix/bugfix 규칙)

2. **[02-commit-message.md](./01-git/02-commit-message.md)**
   → Conventional Commits 기반 커밋 메시지 규칙

3. **[03-pull-request-rules.md](./01-git/03-pull-request-rules.md)**
   → PR 제목/본문/체크리스트 규칙, 리뷰 규칙

---

### 2. Frontend 규칙 (`02-frontend/`)

1. **[01-directory-structure.md](./02-frontend/01-directory-structure.md)**
   → 프로젝트 디렉토리 구조 (feature-first 패턴)

2. **[02-naming.md](./02-frontend/02-naming.md)**
   → 파일, 함수, 변수 네이밍 규칙 (소문자, 동사+명사, boolean 접두사 등)

3. **[03-coding-style.md](./02-frontend/03-coding-style.md)**
   → ESLint, Prettier, 코드 스타일 규칙

4. **[04-state-management.md](./02-frontend/04-state-management.md)**
   → React Query, Zustand 상태 관리 규칙

5. **[05-testing.md](./02-frontend/05-testing.md)**
   → 단위/통합/E2E 테스트 전략 (Vitest, RTL, MSW, Playwright)

---

## 📂 참고 문서

* **[ai-guidelines/](../ai-guidelines/README.md)** → AI 전용 규칙
* **[docs/PRD.md](../docs/PRD.md)** → 프로젝트 요구사항 정의서
* **[docs/RUNBOOK.md](../docs/RUNBOOK.md)** → 빌드/배포/롤백 매뉴얼
* **[docs/record.md](../docs/record.md)** → 작업 기록/인수인계

---

## ✅ 핵심 원칙

1. **항상 브랜치 전략을 따른다** → `main`, `dev`, `release/*`는 보호 브랜치.
2. **Conventional Commits를 따른다** → `feat:`, `fix:`, `chore:`, Jira 키 포함.
3. **PR은 작은 단위** → 200라인 이내, 템플릿 준수, 리뷰어가 맥락을 쉽게 파악할 수 있게 한다.
4. **Frontend는 feature-first 구조** → `features/<domain>/ui`, `hooks`, `api`, `model`, `svc`, `tests`.
5. **코딩 스타일은 자동화** → ESLint, Prettier, lint-staged를 통한 일관성 유지.
6. **상태 관리는 구분** → 서버 상태는 React Query, 클라이언트 상태는 Zustand.
7. **테스트를 먼저 고려** → 테스트 피라미드(Unit > Integration > E2E)와 컨벤션 준수.

---

👉 이 문서는 `conventions/`의 라우팅 개요입니다.
세부 내용은 각 하위 디렉토리(`01-git/`, `02-frontend/`)의 문서를 확인하세요.