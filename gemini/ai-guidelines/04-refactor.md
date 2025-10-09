# 🔧 04. Refactor & Optimization Rules (리팩토링/최적화 규칙)

AI는 기존 코드를 리팩토링할 때 **안전성, 가독성, 성능**을 고려해야 한다.  
불필요한 변경은 피하고, 반드시 목적이 명확한 리팩토링만 수행한다.

---

## 📌 리팩토링 원칙
- **동작은 동일하게 유지**하면서 코드 구조/가독성/재사용성을 개선한다.  
- **불필요한 코드 삭제**: 사용되지 않는 import, 변수, 함수 제거.  
- **중복 코드 통합**: 동일 로직은 함수화 또는 공통 유틸로 추출.  
- **명확한 네이밍**: 변수/함수/클래스 이름을 더 이해하기 쉽게 변경.  
- **한글 주석 추가**: 변경 이유, 리팩토링 포인트를 반드시 기록.  
- 📖 세부 지침은 기술별 conventions 참고:
  - Next.js → [`conventions/02-frontend/`](../conventions/02-frontend/)  
  - Spring Boot → [`conventions/02-backend/`](../conventions/02-backend/)  

---

## 📌 성능 최적화 지침
- 불필요한 반복문 제거, O(N²) → O(N) 수준 개선 가능 시 제안.  
- DB 쿼리는 N+1 방지, 인덱스 활용 여부 확인.  
- API 요청은 캐싱/배치 처리 가능 여부 확인.  
- Next.js → 불필요한 리렌더링 방지 (memo, useCallback, useMemo 활용).  
- Spring → 불필요한 트랜잭션, eager fetch 최소화.  

---

## 📌 금지되는 리팩토링
- `AI:DO-NOT-TOUCH` 태그가 붙은 코드 변경.  
- 태그가 없는 영역의 무단 수정 (반드시 리뷰어 허용 필요).  
- `EDIT-ALLOWED`, `CHANGE-ZONE` 외 영역 수정.  
- 코드 스타일/포맷팅만을 위한 불필요한 대량 수정.  
- 동작 방식이 변할 수 있는 위험한 최적화.  

---

## 📌 리팩토링 출력 형식
- 변경된 부분 위에는 반드시 주석을 추가한다:
    ```java
    // AI-Refactor: 중복 코드 제거 (Auth, Diet 모듈 공통화)
    ```
- 변경 목적과 효과를 **한 줄 요약 주석(한글)**으로 작성한다.  
- 대규모 리팩토링은 반드시 기록 문서에 남긴다:
  - 작업 요약 → [`docs/record.md`](../docs/record.md)  
  - 프롬프트 맥락 → [`docs/PROMPTLOG.md`](../docs/PROMPTLOG.md)  
  - 회고 분석 → [`docs/retrospectives/`](../docs/retrospectives/)** 

---

## ✅ 원칙
1. 리팩토링은 **안전성 > 가독성 > 성능** 순으로 우선순위를 둔다.  
2. 변경 목적은 항상 **한글 주석**으로 명시한다.  
3. `DO-NOT-TOUCH` 존중, `EDIT-ALLOWED`/`CHANGE-ZONE`만 수정 가능하다.  
4. 동작 변경이 필요한 경우, 반드시 리뷰어에게 허용 여부를 확인한다.  

---
