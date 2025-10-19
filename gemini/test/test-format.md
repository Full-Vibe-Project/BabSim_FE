### **1. 사용자 스토리 (User Story)**

- **As a**: 신규 사용자
- **I want to**: 온보딩의 각 단계를 순서대로 진행하고, 내가 입력한 정보가 다음 단계로 넘어가도 유지되는 것을 확인하고 싶습니다
- **So that**: 끊김 없는 경험을 통해 온보딩을 성공적으로 완료할 수 있습니다

### **2. 인수 조건 (Acceptance Criteria)**

> 사용자 스토리를 성공으로 판단하기 위한 비즈니스 규칙입니다. 통합 테스트에서는 Onboarding 컴포넌트의 흐름 제어(Flow Control)를 검증합니다.
> 
- `AC-1`: `Onboarding` 컴포넌트는 현재 단계(step)에 맞는 폼 컴포넌트(`BasicInfoForm`, `HealthInfoForm` 등)만 화면에 보여줘야 한다.
- `AC-2`: 현재 단계의 모든 필수 필드가 유효하게 입력되지 않은 상태에서 '다음' 버튼을 클릭하면, 다음 단계로 넘어가지 않고 현재 단계에 머물러야 한다.
- `AC-3`: 현재 단계의 모든 필드가 유효할 때 '다음' 버튼을 클릭하면, 다음 단계의 폼 컴포넌트로 성공적으로 넘어가야 한다.
- `AC-4`: 다음 단계로 넘어갔다가 '이전' 버튼을 클릭하여 돌아와도, 이전에 입력했던 값들은 각 필드에 그대로 유지되어야 한다.
- `AC-5`: 마지막 단계에서 모든 정보가 유효할 때 '시작하기' 버튼을 클릭하면, **3단계에 걸쳐 입력된 모든 데이터를 종합한 단일 객체**를 인자로 하여 최종 제출 함수(`onSubmit`)를 호출해야 한다.

### **3. 테스트 케이스 (Test Cases)**

> 인수 조건을 검증하기 위한 구체적인 테스트 시나리오입니다. (Vitest + React Testing Library 코드의 설계도)
> 

### **[통합 테스트] `Onboarding` 컴포넌트**

- **`describe`: 단계별 폼 렌더링 (Step-by-Step Form Rendering)**
    - `it('(AC-1) should render the BasicInfoForm component for the initial step (step 1)')`
    (초기 단계(1단계)에서는 BasicInfoForm을 렌더링해야 한다)
    - `it('(AC-1) should render the HealthInfoForm component for the second step (step 2)')`
    (2단계에서는 HealthInfoForm을 렌더링해야 한다)
    - `it('(AC-1) should render the GoalSettingForm component for the third step (step 3)')`(3단계에서는 GoalSettingForm을 렌더링해야 한다)
- **`describe`: 단계별 네비게이션 및 유효성 검사 (Step Navigation & Validation)**
    - `it('(AC-2) should not navigate to the next step if the current step form is invalid')`
    (현재 단계 폼이 유효하지 않으면 다음 단계로 이동해서는 안 된다)
    - `it('(AC-3) should navigate from BasicInfoForm to HealthInfoForm when "Next" is clicked with valid data')`
    (유효한 데이터와 함께 '다음'을 클릭하면 BasicInfoForm에서 HealthInfoForm으로 이동해야 한다)
    - `it('(AC-4) should persist the data of BasicInfoForm when navigating back from HealthInfoForm')`
    (HealthInfoForm에서 뒤로 돌아왔을 때 BasicInfoForm의 데이터는 유지되어야 한다)
- **`describe`: 최종 데이터 제출 (Final Data Submission)**
    - `it('(AC-5) should call the final onSubmit function with all aggregated data from all steps')`
    (마지막 단계에서 '시작하기'를 클릭하면, 모든 단계의 모든 데이터를 종합하여 최종 onSubmit 함수를 호출해야 한다)
        - **Arrange**: 사용자가 3단계의 모든 폼을 유효하게 채운 상태를 시뮬레이션한다.
        - **Act**: 마지막 단계에서 '시작하기' 버튼을 클릭한다.
        - **Assert**: `onSubmit` mock 함수가 **하나의 종합된 객체**를 인자로 받아 호출되었는지 확인한다.