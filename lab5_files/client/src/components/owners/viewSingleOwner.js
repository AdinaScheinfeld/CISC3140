import '../../stylesheets/owners/viewSingleOwner.css'

import React, { useState } from "react";

export default function ViewSingleOwner(props) {

    // initialize state variables
    const [backendData, setBackendData] = useState([{}])
    const [name, setName] = useState('');

    // get data when the form is submitted
    const submitHandler = (e) => {

        e.preventDefault()

            fetch(`/api/owners/${name}`).then(
                response => response.json()
            ).then(
                data => {
                    setBackendData(data)
                }
            ).then(
                setName('')
            )

            console.log(backendData)
    }

    // return data on the requested owner
    return (
        <div className='container'>

            <div className="display">

                <h2>Enter the name of an owner to view information on that owner's car.</h2>

                <form onSubmit={submitHandler}>
                    <input type="text" value={name} placeholder="Owner's name" onChange={e => setName(e.target.value)} className="singleOwnerInput"/>
                    <button type="submit" className="singleOwnerButton">Search</button>
                </form>

                <div>
                    {(typeof backendData.data === 'undefined') ? (
                        <p>{" "}</p>
                    ): (
                        <table className="singleOwnerTable">
                            <tr>
                                <td className="singleOwnerCell">Car ID: {backendData.data.Car_ID}</td>
                                <td className="singleOwnerCell">Name: {backendData.data.Name}</td>
                                <td className="singleOwnerCell">Email: {backendData.data.Email}</td>
                            </tr>
                        </table>
                    )}
                </div>

            </div>

        </div>
    )
}