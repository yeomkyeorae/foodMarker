import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Card, Col, OverlayTrigger, Popover } from "react-bootstrap";

function ChoizaListItem(props) {
  const choizaRoad = props.choizaRoad;

  const clickChoizaRoad = URL => {
    window.open(URL, "_blank");
  };

  return (
    <Col md={3}>
      <Card style={{ width: "100%", height: "100%" }}>
        <Card.Body>
          <OverlayTrigger
            trigger="click"
            key="bottom"
            placement="bottom"
            overlay={
              <Popover id={`popover-positioned-bottom`}>
                <Popover.Title as="h3">최자로드 식당</Popover.Title>
                <Popover.Content>예시 - 남영돈</Popover.Content>
              </Popover>
            }
          >
            <div style={{ cursor: "pointer" }}>pop up trigger</div>
          </OverlayTrigger>
          <div
            onClick={() => clickChoizaRoad(choizaRoad.youtubeURL)}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                width: "100%",
                height: "240px",
                overflow: "hidden"
              }}
            >
              <Card.Img
                variant="top"
                src={choizaRoad.thumbnailURL}
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />
            </div>
            <p style={{ fontFamily: "Do Hyeon", fontSize: "20px" }}>
              {choizaRoad.title}
            </p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default withRouter(ChoizaListItem);
