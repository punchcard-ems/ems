import React, {useEffect} from 'react';
import '../../css/Login.css';

export default function Login() {
    useEffect(() => {
        document.title = "Punchcard | Login";

        return () => {
            document.title = "Punchcard";
        };
    }, []);

    return (
        <div className="login">
            <div className="login--container">
                <p className="login--paragraph">
                    Login functionality is not yet supported on the web application version of Punchcard. Please download the mobile application to login.
                </p>
            </div>
        </div>
    )
}