import React from "react";
import ReactDOM from "react-dom/client";
import DesignPartnerPage from "./DesignPartnerPage.jsx";
import { initAnalytics } from "./analytics";
import "./index.css";

initAnalytics();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DesignPartnerPage />
  </React.StrictMode>,
);
