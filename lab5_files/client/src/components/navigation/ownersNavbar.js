import '../../stylesheets/navigation/ownersNavbar.css'

import React from "react";
import { Link } from 'react-router-dom'

export default function OwnersNavbar() {
    
    // return a navigation bar with links to the owners homepage, the view owners page, the add owner page, and the update owner page
    return (
        <div className="container">
            <nav className='ownersNav'>
                <Link to='/owners/landing' className='ownersLink'>Owners Home</Link>
                <Link to='/owners' className='ownersLink'>View Owners</Link>
                <Link to='/owners-single-add' className='ownersLink'>Add Owner</Link>
                <Link to='/owners/update' className='ownersLink'>Update Owner</Link>
            </nav>
        </div>
    )
}