import '../../stylesheets/owners/ownersPage.css'

import Navbar from "../navigation/navbar"
import OwnersNavbar from "../navigation/ownersNavbar"

// owners homepage component
export default function OwnersPage() {
  
    // return the owners homepage
    return (

        <div>
            <Navbar />
            <OwnersNavbar />
            <h1>Owners Homepage</h1>
        </div>
  )
}

