import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import React from "react";
import '../css/Routing.css';

export default function Routing() {
   return(
       <div className="container">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/pricing" element={<Pricing/>}/>
            <Route path="/support" element={<Support/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    </div>
   )
}