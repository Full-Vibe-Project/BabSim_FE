# 📝 03. Output Format Rules (출력 형식 규칙)

AI는 코드, 문서, 테스트, 로그 등 모든 산출물을 **표준화된 출력 형식**으로 작성해야 한다.  
형식이 어긋나면 리뷰/CI/CD 과정에서 검증 실패로 이어질 수 있다.

---

## 📌 코드 출력
- 항상 언어 블록을 지정한다:
  - Java → ```java
  - TypeScript/React → ```tsx
  - JavaScript → ```js
  - JSON → ```json
  - SQL → ```sql
- 코드 상단에는 **간단한 설명 주석(한글)**을 추가한다:

    ```tsx
    // AI 생성: 사용자 프로필 카드 컴포넌트
    export function UserCard() { ... }
    ```

- 태그 없는 코드 영역은 수정하지 않고, PR 코멘트로 의견 제안만 가능하다.

---

## 📌 문서 출력
- Markdown 형식을 기본으로 한다.
- 제목은 `#`, `##`, `###` 수준을 사용해 계층 구조를 표현한다.
- 목록은 `-` 또는 `1.` 으로 작성한다.
- 표는 GitHub Flavored Markdown(GFM) 표준을 따른다.

---

## 📌 테스트 출력
- AI가 테스트 예시를 생성할 때는 실행 가능한 최소 단위를 제공한다.
- 프론트엔드: Jest + React Testing Library 예제
    ```tsx
    test("renders user name", () => {
      render(<UserCard name="Alice" />);
      expect(screen.getByText("Alice")).toBeInTheDocument();
    });
    ```
- 백엔드: JUnit + SpringBootTest 예제
    ```java
    @SpringBootTest
    class UserServiceTest {
        @Test
        void createUser_success() {
            User user = userService.create("Alice");
            assertThat(user.getName()).isEqualTo("Alice");
        }
    }
    ```
- 📖 파일명/작성 규칙은 기술별 conventions을 따른다:  
  - /conventions 폴더 하위 규칙 준수  
---

## 📌 API 응답 예시 출력
- API 관련 문서/예시는 항상 JSON 형식을 사용한다.
- 응답 스키마는 `BaseResponse<T>` 형식을 따른다.

    ```json
    {
      "status": 200,
      "data": { "id": 1, "name": "Alice" },
      "message": "성공",
      "timestamp": "2025-09-19T12:00:00Z",
      "traceId": "xxxx-xxxx"
    }
    ```

---

## 📌 로그/주석 출력
- 리팩토링/자동 생성 시, 반드시 근거를 남긴다.
    ```java
    // AI-Refactor: 중복 코드 제거 (Auth, Diet 모듈 공통화)
    ```
- 프롬프트 성공/실패 기록은 별도 규칙을 따른다 → [`05-logging.md`](./05-logging.md)

---

## ✅ 원칙
1. AI는 항상 **언어 블록과 주석을 포함**하여 코드를 출력한다.  
2. 문서는 Markdown 표준을 따른다.  
3. 테스트는 최소 실행 단위로 작성하되, 세부 규칙은 `conventions`를 따른다.  
4. API 예시는 JSON, 응답 스키마는 공통 규칙을 따른다.  
5. 태그 없는 코드 영역은 **수정하지 말고 PR 코멘트로 제안**만 한다.  

---
