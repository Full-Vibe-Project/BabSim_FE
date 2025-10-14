### **1. 사용자 스토리 (User Story)**

- **As a**: `HealthInfoForm` 컴포넌트 개발자
- **I want to**: 현재 선택된 항목 배열과 새로 클릭한 항목을 입력받아, '해당사항 없음' 규칙이 적용된 새로운 상태 배열을 반환하는 순수 함수(`updateSelection`)를 사용하고 싶습니다
- **So that**: 복잡한 상태 관리 로직을 UI 코드에서 완벽하게 분리하여, 예측 가능하고 테스트하기 쉬운 코드를 작성할 수 있습니다

### **2. 인수 조건 (Acceptance Criteria)**

> 사용자 스토리를 성공으로 판단하기 위한 비즈니스 규칙입니다. updateSelection 함수의 '계약(Contract)'을 정의합니다.
> 
- **AC-1 (체크박스 동작)**: 일반 항목(예: '당뇨병')을 클릭하면, 현재 선택 배열에 해당 항목이 추가되거나(체크), 이미 있다면 제거되어야 한다(체크 해제).
- **AC-2 (상호 배타 규칙 1)**: '해당사항 없음'이 선택된 상태에서 일반 항목을 클릭하면, **'해당사항 없음'은 반드시 선택 해제**되고 클릭된 일반 항목이 선택되어야 한다.
- **AC-3 (상호 배타 규칙 2)**: 하나 이상의 일반 항목이 선택된 상태에서 '해당사항 없음'을 클릭하면, 다른 모든 일반 항목은 **반드시 선택 해제**되고 '해당사항 없음'만 선택되어야 한다.
- **AC-4 ('해당사항 없음' 체크 해제)**: '해당사항 없음'만 선택된 상태에서 다시 '해당사항 없음'을 클릭하면, 선택이 해제되어 빈 배열이 반환되어야 한다.

### **3. 테스트 케이스 (Test Cases)**

> 인수 조건을 검증하기 위한 구체적인 테스트 시나리오입니다. (Vitest 코드의 설계도)
> 

### **[단위 테스트] `updateSelection` 함수**

- **`describe`: 일반 항목 체크/체크 해제 (Regular Item Check/Uncheck)**
    - `it('(AC-1) should check an item if it is not already selected')`
    (선택되지 않은 항목을 클릭하면, 해당 항목이 선택 배열에 추가되어야 한다)
    - `it('(AC-1) should uncheck an item if it is already selected')`
    (이미 선택된 항목을 클릭하면, 해당 항목이 선택 배열에서 제거되어야 한다)
- **`describe`: '해당사항 없음'과의 상호작용 ('Not Applicable' Interaction)**
    - `it('(AC-2) should uncheck "none" when a regular item is checked')`
    ('해당사항 없음'이 선택된 상태에서 '당뇨병'을 클릭하면, '해당사항 없음'은 해제되고 '당뇨병'이 선택되어야 한다)
    - `it('(AC-3) should uncheck all other items when "none" is checked')`
    ('당뇨병', '고혈압'이 선택된 상태에서 '해당사항 없음'을 클릭하면, 다른 모든 항목은 해제되고 '해당사항 없음'만 선택되어야 한다)
    - `it('(AC-4) should uncheck "none" if it is clicked when it is the only selected item')`
    ('해당사항 없음'만 선택된 상태에서 다시 클릭하면, 선택이 해제되어 빈 배열이 되어야 한다)