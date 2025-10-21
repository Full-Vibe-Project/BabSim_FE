### **1. 사용자 스토리 (User Story)**

- **As a**: `Onboarding` 컴포넌트 개발자
- **I want to**: 3단계에 걸친 모든 입력 필드의 유효성 규칙을 **하나의 거대한 Zod 스키마(`onboardingSchema`)**로 통합하고 싶습니다
- **So that**: 전체 온보딩 데이터의 타입(`OnboardingData`)을 자동으로 추론하고, 최종 제출 직전에 모든 데이터의 유효성을 한 번에, 그리고 안정적으로 검증할 수 있습니다

### **2. 인수 조건 (Acceptance Criteria)**

> 사용자 스토리를 성공으로 판단하기 위한 비즈니스 규칙입니다. onboardingSchema의 '계약(Contract)'을 정의합니다.
> 
- **`onboardingSchema`**
    - `AC-1`: 3단계의 모든 필수 필드에 유효한 값이 모두 포함된 **완전한 데이터 객체**는, 유효성 검사를 성공적으로 통과해야 한다 (`parse`가 에러를 발생시키지 않아야 함).
    - `AC-2`: 1단계의 필수 필드('이름' 등)가 누락되거나 유효하지 않은 데이터 객체는, 유효성 검사에 실패해야 한다 (`parse`가 에러를 발생시켜야 함).
    - `AC-3`: '목표 유형'이 '체중 관리'일 때, '목표 체중'이 '현재 체중'과 동일한 데이터 객체는 유효성 검사에 실패해야 한다 (Zod의 `refine` 사용).
    - `AC-4`: `zod.infer<typeof onboardingSchema>`를 통해 추론된 TypeScript 타입은, 모든 폼 필드를 포함하는 `OnboardingData` 타입이어야 한다.

### **3. 테스트 케이스 (Test Cases)**

> 인수 조건을 검증하기 위한 구체적인 테스트 시나리오입니다. (Vitest 코드의 설계도)
> 

### **[단위 테스트] `onboardingSchema`**

- **`describe`: 유효성 검사 성공 (Successful Validation)**
    - `it('(AC-1) should successfully validate a complete and valid data object for the "Weight Management" goal')`
    ('체중 관리' 목표에 대한 완벽하고 유효한 데이터 객체는 유효성 검사를 성공적으로 통과해야 한다)
    - `it('(AC-1) should successfully validate a complete and valid data object for other goals')`
    (다른 목표 유형에 대한 완벽하고 유효한 데이터 객체는 유효성 검사를 성공적으로 통과해야 한다)
- **`describe`: 유효성 검사 실패 (Failed Validation)**
    - `it('(AC-2) should fail validation if a required field from the first step (e.g., name) is missing')`
    (첫 번째 단계의 필수 필드(예: 이름)가 누락되면 유효성 검사에 실패해야 한다)
    - `it('(AC-2) should fail validation if a field from the third step (e.g., goalPeriod) is invalid')`
    (세 번째 단계의 필드(예: 목표 기간)가 유효하지 않으면 유효성 검사에 실패해야 한다)
- **`describe`: 동적/조건부 유효성 검사 (Dynamic/Conditional Validation)**
    - `it('(AC-3) should fail validation if the goal is "Weight Management" and targetWeight is the same as currentWeight')`
    (목표가 '체중 관리'이고 목표 체중이 현재 체중과 같으면, 유효성 검사에 실패해야 한다)
    - `it('should pass validation if the goal is not "Weight Management", even if weight fields are missing')`
    (목표가 '체중 관리'가 아닐 경우, 체중 관련 필드가 없어도 유효성 검사를 통과해야 한다)