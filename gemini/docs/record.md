작업 한줄 요약 : GoalSettingForm.tsx 파일의 타입 에러 재수정
상세 변경 내용(5줄 내외) : 
- GoalSettingForm.tsx 파일에서 `FieldError` 객체가 `ReactNode`에 할당될 수 없는 타입 에러가 계속 발생하여, 에러 메시지 렌더링 로직을 수정했습니다.
- 기존의 `&&` 연산자를 사용한 조건부 렌더링 방식에서, 삼항 연산자를 사용하여 `errors.fieldName?.message`가 있을 경우에만 `<p>` 태그를 렌더링하도록 변경했습니다.
- 이 방법은 `FieldError` 객체가 JSX에 직접 렌더링될 가능성을 원천적으로 차단하여 타입 에러를 해결합니다.