import '../../stylesheets/cars/viewSingleCar.css'

import React, { useState } from "react";

export default function ViewSingleCar(props) {

    // initialize state variables
    const [backendData, setBackendData] = useState([{}])
    const [carid, setCarid] = useState('');

    // get data when the form is submitted
    const submitHandler = (e) => {

        e.preventDefault()

            fetch(`/api/cars/${carid}`).then(
                response => response.json()
            ).then(
                data => {
                    setBackendData(data)
                }
            ).then(
                setCarid('')
            )

            console.log(backendData)
    }

    // return data on the requested car
    return (
        <div className='container'>

            <div className="singleCarDisplay">

                <h2>Enter the Car ID of an car to view information on that car.</h2>

                <form onSubmit={submitHandler}>
                    <input type="text" value={carid} placeholder="Car ID" onChange={e => setCarid(e.target.value)} className="singleCarInput"/>
                    <button type="submit" className="singleCarButton">Search</button>
                </form>

                <div>
                    {(typeof backendData.data === 'undefined') ? (
                        <p>{" "}</p>
                    ): (
                        <table className="singleCarTable">
                            <tbody>
                                <tr>
                                    <td className="singleCarCell">Car ID: {backendData.data.Car_ID}</td>
                                    <td className="singleCarCell">Year: {backendData.data.Year}</td>
                                    <td className="singleCarCell">Make: {backendData.data.Make}</td>
                                    <td className="singleCarCell">Model: {backendData.data.Model}</td>
                                    <td className="singleCarCell">Car Overall Score: {backendData.data.Car_Overall}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>

            </div>

        </div>
    )
}