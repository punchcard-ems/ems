import React, {useEffect} from 'react';
import '../../css/Support.css';

export default function Support() {
    useEffect(() => {
        document.title = "Punchcard | Support";

        return () => {
            document.title = "Punchcard";
        };
    }, []);

    return (
        <div className="support">
            <div className="support--container">
                <p className="support--paragraph">
                    To submit a support ticket or for any additional inquiries, please email support@punchcard.work,
                    and our team will get back to you shortly.
                </p>
            </div>
        </div>
    )
}