import React from "react";
import { psaSystem } from "./psaSystem.js";

// Shows the official logo when one is configured; otherwise a neutral,
// unbranded project glyph so the demo never imitates a vendor mark.
export function PsaMark() {
  if (psaSystem.logo) return <img src={psaSystem.logo} alt="" />;
  return <svg className="psa-mark" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="1" y="1" width="22" height="22" rx="5" fill="#E7ECE3" />
    <path d="M6 8h12M6 12h8M6 16h10" stroke="#3F5A45" strokeWidth="1.8" strokeLinecap="round" />
  </svg>;
}
