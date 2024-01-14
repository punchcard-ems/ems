import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/Navbar.css';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Routing from "./Routing";

export default function Navbar(){

    return (
        <div>
            <nav className="nav">
                <Link to="/" className="site--title">Punchcard</Link>
                <ul>
                    <CustomLink to="/pricing">Pricing</CustomLink>
                    <CustomLink to="/support">Support</CustomLink>
                    <CustomLink to="/login">Login</CustomLink>
                    <CustomLink to="/signup">Try Free</CustomLink>
                </ul>
            </nav>
            <Routing />
        </div>
    )
}


function CustomLink({ to, children, ...props }){
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname , end: true});
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}