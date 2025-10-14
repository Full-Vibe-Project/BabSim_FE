아래의 일일 명령은 지금 지시할 명령입니다. 아래 문장을 실행해주세요.
<!-- 일일 명령 시작 -->

사용자 온보딩의 마지막 단계인 '건강 목표 설정' 폼을 TDD 방식으로 개발합니다. 이 작업은 통합 테스트에만 집중하며, 반드시 [테스트 코드 작성 → 컴포넌트 구현] 순서를 따라야 합니다. (관련 단위 테스트는 이미 완료되었습니다.)

컴포넌트의 레이아웃과 필요한 요소는 gemini/goal_setting.png 파일을 참고해주세요.

1단계: 통합 테스트 코드 작성
먼저, 여러 UI 요소와 동적 로직이 조립된 GoalSettingForm 컴포넌트 전체가 사용자의 상호작용에 올바르게 반응하는지 검증하기 위한 통합 테스트 코드를 작성해주세요.

파일 경로: src/features/onboarding/ui/GoalSettingForm.test.tsx
테스트 대상: GoalSettingForm 컴포넌트

요구사항:
아래의 모든 테스트 케이스를 포함해야 합니다.
목표 유형 선택: 라디오 버튼처럼 한 번에 하나의 목표 유형만 선택되는지, 그리고 '체중 관리' 선택 시에만 체중 입력 필드가 활성화되는지 확인.
동적 유효성 검사: 목표 체중이 현재 체중과 같을 때 에러 메시지가 올바르게 표시되는지 확인.
'시작하기' 버튼 활성화: 초기 렌더링 시 비활성화 상태인지, 그리고 각기 다른 '목표 유형'에 따라 모든 필수 필드가 채워졌을 때만 버튼이 활성화되는지 확인.

2단계: 컴포넌트 구현
위에서 작성한 1단계의 모든 테스트를 통과하는 GoalSettingForm 컴포넌트의 실제 구현 코드를 작성해주세요.

파일 경로: src/features/onboarding/ui/GoalSettingForm.tsx

요구사항:
react-hook-form을 사용하여 폼의 전체 상태(선택된 목표 유형, 입력값 등)를 관리합니다.
이전에 단위 테스트로 검증된 validateGoalWeight 등의 Validator 함수들을 react-hook-form의 rules와 연동하여 유효성을 검증합니다.
UI는 shadcn-ui의 RadioGroup, Input, Select, Button 등의 컴포넌트를 활용하여 구성합니다.
선택된 '목표 유형' 상태에 따라 체중 입력 필드의 disabled 속성을 동적으로 제어해야 합니다.

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