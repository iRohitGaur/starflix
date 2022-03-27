import React from "react";
import {
  IconoirPasswordError,
  IconoirPasswordPass,
  IconParkOutlineEmailFail,
  IconParkOutlineEmailSuccessfully,
  LucideUserCheck,
  LucideUserX,
} from "../../assets/Icons";

function Input({
  required,
  label,
  status,
  type,
  validation,
  value = "",
  onChange,
}) {
  const isValid = value !== "" ? (validation ? "input_ss" : "input_er") : "";
  const isInputRequired = required ? "input_req" : "";

  return (
    <div className={`sui_input ${isValid} ${isInputRequired}`}>
      <div className="input_desc">
        <span className="input_lbl">{label}</span>
        <span className="input_info">
          {type === "email" ? (
            validation ? (
              <IconParkOutlineEmailSuccessfully />
            ) : (
              <IconParkOutlineEmailFail />
            )
          ) : type === "password" ? (
            validation ? (
              <IconoirPasswordPass />
            ) : (
              <IconoirPasswordError />
            )
          ) : label === "name" ? (
            validation ? (
              <LucideUserCheck />
            ) : (
              <LucideUserX />
            )
          ) : (
            status
          )}
        </span>
      </div>
      <input value={value} type={type} onChange={onChange} />
    </div>
  );
}

export default Input;
