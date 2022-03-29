import React from "react";
import { useState, useEffect } from "react";
import { MdiAccountCheckOutline } from "../../assets/Icons";
import { Input, Loader } from "../../components";
import { useAuth } from "../../context";
import { useAxios } from "../../utils";

function Signup({ moveUp, setMoveUp }) {
  const { response, loading, operation } = useAxios();
  const [signupData, setSignupData] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const { setUserAndToken } = useAuth();

  const isValidEmail = signupData.email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? true
    : false;

  const isValidPassword = signupData.password.length > 5;

  const isValidName = signupData.firstName.length > 1;

  const handleSignup = () => {
    operation({
      method: "post",
      url: "/api/auth/signup",
      data: signupData,
    });
  };

  useEffect(() => {
    if (response !== undefined && response.createdUser !== null) {
      localStorage.setItem("starflix-user-token", response.encodedToken);
      setUserAndToken(response.createdUser, response.encodedToken);
    }
  }, [response, setUserAndToken]);

  return (
    <div
      className={`stc_signup signup_wrapper flex_column ${
        moveUp ? "move_up" : ""
      }`}
    >
      <div className="box_title">Signup</div>

      <div className="ep_wrapper flex_column">
        <Input
          required={true}
          label="name"
          status=""
          type="text"
          validation={isValidName}
          value={signupData.firstName}
          onChange={(e) =>
            setSignupData((d) => ({ ...d, firstName: e.target.value }))
          }
        />
        <Input
          required={true}
          label="email"
          status=""
          type="email"
          validation={isValidEmail}
          value={signupData.email}
          onChange={(e) =>
            setSignupData((d) => ({ ...d, email: e.target.value }))
          }
        />
        <Input
          required={true}
          label="password"
          status=""
          type="password"
          validation={isValidPassword}
          value={signupData.password}
          onChange={(e) =>
            setSignupData((d) => ({ ...d, password: e.target.value }))
          }
        />
      </div>

      <div className="ep_check_wrapper flex_column">
        <div className="flex_row flex_gap1">
          <input type="checkbox" value="" />
          <span className="login_checkbox_text">
            I accept all
            <button className="btn_txt">Terms & Conditions</button>
          </span>
        </div>
      </div>

      <button
        className={`sui_btn ep_mt2 ${
          isValidName && isValidEmail && isValidPassword
            ? ""
            : "sui_btn_disabled"
        }`}
        onClick={handleSignup}
      >
        Signup
      </button>

      <div className="ep_cna ep_mt2 h5">
        <span
          className="btn_txt flex_row flex_align_center flex_gap1"
          onClick={() => setMoveUp(false)}
        >
          <MdiAccountCheckOutline />
          Already have an Account
        </span>
      </div>
      {loading && <Loader fullpage={true} />}
    </div>
  );
}

export default Signup;
