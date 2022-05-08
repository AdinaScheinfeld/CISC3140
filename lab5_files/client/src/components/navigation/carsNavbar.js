import '../../stylesheets/navigation/carsNavbar.css'

import React from "react";
import { Link } from 'react-router-dom'

export default function carsNavbar() {

    // return a navigation bar with links to the cars homepage, the view cars page, the add car page, and the update car page
    return (
        <div className="container">
            <nav className='carsNav'>
                <Link to='/cars/landing' className='carsLink'>Cars Home</Link>
                <Link to='/cars' className='carsLink'>View Cars</Link>
                <Link to='/cars-single-add' className='carsLink'>Add Car</Link>
                <Link to='/cars/update' className='carsLink'>Update Car</Link>
            </nav>
        </div>
    )
}