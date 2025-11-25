"use client";

import React, { useState } from "react";

export default function PasswordField({
  value,
  onChange,
  placeholder = "",
  inputClass = "",
  wrapperClass = "",
  iconClass = "",
  minLength,
  ariaLabel = "Campo de senha",
  iconOff = "/Neobyte/vizualizar-off.svg",
  iconOn = "/Neobyte/vizualizar.svg",
}) {
  const [show, setShow] = useState(false);

  return (
    <div className={wrapperClass}>
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className={inputClass}
        value={value}
        onChange={onChange}
        minLength={minLength}
        aria-label={ariaLabel}
      />

      <button
        type="button"
        className={iconClass}
        onClick={() => setShow(!show)}
        aria-label={show ? "Ocultar senha" : "Visualizar senha"}
      >
        <img src={show ? iconOff : iconOn} alt={show ? "Ocultar senha" : "Visualizar senha"} />
      </button>
    </div>
  );
}
