import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/home";
import  LoginPage  from './components/login';

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <div>
      
    <LoginPage/>
    <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/home" element={<Home />} />

    </Routes>
    </div>
    
  )
}

export default App
