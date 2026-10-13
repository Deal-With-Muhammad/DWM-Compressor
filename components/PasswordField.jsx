"use client";

import { useState } from "react";

export default function PasswordField({ value, onChange, disabled, placeholder = "Password" }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center gap-2 rounded-xl border border-default-200 bg-default-100/60 px-3">
      <input
        type={show ? "text" : "password"}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="h-11 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-default-400"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="text-xs font-medium text-default-500 hover:text-foreground"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}
