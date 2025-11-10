## HealthInfoForm.test.tsx 테스트 실패 원인 분석

### 1차 실패 원인: PowerShell 실행 정책 제한

**에러 메시지:**
```
pnpm : ㅽ
  ㅽщ┰몃 ㅽ 쇰濡 C:\Users\SSAFY\AppData\Roaming\npm\pnpm.ps1 
  濡 듬. 
  명 댁⑹ about_Execution_Policies(https://go.microsoft.com/fwlink/?LinkID=135170)瑜 李몄
  .
FullyQualifiedErrorId : UnauthorizedAccess
```

**분석:**
초기 테스트 실행 시, PowerShell의 실행 정책으로 인해 `pnpm` 또는 `npx vitest` 명령이 스크립트를 실행할 수 없었습니다. 이는 Windows 운영체제에서 스크립트 실행을 제한하는 보안 설정 때문에 발생합니다. `UnauthorizedAccess` 에러는 스크립트 실행 권한이 없음을 명확히 나타냅니다.

**해결 방안:**
사용자에게 관리자 권한으로 PowerShell을 열고 `Set-ExecutionPolicy RemoteSigned` 또는 `Set-ExecutionPolicy Unrestricted` 명령을 실행하여 실행 정책을 변경하도록 안내했습니다. 사용자 조치 후 이 문제는 해결되었습니다.

### 2차 실패 원인: `getByRole`의 `name` 속성 문제 및 변수 스코프 오류

**에러 메시지:**
```
TestingLibraryElementError: Unable to find an accessible element with the role "fieldset" and name "알러지"
ReferenceError: nutsAllergy is not defined
```

**분석:**
1.  **`getByRole`의 `name` 속성 문제:** `screen.getByRole('fieldset', { name: '알러지' })` 호출 시, `fieldset` 요소의 접근 가능한 이름(accessible name)을 '알러지'로 찾지 못하는 문제가 발생했습니다. 이는 `Testing Library`가 비ASCII 문자(한글)를 포함하는 `name` 속성을 해석하는 방식의 문제이거나, `fieldset`의 `legend` 요소 텍스트가 정확히 일치하지 않아 발생할 수 있습니다.
2.  **변수 스코프 오류:** `(AC-2) should uncheck all other condition checkboxes when "Not Applicable" is checked` 테스트 케이스에서 `nutsAllergy` 변수가 `ReferenceError`를 발생시켰습니다. 이는 `within(allergyFieldset).getByText('견과류')`와 같이 `within` 헬퍼 함수 내부에서 변수를 선언하고, 해당 변수를 `within` 스코프 밖에서 사용하려고 시도했기 때문입니다. `within`으로 쿼리된 요소는 해당 `within` 블록 내에서만 유효합니다.

**해결 방안:**
1.  **`getByRole` 문제 해결:** `fieldset` 요소를 찾을 때 `screen.getByText('알러지').closest('fieldset') as HTMLElement;` 방식을 사용하여 `legend` 텍스트를 통해 `fieldset`를 찾고, 그 후에 `within`을 사용하여 해당 `fieldset` 내에서 버튼을 찾는 방식으로 변경했습니다. 이 방법은 접근 가능한 이름 해석의 불확실성을 줄이고, DOM 구조를 기반으로 요소를 더 견고하게 찾을 수 있도록 합니다.
2.  **변수 스코프 오류 해결:** `nutsAllergy`와 `shellfishAllergy` 변수를 `within` 블록 외부에서 선언하고, `within` 블록 내부에서 값을 할당하도록 수정하여 스코프 문제를 해결했습니다.

이러한 수정 사항을 적용한 결과, `HealthInfoForm.test.tsx`의 모든 테스트가 성공적으로 통과했습니다.
