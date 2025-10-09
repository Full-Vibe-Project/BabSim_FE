## chore(template): BS-14 add husky and commitlint for commit convention

### 🎯 PR 타입

- [x] **Chore**: 기타 잡무

### 📌 관련 이슈

- **Related Issue**: [BS-14](https://your-jira-url.com/browse/BS-14)

### 📝 개요

- **작업 배경 (Why)**: 팀의 커밋 컨벤션을 통일하여 Git 히스토리의 가독성을 높이고, 이를 기반으로 자동화된 변경 로그 생성을 준비하기 위해 husky와 commitlint를 도입합니다.
- **핵심 변경 사항 (What)**: husky를 설치하여 commit-msg 훅을 설정하고, `gemini/conventions/01-git/02-commit-message.md`에 정의된 규칙에 따라 commitlint를 구성했습니다.

### ✅ 작업 상세 내용

- [x] husky 및 commitlint 관련 패키지 설치
- [x] `.husky/commit-msg` 훅 설정
- [x] `commitlint.config.js` 파일 생성 및 규칙 정의
- [x] Next.js 프로젝트 초기화
- [x] `GEMINI.md` 및 `record.md` 문서 업데이트

### 📸 결과 및 테스트 방법

- **실행 결과**:
  <!-- (UI 변경 사항이 없으므로 스크린샷은 생략합니다.) -->

- **테스트 방법**:
  1. 로컬에서 임의의 파일을 수정한 후, 커밋 컨벤션에 맞지 않는 메시지로 커밋을 시도합니다. (예: `git commit -m "test"`)
  2. 커밋이 실패하는지 확인합니다.
  3. 컨벤션에 맞는 메시지로 다시 커밋을 시도합니다. (예: `git commit -m "feat: add new feature"`)
  4. 커밋이 성공하는지 확인합니다.

### 🔎 리뷰어 집중 포인트

- `commitlint.config.js`에 정의된 규칙이 팀 컨벤션과 일치하는지 확인 부탁드립니다.
- `.husky/commit-msg` 훅이 정상적으로 동작하는지 확인 부탁드립니다.

### ⚠️ 위험 요소 및 고려사항

- **롤백 계획**: 이 PR을 Revert하고 `main` 브랜치를 재배포합니다.
- **의존성 변경**: `husky`, `@commitlint/cli`, `@commitlint/config-conventional` 등 다수의 개발 의존성이 추가되었습니다. `package.json`을 참고해주세요.

### 🤖 AI 참고사항 (for AI)

- **Scope**: `.husky/`, `commitlint.config.js`, `package.json`
- **Logic**: `commitlint.config.js`의 rules
- **Prompt**: "`commitlint.config.js`의 규칙을 JIRA 티켓 번호(BS-14)를 필수로 포함하도록 수정해줘."