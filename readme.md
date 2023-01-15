# 🍗Food Marker(from 2020.08)

해당 프로젝트는 맛집에서 밥 먹는 것을 좋아해 방문 식당들을 기록하기 위해 시작한 개인 토이프로젝트입니다.

## 1. 데모 페이지

<a href="https://food-marker-yeomkyeorae.koyeb.app/" target="_blank">😄 푸드마커 방문하기</a>

## 2. 사용 기술 스택 🖐

![기술 스택](./readme-images/skill_stack.png)

## 3. ⚙️ 주요 기능

### (1) 내 주변 맛집

- 현재 좌표 기반 내 주변 맛집 조회

### (2) 나의 방문 맛집

- 내가 등록한 맛집 메뉴들을 리스트로 표시
- 맛집 메뉴의 등록, 수정, 삭제 기능 및 지도 표시 기능
- 식당 이름, 방문 날짜 순으로 정렬 기능

### (3) 나의 위시 맛집

- 가고 싶은 맛집을 등록, 방문 표시, 삭제 기능

### (4) 최자로드

- 최자로드 시즌별 정보 목록 표시

### (5) 마이페이지

- 등록한 나의 방문 및 위시 맛집의 간단한 통계
- 나의 방문 맛집 캘린더 표시

## 4. 실행 방법

### (1) 사전 조건

...

### (2) 실행 명령

<b>package 설치</b>

```bash
npm install && cd cliet-app && npm install
```

<b>api 및 client 구동</b>

```bash
npm run dev
```

<hr>

## 구현 또는 수정 예정사항(TODO 📆)

- 전체적인 UI 수정
- 클라이언트 구조 및 코드 리팩토링
  - 다른 react 프로젝트 구조 참고
  - typeScript 보다 적절히 적용
  - style 변수, type 변수 등의 코드 분리
- 기능 고도화
  - 지도 API
  - 통계 기능
- 최적화
  - lighthouse
  - 모바일 대응
