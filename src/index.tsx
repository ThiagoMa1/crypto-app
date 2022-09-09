import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CurrencyProvider } from "./features/contexts/currency.context";
import { ThemeProvider } from "./features/contexts/theme.context";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrencyProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </CurrencyProvider>
    </BrowserRouter>
  </React.StrictMode>
);
