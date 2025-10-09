# 🗂️ 01. Routing Rules (문서 라우팅 규칙)

```
gemini/                         # gemini와 관련된 파일이 저장된 폴더
		└── ai-guidelines/             # ai가 지켜야 하는 규정 모음
		│   ├── README.md              # AI 전용 규칙 개요
		│   ├── 01-routing.md          # 문서/파일 라우팅 규칙
		│   ├── 02-code-scope.md       # 코드 작성/수정 영역 규칙
		│   ├── 03-output-format.md    # 출력 형식 규칙
		│   ├── 04-refactor.md         # 리팩토링/최적화 규칙
		│   ├── 05-logging.md          # 프롬프트 성공/실패 기록 규칙
		│   ├── 06-safety.md           # 보안/민감정보 규칙
		│   └── 07-retrospective.md    # 회고 작성 규칙 (KPT 방식, 분석 관점)
		│
		└── docs/
		│   ├── PRD.md                 # ✅ 프로젝트 요구사항 정의서 (Product Requirement Doc)
		│   ├── record.md              # ✅ AI가 요약하는 작업 기록/인수인계
		│   ├── RUNBOOK.md             # ✅ 환경 세팅, 빌드/배포/롤백 매뉴얼
		│   └── retrospectives/        # ✅ 회고 모음 (성공/실패/개선점 정리)
		│   
		└── conventions/               # FE, BE Convention
		│   ├── README.md              # 📘 컨벤션 개요 및 전체 목차
		│   ├── 01-git/
		│   │   ├── 01-branch-strategy.md  # 브랜치 전략
		│   │   ├── 02-commit-message.md   # 커밋 메시지 규칙
		│   │   └── 03-pull-request-rules.md     # PR 규칙
		│   │
		│   └── 02-frontend/
		│       ├── 01-directory-structure.md  # 디렉토리 구조
		│       ├── 02-naming.md             # 네이밍 규칙
		│       ├── 03-coding-style.md       # 코딩 스타일 (ESLint, Prettier)
		│       ├── 04-state-management.md   # 상태 관리 (React Query, Zustand)
		│       └── 05-testing.md            # 테스트 전략
		│
		└── error/                     # 에러 관리하기 위한 폴더
		│   ├── error-msg.md           # 에러 코드 입력
		│   └── error-analyze.md       # ✅ 시스템 아키텍처 정의서
		│
		├── gemini.md                  # 실질적인 명령 입력, 지침 라우팅
		└── specific-PRD.md            # 큰 기능을 만들때, 기능 정의서로 사용하는 용도
```

AI는 작업 시작 전에 **항상 아래 라우팅 규칙을 따라 관련 문서를 먼저 확인**해야 합니다.  
현재 프로젝트 타입(Frontend: Next.js)에 맞는 규칙을 선택적으로 참고합니다.

---

## 📌 기능 구현
- 프로젝트 기능 정의 → [`PRD.md`](../PRD.md)  
- 시스템 아키텍처 → [`ARCHITECTURE.md`](../ARCHITECTURE.md)  
- 개발/테스트/배포/롤백 명령어 → [`docs/RUNBOOK.md`](../docs/RUNBOOK.md)  

---

## 📌 협업 프로세스
- 브랜치 전략 → [`conventions/01-git/01-branch-strategy.md`](../conventions/01-git/01-branch-strategy.md)  
- 커밋 메시지 규칙 → [`conventions/01-git/02-commit-message.md`](../conventions/01-git/02-commit-message.md)  
- Pull Request 규칙 → [`conventions/01-git/03-pull-request-rules.md`](../conventions/01-git/03-pull-request-rules.md)  
- 이슈/작업 프로세스 (워크플로우 8단계) → [`CONTRIBUTING.md`](../CONTRIBUTING.md)  

---

## 📌 프론트엔드 (Next.js)
> 프로젝트가 **Frontend**인 경우, 아래 규칙을 따른다.

- 디렉토리 구조 → [`conventions/02-frontend/01-directory-structure.md`](../conventions/02-frontend/01-directory-structure.md)  
- 네이밍 규칙 → [`conventions/02-frontend/02-naming.md`](../conventions/02-frontend/02-naming.md)  
- 코딩 스타일 (ESLint, Prettier) → [`conventions/02-frontend/03-coding-style.md`](../conventions/02-frontend/03-coding-style.md)  
- 컴포넌트 설계 원칙 → [`conventions/02-frontend/04-component.md`](../conventions/02-frontend/04-component.md)  
- 상태 관리 (React Query, Zustand) → [`conventions/02-frontend/05-state-management.md`](../conventions/02-frontend/05-state-management.md)  
- 테스트 전략 (Jest, RTL) → [`conventions/02-frontend/06-testing.md`](../conventions/02-frontend/06-testing.md)  

---

## 📌 백엔드 (Spring Boot)
> 프로젝트가 **Backend**인 경우, 아래 규칙을 따른다.

- 디렉토리 구조 → [`conventions/02-backend/01-directory-structure.md`](../conventions/02-backend/01-directory-structure.md)  
- 네이밍 규칙 → [`conventions/02-backend/02-naming.md`](../conventions/02-backend/02-naming.md)  
- 코딩 스타일 → [`conventions/02-backend/03-coding-style.md`](../conventions/02-backend/03-coding-style.md)  
- 테스트 전략 → [`conventions/02-backend/04-testing.md`](../conventions/02-backend/04-testing.md)  

---

## 📌 기록 및 관리
- 일일 작업 기록/인수인계 → [`docs/record.md`](../docs/record.md)  
- 프롬프트 성공/실패 기록 → [`docs/PROMPTLOG.md`](../docs/PROMPTLOG.md)  
- 회고 기록 → [`docs/retrospectives/`](../docs/retrospectives/)  
  → 작성 규칙은 [`ai-guidelines/07-retrospective.md`](./07-retrospective.md)을 따른다.

---

## ✅ 원칙
1. AI는 항상 **현재 프로젝트 타입(Next.js / Spring Boot)**을 먼저 확인한다.  
2. 프론트엔드 작업 시에는 `02-frontend/`, 백엔드 작업 시에는 `02-backend/` 컨벤션만 따른다.  
3. 문서에 정의되지 않은 규칙이 필요한 경우, 반드시 `PROMPTLOG.md`에 기록 후 사람 리뷰어와 상의한다.  

---