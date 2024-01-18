import ImageSlider from "../ImageSlider";
import React from "react";
import {useNavigate} from 'react-router-dom';
import '../../css/Home.css';

export default function Home() {
    const slides = [
        { url: "http://localhost:3000/transfer-shift-and-inbox.png", title: "Shift Creation" },
        { url: "http://localhost:3000/claim-shift-and-available.png", title: "Shift Display" },
        { url: "http://localhost:3000/create-shift-and-available.png", title: "Shift Transfer" },
        { url: "http://localhost:3000/employee-info-and-staff.png", title: "Employee Info" },

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

    const containerStyles = {
        width: "475px",
        height: "658px",
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
                <ImageSlider slides={slides} parentWidth={475} />
            </div>
        </div>
    );
}
