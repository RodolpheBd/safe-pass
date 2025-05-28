import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // ← c'est cette ligne qui posait problème
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
