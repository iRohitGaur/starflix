import React from "react";
import { useState } from "react";
import { MdiAccountPlusOutline } from "assets/Icons";
import { Input, Loader } from "components";
import { useAuth } from "context";
import { useAxios, useToast } from "utils";
import { LOCAL_STORAGE_TOKEN } from "utils/constants";

const guestLogin = { email: "guest@rohit.xyz", password: "guest@123" };

function Login({ moveUp, setMoveUp }) {
  const { loading, operation } = useAxios();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { setUserAndToken } = useAuth();
  const { sendToast } = useToast();

  const isValidEmail = loginData.email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? true
    : false;

  const isValidPassword = loginData.password.length > 5;

  const handleLogin = async () => {
    try {
      const response = await operation({
        method: "post",
        url: "/login",
        data: loginData,
      });
      const user = response.user;
      const token = response.token;

      if (user && token) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
        setUserAndToken(user, token);
        sendToast(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
