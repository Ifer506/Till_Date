import Button from "@mui/material/Button";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./components/login";


function App() {
  return (
    <div className="App">
      <LoginPage/>
      
    </div>
  );
}

export default App;
