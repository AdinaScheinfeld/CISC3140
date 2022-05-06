import React from "react";
import { Link } from 'react-router-dom'

export default function OwnersNavbar() {
    
    // return a navigation bar with links to the owners homepage, the view owners page, the add owner page, and the update owner page
    return (
        <div>
            <nav>
                <Link to='/owners/landing'>Owners Home</Link> | {" "}
                <Link to='/owners'>View Owners</Link>| {" "}
                <Link to='/owners-single-add'>Add Owner</Link>| {" "}
                <Link to='/owners/:carid'>Update Owner</Link>
            </nav>
        </div>
    )
}