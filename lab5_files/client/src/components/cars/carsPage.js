import '../../stylesheets/cars/carsPage.css'

import carsImage from "../../images/cars.jpg"

import Navbar from "../navigation/navbar"
import CarsNavbar from "../navigation/carsNavbar"

// cars homepage component
export default function CarsPage() {
  
    // return the cars homepage
    return (

        <div>
            <Navbar />
            <CarsNavbar />
            <div className='outerCarContainer'>
                <div className='innerCarContainer'>
                    <h1 className='carHomepageHeader'>Cars Homepage</h1>
                    <p className='carP'>Please use the links in the navigation bar above to view the cars in the database, to add a car to the database, or to update a car already in the database.</p>
                    <div className='carImgBox'>
                        <img src={carsImage} alt="cars" className='carImg'/>
                    </div>
                </div>
            </div>
        </div>
  )
}