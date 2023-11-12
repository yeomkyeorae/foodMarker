export const NavMenuType = {
  Main: 0,
  CurrentLocation: 1,
  Marker: 2,
  Wish: 3,
  Choizaroad: 4,
  Myinfo: 5,
};

export const ItemPerPage = 4;

export const EatingTimeType = {
  1: '아침',
  2: '점심',
  3: '저녁',
  4: '기타',
};

export const RestaurantItemModalMenu = {
  Image: 0,
  Modify: 1,
  Map: 2,
  Delete: 3,
};

export const InputImageLimit = 5;

export const WishListOrder = {
  NameAsc: 1,
  NameDesc: 2,
  enrollAsc: 3,
  enrollDesc: 4,
};

export const LocationCode = {
  All: 0,
  Gangwon: 1,
  Gyeonggi: 2,
  Seoul: 3,
  Incheon: 4,
  Chungnam: 5,
  Chungbuk: 6,
  Daejeon: 7,
  Sejong: 8,
  Gyeongbuk: 9,
  Gyeongnam: 10,
  Daegu: 11,
  Ulsan: 12,
  Busan: 13,
  Jeonbuk: 14,
  Jeonnam: 15,
  Gwangju: 16,
  Jeju: 17,
};

export const LocationCodeInfo = {
  0: { locationName: '전국', latitude: 36.1746815, longitude: 127.7830354, mapLevel: 13 },
  1: { locationName: '강원', latitude: 37.7735143, longitude: 128.3740678, mapLevel: 11 },
  2: { locationName: '경기', latitude: 37.4020056, longitude: 127.1083617, mapLevel: 11 },
  3: { locationName: '서울', latitude: 37.52393, longitude: 126.980493, mapLevel: 8 },
  4: { locationName: '인천', latitude: 37.4485773, longitude: 126.7111158, mapLevel: 8 },
  5: { locationName: '충남', latitude: 36.4305367, longitude: 126.8531227, mapLevel: 11 },
  6: { locationName: '충북', latitude: 36.7864666, longitude: 127.60457, mapLevel: 10 },
  7: { locationName: '대전', latitude: 36.338262, longitude: 127.392768, mapLevel: 8 },
  8: { locationName: '세종', latitude: 36.497149, longitude: 127.260632, mapLevel: 8 },
  9: { locationName: '경북', latitude: 36.3621397, longitude: 128.6150551, mapLevel: 11 },
  10: { locationName: '경남', latitude: 35.2721113, longitude: 128.845253, mapLevel: 11 },
  11: { locationName: '대구', latitude: 35.8534682, longitude: 128.5639178, mapLevel: 8 },
  12: { locationName: '울산', latitude: 35.5383773, longitude: 129.3113596, mapLevel: 8 },
  13: { locationName: '부산', latitude: 35.1607928, longitude: 129.0472984, mapLevel: 8 },
  14: { locationName: '전북', latitude: 35.8279739, longitude: 127.1161079, mapLevel: 10 },
  15: { locationName: '전남', latitude: 34.9883785, longitude: 126.7200851, mapLevel: 11 },
  16: { locationName: '광주', latitude: 35.1557054, longitude: 126.8354416, mapLevel: 8 },
  17: { locationName: '제주', latitude: 33.3616819, longitude: 126.5291548, mapLevel: 10 },
};

export const ChoizaRoadSeason = {
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  InTheHouse: 5,
  Five: 6,
  Six: 7,
  Seven: 8,
  Eight: 9,
};
