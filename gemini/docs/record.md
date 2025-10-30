작업 한줄 요약 : TDD 방식으로 온보딩 플로우를 리팩토링하고, 관련 테스트 코드를 작성 및 수정했습니다.
상세 변경 내용(5줄 내외) : 
- `onboarding.schema.ts`에 통합 Zod 스키마를 정의하고, 단위 테스트로 검증했습니다.
- `Onboarding.tsx` 컴포넌트에서 `react-hook-form`의 `FormProvider`와 `useForm`을 사용하여 중앙 폼 상태 관리를 구현했습니다.
- `BasicInfoForm`, `HealthInfoForm`, `GoalSettingForm`을 `useFormContext`를 사용하도록 리팩토링했습니다.
- `Onboarding.test.tsx`에 단계별 폼 렌더링, 네비게이션, 데이터 유지, 최종 제출에 대한 통합 테스트 케이스를 작성했습니다.
- `e2e/onboarding.spec.ts` E2E 테스트 파일을 올바른 위치로 이동했습니다.