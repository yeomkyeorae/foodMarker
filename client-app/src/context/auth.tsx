import React, { useEffect, createContext, useContext ,useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { withRouter } from "react-router-dom";

type T = null | string;
type User = { userId: T; userName: T; myPlace: T, setUserInfo: (id: T, name: T, myPlace: T) => void };

const AuthContext = createContext<User>({ userId: null, userName: null, myPlace: null, setUserInfo: () => { return; } });

export default function (component: React.ReactNode, option: boolean | null) {
  const [userId, setUserId] = useState<T>(null);
  const [userName, setUserName] = useState<T>(null);
  const [myPlace, setMyPlace] = useState<T>(null);

  const dispatch = useDispatch<any>();

  const setUserInfo = (id: T, name: T, myPlace: T) => {
    setUserId(id);
    setUserName(name);
    setMyPlace(myPlace);
  }

  function AuthenticationCheck(props): React.ReactElement {
    useEffect(() => {      
      dispatch(auth()).then(response => {
        // option:
        //  null - 아무나 접근 가능
        //  true - 로그인한 유저만
        //  false - 로그인한 유저는 불가능

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
      <AuthContext.Provider value={{ userId, userName, myPlace, setUserInfo }}>
        {component}
      </AuthContext.Provider>
    );
  }

  return withRouter(AuthenticationCheck);
}

export function useAuthContext() {
  return useContext(AuthContext);
}
