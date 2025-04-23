import { useState } from 'react'
// import { Toaster } from "sooner";
import { Toaster, toast } from 'react-hot-toast';
import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom";
// import Home from "./components/home";
// import { LoginPage } from './components/login';
import  LoginPage  from './components/login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      
    <LoginPage/>
    </div>
    
  )
}

export default App
