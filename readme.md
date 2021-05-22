# Food Marker

해당 프로젝트는 맛집 탐방을 좋아하는 제가 먹었던 음식점들을 기록하기 위해 진행하고 있는 프로젝트입니다. 완성도가 높아지면 배포할 예정이니 다른 분들도 이용해서 피드백을 주셨으면 좋겠습니다. (꾸벅😂)

## 1. 구현된 기능

1. 회원가입 및 로그인, 로그아웃
2. 로그인 후 메인 페이지
- 광고 Carousel
- 내가 방문한 곳들을 표시하는 지도
- 지금까지 제일 많이 등록된 음식점 표시
- 지금까지 가장 최근에 별점 5개를 받은 음식점 TOP5
3. 나의 맛집 메뉴
- 내가 등록한 맛집 메뉴들을 리스트로 표시
- 맛집 메뉴의 등록, 수정, 삭제 기능 및 지도 표시 기능
- 식당 이름, 방문 날짜 순으로 정렬 기능
4. 위시 맛집 메뉴
- 가고 싶은 맛집을 등록, 방문 표시, 삭제 기능
5. 최자로드 메뉴
- 최자 로드 시즌 별 회차 별로 정보를 리스트로 표시

## 2. 구현하거나 수정해야할 사항

- 별점, ~~방문 날짜 등에 따른 정렬 기능 보완(현재 페이지의 맛집 리스트만 정렬이 되어 있어, 전체적으로 정렬이 될 수 있도록 보완이 필요)~~
- 사진이 api로부터 빠르게 로딩될 수 있도록 개선
- 등록한 사진이 모두 동일한 크기로 보일 수 있도록(사진 비율, 나의 맛집 페이지에 나타나는 개별 등록 게시글 가운데 정렬)
- ~~favicon title에 넣기~~
- [당근마켓 웹페이지](https://www.daangn.com/)형식의 Main page
- ~~나의 맛집에 음식점 등록 시 먹은 메뉴, 식사 시간(아침, 점심, 저녁, 야식, 기타 등을 체크박스로 선택) 등을 추가로 입력할 수 있도록~~
- 나의 맛집 등록된 게시글 수정 시 UI에 바로 반영
- 사람들이 가장 가고 싶어하는 식당으로 등록된 식당 표시
- Navbar 처음에만 rendering 할 수 있도록(현재 모든 페이지에서 각자 rendering)
- 반응형으로 구현(우선 기능을 모두 구현한 뒤에)
- 내 주변 맛집 추천 및 찾기 기능
- 로그아웃 세션 유지 문제(세션 유지 기간 등)
- 오픈 그래프 추가를 통한 SEO 개선
- 나의 맛집 등록/수정 입력 창 디자인
- ~~위시 리스트 추가 시 등록 날짜 추가 및 위시 리스트에 등록 날짜 표시~~
- ~~위시 리스트 방문/삭제 버튼 드롭다운에 포함시키기~~
- 최자로드에 등장한 맛집들과 나의 맛집과의 연계 기능
- etc.
