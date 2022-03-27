import React from "react";
import "./loader.css";
import { AntDesignLoading3QuartersOutlined } from "../../assets/Icons";

function Loader({ fullpage = false }) {
  return (
    <div className={fullpage ? "page_loader" : ""}>
      <AntDesignLoading3QuartersOutlined />
    </div>
  );
}

export default Loader;
