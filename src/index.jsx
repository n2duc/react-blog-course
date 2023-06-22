import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.scss";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./utils/contants";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles></GlobalStyles>
            <BrowserRouter>
                <App />
                <ToastContainer />
            </BrowserRouter>
        </ThemeProvider>
    // </React.StrictMode>
);
