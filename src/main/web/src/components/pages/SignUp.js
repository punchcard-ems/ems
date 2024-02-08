import React, {useEffect} from 'react';
import '../../css/SignUp.css';
export default function SignUp() {
    useEffect(() => {
        document.title = "Punchcard | Sign Up";

        return () => {
            document.title = "Punchcard";
        };
    }, []);

    return (
        <div className="signup">
            <div className="signup--container">
                <p className="signup--paragraph">
                    Punchcard is still in beta testing. To join the pre-release waitlist, please email support@punchcard.work and
                    our team will get back to you when you are able to join the beta!
                </p>
            </div>
        </div>
    )
}