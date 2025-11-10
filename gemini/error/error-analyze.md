**오류 메시지:**
* `AssertionError: false가 true이기를 예상했으나 다름 // Object.is 등가 비교`
* `AssertionError: 'Invalid input: expected object, recei…'가 '목표 체중은 현재 체중과 같을 수 없습니다.'이기를 예상했으나 다름 // Object.is 등가 비교`

**컨텍스트:**
* `onboarding.schema.ts`에 대한 테스트 실행 중 오류가 발생했습니다.
* 4개의 테스트 중 3개가 실패했습니다.
* 실패한 테스트는 `onboardingSchema`의 유효성 검사 로직, 특히 `goalType` 및 체중 관련 필드의 조건부 유효성 검사와 관련이 있습니다.

**추정 원인:**
1.  **`superRefine`의 부적절한 사용**: 스키마 끝에 있는 `superRefine` 메서드가 `goalType`에 관계없이 보편적으로 적용되고 있습니다. 이로 인해 `goalType`이 `WEIGHT_MANAGEMENT`가 아닌 경우에도 스키마가 `currentWeight`와 `targetWeight`의 유효성을 검사하려고 시도하여 유효성 검사가 실패합니다 (해당 경우에는 이 필드들이 필요하지 않음).
2.  **잘못된 테스트 데이터**: '목표 체중은 현재 체중과 같을 수 없습니다.'라는 오류 메시지를 예상하는 테스트가 'Invalid input: expected object, received array'(잘못된 입력: 객체를 예상했으나 배열을 받음)라는 메시지를 받고 있습니다. 이는 테스트 케이스 자체가 잘못된 구조의 데이터를 전달하고 있음을 시사하며, 이로 인해 커스텀 정제(refinement) 로직에 도달하기 전에 더 근본적인 유효성 검사에서 실패하고 있습니다.
3.  **유효성 검사 로직 결함**: 스키마가 `goalType`에 따라 유효성 검사 규칙을 올바르게 구별하지 못하고 있습니다.

**해결 방안:**
* `onboardingSchema`를 `z.discriminatedUnion`을 사용하도록 리팩터링합니다. 이를 통해 `goalType` 값에 따라 다른 유효성 검사 로직을 적용할 수 있습니다.
* 모든 `goalType`에 공통적인 필드를 포함하는 기본 스키마를 생성합니다.
* 각 `goalType`(`WEIGHT_MANAGEMENT`, `DIET_MANAGEMENT`, `HEALTH_MANAGEMENT`)에 대해 기본 스키마를 확장하고 해당 유형에 특정한 유효성 검사 규칙을 포함하는 별도의 스키마를 생성합니다.
* `WEIGHT_MANAGEMENT` 스키마에는 `currentWeight`와 `targetWeight`가 정의되어 있고 서로 같지 않은지 확인하는 정제(refinement) 로직을 포함합니다.
* `z.discriminatedUnion('goalType', [...])`을 사용하여 이 스키마들을 결합합니다.
* `onboarding.schema.test.ts`에서 사용되는 테스트 데이터를 검토하고 수정하여 예상되는 스키마 구조와 일치하도록 합니다.

------------------------------

---
Error Message:
A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen.

Context:
- This error occurs in the `BasicInfoForm.tsx` component, which is part of the `Onboarding.tsx` multi-step form.
- The error started appearing after refactoring the `onboarding.schema.ts` to use a `discriminatedUnion`.

Suspected Cause:
- The `useForm` hook in `Onboarding.tsx` is initialized with `defaultValues`. Due to the schema changes, it's highly likely that some of the properties in the `defaultValues` object are `undefined`.
- When React Hook Form registers an input for a field that has an `undefined` value, the input is initially rendered as "uncontrolled" by React.
- When the user starts typing or the value is updated programmatically to a non-undefined value (like an empty string), the input becomes "controlled," which causes React to throw the error.

Solution:
- I need to inspect the `Onboarding.tsx` component and locate the `useForm` hook.
- I will then ensure that the `defaultValues` object provided to `useForm` has initial values for all fields, especially for fields that are expected to be strings. For string fields, the initial value should be an empty string (`''`) instead of `undefined`.
- This will ensure that all form inputs are "controlled" from the very beginning, preventing the error.
