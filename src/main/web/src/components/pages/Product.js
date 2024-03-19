import React, {useEffect} from "react";
import '../../css/Pricing.css';

export default function Product() {
    useEffect(() => {
        document.title = "Punchcard | Product";

        return () => {
            document.title = "Punchcard";
        };
    }, []);

    return (
        <div className="pricing">
            <div className="pricing--container">
                <p className="pricing--paragraph">
                    Punchcard is currently in beta testing. All features are available for free during the beta period. To join the beta waitlist and
                    stay up to date on all up to date information, please email support@punchcard.work with the subject line "Beta Waitlist".
                    <br/><br/>Join Punchcard and let's revolution how shift scheduling is done!
                </p>
            </div>
        </div>
    )
}