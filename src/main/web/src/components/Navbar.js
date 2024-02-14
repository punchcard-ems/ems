import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import '../css/Navbar.css';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import Routing from "./Routing";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    // const openNav = () => {
    //     if (sidebarRef.current) {
    //         sidebarRef.current.style.width = "100%";
    //         setIsSidebarOpen(true);
    //     }
    // };
    //
    // const closeNav = () => {
    //     if (sidebarRef.current) {
    //         sidebarRef.current.style.width = "0";
    //         setIsSidebarOpen(false);
    //     }
    // };
    const openNav = () => {
        if (sidebarRef.current) {
            sidebarRef.current.classList.remove("closed");
            sidebarRef.current.classList.add("open");
            setIsSidebarOpen(true);
        }
    };

    const closeNav = () => {
        if (sidebarRef.current) {
            sidebarRef.current.classList.remove("open");
            sidebarRef.current.classList.add("closed");
            setIsSidebarOpen(false);
        }
    };


    useEffect(() => {
        const closeOffClick = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                closeNav();
            }
        }

        if (isSidebarOpen) {
            document.addEventListener('mousedown', closeOffClick);
        } else {
            document.removeEventListener('mousedown', closeOffClick);
        }

        return () => {
            document.removeEventListener('mousedown', closeOffClick);
        };
    }, [isSidebarOpen]);


    return (
        <div>
            <nav className="navbar">
                <Link to="/" className="site--title">Punchcard</Link>
                <ul>
                    <CustomLink to="/pricing">Pricing</CustomLink>
                    <CustomLink to="/support">Support</CustomLink>
                    <CustomLink to="/login">Login</CustomLink>
                    <FreeLink to="/signup">Try Free</FreeLink>
                </ul>
            </nav>
            <header className="mobile-header">
                <Link to="/" className="site--title">Punchcard</Link>
                <button
                    className="hamburger-button"
                    onClick={openNav}
                    aria-label="menu"
                >
                    <FontAwesomeIcon icon={faBars} size="2x" color='#28643C' />
                </button>
                <div ref={sidebarRef} className="sidebar">
                    <div className="sidebar-header">
                        <Link to="/" onClick={closeNav} className="sidebar-title">Punchcard</Link>
                        <button
                            className="close-btn"
                            onClick={closeNav}
                            aria-label="close-menu"
                        >
                            <FontAwesomeIcon icon={faXmark} size="2x" color='#28643C' />
                        </button>
                    </div>
                    <div className="nav-list">
                        <Link to="/" onClick={closeNav} className="page-link">About Us</Link>
                        <Link to="/" onClick={closeNav} className="page-link">Product</Link>
                        <Link to="/pricing" onClick={closeNav} className="page-link">Pricing</Link>
                        <Link to="/support" onClick={closeNav} className="page-link">Support</Link>
                    </div>
                    <div className="whitespace" />
                    <div className="bottom-buttons">
                        <Link to="/login" onClick={closeNav} className="sidebar-login-btn">Login</Link>
                        <Link to="/signup" onClick={closeNav} className="sidebar-free-btn">Try Free</Link>
                    </div>
                </div>
            </header>
            <Routing />
        </div>
    )
}


function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname , end: true});

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}

function FreeLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname , end: true});

    return (
        <Link to={to} className={`free-link ${isActive ? "active" : ""}`} {...props}>
            <li className={`free-link-text ${isActive ? "active" : ""}`}>
                {children}
            </li>
        </Link>
    )
}