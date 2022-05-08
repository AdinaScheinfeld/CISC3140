import '../../stylesheets/cars/carsPage.css'

import Navbar from "../navigation/navbar"
import CarsNavbar from "../navigation/carsNavbar"

// cars homepage component
export default function CarsPage() {
  
    // return the cars homepage
    return (

        <div>
            <Navbar />
            <CarsNavbar />
            <h1>Cars Homepage</h1>
        </div>
  )
}