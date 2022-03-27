import React from "react";
import { DarkModeButton } from "components";
import "./cta.css";
import { IcOutlineLogin } from "assets/Icons";
import { Link } from "react-router-dom";
import User from "./User";
import { useAuth } from "context";

function CTA() {
  const { user } = useAuth();

  return (
    <div className="stf_cta">
      <DarkModeButton />
      {user ? (
        <User />
      ) : (
        <Link to="/auth" title="login" className="sui_btn btn_icon_fa">
          <IcOutlineLogin />
        </Link>
      )}
    </div>
  );
}

export default CTA;
