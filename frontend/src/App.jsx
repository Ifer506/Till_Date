import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import LoginPage from "./components/login";
import Navbar from "./layouts/navbar";
import Sidebar from "./layouts/sidebar";

function App() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <div className="flex">
      <Sidebar isOpen={mobileSidebarOpen} setIsOpen={setMobileSidebarOpen} />
      <div className="flex-1">
        <Navbar toggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
        <main className="pt-16 pl-0 md:pl-56 p-4">
          <Routes>
            <Route path="/home" />
            
          </Routes>
        </main>
      </div>
    </div>
  );
}
export default App;
