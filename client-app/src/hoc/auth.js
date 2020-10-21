import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { withRouter } from "react-router-dom";

export default function(SpecificComponent, option, adminRoute = null) {
  // option:
  //  null - 아무나 접근 가능
  //  true - 로그인한 유저만
  //  false - 로그인한 유저는 불가능

  const dispatch = useDispatch();

  function AuthenticationCheck(props) {
    console.log("hoc: ", props.location.pathname);
    useEffect(() => {
      dispatch(auth()).then(response => {
        // 로그인하지 않은 상태
        console.log("dispatched!!!!");
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/loginSignup");
          }
        } else {
          // 로그인한 상태
          if (option === false) {
            props.history.push("/main", response.payload._id);
          }
        }
        console.log("passed");
      });
    }, [props.location.pathname]);
    return <SpecificComponent />;
  }

  return withRouter(AuthenticationCheck);
}
