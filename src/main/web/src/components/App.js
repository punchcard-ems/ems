import '../css/App.css';
import React, {useEffect, useState} from 'react';
import Navbar from "./Navbar";

function App() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 5;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
    <div className="App">
        <Navbar scrolled={scrolled}/>
    </div>
    );
}

export default App;