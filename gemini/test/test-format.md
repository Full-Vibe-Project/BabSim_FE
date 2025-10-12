### **통합 테스트 문서: 기본 프로필 폼 (`BasicInfoForm`)**

### **1. 사용자 스토리 (User Story)**

- **As a**: 신규 사용자
- **I want to**: 나의 기본 프로필 정보를 입력하고, 내 입력에 따라 폼이 즉각적으로 반응하는 것을 확인하고 싶습니다
- **So that**: 쉽고 명확하게 다음 단계로 진행할 수 있습니다

### **2. 인수 조건 (Acceptance Criteria)**

> 사용자 스토리를 성공으로 판단하기 위한 비즈니스 규칙입니다. 통합 테스트에서는 컴포넌트의 UI 동작과 상태 변화를 검증합니다.
> 
- **AC-1**: 폼이 처음 렌더링될 때, 모든 입력창과 비활성화된 '다음' 버튼이 표시되어야 한다.
- **AC-2**: 성별 버튼('여성', '남성') 중 하나를 선택하면, 이전에 선택된 버튼은 자동으로 선택 해제되어야 한다 (라디오 버튼처럼 동작).
- **AC-3**: 생년월일 입력창에 숫자만 입력해도 `YYYY-MM-DD` 형식으로 자동 변환되어 표시되어야 한다.
- **AC-4**: 모든 필수 필드가 유효하게 입력되기 전까지 '다음' 버튼은 비활성화 상태여야 한다.
- **AC-5**: 모든 필수 필드가 유효하게 입력되면 '다음' 버튼이 활성화되어야 한다.
- **AC-6**: 유효하지 않은 값(예: 30자 초과 이름)을 입력하면, 해당 입력창 아래에 적절한 에러 메시지가 표시되어야 한다.

### **3. 테스트 케이스 (Test Cases)**

> 인수 조건을 검증하기 위한 구체적인 테스트 시나리오입니다. (Vitest + React Testing Library 코드의 설계도)
> 

### **[통합 테스트] `ProfileStepForm` 컴포넌트**

- **`describe`: 초기 렌더링 (Initial Rendering)**
    - **`// (AC-1) Verifies the initial state of the form`**
        - `it('should render all input fields and a disabled "Next" button')`
            
            (모든 입력 필드와 비활성화된 '다음' 버튼을 렌더링해야 한다)
            
- **`describe`: 성별 선택 로직 (Gender Selection Logic)**
    - **`// (AC-2) Verifies radio-button-like behavior`**
        - `it('should select "Female" and deselect "Male" when the "Female" button is clicked')`
            
            ('여성' 버튼 클릭 시 '여성'을 선택하고 '남성'은 선택 해제해야 한다)
            
        - `it('should select "Male" and deselect "Female" when the "Male" button is clicked after "Female" was selected')`
            
            ('여성' 선택 후 '남성' 버튼 클릭 시 '남성'을 선택하고 '여성'은 선택 해제해야 한다)
            
- **`describe`: 생년월일 자동 포맷팅 (Birthdate Auto-formatting)**
    - **`// (AC-3) Verifies input masking for birthdate`**
        - `it('should automatically format numeric input like "20240919" into "2024-09-19"')`
            
            ("20240919"와 같은 숫자 입력을 "2024-09-19"로 자동 변환해야 한다)
            
- **`describe`: '다음' 버튼 활성화 로직 (Next Button Activation Logic)**
    - **`// (AC-4, AC-5) Verifies the overall form validity and button state`**
        - `it('should keep the "Next" button disabled if not all required fields are validly filled')`
            
            (필수 필드가 모두 유효하게 채워지지 않으면 '다음' 버튼은 비활성화 상태를 유지해야 한다)
            
        - `it('should enable the "Next" button only when all required fields are validly filled')`
            
            (모든 필수 필드가 유효하게 채워졌을 때만 '다음' 버튼을 활성화해야 한다)
            
- **`describe`: 유효성 검사 에러 메시지 표시 (Validation Error Message Display)**
    - **`// (AC-6) Verifies error feedback based on validation logic`**
        - `it('should display an error message below the name input if the name exceeds 30 characters')`
            
            (이름이 30자를 초과하면 이름 입력창 아래에 에러 메시지를 표시해야 한다)
            
        - `it('should remove the error message when the invalid name is corrected')`
            
            (유효하지 않은 이름을 수정하면 에러 메시지를 제거해야 한다)