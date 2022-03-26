import React from "react";
import { DarkModeButton } from "components";
import "./cta.css";
import { IcOutlineLogin } from "assets/Icons";

function CTA() {
  return (
    <div className="stf_cta">
      <DarkModeButton />
      <button title="login" className="sui_btn btn_icon_fa">
        <IcOutlineLogin />
      </button>
    </div>
  );
}

export default CTA;
