import ImageSlider from "../ImageSlider";
import React from "react";

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


    const containerStyles = {
        width: "500px",
        height: "680px",
        margin: "0 auto",
    };

    // using inline until i can figure out how to import the correct ones
    const pageStyles = {
      display: "flex",
    };


    return (
        <div style={pageStyles}>
            <div>
                <h3>Built For Employees</h3>
                <p>
                    Redefine how your organization handles employee management.
                    Put your employees in the driver seat of their schedules and revolutionize your employee satisfaction
                </p>
            </div>
            <div style={containerStyles}>
                <ImageSlider slides={slides} parentWidth={500} />
            </div>
        </div>
    );
}
