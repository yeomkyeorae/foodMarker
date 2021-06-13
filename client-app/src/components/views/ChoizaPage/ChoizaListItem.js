import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Card, Col, OverlayTrigger, Tooltip } from "react-bootstrap";

function ChoizaListItem(props) {
  const choizaRoad = props.choizaRoad;
  const [showTooltip, setShowTooltip] = useState(false);

  const clickChoizaRoad = URL => {
    window.open(URL, "_blank");
  };

  return (
    <OverlayTrigger
      key="bottom"
      placement="bottom"
      overlay={<Tooltip id={`tooltip-bottom`}>툴팁 테스트</Tooltip>}
    >
      <Col md={3}>
        <Card
          style={{ width: "100%", height: "100%", cursor: "pointer" }}
          onClick={() => clickChoizaRoad(choizaRoad.youtubeURL)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <Card.Body>
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
          </Card.Body>
        </Card>
      </Col>
    </OverlayTrigger>
  );
}

export default withRouter(ChoizaListItem);
