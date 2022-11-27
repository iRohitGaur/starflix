import { useAuth } from "context";
import React from "react";
import { useDocumentTitle } from "utils";
import "./profile.css";

function Profile() {
  useDocumentTitle("Starflix - Profile - Rohit Gaur");

  const { user } = useAuth();

  return (
    <div className="profile_page">
      <div className="stf_user_details_wrapper">
        <div className="sui_avatar av_md av_txt sui_v1">
          <h2>{user.name[0]}</h2>
        </div>
        <div className="stf_user_name_email_wrapper">
          <span className="stf_user_detail">
            <p>Email:</p>
            <p>{user.email}</p>
          </span>
          <span className="stf_user_detail">
            <p>Name:</p>
            <p>{user.name}</p>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
