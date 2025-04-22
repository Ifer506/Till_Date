import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { Route, Routes, useNavigate } from "react-router-dom";
// import LoginPage from "./components/login";
import Home from "./components/home";
import LoginPage from './components/login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <LoginPage/>
  )
}

export default App
