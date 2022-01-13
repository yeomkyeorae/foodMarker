import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import NavbarComp from "../Navbar/NavbarComp";
import Footer from "../Footer/Footer";
import styled from "styled-components";

// const Div = styled.div`
//   display: inline-block;
//   width: 100%;
//   &:hover {
//     text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
//     color: #ff6700;
//   }
//   cursor: pointer;
// `;

function MyInfoPage(props) {
  const userId = props.location.state;

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "0px",
          right: "0px",
          overflow: "hidden"
        }}
      >
        <NavbarComp userId={userId} history={props.history} />
        <hr />
        <div>
            <div style={{ height: "150px"}}>
                <h1>내 정보 페이지</h1>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{ width: "40%"}}>
                    <h3>등록한 나의 방문 맛집 개수</h3>
                    <div style={{height: "100px"}}>
                        12개
                    </div>
                </div>
                <div style={{ width: "40%"}}>
                    <h3>등록한 나의 위시 맛집 개수</h3>
                    <div style={{height: "100px"}}>
                        17개
                    </div>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{ width: "30%"}}>
                    <h3>지역별 나의 방문/위시 맛집 리스트</h3>
                    <div style={{height: "100px"}}>
                        <ul>
                            <li>서울 10개</li>
                            <li>대전 10개</li>
                            <li>충청 10개</li>
                            <li>세종 10개</li>
                        </ul>
                    </div>
                </div>
                <div style={{ width: "50%"}}>
                    <h3>나의 방문 맛집 달력</h3>
                </div>
            </div>
        </div>
        <hr />
        <Footer />
      </div>
    </div>
  );
}

export default withRouter(MyInfoPage);
