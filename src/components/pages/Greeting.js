import React from 'react';
import {Link} from "react-router-dom";

function Greeting() {
    return (
        <div id="homepage">
            <header>
                <h1>Namaste! <span role="img">🙏</span></h1>
                <small>{new Date().toDateString()}</small>
            </header>
            <main>
                <div className="flex-this">
                <Link to="/create-task" className="create-task large-btn"></Link>
                <p>Knock out 3 important tasks today that will help you to become a better version of yourself.</p>
                </div>
            </main>
        </div>
    )
}

export default Greeting;