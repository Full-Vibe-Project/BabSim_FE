### **1. 사용자 스토리 (User Story)**

- **As a**: 신규 사용자
- **I want to**: 나의 기저질환과 식품 알레르기를 쉽고 명확하게 선택하고 싶습니다
- **So that**: 내 건강 상태에 대한 정확한 정보를 제공하여 다음 단계로 넘어갈 수 있습니다

### **2. 인수 조건 (Acceptance Criteria)**

> 사용자 스토리를 성공으로 판단하기 위한 비즈니스 규칙입니다. 통합 테스트에서는 컴포넌트의 UI 동작과 상태 변화를 검증합니다.
> 
- `AC-1`: 사용자는 여러 개의 기저질환(또는 알레르기) 항목을 동시에 선택할 수 있다.
- `AC-2`: '해당사항 없음' 체크박스는 다른 일반 항목들과 상호 배타적으로 동작해야 한다. 즉, '해당사항 없음'이 체크되면 다른 모든 항목은 체크 해제되어야 하며, 다른 항목이 체크되면 '해당사항 없음'은 체크 해제되어야 한다.
- `AC-3`: 이 페이지의 모든 입력은 선택사항이므로, 아무것도 선택하지 않은 초기 상태에서도 '다음' 버튼은 항상 활성화 상태여야 한다.

### **3. 테스트 케이스 (Test Cases)**

> 인수 조건을 검증하기 위한 구체적인 테스트 시나리오입니다. (Vitest + React Testing Library 코드의 설계도)
> 

### **[통합 테스트] `HealthInfoForm` 컴포넌트**

- **`describe`: 다중 선택 기능 (Multiple Selections)**
    - `it('(AC-1) should allow checking multiple condition checkboxes simultaneously')`
    (여러 개의 질환 체크박스를 동시에 선택(체크)할 수 있어야 한다)
        - **Act**: '당뇨병' 체크박스를 클릭한다.
        - **Act**: '고혈압' 체크박스를 클릭한다.
        - **Assert**: '당뇨병'과 '고혈압' 체크박스가 모두 체크된 상태인지 확인한다.
- **`describe`: '해당사항 없음' 상호작용 ('Not Applicable' Interaction)**
    - `it('(AC-2) should uncheck all other condition checkboxes when "Not Applicable" is checked')`
    (다른 질환들이 체크된 상태에서 '해당사항 없음'을 체크하면, 다른 모든 질환 체크박스가 해제되어야 한다)
        - **Arrange**: '당뇨병', '고혈압'이 체크된 상태로 시작한다.
        - **Act**: '해당사항 없음' 체크박스를 클릭한다.
        - **Assert**: '당뇨병'과 '고혈압' 체크박스가 모두 체크 해제되었는지 확인한다.
        - **Assert**: '해당사항 없음' 체크박스는 체크된 상태인지 확인한다.
    - `it('(AC-2) should uncheck the "Not Applicable" checkbox when any other condition is checked')`
    ('해당사항 없음'이 체크된 상태에서 다른 질환을 체크하면, '해당사항 없음' 체크박스가 해제되어야 한다)
        - **Arrange**: '해당사항 없음'이 체크된 상태로 시작한다.
        - **Act**: '당뇨병' 체크박스를 클릭한다.
        - **Assert**: '해당사항 없음' 체크박스가 체크 해제되었는지 확인한다.
        - **Assert**: '당뇨병' 체크박스는 체크된 상태인지 확인한다.
- **`describe`: 네비게이션 버튼 상태 (Navigation Button State)**
    - `it('(AC-3) should render the "Next" button as enabled by default')`
    (기본적으로 '다음' 버튼은 활성화된 상태로 렌더링되어야 한다)
        - **Assert**: '다음' 버튼이 `disabled` 속성을 가지고 있지 않은지 확인한다.