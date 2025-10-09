# 프론트엔드 네이밍 컨벤션 (Naming Convention)

## 1. 목표

-   **가독성**: 이름만으로 코드의 역할과 의도를 명확하게 파악할 수 있도록 합니다.
-   **예측성**: 팀원 누구나 일관된 규칙에 따라 이름 짓고, 변수나 파일의 위치를 쉽게 예측할 수 있습니다.
-   **검색 용이성**: 일관된 규칙은 프로젝트 내에서 특정 코드를 검색하는 효율을 높여줍니다.

---

## 2. 기본 원칙 (General Principles)

모든 이름은 아래의 기본 원칙을 따릅니다.

-   **영문 사용**: 모든 이름은 영문으로 작성합니다.
-   **의미 있는 이름**: 변수나 함수의 역할을 명확히 설명하는 이름을 사용합니다. (축약어 지양)
    -   `Good`: `userProfile`, `calculateTotalPrice`
    -   `Bad`: `uProf`, `calc`
-   **카멜케이스(camelCase)를 기본으로**: 특정 규칙이 없는 한, `camelCase`를 기본으로 사용합니다.

---

## 3. 파일 (Files)

파일의 역할에 따라 명확하게 구분하여 작성합니다.

| 구분 | 규칙 | 예시 |
| :--- | :--- | :--- |
| **React 컴포넌트** | **`PascalCase.tsx`** | `UserProfile.tsx`, `Button.tsx` |
| **컴포넌트 외 파일** | **`kebab-case.ts`** | `use-auth-store.ts`, `api-client.ts` |
| **테스트 파일** | `*.test.tsx` 또는 `*.spec.tsx` | `UserProfile.test.tsx` |

---

## 4. 변수 및 함수 (Variables & Functions)

### **4.1. 변수 (Variables)**

| 구분 | 규칙 | 예시 |
| :--- | :--- | :--- |
| **일반 변수** | **`camelCase`** | `userName`, `totalPrice` |
| **Boolean** | `is`, `has`, `should` 접두사 | `isLoading`, `hasError`, `shouldRedirect` |
| **상수 (동적)** | **`camelCase`** | `const maxUsers = getMaxUsers();` |
| **상수 (고정값)** | **`UPPER_SNAKE_CASE`** | `const MAX_RETRIES = 3;` |

### **4.2. 함수 (Functions)**

| 구분 | 규칙 | 예시 |
| :--- | :--- | :--- |
| **일반 함수** | **`camelCase`** | `calculateTotal()`, `getUserProfile()` |
| **이벤트 핸들러** | `handle` 또는 `on` 접두사 | `handleClick()`, `onSubmit()` |

---

## 5. 컴포넌트 및 Hooks (Components & Hooks)

| 구분 | 규칙 | 예시 |
| :--- | :--- | :--- |
| **React 컴포넌트** | **`PascalCase`** | `<UserProfile />`, `<PrimaryButton />` |
| **커스텀 훅** | `use` + `camelCase` | `useAuth()`, `useFormInput()` |

---

## 6. 타입 (Types & Interfaces)

| 구분 | 규칙 | 예시 |
| :--- | :--- | :--- |
| **Type, Interface** | **`PascalCase`** | `type User`, `interface Product` |
| **Enum** | **`PascalCase`** | `enum OrderStatus { Delivered, ... }` |
| **Props 타입** | 컴포넌트명 + `Props` | `type UserProfileProps = { ... };` |

**중요**: `IUser`와 같이 인터페이스에 `I` 접두사를 붙이지 않습니다.

---

## 7. 종합 요약표 (Quick Reference)

| 구분 | 규칙 | 예시 |
| :--- | :--- | :--- |
| **파일 (컴포넌트)** | `PascalCase.tsx` | `Modal.tsx` |
| **파일 (일반)** | `kebab-case.ts` | `format-date.ts` |
| **변수 / 함수** | `camelCase` | `item`, `getItems()` |
| **Boolean 변수** | `is` / `has` 접두사 | `isValid`, `hasItems` |
| **컴포넌트 / 타입** | `PascalCase` | `<Modal />`, `type User` |
| **Props 타입** | `*Props` 접미사 | `type ModalProps` |
| **커스텀 훅** | `use*` 접두사 | `useModal()` |
| **상수 (고정값)** | `UPPER_SNAKE_CASE` | `const API_URL = '...'` |