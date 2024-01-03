import logo from '../images/logo.svg';
import '../css/App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from "./Navbar";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Route, Routes} from "react-router-dom";

function App() {

  return (
    <div className="App">
        <Navbar/>
        <div className="container">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/pricing" element={<Pricing/>}/>
                <Route path="/support" element={<Support/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<SignUp/>}/>
            </Routes>
        </div>
    </div>
  );
}

export default App;
