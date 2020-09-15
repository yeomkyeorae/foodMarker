import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

function RestaurantList() {
  useEffect(() => {}, []);

  return (
    <div>
      <ul>
        <li>우래옥</li>
        <li>애플하우스</li>
        <li>진짜해장국</li>
      </ul>
    </div>
  );
}

export default withRouter(RestaurantList);
