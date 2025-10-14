아래의 일일 명령은 지금 지시할 명령입니다. 아래 문장을 실행해주세요.
<!-- 일일 명령 시작 -->

사용자 온보딩의 두 번째 단계인 '건강 정보' 선택 폼을 TDD 방식으로 개발합니다. 개발 순서는 반드시 [단위 테스트 → 단위 로직 구현 → 통합 테스트 → 컴포넌트 구현] 순서를 따라야 합니다.

컴포넌트에 들어가는 버튼의 요소와 레이아웃은 gemini/health_info.png를 참고해주세요.

3단계: 통합 테스트 코드 작성
이제, 여러 체크박스가 조립된 HealthInfoForm 컴포넌트가 사용자의 상호작용에 올바르게 반응하는지 검증하기 위한 통합 테스트 코드를 작성해주세요.

파일 경로: src/features/onboarding/ui/HealthInfoForm.test.tsx

테스트 대상: HealthInfoForm 컴포넌트

요구사항: 아래의 모든 테스트 케이스를 포함해야 합니다.
다중 선택: '당뇨병'과 '고혈압'이 동시에 체크되는지 확인.
상호 배타 동작: '당뇨병' 체크 후 '해당사항 없음'을 체크하면, '당뇨병'이 실제로 체크 해제되는지 화면을 통해 검증.
상호 배타 동작 (역방향): '해당사항 없음' 체크 후 '당뇨병'을 체크하면, '해당사항 없음'이 실제로 체크 해제되는지 화면을 통해 검증.
버튼 상태: 초기 렌더링 시 '다음' 버튼이 활성화 상태인지 확인.

4단계: 컴포넌트 구현
위에서 작성한 3단계의 모든 테스트를 통과하는 HealthInfoForm 컴포넌트의 실제 구현 코드를 작성해주세요.

파일 경로: src/features/onboarding/ui/HealthInfoForm.tsx
요구사항: useState를 사용하여 선택된 항목 배열(예: selectedConditions) 상태를 관리합니다.

각 체크박스의 onClick 이벤트 핸들러는 2단계에서 만든 updateSelection 함수를 호출하여 새로운 상태를 계산하고, useState의 setter 함수로 상태를 업데이트합니다.

UI는 shadcn-ui의 Checkbox, Label 등의 컴포넌트를 활용하여 구성합니다.

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