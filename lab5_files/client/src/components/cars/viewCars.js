import '../../stylesheets/cars/viewCars.css'

import React, { useEffect, useState } from "react";

import Navbar from "../navigation/navbar";
import CarsNavbar from "../navigation/carsNavbar";
import ViewSingleCar from "./viewSingleCar";

// export view cars page
function ViewCars() {

    // initialize state variables to view data by class
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')

    // initialize state variables to view all data
    const [backendData, setBackendData] = useState([{}])

    // function to get cars with the make and/or model specified by user in form
    const submitHandler = (e) => {

        e.preventDefault()

        fetch('/api/cars/').then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
                console.log(backendData)
            }
        )
    }
    
    // get all the cars from the database, initially
    useEffect(() => {
        fetch('/api/cars/').then(
        response => response.json()
        ).then(
        data => {
            setBackendData(data)
        }
        )
    }, [])
    
    // return a table of all the cars or the cars specified by the make and/or model selected by the user
    return (
        <div className="container">
            {(typeof backendData.data === 'undefined') ? (
                <div>
                    <Navbar />
                    <CarsNavbar />

                    <p>Loading...</p>
                </div>
            ) : (
                <div>

                    <Navbar />
                    <CarsNavbar />

                    <ViewSingleCar />

                    <div className="carsDisplay">
                        <h2>All the cars in the database are listed below.</h2>
                        <p>Begin typing a make and/or model to receive information on cars that meet the desired criteria.</p>
                        <form onSubmit={submitHandler} className="carsForm">

                            {/* {get desired make and/or model name from user} */}
                            <input type="text" value={make} placeholder="Make" onChange={e => setMake(e.target.value)} className="carsInput"/>
                            <input type="text" value={model} placeholder="Model" onChange={e => setModel(e.target.value)} className="carsInput"/>
                            <button type="submit" className='carsButton'>Search</button>
                        </form>

                        <table className="carsTable">
                            <tbody>
                                <tr>
                                    <th className='carsHeaderCell'>Car ID</th>
                                    <th className='carsHeaderCell'>Year</th>
                                    <th className='carsHeaderCell'>Make</th>
                                    <th className='carsHeaderCell'>Model</th>
                                    <th className='carsHeaderCell'>Car Overall Score</th>
                                </tr>
                    
                                {
                                // allow user to specify a make and model
                                (make !== '' && model !== ''
                                ) ? (
                                    backendData.data
                                    .filter(car => car.Make.toLowerCase().startsWith(make.toLowerCase()))
                                    .filter(car => car.Model.toLowerCase().startsWith(model.toLowerCase()))
                                    .map((car, i) => (
                                        <tr key={i}>
                                            <td className='carsCell'>{ car.Car_ID }</td>
                                            <td className='carsCell'>{ car.Year }</td>
                                            <td className='carsCell'>{ car.Make }</td>
                                            <td className='carsCell'>{ car.Model }</td>
                                            <td className='carsCell'>{ car.Car_Overall }</td>
                                        </tr>
                                    ))
                                ) : (
                                    // allow user to specify only a make
                                    (make !== '') 
                                ) ? (
                                    backendData.data
                                    .filter(car => car.Make.toLowerCase().startsWith(make.toLowerCase()))
                                    .map((car, i) => (
                                        <tr key={i}>
                                            <td className='carsCell'>{ car.Car_ID }</td>
                                            <td className='carsCell'>{ car.Year }</td>
                                            <td className='carsCell'>{ car.Make }</td>
                                            <td className='carsCell'>{ car.Model }</td>
                                            <td className='carsCell'>{ car.Car_Overall }</td>
                                        </tr> 
                                    ))
                                ) : (
                                    // allow user to specify only a model
                                    (model !== '') 
                                ) ? (
                                    backendData.data
                                    .filter(car => car.Model.toLowerCase().startsWith(model.toLowerCase()))
                                    .map((car, i) => (
                                        <tr key={i}>
                                            <td className='carsCell'>{ car.Car_ID }</td>
                                            <td className='carsCell'>{ car.Year }</td>
                                            <td className='carsCell'>{ car.Make }</td>
                                            <td className='carsCell'>{ car.Model }</td>
                                            <td className='carsCell'>{ car.Car_Overall }</td>
                                        </tr> 
                                    ))
                                ) : (
                                    // if user does not specify a make or model, display all cars
                                    backendData.data.map((car, i) => (
                                    <tr key={i}>
                                        <td className='carsCell'>{ car.Car_ID }</td>
                                            <td className='carsCell'>{ car.Year }</td>
                                            <td className='carsCell'>{ car.Make }</td>
                                            <td className='carsCell'>{ car.Model }</td>
                                            <td className='carsCell'>{ car.Car_Overall }</td>
                                    </tr>
                                )))

                            
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            )}
        </div>
    );
}

export default ViewCars;

