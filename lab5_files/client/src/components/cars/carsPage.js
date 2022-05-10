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
            <div className='outerContainer'>
                <div className='innerContainer'>
                    <h1 className='homepageHeader'>Cars Homepage</h1>
                    <p>Please use the links in the navigation bar above to view the cars in the database, to add a car to the database, or to update a car already in the database.</p>
                    <div className='imgBox'>
                        <img src={carsImage} alt="cars" />
                    </div>
                </div>
            </div>
        </div>
  )
}