import React from 'react';
import {Link} from "react-router-dom";

function Header() {
    return (
        <React.Fragment>
            <header>
                <div className="container">
                    <Link to="/" className="back-btn"></Link> Add Task
                </div>
            </header>
            <nav id="calendar">
                <ul>
                    <li>
                        <span className="day">Sun</span>
                        <span className="date">9</span>
                    </li>
                    <li>
                        <span className="day">Mon</span>
                        <span className="date">10</span>
                    </li>
                    <li>
                        <span className="day">Tue</span>
                        <span className="date">11</span>
                    </li>
                    <li>
                        <span className="day">Wed</span>
                        <span className="date">12</span>
                    </li>
                    <li>
                        <span className="day">Thu</span>
                        <span className="date">13</span>
                    </li>
                    <li>
                        <span className="day">Fri</span>
                        <span className="date">14</span>
                    </li>
                    <li>
                        <span className="day">Sat</span>
                        <span className="date">15</span>
                    </li>
                </ul>
            </nav>
        </React.Fragment>

    )
}

export default Header;