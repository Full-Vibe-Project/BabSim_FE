## 테스트 실패 항목 분석

현재 테스트 실행 결과, 다음과 같은 실패 항목들이 존재합니다.

### 실패한 테스트 스위트 (Suites)

1.  **`e2e/onboarding.spec.ts`**
    *   **원인**: Playwright 테스트 설정 문제입니다. `test.describe()` 함수가 예상치 못한 방식으로 호출되고 있습니다. 이는 보통 설정 파일(`vitest.config.ts`)이나 다른 파일에서 `test.describe()`를 잘못 가져올 때 발생합니다.

2.  **`src/features/auth/ui/LoginForm.test.tsx`**
    *   **원인**: 테스트 스위트(`describe` 블록)를 찾을 수 없습니다. 현재 파일의 모든 테스트 코드가 주석 처리되어 있기 때문입니다.

3.  **`src/features/record/ui/FoodRecordForm.test.tsx`**
    *   **원인**: 파일 변환(Transform) 오류입니다. 파일 끝에 예기치 않은 `}` 문자가 있어 `esbuild`가 파일을 제대로 파싱하지 못하고 있습니다.

4.  **`src/features/sync/ui/NotionSync.test.tsx`**
    *   **원인**: 테스트 스위트를 찾을 수 없습니다. `LoginForm.test.tsx`와 마찬가지로 테스트 코드가 주석 처리되어 있습니다.

5.  **`src/widgets/recommend/ui/MenuRecommendation.test.tsx`**
    *   **원인**: 테스트 스위트를 찾을 수 없습니다. 테스트 코드가 주석 처리되어 있습니다.

6.  **`src/widgets/report/ui/SummaryReport.test.tsx`**
    *   **원인**: 테스트 스위트를 찾을 수 없습니다. 테스트 코드가 주석 처리되어 있습니다.

### 실패한 개별 테스트

1.  **`src/features/onboarding/ui/GoalSettingForm.test.tsx`**
    *   **테스트명**: `should display an error message if the target weight is the same as the current weight`
    *   **원인**: 테스트에서 "목표 체중은 현재 체중과 같을 수 없습니다."라는 에러 메시지를 찾지 못하고 있습니다. `onboarding.schema.ts`에서 `superRefine`을 사용하여 유효성 검사 로직을 수정했지만, 에러 메시지가 UI에 정상적으로 표시되지 않거나 테스트 환경에서 이를 감지하지 못하는 문제가 있는 것으로 보입니다.

2.  **`src/features/onboarding/ui/Onboarding.test.tsx`**
    *   **테스트명**: `should progress through the entire onboarding flow and submit the data`
    *   **원인**: `handleSubmit` 함수가 호출되지 않았습니다 (`expected "spy" to be called 1 times, but got 0 times`). 이는 온보딩 플로우의 마지막 단계에서 "시작하기" 버튼을 클릭했을 때 `form`의 `submit` 이벤트가 정상적으로 발생하지 않았음을 의미합니다. 유효성 검사 실패, 버튼 비활성화, 혹은 이벤트 핸들러 연결 문제일 수 있습니다.