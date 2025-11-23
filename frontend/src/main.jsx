import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

const removePreloadClass = () => {
  document.documentElement.classList.remove("preload")
}

window.addEventListener("load", removePreloadClass)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
