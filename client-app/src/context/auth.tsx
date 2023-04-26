import React, { useEffect, createContext, useContext ,useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { withRouter } from "react-router-dom";

type User = { userId: null | string; userName: null | string; myPlace: null | string };

const AuthContext = createContext<User>({ userId: null, userName: null, myPlace: null });

export default function (SpecificComponent, option: boolean | null) {
  const [userId, setUserId] = useState<null | string>(null);
  const [userName, setUserName] = useState<null | string>(null);
  const [myPlace, setMyPlace] = useState<null | string>(null);

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
          setUserId(response.payload._id);
          setUserName(response.payload.name);
          setMyPlace(response.payload.myPlace);

          // 로그인한 상태
          if (option === false) {
            props.history.push("/main", response.payload._id);
          }
        }
      });
    }, []);

    return (
      <AuthContext.Provider value={{ userId, userName, myPlace }}>
        <SpecificComponent />
      </AuthContext.Provider>
    );
  }

  return withRouter(AuthenticationCheck);
}

export function useAuthContext() {
  return useContext(AuthContext);
}
