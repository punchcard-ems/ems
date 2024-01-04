import ImageSlider from "../ImageSlider";
import React from "react";
import {Link, useMatch, useNavigate, useResolvedPath} from 'react-router-dom';
import '../../css/Home.css';

export default function Home() {
    const slides = [
        { url: "http://localhost:3000/punchcard-shift-creation.jpg", title: "Shift Creation" },
        { url: "http://localhost:3000/punchcard-shift-display.jpg", title: "Shift Display" },
        { url: "http://localhost:3000/punchcard-shift-transfer.jpg", title: "Shift Transfer" },
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
        width: "350px",
        height: "700px",
        margin: "0 auto",
    };


    return (
        <div className="main--home">
            <div className="text--container">
                <h1 className="header1">Built For Employees</h1>
                <h2 className="header2">Create Shifts, Accept Shifts, Transfer Shifts</h2>

                <p className="paragraph--container">
                    Redefine how your organization handles employee management.
                    Put your employees in the driver seat of their schedules and revolutionize your employee satisfaction
                </p>
                <div className="buttonLink--container">
                    <button className="signup-button" onClick={goToSignUp} >Get Started</button>
                    <button className="learnmore-button" onClick={gotToLearnMore}>Learn More</button>
                </div>

            </div>
            <div style={containerStyles}>
                <ImageSlider slides={slides} parentWidth={350} />
            </div>
        </div>
    );
}
