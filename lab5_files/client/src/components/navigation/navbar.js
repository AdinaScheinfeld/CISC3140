import React from "react";
import { Link } from 'react-router-dom'

export default function Navbar() {
    
    // return a navigation bar with links to the home page, the cars homepage, and the owners homepage
    return (
        <div>
            <nav>
                <Link to="/">Home</Link> | {" "}
                <Link to="/cars">Cars</Link> | {" "}
                <Link to="/owners/landing">Owners</Link>
            </nav>
        </div>
    )
}