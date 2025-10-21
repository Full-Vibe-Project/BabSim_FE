작업 한줄 요약 : TDD 방식으로 온보딩 전체 폼 데이터에 대한 통합 Zod 스키마를 작성하고 검증했습니다.
상세 변경 내용(5줄 내외) : 
- `gemini/test/test-format.md`의 요구사항에 따라 `onboarding.schema.test.ts`에 단위 테스트를 먼저 작성했습니다.
- 성공, 실패, 동적 유효성 검사 케이스를 포함하여 스키마의 동작을 검증했습니다.
- `onboarding.schema.ts`에 3단계 폼의 모든 필드를 포함하는 `onboardingSchema`를 구현했습니다.
- Zod의 `.refine`과 `.superRefine`을 사용하여 복잡한 유효성 검사 규칙과 동적 로직을 처리했습니다.
- `vitest`로 모든 테스트가 통과하는 것을 확인하여 스키마의 정확성을 보장했습니다.