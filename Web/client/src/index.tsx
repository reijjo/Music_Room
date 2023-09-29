import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./css/index.css";
import "./css/mobile-index.css";
import "./css/before_login.css";
import "./css/mobile-before_login.css";
import "./css/after_login.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GoogleOAuthProvider clientId="62303906830-g1enp09i7n74k6cahmh6fcit0n55advi.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
