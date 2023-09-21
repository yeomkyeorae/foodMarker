import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import * as S from "./LoginSignup.style";

function LoginSignup(): React.ReactElement {
  const [toggle, setToggle] = useState(true);

  const loginOrSignup: React.ReactElement = toggle ? <Login toggle={toggle} setToggle={setToggle} /> : <Signup toggle={toggle} setToggle={setToggle} />;

  return (
    <S.Container>
      {loginOrSignup}
    </S.Container>
  );
}

export default LoginSignup;
