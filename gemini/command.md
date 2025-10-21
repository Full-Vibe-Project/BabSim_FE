아래의 일일 명령은 지금 지시할 명령입니다. 아래 문장을 실행해주세요.
<!-- 일일 명령 시작 -->

당신은 TDD와 Zod를 사용한 복잡한 데이터 스키마 설계에 매우 능숙한 시니어 프론트엔드 개발자입니다.

[작업] 3단계에 걸친 온보딩의 모든 폼 데이터를 하나의 **통합 Zod 스키마(onboardingSchema)**로 정의하고, 이를 TDD 방식으로 개발합니다. 이 작업은 단위(유닛) 테스트에만 집중하며, 반드시 [테스트 코드 작성 → 스키마 구현] 순서를 따라야 합니다.

[과정: 컨텍스트와 단계별 지침 제공]
1단계: 단위(유닛) 테스트 코드 작성
먼저, test/test-format.md 파일의 테스트 문서를 준수하여, 3단계의 모든 필드를 포함하는 onboardingSchema가 모든 데이터가 완벽할 때와 일부 데이터가 누락/잘못되었을 때를 정확히 구분하는지 검증하기 위한 단위 테스트 코드를 작성해주세요.

파일 경로: src/features/onboarding/model/onboarding.schema.test.ts
테스트 대상: onboardingSchema (Zod 스키마)

요구사항: 아래의 모든 테스트 케이스를 포함해야 합니다.
    - 성공 케이스: '체중 관리' 목표에 대한 완벽하고 유효한 데이터 객체는 유효성 검사를 성공적으로 통과해야 한다.
    - 실패 케이스: 첫 번째 단계의 필수 필드('이름')가 누락된 데이터 객체는 유효성 검사에 실패해야 한다.
    - 동적 유효성 검사: '목표 유형'이 '체중 관리'일 때, '목표 체중'이 '현재 체중'과 동일한 데이터 객체는 유효성 검사에 실패해야 한다.

2단계: 단위(유닛) 로직(스키마) 구현
위에서 작성한 1단계의 모든 테스트를 통과하는 onboardingSchema의 실제 Zod 스키마 코드를 작성해주세요.
- 파일 경로: src/features/onboarding/model/onboarding.schema.ts

요구사항: 3단계 폼(BasicInfo, HealthInfo, GoalSetting)의 모든 필드를 포함하는 하나의 z.object를 정의합니다.

이전에 단위 테스트로 검증된 개별 Validator 함수들의 로직(예: 이름 30자 이하)을 Zod의 메서드(예: .min(1), .max(30))로 구현합니다.
'목표 체중'과 '현재 체중'의 비교와 같이 동적인 유효성 검사는 Zod의 .refine() 메서드를 사용하여 구현합니다.
z.infer<typeof onboardingSchema>를 사용하여, 스키마로부터 OnboardingData TypeScript 타입을 export 해야 합니다.

<!-- 일일 명령 종료 -->

아래의 지침은 앞으로 코드를 작성하면서 준수해야하는 지침입니다. 필요한 경우에 참조해주세요.

<!-- 지침 시작 -->

### 개관
당신은 유명 웹 개발자입니다. 앞으로의 작업 지침은 아래 지침을 엄격히 준수해주세요.
사용자가 출력을 요청하는 경우, './gemini/output.md' 파일에 작성해주세요.

### 작업 공간
서비스의 주요 기능은 ./app 폴더 아래에서 작업을 진행해주세요. 기능 별로 파일을 분리하고, 폴더 구조가 복잡해지지 않도록 적합한 폴더 구조로 분리해주세요. 폴더 구조가 분리되는 경우에는 아래에 구조도를 기입해주세요.
<!-- app 폴더 구조 시작 -->

<!-- app 폴더 구조 종료 -->

### 작업 관리
작업이 완료되면 커밋을 작성하기 전에 이어서 작업을 수행할 수 있도록 작업 내용을 'gemini/docs/record.md'에 작성해주세요.
커밋을 진행할때, 프롬프트 기록을 추적할 수 있게 GEMINI.md도 함께 커밋해주세요.
record.md 작성 양식은 아래 예시를 엄격하게 준수해주세요.
```
작업 한줄 요약 : 
상세 변경 내용(5줄 내외) : 
```

### 컨벤션
코드 작성에 필요한 컨벤션은 '/gemini' 폴더 아래에 있습니다. 아래의 폴더 구조도를 참고하여, 코드 작성에 필요한 컨벤션은 gemini 폴더 아래의 md 파일을 참고해주세요.
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
    ├── GEMINI.md                  # 실질적인 명령 입력, 지침 라우팅
    └── specific-PRD.md            # 큰 기능을 만들때, 기능 정의서로 사용하는 용도

### 에러 관리
에러가 발생하는 경우에는 './gemini/error/error-msg.md'에 작성해두겠습니다. 에러 메시지를 기반으로 원인을 분석하고 해결하기 위한 방안을 './gemini/error/error.md'에 기록해주세요. 에러 기록은 아래 양식을 준수해주세요.
```
에러 메시지 내용: 
발생 상황: 
예상 원인: 
해결 방안: 
```
<!-- 지침 종료 -->