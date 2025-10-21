### **1. 사용자 스토리 (User Story)**

- **As a**: 신규 사용자
- **I want to**: 나의 건강 목표를 설정하고, 내 선택에 따라 폼이 지능적으로 반응하는 것을 확인하고 싶습니다
- **So that**: 불필요한 정보를 입력하지 않고, 명확한 안내에 따라 쉽고 빠르게 온보딩을 완료할 수 있습니다

### **2. 인수 조건 (Acceptance Criteria)**

> 사용자 스토리를 성공으로 판단하기 위한 비즈니스 규칙입니다. 통합 테스트에서는 컴포넌트의 동적인 UI 동작과 상태 변화를 검증합니다.
> 
- `AC-1`: '목표 유형' 중 하나를 선택하면, 해당 옵션만 선택된 상태로 표시되어야 한다 (라디오 버튼 동작).
- `AC-2`: '목표 유형'으로 '체중 관리'를 선택했을 때만 '현재 체중'과 '목표 체중' 입력 필드가 활성화(또는 표시)되어야 한다.
- `AC-3`: '목표 체중'이 '현재 체중'과 동일하게 입력되면, "목표 체중은 현재 체중과 같을 수 없습니다."라는 에러 메시지가 표시되어야 한다.
- `AC-4`: '목표 유형', '목표 기간' 등 모든 필수 필드가 유효하게 입력되기 전까지 '시작하기' 버튼은 비활성화 상태여야 한다.
- `AC-5`: 선택된 목표 유형에 맞는 모든 필수 필드가 유효하게 입력되면, '시작하기' 버튼이 활성화되어야 한다.

### **3. 테스트 케이스 (Test Cases)**

> 인수 조건을 검증하기 위한 구체적인 테스트 시나리오입니다. (Vitest + React Testing Library 코드의 설계도)
> 

### **[통합 테스트] `GoalSettingForm` 컴포넌트**

- **`describe`: 목표 유형 선택 (Goal Type Selection)**
    - `it('(AC-1) should select only one goal type at a time, like a radio button')`
    (라디오 버튼처럼 한 번에 하나의 목표 유형만 선택해야 한다)
    - `it('(AC-2) should enable the weight input fields only when "Weight Management" is selected')`
    ('체중 관리'가 선택되었을 때만 체중 입력 필드를 활성화해야 한다)
    - `it('(AC-2) should disable the weight input fields when a goal type other than "Weight Management" is selected')`
    ('체중 관리' 외 다른 목표 유형이 선택되면 체중 입력 필드를 비활성화해야 한다)
- **`describe`: 동적 유효성 검사 (Dynamic Validation)**
    - `it('(AC-3) should display an error message if the target weight is the same as the current weight')`
    (목표 체중이 현재 체중과 같을 경우 에러 메시지를 표시해야 한다)
    - `it('should remove the error message when the target weight is changed to be different')`
    (목표 체중이 다른 값으로 변경되면 에러 메시지를 제거해야 한다)
- **`describe`: '시작하기' 버튼 활성화 로직 (Submit Button Activation Logic)**
    - `it('(AC-4) should render the "Start" button as disabled initially')`
    (초기 렌더링 시 '시작하기' 버튼은 비활성화 상태여야 한다)
    - `it('(AC-4) should keep the "Start" button disabled if "Weight Management" is selected but weight fields are invalid')`
    ('체중 관리' 선택 후 체중 필드가 유효하지 않으면 '시작하기' 버튼은 비활성화 상태를 유지해야 한다)
    - `it('(AC-5) should enable the "Start" button when all required fields for the "Weight Management" goal are validly filled')`
    ('체중 관리' 목표에 대한 모든 필수 필드가 유효하게 채워지면 '시작하기' 버튼을 활성화해야 한다)
    - `it('(AC-5) should enable the "Start" button when a goal type other than "Weight Management" is selected and all other required fields are filled')`
    ('체중 관리' 외 다른 목표 유형 선택 후 나머지 필수 필드가 채워지면 '시작하기' 버튼을 활성화해야 한다)