### **1. 사용자 스토리 (User Story)**

- **As a**: `ProfileStepForm` 컴포넌트 개발자
- **I want to**: 이름, 생년월일, 키, 몸무게의 유효성을 검증하고, 그 결과를 `{ isSuccess, msg }` 형태의 **명확한 객체로 반환**하는 순수 함수들을 사용하고 싶습니다
- **So that**: 함수의 반환 값을 명시적으로 확인(`result.isSuccess`)하고, 실패 시 에러 메시지를 쉽게 사용할 수 있도록 하여, 예측 가능하고 안정적인 코드를 작성할 수 있습니다

### **2. 인수 조건 (Acceptance Criteria)**

- **함수 반환 값 규칙**: 모든 Validator 함수는 아래 형태의 객체를 반환한다.
    - **성공 시**: `{ isSuccess: true, msg: null }`
    - **실패 시**: `{ isSuccess: false, msg: "실패 이유에 대한 에러 메시지" }`
- **`validateName` 함수**
    - `AC-1`: 유효한 이름은 `{ isSuccess: true, msg: null }`을 반환해야 한다.
    - `AC-2`: 빈 문자열은 `{ isSuccess: false, msg: "이름은 필수 입력 항목입니다." }`를 반환해야 한다.
    - `AC-3`: 30자를 초과하면 `{ isSuccess: false, msg: "이름은 30자 이하로 입력해주세요." }`를 반환해야 한다.
    - `AC-4`: 특수문자/숫자가 포함되면 `{ isSuccess: false, msg: "이름에는 특수문자나 숫자를 포함할 수 없습니다." }`를 반환해야 한다.
- **`validateBirthdate` 함수**
    - `AC-5`: 유효한 과거 날짜(`YYYY-MM-DD`)는 `{ isSuccess: true, msg: null }`을 반환해야 한다.
    - `AC-6`: 미래 날짜는 `{ isSuccess: false, msg: "생년월일은 오늘보다 미래일 수 없습니다." }`를 반환해야 한다.
    - `AC-7`: 존재하지 않는 날짜(예: `2025-02-30`)는 `{ isSuccess: false, msg: "유효하지 않은 날짜 형식입니다." }`를 반환해야 한다.
- **`validateHeight` 함수**
    - `AC-8`: 유효한 키(1~1000)는 `{ isSuccess: true, msg: null }`을 반환해야 한다.
    - `AC-9`: 1000을 초과하면 `{ isSuccess: false, msg: "키는 1000cm 이하로 입력해주세요." }`를 반환해야 한다.
    - `AC-10`: 0, 음수, 정수가 아니면 `{ isSuccess: false, msg: "유효한 키를 입력해주세요." }`를 반환해야 한다.
- **`validateWeight` 함수**
    - `AC-11`: 유효한 몸무게(1~1000, 소수점 한 자리 허용)는 `{ isSuccess: true, msg: null }`을 반환해야 한다.
    - `AC-12`: 1000을 초과하면 `{ isSuccess: false, msg: "몸무게는 1000kg 이하로 입력해주세요." }`를 반환해야 한다.
    - `AC-13`: 0 또는 음수이면 `{ isSuccess: false, msg: "유효한 몸무게를 입력해주세요." }`를 반환해야 한다.

### **3. 테스트 케이스 (Test Cases)**

### **[단위 테스트] `validateName` 함수**

- `it('should return a success object for a valid name')`
- `it('should return a "required" error object for an empty name')`
- `it('should return a "maxLength" error object for a name longer than 30 characters')`
- `it('should return an "invalidChars" error object for a name with special characters')`

### **[단위 테스트] `validateBirthdate` 함수**

- `it('should return a success object for a valid date in the past')`
- `it('should return a "futureDate" error object for a date in the future')`
- `it('should return an "invalidFormat" error object for a non-existent date like "2025-02-30"')`
- `it('should return an "invalidFormat" error object for a non-date string')`

### **[단위 테스트] `validateHeight` 함수**

- `it('should return a success object for a valid height')`
- `it('should return a "maxValue" error object for a height greater than 1000')`
- `it('should return an "invalid" error object for zero or a negative height')`
- `it('should return an "invalid" error object for a non-integer height')`

### **[단위 테스트] `validateWeight` 함수**

- `it('should return a success object for a valid weight including one decimal place')`
- `it('should return a "maxValue" error object for a weight greater than 1000')`
- `it('should return an "invalid" error object for zero or a negative weight')`
- `it('should return an "invalid" error object for a weight with more than one decimal place')`