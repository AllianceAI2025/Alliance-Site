import React from "react";
import ReactDOM from "react-dom/client";
import SolutionsPage from "./SolutionsPage.jsx";
import { initAnalytics } from "./analytics";
import "./index.css";

initAnalytics();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SolutionsPage />
  </React.StrictMode>
);
