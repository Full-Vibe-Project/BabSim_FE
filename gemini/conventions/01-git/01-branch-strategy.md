## 0. 목적

- 브랜치명만 보고 **작업 목적과 범위**를 파악할 수 있게 한다.
- **Jira 이슈와 연결**하여 추적성을 높인다.
- **자동화/CI/CD**에서 쉽게 검증·관리할 수 있도록 규칙화한다.

## 1. 기본 규칙

브랜치 이름은 다음 형식을 따른다:

```
<prefix>/<JIRA-KEY>-<short-description>
```

- **prefix**: 작업 유형
- **JIRA-KEY**: 예) `PRJ-123`
- **short-description**: 소문자, 하이픈(-) 구분, 3~5 단어
    
    예시:
    
    - `feat/PRJ-310-meal-recommender`
    - `bugfix/PRJ-455-form-validation`
    - `hotfix/PRJ-999-crash-on-start`
    - `docs/PRJ-150-update-api-spec`

## 2. Prefix 정의

| prefix | 사용 상황 |
| --- | --- |
| `feat` | 신규 기능 개발 |
| `bugfix` | 일반 버그 수정 |
| `hotfix` | 프로덕션 긴급 수정 |
| `refactor` | 리팩토링 (기능 변화 없음) |
| `docs` | 문서/주석 수정 |
| `chore` | 빌드/의존성/환경 설정 |
| `release` | 릴리스 후보 안정화 |

---

## 3. 브랜치 흐름

### 상시 브랜치

- **main** → 프로덕션 기준, 항상 배포 가능한 상태
- **dev** → 모든 개발 작업이 모이는 통합 브랜치

### 일시 브랜치

- **release/* :** `dev`에서 분기 → QA/버그 수정/문서 업데이트
    - 완료 시 `main`으로 병합 + 태깅(`vX.Y.Z`)
    - 변경 사항은 **dev에도 백머지**
- **feat/*** → Jira 티켓 단위 신규 기능
- **bugfix/*** → Jira 티켓 단위 일반 버그
- **hotfix/*** → `main`에서 바로 분기해 긴급 수정, `main`과 `dev` 양쪽에 반영

## 4. 머지 전략

- **feat/bugfix → dev**
    - PR로 병합 : Squash merge 권장 (히스토리 단순화)
- *release/ → main*
    - Merge commit 사용 (릴리스 히스토리 보존)
    - 병합 후 태그(`vX.Y.Z`) 생성
    - 동일 변경 사항을 dev에도 반영
- *hotfix/ → main (+ dev)*
    - 빠른 병합 후 태깅
    - 동일 변경 사항을 dev에도 반영

## 5. 보호 브랜치 설정

- **Protected branches**
    - `main`
    - `dev`
    - `release/*` (패턴 보호)
- **규칙 예시**
    - 직접 푸시 금지 (PR 필수)
    - 리뷰 최소 1–2명 승인 필요
    - CI 파이프라인 통과 필수
    - 머지 후 작업 브랜치는 자동 삭제

## 6. 자동화 & 태깅

- **CI 파이프라인**
    - feat/bugfix: lint + unit test
    - dev: lint + unit + integration test
    - release/*, main: full test + e2e + build + 배포
- **태깅 규칙**
    - `main` 병합 시 `vX.Y.Z` 형식으로 태그 생성
    - 예: `v1.3.0`