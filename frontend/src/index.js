import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "jquery";
import "bootstrap/dist/js/bootstrap.js";
import "popper.js/dist/umd/popper.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
