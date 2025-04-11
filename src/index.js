
import React from "react";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
serviceWorkerRegistration.register();
