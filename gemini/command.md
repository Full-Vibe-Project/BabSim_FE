아래의 일일 명령은 지금 지시할 명령입니다. 아래 문장을 실행해주세요.
<!-- 일일 명령 시작 -->

현재 BasicInfoForm, HealthInfoForm, GoalSettingForm으로 분리된 온보딩 과정을 단일 제어 컴포넌트(Onboarding)와 단일 스키마(onboardingSchema)를 사용하는 '멀티스텝 폼(Multi-step Form)' 아키텍처로 리팩토링합니다.

아래의 명세서(Specifications)를 정확히 준수하여 TDD 3단계에서 작성된 Onboarding.test.tsx 통합 테스트를 통과하는 구현 코드를 작성해 주세요.

1. 명세서: 모델 (Schema)
- 파일: src/features/onboarding/onboarding.schema.ts
스키마 통합: zod를 사용하여 3단계 폼의 모든 필드를 포함하는 단일 onboardingSchema를 정의합니다.
유효성 규칙: 기존 3개 폼의 모든 유효성 검사 규칙(예: nickname 2자 이상, height 양수 등)을 그대로 유지합니다.
타입 export: export type OnboardingData = z.infer<typeof onboardingSchema>;를 통해 추론된 타입을 export 합니다.

2. 명세서: UI (Components)

### A. Onboarding.tsx (부모/제어 컴포넌트)
파일: features/onboarding/ui/Onboarding.tsx
상태 관리: const [step, setStep] = useState(1);과 같이 현재 단계를 관리하는 내부 step 상태를 가집니다.

폼 중앙 제어 (핵심):
react-hook-form의 useForm 훅을 이 컴포넌트에서 단 한 번만 호출합니다.
resolver에 1번에서 생성한 zodResolver(onboardingSchema)를 연결합니다.
const methods = useForm(...)의 모든 반환값을 <FormProvider {...methods}> 컴포넌트로 감싸 자식들에게 제공합니다.
조건부 렌더링: step 상태에 따라 BasicInfoForm, HealthInfoForm, GoalSettingForm 중 하나만 조건부로 렌더링합니다.
네비게이션: "이전", "다음", "제출" 버튼은 Onboarding 컴포넌트가 직접 렌더링하고 제어합니다.

단계별 유효성 검사 (핵심):
"다음" 버튼 클릭 시, setStep을 바로 호출하면 안 됩니다. react-hook-form의 trigger() 메서드를 호출하여 현재 step에 해당하는 필드들만 유효성 검사를 실행해야 합니다.
예: const isValid = await trigger(['nickname', 'gender', 'birthDate']);

isValid가 true일 때만 setStep(prev => prev + 1)을 실행합니다.

최종 제출 (API 모킹):
Tanstack Query의 useMutation 훅을 선언합니다.
handleSubmit의 콜백 함수(onSubmit)에서 mutation.mutate(data)를 호출합니다.
mutationFn (실제 API 호출 함수) 내부에는 // TODO: API 연결 시 실제 서버 요청 로직 구현 주석을 작성하고, Promise.resolve(data)를 반환하여 성공을 시뮬레이션합니다.

### B. BasicInfoForm.tsx (및 HealthInfoForm, GoalSettingForm)
파일: features/onboarding/ui/BasicInfoForm.tsx (외 2개)
폼 상태 주입 (핵심): react-hook-form의 useFormContext() 훅을 호출하여 부모(Onboarding)의 register, control, formState 등을 가져옵니다.
useForm 금지: 이 자식 컴포넌트들은 절대로 useForm을 직접 호출해서는 안 됩니다.
책임 분리: 이 컴포넌트들은 shadcn/ui의 Input, RadioGroup 등 순수 폼 필드와 에러 메시지 렌더링만 담당합니다. "다음" 또는 "제출" 버튼을 포함해서는 안 됩니다.

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