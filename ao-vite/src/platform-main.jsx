import React from "react";
import ReactDOM from "react-dom/client";
import PlatformPage from "./PlatformPage.jsx";
import { initAnalytics } from "./analytics";
import "./index.css";

initAnalytics();

ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode><PlatformPage /></React.StrictMode>);
