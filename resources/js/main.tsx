// resources/js/main.tsx or app.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "../css/app.css"; // Import your Tailwind CSS or other global CSS
import App from "./App";

// Ensure the root element exists in your Blade file
const rootElement = document.getElementById("app");

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
} else {
    console.error(
        "Root element #app not found. Please ensure it exists in your Blade template.",
    );
}
