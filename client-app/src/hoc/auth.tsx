import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { withRouter } from "react-router-dom";

export default function (SpecificComponent, option: boolean | null) {
  // option:
  //  null - 아무나 접근 가능
  //  true - 로그인한 유저만
  //  false - 로그인한 유저는 불가능

  const dispatch = useDispatch<any>();

  function AuthenticationCheck(props): React.ReactElement {
    useEffect(() => {
      dispatch(auth()).then(response => {
        // 로그인하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/loginSignup");
          }
        } else {
          // 로그인한 상태
          if (option === false) {
            window.sessionStorage.setItem("userId", response.payload._id);
            window.sessionStorage.setItem("username", response.payload.name);
            window.sessionStorage.setItem("myPlace", response.payload.myPlace);
            props.history.push("/main", response.payload._id);
          }
        }
      });
    });

    return <SpecificComponent />;
  }

  return withRouter(AuthenticationCheck);
}
