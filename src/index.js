import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./app/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
