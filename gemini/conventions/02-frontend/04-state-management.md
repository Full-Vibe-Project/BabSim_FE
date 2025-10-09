# 프론트엔드 상태 관리 컨벤션

## 1. 목표

-   **명확성**: 어떤 데이터가 어떤 도구로 관리되어야 하는지 명확한 기준을 제시합니다.
-   **단순함**: 복잡한 상태 로직을 예측 가능하고 단순하게 유지합니다.
-   **성능**: 각 상태의 특성에 맞는 최적의 도구를 사용하여 애플리케이션 성능을 보장합니다.

---

## 2. 핵심 철학: 서버 상태와 클라이언트 상태의 분리

우리 프로젝트의 모든 상태 관리는 아래의 핵심 원칙에서 출발합니다.



-   **서버 상태 (Server State)**: 서버 DB에 저장된 데이터. API를 통해 비동기적으로 가져오며, 우리는 소유자가 아닌 사용자입니다.
    -   **담당 도구**: **`@tanstack/react-query`**

-   **클라이언트 상태 (Client State)**: UI와 직접 관련된 브라우저 내의 데이터. 애플리케이션이 직접 소유하고 동기적으로 제어합니다.
    -   **담당 도구**: **`Zustand`**

> **절대 원칙**: 서버에서 받아온 데이터는 절대 Zustand 스토어에 직접 저장하지 않습니다. `React Query`의 캐시를 유일한 단일 진실 공급원(Single Source of Truth)으로 사용합니다.

---

## 3. 서버 상태 관리: React Query 패턴

### **3.1. 쿼리 키 팩토리 (Query Key Factory)**

-   **목적**: 쿼리 키의 오타를 방지하고, 타입 안정성을 확보하며, 관련된 여러 쿼리를 한 번에 관리하기 위함입니다.
-   **규칙**: 모든 쿼리 키는 FSD의 `entities` 또는 `features` 슬라이스 내부에 `*.keys.ts` 파일을 만들어 중앙에서 관리합니다.

    ```typescript
    // 예시: @/entities/user/api/user.keys.ts
    export const userKeys = {
      all: ['users'] as const,
      details: () => [...userKeys.all, 'detail'] as const,
      detail: (id: number) => [...userKeys.details(), id] as const,
    };
    ```

### **3.2. 커스텀 훅 (Custom Hooks)**

-   **목적**: `useQuery`와 `useMutation`의 구현을 숨기고, 재사용성을 높이며, 비즈니스 로직에 집중하기 위함입니다.
-   **규칙**: 모든 `useQuery`와 `useMutation`은 반드시 커스텀 훅으로 감싸서 사용합니다.

    ```typescript
    // 예시: @/entities/user/api/useGetUser.ts
    import { useQuery } from '@tanstack/react-query';
    import { userKeys } from './user.keys';
    import { getUserById } from './api';

    export const useGetUser = (userId: number) => {
      return useQuery({
        queryKey: userKeys.detail(userId),
        queryFn: () => getUserById(userId),
        enabled: !!userId, // userId가 있을 때만 쿼리 실행
      });
    };
    ```

---

## 4. 클라이언트 상태 관리: Zustand 패턴

### **4.1. 슬라이스 패턴 (Slice Pattern)**

-   **목적**: 하나의 거대한 스토어 파일을 방지하고, 도메인별로 상태와 액션을 분리하여 코드의 응집도를 높이기 위함입니다.
-   **규칙**: 전역 상태는 `@/shared/store/slices/` 폴더 아래에 기능별로 `*Slice.ts` 파일을 만들어 정의한 후, `@/shared/store/index.ts`에서 조합하여 사용합니다.

    ```typescript
    // 예시: @/shared/store/slices/themeSlice.ts
    export const createThemeSlice = (set) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
    });

    // 예시: @/shared/store/index.ts
    import { create } from 'zustand';
    import { createThemeSlice } from './slices/themeSlice';

    export const useAppStore = create((...a) => ({
      ...createThemeSlice(...a),
      // ... 다른 슬라이스들을 여기에 추가
    }));
    ```

### **4.2. Immer 미들웨어 사용**

-   **목적**: 복잡한 객체나 배열 상태를 불변성을 유지하며 업데이트할 때, `...` 전개 구문의 복잡성을 줄이고 코드 가독성을 높이기 위함입니다.
-   **규칙**: 복잡한 객체 구조를 가진 상태를 업데이트할 때는 **Immer 미들웨어 사용을 강력히 권장**합니다.

    ```typescript
    // 예시: Immer를 사용한 상태 업데이트
    import { immer } from 'zustand/middleware/immer';

    const useStore = create(immer((set) => ({
      user: { profile: { name: 'John' } },
      
      // 불변성을 신경 쓰지 않고, 객체를 직접 수정하는 것처럼 코드를 작성
      updateName: (newName) => {
        set((state) => {
          state.user.profile.name = newName;
        });
      },
    })));
    ```

---

## 5. 언제 무엇을 써야 할까? (Quick Guide)

| 상황 (Scenario) | 사용 도구 | 이유 |
| :--- | :--- | :--- |
| **API**에서 게시물 목록 가져오기 | **React Query** | 서버에 소유권이 있고, 캐싱/재요청이 필요한 서버 상태 |
| 다크/라이트 **테마 모드** 관리 | **Zustand** | UI와 직접 관련된 순수한 클라이언트 상태 |
| **로그인 여부** 상태 관리 | **Zustand** (+ React Query) | 로그인 상태 자체(`isLoggedIn`)는 클라이언트 상태, 사용자 정보(`user`)는 React Query로 관리 |
| 열려있는 **모달창** 상태 | **컴포넌트 로컬 상태 (`useState`)** | 전역적으로 공유될 필요가 없는, 해당 컴포넌트에 종속된 상태 |
| **폼(Form) 입력값** 관리 | **React Hook Form** | 폼 상태 관리에 최적화된 라이브러리 (전역 상태 X) |