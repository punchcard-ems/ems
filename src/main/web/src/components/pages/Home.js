import ImageSlider from "../ImageSlider";
import React from "react";
import {Link, useMatch, useNavigate, useResolvedPath} from 'react-router-dom';
import '../../css/Home.css';

export default function Home() {
    const slides = [
        { url: "http://localhost:3000/punchcard-shift-creation-portrait.png", title: "Shift Creation" },
        { url: "http://localhost:3000/punchcard-shift-display-portrait.png", title: "Shift Display" },
        { url: "http://localhost:3000/punchcard-shift-creation-portrait.png", title: "Shift Transfer" },
    ];

    const texts = [
        { text: "Shift Creation" },
        { text: "Shift Display" },
        { text: "Shift Transfer" },
    ];

    let navigate = useNavigate()

    const goToSignUp = () => {
        navigate("/signup")
    }

    const gotToLearnMore = () => {
        navigate("/learnmore")
    }


    const containerStyles = {
        width: "267px",
        height: "550px",
        margin: "0 auto",
    };


    return (
        <div className="main--home">
            <div className="text--background">
                <div className="text--container">
                    <h1 className="header1">Put Employees First</h1>
                    <h2 className="header2">Create Shifts, Accept Shifts, Transfer Shifts</h2>

                    <p className="paragraph--container">
                        Redefine how your organization handles employee management.
                        Put your employees in the driver seat of their schedules and revolutionize your employee satisfaction
                    </p>
                    <div className="buttonLink--container">
                        <input className="email--input" type="text" placeholder="Your Email Address"/>
                        <button className="signup-button" onClick={goToSignUp} >Get Started</button>
                    </div>
                </div>
            </div>
            <div style={containerStyles}>
                <ImageSlider slides={slides} parentWidth={267} />
            </div>
        </div>
    );
}
