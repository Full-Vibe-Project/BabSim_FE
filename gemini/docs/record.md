작업 한줄 요약 : TDD 방식으로 프로필 입력 폼의 유효성 검사 함수에 대한 단위 테스트를 작성하고, 테스트를 통과하는 로직을 구현했습니다.
상세 변경 내용(5줄 내외) : 
- `gemini/test/test-format.md`의 명세를 기반으로 `validators.test.ts` 파일에 단위 테스트 코드를 작성했습니다.
- `validateName`, `validateBirthdate`, `validateHeight`, `validateWeight` 함수에 대한 테스트 케이스를 포함했습니다.
- `vitest`를 사용하여 테스트를 실행하고, 모든 테스트가 실패하는 것을 확인했습니다. (Red)
- `validators.ts` 파일에 각 함수의 유효성 검사 로직을 구현했습니다.
- 다시 `vitest`를 실행하여 모든 단위 테스트가 통과하는 것을 확인했습니다. (Green)