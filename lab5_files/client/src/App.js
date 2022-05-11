import "../src/App.css"

import Navbar from "./components/navigation/navbar";

import homeCar from "./images/homeCar.jpg"

// homepage
export default function App() {
  
  return (

    <div>
      <Navbar />
        <div className="homeOuterContainer">
          <div className="homeInnerContainer">
            <h1 className="homeHeader">Home Page</h1>
            <p className="homeP">Please use the links in the navigation bar above to view, add to, and update the cars data and owners data in the database.</p>
            <div className="homeImgBox">
              <img src={homeCar} alt="car" className="homeImg"/>
            </div>
          </div>
        </div>
    </div>
  )
}
