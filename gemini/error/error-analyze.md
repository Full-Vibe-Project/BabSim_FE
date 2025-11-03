# Onboarding 문제 분석 및 해결

## 1. BasicInfoForm 문제

### 문제 상황

Onboarding 과정의 첫 번째 단계인 `BasicInfoForm`에서 모든 정보를 올바르게 입력하고 "다음" 버튼을 클릭해도 `HealthInfoForm`으로 넘어가지 않습니다.

### 원인 분석

문제의 핵심 원인은 `react-hook-form`의 컨텍스트(Context)가 잘못 사용되고 있다는 점입니다.

1.  **`Onboarding.tsx`의 구조**:
    *   `Onboarding` 컴포넌트는 전체 Onboarding 플로우를 관리합니다.
    *   `useForm` 훅을 사용하여 Form의 상태를 관리하고, 이 Form의 메서드와 상태를 `FormProvider`를 통해 하위 컴포넌트에 제공합니다.
    *   "다음" 버튼의 `onClick` 이벤트 핸들러인 `handleNext` 함수는 `FormProvider`의 컨텍스트를 사용하여 현재 단계의 필드 유효성을 검사(`trigger`)합니다.

2.  **`BasicInfoForm.tsx`의 문제점**:
    *   `BasicInfoForm` 컴포넌트는 `Onboarding` 컴포넌트의 `FormProvider`를 사용해야 하지만, 자체적으로 `useForm` 훅을 호출하여 완전히 새로운, 독립적인 Form 컨텍스트를 생성하고 있습니다.
    *   결과적으로 `BasicInfoForm` 내의 `input` 필드들은 `Onboarding` 컴포넌트가 관리하는 Form 상태에 등록되지 않습니다.

3.  **버그 발생 시나리오**:
    *   사용자가 `BasicInfoForm`의 필드를 채웁니다. 이 데이터는 `BasicInfoForm`의 독립적인 Form 상태에만 존재합니다.
    *   사용자가 "다음" 버튼을 클릭하면 `Onboarding`의 `handleNext` 함수가 호출됩니다.
    *   `handleNext` 함수는 `Onboarding`의 Form 컨텍스트 내에서 `name`, `gender` 등 필드의 유효성을 검사하려고 시도합니다.
    *   하지만 해당 필드들은 `Onboarding`의 Form 컨텍스트에 등록된 적이 없으므로, `trigger` 함수는 유효성 검사에 실패(`isValid`가 `false`가 됨)합니다.
    *   따라서 `nextStep()` 함수가 호출되지 않고, 다음 컴포넌트로 넘어가지 않는 문제가 발생합니다.

### 해결 방안

`BasicInfoForm`이 `Onboarding` 컴포넌트로부터 `FormProvider`를 통해 제공된 Form 컨텍스트를 사용하도록 수정해야 합니다.

1.  **`BasicInfoForm.tsx` 수정**:
    *   `BasicInfoForm.tsx` 내부의 `useForm` 훅을 제거합니다.
    *   대신 `react-hook-form`에서 `useFormContext` 훅을 임포트하여 `Onboarding`의 Form 메서드를 가져옵니다. (`const { control, formState: { errors } } = useFormContext();`)
    *   불필요해진 `onSubmit` 함수와 `isValid` 상태를 제거합니다.

이렇게 수정하면 `BasicInfoForm`의 필드들이 `Onboarding`의 Form 상태에 올바르게 등록되어 `handleNext` 함수의 유효성 검사가 정상적으로 동작하고, 다음 단계로 넘어갈 수 있게 됩니다.

---

## 2. HealthInfoForm 문제

### 문제 상황

`BasicInfoForm` 문제 해결 후, `HealthInfoForm`을 모두 작성하고 "다음" 버튼을 눌러도 다음 컴포넌트(`GoalSettingForm`)으로 넘어가지 않습니다.

### 원인 분석

이 문제의 원인은 데이터 스키마 정의와 컴포넌트에서의 사용 방식 간의 불일치입니다.

1.  **스키마 (`onboarding.schema.ts`)**:
    *   `healthConditions`: `z.array(z.string())`
    *   `allergies`: `z.array(z.string())`
    *   데이터 구조가 `OnboardingData = { ..., healthConditions: string[], allergies: string[], ... }` 와 같이 평면적으로 정의되어 있습니다.

2.  **폼 컴포넌트 (`HealthInfoForm.tsx`)**:
    *   `useFormContext`를 사용하여 필드를 등록할 때, `healthConditions.allergies`, `healthConditions.chronicDiseases`와 같이 중첩된 객체 형태로 사용하고 있습니다.
    *   이는 `OnboardingData = { ..., healthConditions: { allergies: string[], chronicDiseases: string[], ... } }` 와 같은 중첩 구조를 기대하는 코드입니다.

3.  **플로우 관리 컴포넌트 (`Onboarding.tsx`)**:
    *   `steps` 배열에서 `HealthInfoForm` 단계의 유효성을 검사할 필드를 `['healthConditions', 'allergies']`로 지정하고 있습니다.
    *   `handleNext` 함수는 이 배열을 기반으로 `trigger` 함수를 호출하여 유효성을 검사합니다.

스키마, 폼, 유효성 검사 필드 간의 데이터 구조 불일치로 인해 `trigger` 함수가 `HealthInfoForm`의 필드를 제대로 찾아서 검사하지 못합니다. 따라서 유효성 검사가 항상 실패하고 다음 단계로 진행되지 않습니다.

### 해결 방안

데이터 구조를 일관성 있게 중첩된 형태로 통일해야 합니다.

1.  **`onboarding.schema.ts` 수정**:
    *   `healthConditions`를 `allergies`, `chronicDiseases`, `dietPreferences`를 속성으로 갖는 `z.object()`로 수정합니다.
    *   최상위 레벨에 있던 `allergies` 필드를 제거합니다.

    ```typescript
    // 수정 전
    healthConditions: z.array(z.string()),
    allergies: z.array(z.string()),

    // 수정 후
    healthConditions: z.object({
      allergies: z.array(z.string()).optional(),
      chronicDiseases: z.array(z.string()).optional(),
      dietPreferences: z.array(z.string()).optional(),
    }),
    ```

2.  **`Onboarding.tsx` 수정**:
    *   `steps` 배열에서 `HealthInfoForm`에 해당하는 `fields`를 `['healthConditions']`로 변경하여 `healthConditions` 객체 전체를 유효성 검사하도록 합니다.

    ```typescript
    // 수정 전
    { id: 'health', component: HealthInfoForm, fields: ['healthConditions', 'allergies'] },

    // 수정 후
    { id: 'health', component: HealthInfoForm, fields: ['healthConditions'] },
    ```

이러한 수정을 통해 데이터 모델과 컴포넌트의 구현이 일치하게 되어 유효성 검사가 올바르게 작동하고 다음 단계로 정상적으로 진행될 것입니다.
