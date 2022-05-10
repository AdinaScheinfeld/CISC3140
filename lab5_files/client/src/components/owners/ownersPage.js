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
            <div className='ownersOuterContainer'>
                <div className='ownersInnerContainer'>
                    <h1 className='ownersHomepageHeader'>Owners Homepage</h1>
                    <p className='ownersP'>Please use the links in the navigation bar above to view the owners in the database, to add an owner to the database, or to update an owner already in the database.</p>
                    <div className='ownersImgBox'>
                        <img src={ownersImage} alt="cars" className='ownersImg'/>
                    </div>
                </div>
            </div>

        </div>
  )
}

