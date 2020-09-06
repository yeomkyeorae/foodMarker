import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";

function Signup(props) {
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const onEmailHandler = e => {
    setEmail(e.currentTarget.value);
  };

  const onNameHandler = e => {
    setName(e.currentTarget.value);
  };

  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value);
  };

  const onConfirmedPassword = e => {
    setConfirmPassword(e.currentTarget.value);
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("서로 다른 패스워드입니다");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password
    };

    dispatch(registerUser(body)).then(response => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert("failed to sign up");
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmedPassword}
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default withRouter(Signup);
