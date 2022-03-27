import React from "react";
import { IcOutlineLogout, RiUser3Line } from "assets/Icons";
import { useAuth } from "context";

function User() {
  const { user, setUserAndToken } = useAuth();

  return (
    <div className="stf_user_area flex_column flex_align_end">
      <div className="stf_user_btn sui_avatar av_sm av_txt sui_v2">
        {user.firstName.substring(0, 1)}
      </div>
      <div className="stf_user_hover_area">
        <button className="sui_btn btn_txt stf_user_profile">
          <RiUser3Line />
          Profile
        </button>
        <button
          className="sui_btn btn_txt stf_logout_btn"
          onClick={() => setUserAndToken(null, null)}
        >
          <IcOutlineLogout />
          Logout
        </button>
      </div>
    </div>
  );
}

export default User;
