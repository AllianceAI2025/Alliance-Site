import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./LandingPage.jsx";
import { initAnalytics } from "./analytics";
import "./index.css";

initAnalytics();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LandingPage mode="demo" />
  </React.StrictMode>
);
