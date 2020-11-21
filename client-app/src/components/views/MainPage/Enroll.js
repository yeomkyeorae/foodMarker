import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerRestaurant } from "../../../_actions/restaurant_action";
import { registerWishList } from "../../../_actions/wishList_action";
import { Button } from "react-bootstrap";
import axios from "axios";
import heic2any from "heic2any";

const { kakao } = window;

function Enroll(props) {
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [VisitiedDate, setVisitiedDate] = useState("");
  const [ImageData, setImageData] = useState("");
  const userId = props.userId;
  const parentCompName = props.parentCompName;

  const [SearchName, setSearchName] = useState("이태원 맛집");
  const [Toggle, setToggle] = useState(true);

  useEffect(() => {
    console.log("changed");
    kakao.maps.load(() => {
      // 마커를 담을 배열입니다
      var markers = [];

      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
        };

      // 지도를 생성합니다
      var map = new kakao.maps.Map(mapContainer, mapOption);

      // 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places();

      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      // 키워드로 장소를 검색합니다
      searchPlaces();

      function searchPlaces() {
        var keyword = document.getElementById("keyword").value;

        if (!keyword.replace(/^\s+|\s+$/g, "")) {
          alert("키워드를 입력해주세요!");
          return false;
        }

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(keyword, placesSearchCB, {
          category_group_code: "FD6"
        });
      }

      // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면
          // 검색 목록과 마커를 표출합니다
          displayPlaces(data);

          // 페이지 번호를 표출합니다
          displayPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert("검색 결과가 존재하지 않습니다.");
          return;
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert("검색 결과 중 오류가 발생했습니다.");
          return;
        }
      }

      // 검색 결과 목록과 마커를 표출하는 함수입니다
      function displayPlaces(places) {
        var listEl = document.getElementById("placesList"),
          menuEl = document.getElementById("menu_wrap"),
          fragment = document.createDocumentFragment(),
          bounds = new kakao.maps.LatLngBounds(),
          listStr = "";

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        for (var i = 0; i < places.length; i++) {
          // 마커를 생성하고 지도에 표시합니다
          var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
            marker = addMarker(placePosition, i),
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
          const addrress_name = places[i].address_name;
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          bounds.extend(placePosition);

          // 마커와 검색결과 항목에 mouseover 했을때
          // 해당 장소에 인포윈도우에 장소명을 표시합니다
          // mouseout 했을 때는 인포윈도우를 닫습니다
          (function(marker, title) {
            kakao.maps.event.addListener(marker, "mouseover", function() {
              displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, "mouseout", function() {
              infowindow.close();
            });

            itemEl.onmouseover = function() {
              displayInfowindow(marker, title);
            };

            itemEl.onclick = () => {
              setName(title);
              setAddress(addrress_name);
            };

            itemEl.onmouseout = function() {
              infowindow.close();
            };
          })(marker, places[i].place_name);

          fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }

      // 검색결과 항목을 Element로 반환하는 함수입니다
      function getListItem(index, places) {
        var el = document.createElement("li"),
          itemStr =
            '<span class="markerbg marker_' +
            (index + 1) +
            '"></span>' +
            '<div class="info">' +
            "   <h5>" +
            places.place_name +
            "</h5>";

        if (places.road_address_name) {
          itemStr +=
            "    <span>" +
            places.road_address_name +
            "</span>" +
            '   <span class="jibun gray">' +
            places.address_name +
            "</span>";
        } else {
          itemStr += "    <span>" + places.address_name + "</span>";
        }

        itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

        el.innerHTML = itemStr;
        el.className = "item";

        return el;
      }

      // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
      function addMarker(position, idx, title) {
        var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
          imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          ),
          marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage
          });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker); // 배열에 생성된 마커를 추가합니다

        return marker;
      }

      // 지도 위에 표시되고 있는 마커를 모두 제거합니다
      function removeMarker() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
      }

      // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
      function displayPagination(pagination) {
        var paginationEl = document.getElementById("pagination"),
          fragment = document.createDocumentFragment(),
          i;

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }

        for (i = 1; i <= pagination.last; i++) {
          var el = document.createElement("a");
          el.href = "#";
          el.style.cssText = "margin:10px";
          el.innerHTML = i;

          if (i === pagination.current) {
            el.className = "on";
          } else {
            el.onclick = (function(i) {
              return function() {
                pagination.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
      }

      // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
      // 인포윈도우에 장소명을 표시합니다
      function displayInfowindow(marker, title) {
        var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

        infowindow.setContent(content);
        infowindow.open(map, marker);
      }

      // 검색결과 목록의 자식 Element를 제거하는 함수입니다
      function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
          el.removeChild(el.lastChild);
        }
      }
    });
  }, [Toggle]);

  const onNameHandler = e => {
    setName(e.currentTarget.value);
  };

  const onAddressHandler = e => {
    setAddress(e.currentTarget.value);
  };

  const onVisitiedDateHandler = e => {
    setVisitiedDate(String(e.currentTarget.value));
  };

  const onImageDataHandler = e => {
    e.preventDefault();

    let file = e.target.files[0];
    console.log("file: ", file);
    if (file.type === "image/heic") {
      const reader = new FileReader();

      reader.onloadend = function() {
        const image = reader.result;
        fetch(image)
          .then(res => res.blob())
          .then(blob => heic2any({ blob, toType: "image/jpeg", quality: 0.2 }))
          .then(conversionResult => {
            console.log("conversion: ", conversionResult);
            // conversionResult is a BLOB
            setImageData(conversionResult);
          })
          .catch(err => {
            console.log("err: ", err);
          });
      };
      reader.readAsDataURL(file);
    } else {
      setImageData(file);
    }
  };

  const onChangeSearchNameHandler = e => {
    setSearchName(e.currentTarget.value);
  };

  const toggleHandler = () => {
    setToggle(!Toggle);
  };

  const dispatch = useDispatch();
  const onSubmitHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", ImageData);

    if (parentCompName === "MainPage") {
      axios
        .post("https://api.imgur.com/3/image", formData, {
          headers: {
            Authorization: "Client-ID e4dc4dac3124836",
            Accept: "application/json"
          }
        })
        .then(response => {
          const body = {
            visitor: userId,
            name: Name,
            address: Address,
            date: VisitiedDate,
            imgURL: response.data.data.link
          };
          dispatch(registerRestaurant(body))
            .then(response => {
              if (response.payload.success) {
                setName("");
                setAddress("");
                setVisitiedDate("");
                setImageData("");
                props.setToggle(true);
                props.setMenu("식당 등록");
                props.history.push("/main", userId);
              } else {
                alert("error");
              }
            })
            .catch(err => {
              console.log("registerRestaurant err: ", err);
            });
        })
        .catch(err => {
          console.log("imgur err: ", err);
        });
    } else if (parentCompName === "WishPage") {
      const body = {
        user: userId,
        name: Name,
        address: Address
      };
      dispatch(registerWishList(body)).then(response => {
        if (response.payload.success) {
          setName("");
          setAddress("");
          props.setToggle(true);
          props.setMenu("위시리스트 등록");
          props.history.push("/wish", userId);
        } else {
          alert("error");
        }
      });
    }
  };

  return (
    <div>
      <div className="map_wrap">
        <div
          id={`map`}
          style={{ width: "500px", height: "400px", display: "inline-block" }}
        ></div>

        <div
          id={`menu_wrap`}
          className="bg_white"
          style={{ display: "inline-block", width: "50%" }}
        >
          <div className="option">
            <div>
              키워드 :{" "}
              <input
                type="text"
                value={SearchName}
                onChange={onChangeSearchNameHandler}
                id={`keyword`}
                size="15"
              />
              <button onClick={toggleHandler} type="submit">
                검색하기
              </button>
            </div>
          </div>
          <hr />
          <ul
            id={`placesList`}
            style={{
              listStyle: "none",
              height: "300px",
              display: "inline-block",
              overflowY: "scroll"
            }}
          ></ul>
          <div id={`pagination`}></div>
        </div>
      </div>

      <form onSubmit={onSubmitHandler} encType="multipart/form-data">
        <div>
          <input
            type="text"
            value={Name}
            placeholder="식당: 검색 후 선택하세요"
            onChange={onNameHandler}
            readOnly
            style={{ width: "200px" }}
          />
        </div>
        <div>
          <input
            type="text"
            value={Address}
            placeholder="주소: 검색 후 선택하세요"
            onChange={onAddressHandler}
            readOnly
            style={{ width: "200px" }}
          />
        </div>
        {parentCompName === "MainPage" ? (
          <div style={{ display: "inline-block" }}>
            <input
              type="date"
              value={VisitiedDate}
              placeholder="방문 일시"
              onChange={onVisitiedDateHandler}
            />
            <div style={{ marginLeft: "100px" }}>
              <input type="file" onChange={onImageDataHandler} />
            </div>
          </div>
        ) : null}
        <div>
          <Button variant="primary" style={{ margin: "20px" }} type="submit">
            등록
          </Button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Enroll);
