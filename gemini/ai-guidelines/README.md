# 🤖 AI Guidelines

이 디렉토리는 **AI가 이 프로젝트에서 개발/리팩토링/문서화 작업을 수행할 때 따라야 하는 전용 규칙**을 정의합니다.  
사람이 관리하는 `conventions/`와는 별도로, AI가 여러 MCP 도구(Claude, ChatGPT, Gemini, Cursor 등)를 사용할 때 혼동하지 않도록 분리된 지침입니다.  

---

## 📌 목적
- AI가 프로젝트 문서/코드/워크플로우에 접근할 때 **어디를 참고해야 하는지 라우팅**을 제공한다.  
- 코드 작성/수정 시 **허용된 영역과 형식**을 강제한다.  
- 리팩토링, 보안, 로깅 등 **AI가 준수해야 할 최소 품질 기준**을 정한다.  
- 모든 작업의 성공/실패 기록을 통해 **회고와 개선**에 활용한다.  

---

## 📂 규칙 목차

1. **[01-routing.md](./01-routing.md)**  
   → AI가 어떤 문서/파일을 참고해야 하는지 라우팅 규칙  

2. **[02-code-scope.md](./02-code-scope.md)**  
   → 코드 작성/수정 가능한 영역, 주석 태그 규칙  

3. **[03-output-format.md](./03-output-format.md)**  
   → 코드/문서/응답 등 출력 형식 규칙  
   → ⚠️ **테스트 작성 전략은 이 문서가 아닌**  
   → Frontend → [`conventions/02-frontend/06-testing.md`](../conventions/02-frontend/06-testing.md)  
   → Backend → [`conventions/02-backend/04-testing.md`](../conventions/02-backend/04-testing.md)  

4. **[04-refactor.md](./04-refactor.md)**  
   → 리팩토링/최적화 규칙 (주석/PR 코멘트 포함)  

5. **[05-logging.md](./05-logging.md)**  
   → 프롬프트 성공/실패 기록 방법 (`docs/PROMPTLOG.md`)  

6. **[06-safety.md](./06-safety.md)**  
   → 보안/민감정보 접근 금지 및 배포 안전 규칙  

7. **[07-retrospective.md](./07-retrospective.md)**  
   → 회고 작성 규칙 (KPT 방식, 개선 포인트 정리)  

---

## 📂 참고 문서 (`docs/`)
- **[PRD.md](../docs/PRD.md)** → 프로젝트 요구사항 정의서  
- **[ARCHITECTURE.md](../docs/ARCHITECTURE.md)** → 시스템 아키텍처 정의서  
- **[record.md](../docs/record.md)** → 작업 기록/인수인계  
- **[PROMPTLOG.md](../docs/PROMPTLOG.md)** → AI 프롬프트 성공/실패 로그  
- **[RUNBOOK.md](../docs/RUNBOOK.md)** → 환경 세팅, 빌드/배포/롤백 매뉴얼  
- **[retrospectives/](../docs/retrospectives/)** → 회고 모음  

---

## ✅ 핵심 원칙

1. **항상 라우팅을 따른다** → `PRD`, `conventions`, `docs` 등 지정 문서 먼저 확인.  
2. **허용된 범위만 수정한다** → `AI:DO-NOT-TOUCH` 존중.  
3. **출력 형식을 통일한다** → 코드/문서/응답은 표준 블록 사용.  
4. **테스트는 각 기술 컨벤션을 따른다** → Next.js는 `02-frontend/06-testing.md`, Spring Boot는 `02-backend/04-testing.md`.  
5. **리팩토링 이유를 기록한다** → PR 설명/주석에 근거 남김.  
6. **성공·실패 모두 기록한다** → `PROMPTLOG.md`에 남겨 학습/회고에 활용.  
7. **보안을 우선한다** → `env`, `secrets`, 민감정보는 절대 건드리지 않는다.  