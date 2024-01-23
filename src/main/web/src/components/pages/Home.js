import ImageSlider from "../ImageSlider";
import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import '../../css/Home.css';

export default function Home() {
    const slides = [
        { url: "https://punchcard.work/transfer-shift-and-inbox.png", title: "Shift Creation" },
        { url: "https://punchcard.work/claim-shift-and-available.png", title: "Shift Display" },
        { url: "https://punchcard.work/create-shift-and-available.png", title: "Shift Transfer" },
        { url: "https://punchcard.work/employee-info-and-staff.png", title: "Employee Info" },

    ];

    const texts = [
        { text: "Shift Creation" },
        { text: "Shift Display" },
        { text: "Shift Transfer" },
    ];

    let navigate = useNavigate()

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
                    <h2 className="header2">Create, Claim, and Transfer Shifts All From One Place</h2>

                    <p className="paragraph--container">
                        Redefine how your organization handles employee management.<br/>
                        Put your employees in the driver seat of their schedules and revolutionize your employee satisfaction.
                    </p>
                    <div className="buttonLink--container">
                        <input className="email--input" type="text" placeholder="Your Email Address"/>
                        <Link className="signup-button" to="/signup">Get Started</Link>
                    </div>
                </div>
            </div>
            <div className="slider--container" style={containerStyles}>
                <ImageSlider slides={slides} parentWidth={475} />
            </div>
        </div>
    );
}
