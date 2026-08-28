import React from "react";
import ReactDOM from "react-dom/client";
import CompanyPage from "./CompanyPage.jsx";
import { initAnalytics } from "./analytics";
import "./index.css";

initAnalytics();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CompanyPage />
  </React.StrictMode>,
);
