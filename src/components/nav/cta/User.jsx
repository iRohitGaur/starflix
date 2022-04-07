import React from "react";
import { IcOutlineLogout, RiUser3Line } from "assets/Icons";
import { useAuth } from "context";
import { useNavigate } from "react-router-dom";

function User() {
  const { user, setUserAndToken } = useAuth();

  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="stf_user_area flex_column flex_align_end">
      <div className="stf_user_btn sui_avatar av_sm av_txt sui_v2">
        {user.firstName[0].toUpperCase()}
      </div>
      <div className="stf_user_hover_area">
        <button
          className="sui_btn btn_txt stf_user_profile"
          onClick={handleNavigateToProfile}
        >
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
