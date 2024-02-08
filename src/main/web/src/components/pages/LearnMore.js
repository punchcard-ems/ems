import {useEffect} from "react";

export default function LearnMore() {
    useEffect(() => {
        document.title = "Punchcard | Learn More";

        return () => {
            document.title = "Punchcard";
        };
    }, []);

    return (
        <div className="learn-more">
            <h1>Learn More</h1>
        </div>
    )
}