import '../../stylesheets/navigation/navbar.css'

import React from "react";
import { Link } from 'react-router-dom'

export default function Navbar() {
    
    // return a navigation bar with links to the home page, the cars homepage, and the owners homepage
    return (
        <div className="container">
            <nav>
                <Link to="/" className='link'>Home</Link>
                <Link to="/cars/landing" className='link'>Cars</Link>
                <Link to="/owners/landing" className='link'>Owners</Link>
            </nav>
        </div>
    )
}