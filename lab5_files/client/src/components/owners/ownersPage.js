import '../../stylesheets/owners/ownersPage.css'

import ownersImage from "../../images/owners.jpg"

import Navbar from "../navigation/navbar"
import OwnersNavbar from "../navigation/ownersNavbar"

// owners homepage component
export default function OwnersPage() {
  
    // return the owners homepage
    return (

        <div>
            <Navbar />
            <OwnersNavbar />
            <div className='outerContainer'>
                <div className='innerContainer'>
                    <h1 className='homepageHeader'>Owners Homepage</h1>
                    <p>Please use the links in the navigation bar above to view the owners in the database, to add an owner to the database, or to update an owner already in the database.</p>
                    <div className='imgBox'>
                        <img src={ownersImage} alt="cars" />
                    </div>
                </div>
            </div>

        </div>
  )
}

