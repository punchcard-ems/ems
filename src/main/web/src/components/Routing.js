import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import WhyPunchcard from "./pages/WhyPunchcard";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import React from "react";
import '../css/Routing.css';
import LearnMore from "./pages/LearnMore";

export default function Routing() {
   return(
       <div className="container">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/whyPunchcard" element={<WhyPunchcard/>}/>
            <Route path="/pricing" element={<Pricing/>}/>
            <Route path="/support" element={<Support/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/learnmore" element={<LearnMore/>}/>
        </Routes>
    </div>
   )
}