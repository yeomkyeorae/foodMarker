import React from "react";
import { withRouter } from "react-router-dom";
import WishListList from "./WishListList";

function WishList(props) {
  const userId = props.userId;

  return (
    <div>
      <WishListList userId={userId} />
    </div>
  );
}

export default withRouter(WishList);
