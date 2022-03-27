import React from "react";
import { useState, useEffect } from "react";
import { MdiAccountPlusOutline } from "assets/Icons";
import { Input, Loader } from "components";
import { useAuth } from "context";
import { useAxios } from "utils";

const guestLogin = { email: "guest@rohit.xyz", password: "Guest@123" };

function Login({ moveUp, setMoveUp }) {
  const { response, loading, operation } = useAxios();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { setUserAndToken } = useAuth();

  const isValidEmail = loginData.email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? true
    : false;

  const isValidPassword = loginData.password.length > 5;

  const handleLogin = () => {
    operation({
      method: "post",
      url: "/api/auth/login",
      data: loginData,
    });
  };

  useEffect(() => {
    if (response !== undefined && response.foundUser !== null) {
      localStorage.setItem("starflix-user-token", response.encodedToken);
      setUserAndToken(response.foundUser, response.encodedToken);
    }
  }, [response, setUserAndToken]);

  return (
    <div className={`login_wrapper flex_column ${moveUp ? "move_up" : ""}`}>
      <div className="box_title">Login</div>

      <div className="ep_wrapper flex_column">
        <Input
          required={true}
          label="email"
          status=""
          type="email"
          validation={isValidEmail}
          value={loginData.email}
          onChange={(e) =>
            setLoginData((d) => ({ ...d, email: e.target.value }))
          }
        />
        <Input
          required={true}
          label="password"
          status=""
          type="password"
          validation={isValidPassword}
          value={loginData.password}
          onChange={(e) =>
            setLoginData((d) => ({ ...d, password: e.target.value }))
          }
        />
      </div>

      <div className="ep_check_wrapper flex_column">
        <button
          className={`btn_txt login_fyp ${""}`}
          onClick={() => setLoginData(guestLogin)}
        >
          use guest login
        </button>
        <div className="flex_row flex_gap1">
          <input type="checkbox" value="" />
          <span className="login_checkbox_text">Remember me</span>
        </div>
      </div>

      <button
        className={`sui_btn ep_mt2 ${
          isValidEmail && isValidPassword ? "" : "sui_btn_disabled"
        }`}
        onClick={handleLogin}
      >
        Login
      </button>

      <div className="ep_cna ep_mt2 h5">
        <span
          className="btn_txt flex_row flex_align_center flex_gap1"
          onClick={() => setMoveUp(true)}
        >
          <MdiAccountPlusOutline />
          Create a New Account
        </span>
      </div>
      {loading && <Loader fullpage={true} />}
    </div>
  );
}

export default Login;
