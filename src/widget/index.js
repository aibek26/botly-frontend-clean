import React from "react";
import ReactDOM from "react-dom/client";
import ChatWidget from "./ChatWidget";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("botly-widget")).render(
  <React.StrictMode>
    <ChatWidget />
  </React.StrictMode>
);
