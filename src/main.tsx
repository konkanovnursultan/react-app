import { App } from "./app";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./app/styles/index.scss";
import "./app/styles/reset.scss";

ReactDOM.createRoot(document.getElementById("react-app")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
