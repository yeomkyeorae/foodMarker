import React from "react";
import { withRouter } from "react-router-dom";

function SubPage(): React.ReactElement {
  return (
    <div style={{ width: "100%", height: "90vh", lineHeight: "80vh"}}>
      <span>위치를 불러올 수 없습니다</span>
    </div>
  );
}

export default withRouter(SubPage);
