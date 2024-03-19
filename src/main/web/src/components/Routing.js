import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import React from "react";
import '../css/Routing.css';
import LearnMore from "./pages/LearnMore";
import Product from "./pages/Product";
import AboutUs from "./pages/AboutUs";

export default function Routing() {
   return(
       <div className="container">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/product" element={<Product/>}/>
            <Route path="/pricing" element={<Pricing/>}/>
            <Route path="/support" element={<Support/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/learnmore" element={<LearnMore/>}/>
            <Route path="/aboutus" element={<AboutUs/>}/>
        </Routes>
    </div>
   )
}