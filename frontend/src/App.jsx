import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import LoginPage from "./components/login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
