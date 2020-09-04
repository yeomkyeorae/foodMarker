import React, { useState } from "react";
import { useDispath } from "react-redux";
import { loginUser } from "";
import styled, { css } from "styled-components";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      <form onSubmit={}>
        <label>Email</label>
        <input type="email" value={Email} onChange={} />
        <label>Password</label>
        <input type="password" value={Password} onChange={} />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
