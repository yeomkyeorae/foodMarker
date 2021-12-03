# 🍗Food Marker

해당 프로젝트는 맛집 탐방을 좋아해 방문한 식당들을 기록하기 위해 시작하였습니다. 

<a href="https://food-marker.herokuapp.com/" target="_blank">😄푸드마커 방문하기</a>

## 1. 사용 기술 스택
![사용 기술 스택](./skill_stack.png)

## 2. 구현된 기능

1. 회원가입 및 로그인, 로그아웃
2. 로그인 후 메인 페이지
- 내가 방문한 곳들을 표시하는 지도
- 최근에 등록된 위시 맛집들

3. 나의 맛집 메뉴

- 내가 등록한 맛집 메뉴들을 리스트로 표시
- 맛집 메뉴의 등록, 수정, 삭제 기능 및 지도 표시 기능
- 식당 이름, 방문 날짜 순으로 정렬 기능

4. 위시 맛집 메뉴

- 가고 싶은 맛집을 등록, 방문 표시, 삭제 기능

5. 최자로드 메뉴

- 최자 로드 시즌 별 회차 별로 정보를 리스트로 표시

## 3. 구현하거나 수정해야할 사항
### Navbar
- 나의 맛집 등록 이외에도 단순 식당 검색 기능(navbar 등에)
- Navbar 처음에만 rendering 할 수 있도록(현재 모든 페이지에서 각자 rendering)

### 현재 주변 맛집 페이지
- 현재 주변 맛집 페이지 들어갔을 경우 현재 위치 허용하지 않을 때 보여줄 대체 페이지
- 현재 주변 맛집 페이지 들어갔을 경우 현재 위치 허용한 상태인 경우 loading 이미지 중간에 보여주기

### 나의 맛집 페이지
- 나의 맛집 카테고리 기능(한식, 양식, 일식 등 또는 가성비, 혼밥 등)
- 나의 맛집 등록된 게시글 수정 시 UI에 바로 반영
- 복수 개의 이미지를 포함한 나의 맛집 등록
- 등록 및 수정 시 미 입력 input 구분에 따른 등록 및 수정 제한

### 위시 맛집 페이지
- 복수 개의 이미지를 포함한 나의 위시 등록

### 최자로드 페이지

### 마이 페이지
- 활동에 관한 통계 관련 기능

### UI/UX
- 반응형으로 구현(우선 기능을 모두 구현한 뒤에)

### 기타
- 서버에 저장된 사진을 클라이언트에서 쉽게 접근할 수 있도록 proxy 설정(?)
- 등록한 사진이 모두 동일한 크기로 보일 수 있도록(사진 비율, 나의 맛집 페이지에 나타나는 개별 등록 게시글 가운데 정렬)
- 페이지 이동 시 세션 유지(현재는 30분 지나면 세션 사라짐)
- 오픈 그래프 추가를 통한 SEO 개선

## 4. 완료 사항
- 별점, 방문 날짜 등에 따른 정렬 기능 보완(현재 페이지의 맛집 리스트만 정렬이 되어 있어, 전체적으로 정렬이 될 수 있도록 보완이 필요)
- 사진이 api로부터 빠르게 로딩될 수 있도록 개선
- favicon title에 넣기
- [당근마켓 웹페이지](https://www.daangn.com/) 형식의 Main page
- 나의 맛집에 음식점 등록 시 먹은 메뉴, 식사 시간(아침, 점심, 저녁, 야식, 기타 등을 체크박스로 선택) 등을 추가로 입력할 수 있도록
- 로그아웃 세션 유지 문제(세션 유지 기간 등)
- 나의 맛집 등록/수정 입력 창 디자인
- 위시 리스트 추가 시 등록 날짜 추가 및 위시 리스트에 등록 날짜 표시
- 위시 리스트 방문/삭제 버튼 드롭다운에 포함시키기
- 메인페이지에 계정에 상관없이 최근 등록된 나의 맛집과 위시리스트를 리스트로 표시하기
- 최자로드 페이지 아이템 hover시 해당 회차에 등장한 식당을 tooltip으로 표시 및 tooltip 표시된 식당 클릭 시 새로 생성된 브라우저 tab에서 곧장 naver로 검색
- 내 주변 맛집 추천 및 찾기 기능
- 등록한 나의 맛집 삭제 시 서버에 저장된 이미지 삭제
- 최자로드에 등장한 맛집들과 나의 맛집과의 연계 기능 혹은 단순 클릭(배경색 변경)으로 사용자가 방문했음을 표시(DB 저장)
