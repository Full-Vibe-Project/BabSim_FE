# 프론트엔드 디렉토리 구조 (FSD 기반)

## 1. 목표

이 문서는 **기능 분할 설계(Feature-Sliced Design, FSD)** 방법론을 기반으로, 우리 프로젝트의 디렉토리 구조를 정의합니다. 이 구조의 목표는 다음과 같습니다.

-   **확장성**: 새로운 기능이 추가되어도 전체 구조가 흔들리지 않도록 합니다.
-   **유지보수성**: 코드의 역할과 책임이 명확히 분리되어, 특정 부분을 수정하거나 제거하기 쉽습니다.
-   **재사용성**: 공용 코드를 효율적으로 관리하여 중복을 최소화합니다.
-   **명확성**: 팀원 누구나 코드의 위치를 예측하고 쉽게 찾을 수 있도록, 잘 정리된 지침을 제공합니다.

---

## 2. 핵심 원칙: 계층 구조 (Layered Architecture)

FSD의 핵심은 엄격한 계층 구조입니다. 각 계층은 자신보다 **하위 계층의 코드만** 가져와 사용할 수 있습니다.

```

┌────────────────┐
│      app       │  (최상위 계층, Next.js 라우팅)
└────────────────┘
↑ (사용)
┌────────────────┐
│     widgets    │  (UI 블록, 예: Header, PostFeed)
└────────────────┘
↑
┌────────────────┐
│    features    │  (기능 단위, 예: 로그인, 좋아요 버튼)
└────────────────┘
↑
┌────────────────┐
│     entities   │  (핵심 데이터, 예: User, PostCard)
└────────────────┘
↑
┌────────────────┐
│      shared    │  (최하위 계층, 공용 코드, 예: Button)
└────────────────┘

````

**절대 규칙**: 상위 계층은 하위 계층을 의존할 수 있지만, 하위 계층이 상위 계층을 의존해서는 안 됩니다. (예: `features`는 `widgets`를 `import` 할 수 없습니다.)

---

## 3. 전체 폴더 구조

프로젝트의 `src` 폴더는 아래와 같은 5개의 핵심 계층으로 구성됩니다.

```bash
src/
├── app/          # └── Layer: App, Pages (라우팅, 전역 설정)
├── widgets/      # └── Layer: Widgets (조립된 UI 블록)
├── features/     # └── Layer: Features (사용자 상호작용 기능)
├── entities/     # └── Layer: Entities (비즈니스 핵심 데이터 모델)
└── shared/       # └── Layer: Shared (모든 곳에서 사용되는 공용 코드)
````

-----

## 4\. 계층별 상세 설명 및 예시

"게시물 피드" 예제를 통해 각 계층의 역할을 구체적으로 알아봅니다.

### **`shared/`** 🔩 (최하위 계층)

  - **역할**: 특정 비즈니스 로직에 의존하지 않는, 프로젝트 전반에서 사용되는 공용 코드를 관리합니다.
  - **규칙**: 어떤 다른 계층도 `import` 할 수 없습니다. 완전히 독립적이어야 합니다.
  - **예시**:
      - `shared/ui/Button.tsx`: 프로젝트 전반에서 사용될 기본적인 버튼 컴포넌트.
      - `shared/ui/Card.tsx`: 컨텐츠를 감싸는 카드 레이아웃 컴포넌트.
      - `shared/lib/utils.ts`: `cn`과 같은 순수 유틸리티 함수.

### **`entities/`** 👤

  - **역할**: 비즈니스의 핵심 데이터(도메인 모델)와 관련된 코드를 관리합니다.
  - **규칙**: 오직 `shared` 계층만 가져와 사용할 수 있습니다.
  - **예시 (`post` 슬라이스)**:
      - `entities/post/ui/PostCard.tsx`: 게시물의 제목, 내용 등 단순 정보를 표시하는 컴포넌트. 내부적으로 `shared/ui/Card`를 사용합니다.
      - `entities/post/model/types.ts`: `Post` 데이터의 TypeScript 타입을 정의합니다.
      - `entities/post/api/usePostQuery.ts`: 게시물 데이터를 가져오는 React Query 훅.

### **`features/`** 🧩

  - **역할**: 사용자의 상호작용을 처리하는 기능 단위입니다. 비즈니스 가치를 직접적으로 전달합니다.
  - **규칙**: `entities`, `shared` 계층을 가져와 사용할 수 있습니다. 상태를 가지는 클라이언트 컴포넌트(`'use client'`)가 주로 위치합니다.
  - **예시 (`toggle-like` 슬라이스)**:
      - `features/toggle-like/ui/LikeButton.tsx`: '좋아요' 상태(`useState`)를 관리하고 클릭 이벤트를 처리하는 버튼. 내부적으로 `shared/ui/Button`을 사용합니다.

### **`widgets/`** 🧱

  - **역할**: 여러 `features`와 `entities`를 조합하여 만드는 독립적인 UI 블록입니다.
  - **규칙**: `features`, `entities`, `shared` 계층을 가져와 사용할 수 있습니다.
  - **예시 (`post-feed` 슬라이스)**:
      - `widgets/post-feed/ui/PostFeed.tsx`: 여러 개의 `entities/post/ui/PostCard`와 `features/toggle-like/ui/LikeButton`을 조합하여 하나의 완전한 게시물 목록 UI를 렌더링합니다.

### **`app/`** (최상위 계층)

  - **역할**: Next.js의 App Router를 이용한 라우팅과 전역 설정을 담당합니다. FSD의 `app`과 `pages` 계층 역할을 합니다.
  - **규칙**: 하위 계층의 컴포넌트들을 조합하여 최종 페이지를 완성합니다. 비동기 데이터 fetching 등 페이지 진입에 필요한 로직을 처리합니다.
  - **예시**:
      - `app/page.tsx`: 서버 컴포넌트로서 비동기(async)로 게시물 데이터를 가져온 후, `widgets/post-feed/ui/PostFeed` 위젯에 데이터를 전달하여 최종 페이지를 구성합니다.
      - `app/layout.tsx`: 전역 레이아웃, 폰트, Provider 등을 설정합니다.

-----

## 5\. 규칙 강제 및 추가 원칙

### **Public API (`index.ts`)**

  - 각 슬라이스(`widgets`, `features`, `entities`의 각 폴더)는 반드시 `index.ts` 파일을 통해 외부로 노출할 코드(Public API)를 명시적으로 `export` 해야 합니다.
  - 이를 통해 다른 모듈에서는 `entities/post/ui/PostCard.tsx`와 같이 깊숙이 `import`하는 것을 방지하고, 오직 `import { PostCard } from '@/entities/post'` 와 같이 `index.ts`를 통해서만 모듈을 사용하도록 강제합니다.

### **단방향 의존성 자동 검사**

  - **`eslint-plugin-boundaries`** 라이브러리를 사용하여 FSD의 단방향 의존성 규칙을 자동으로 검사합니다.
  - `.eslintrc.js`에 규칙을 설정하여, 하위 계층이 상위 계층을 `import`하려 할 경우 ESLint 에러를 발생시켜 잘못된 아키텍처를 사전에 방지합니다.