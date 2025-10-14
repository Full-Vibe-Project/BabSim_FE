### **1. 사용자 스토리 (User Story)**

- **As a**: `GoalSettingForm` 컴포넌트 개발자
- **I want to**: 목표 체중과 주간 목표 값들의 유효성을 검사하고, 그 결과를 `{ isSuccess, msg }` 형태의 **명확한 객체로 반환**하는 순수 함수들을 사용하고 싶습니다
- **So that**: '목표 유형' 선택에 따라 동적으로 변하는 복잡한 유효성 검사 규칙을 UI 코드와 분리하여, 예측 가능하고 유지보수하기 쉬운 코드를 작성할 수 있습니다

### **2. 인수 조건 (Acceptance Criteria)**

> 사용자 스토리를 성공으로 판단하기 위한 비즈니스 규칙입니다. 각 함수의 '계약(Contract)'을 정의합니다.
> 
- **함수 반환 값 규칙**: 모든 Validator 함수는 아래 형태의 객체를 반환한다.
    - **성공 시**: `{ isSuccess: true, msg: null }`
    - **실패 시**: `{ isSuccess: false, msg: "실패 이유에 대한 에러 메시지" }`
- **`validateGoalWeight` 함수 (인자: `currentWeight`, `targetWeight`)**
    - `AC-1`: 유효한 범위(20~200kg) 내에 있으며 서로 다른 현재 체중과 목표 체중은 `{ isSuccess: true, msg: null }`을 반환해야 한다.
    - `AC-2`: 목표 체중이 현재 체중과 같으면 `{ isSuccess: false, msg: "목표 체중은 현재 체중과 같을 수 없습니다." }`를 반환해야 한다.
    - `AC-3`: 숫자가 아니거나 음수이면 `{ isSuccess: false, msg: "유효한 체중을 입력해주세요." }`를 반환해야 한다.
    - `AC-4`: 유효한 범위를 벗어나면 `{ isSuccess: false, msg: "체중은 20kg 이상, 200kg 이하로 입력해주세요." }`를 반환해야 한다.
- **`validateWeeklyGoal` 함수 (인자: `value`, `max_value`)**
    - `AC-5`: `0` 이상, `max_value` 이하의 유효한 정수는 `{ isSuccess: true, msg: null }`을 반환해야 한다.
    - `AC-6`: 음수이면 `{ isSuccess: false, msg: "주간 목표는 0 이상의 값이어야 합니다." }`를 반환해야 한다.
    - `AC-7`: 정수가 아니면 `{ isSuccess: false, msg: "주간 목표는 정수만 입력 가능합니다." }`를 반환해야 한다.
    - `AC-8`: `max_value`를 초과하면 `{ isSuccess: false, msg: "주간 목표값이 너무 큽니다." }`를 반환해야 한다.

### **3. 테스트 케이스 (Test Cases)**

> 인수 조건을 검증하기 위한 구체적인 테스트 시나리오입니다. (Vitest 코드의 설계도)
> 

### **[단위 테스트] `validateGoalWeight` 함수**

- `it('(AC-1) should return a success object for valid and different current and target weights')`
(유효하고 서로 다른 현재/목표 체중에 대해 성공 객체를 반환해야 한다)
- `it('(AC-2) should return an "identicalWeight" error object if current and target weights are the same')`
(현재 체중과 목표 체중이 같으면 "동일 체중" 에러 객체를 반환해야 한다)
- `it('(AC-3) should return an "invalid" error object for non-numeric or negative weights')`
(숫자가 아니거나 음수인 체중에 대해 "유효하지 않음" 에러 객체를 반환해야 한다)
- `it('(AC-4) should return an "outOfRange" error object if weights are outside the valid range')`
(유효 범위를 벗어난 체중에 대해 "범위 초과" 에러 객체를 반환해야 한다)

### **[단위 테스트] `validateWeeklyGoal` 함수**

- `it('(AC-5) should return a success object for a valid weekly goal value within the limit')`
(한도 내의 유효한 주간 목표값에 대해 성공 객체를 반환해야 한다)
- `it('(AC-6) should return a "negativeValue" error object for a negative number')`
(음수에 대해 "음수 값" 에러 객체를 반환해야 한다)
- `it('(AC-7) should return a "notInteger" error object for a non-integer number')`
(정수가 아닌 숫자에 대해 "정수 아님" 에러 객체를 반환해야 한다)
- `it('(AC-8) should return a "maxValue" error object for a value exceeding the maximum limit')`
(최대 한도를 초과하는 값에 대해 "최대값" 에러 객체를 반환해야 한다)