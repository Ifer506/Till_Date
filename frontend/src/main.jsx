import { StrictMode, React } from 'react'
import { createRoot,ReactDOM } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    

  </StrictMode>,
)


// reportWebVitals();
