import '../../stylesheets/owners/viewSingleOwner.css'

import React, { useState } from "react";

// component to view a single owner in the database
export default function ViewSingleOwner() {

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

                <h2>To view information on a single owner, enter the name of the owner, then press the Search button.</h2>
                <p>You must enter the owner's name in sentence case, i.e. the first letter of the name must be a capital letter and the rest of the name must be lower case.</p>
                <p>If the enter the name of an owner who is not present in the database, no information will appear. <br></br>
                    You may add the owner to the database using the Add Owner link in the navigation bar above. </p>

                <form onSubmit={submitHandler}>

                    {/* {get owner's name from input field} */}
                    <input type="text" value={name} placeholder="Owner's name" onChange={e => setName(e.target.value)} className="singleOwnerInput"/>
                    <button type="submit" className="singleOwnerButton">Search</button>
                </form>

                <div>
                    {(typeof backendData.data === 'undefined') ? (
                        <p>{" "}</p>
                    ): (
                        // table with information on desired owner
                        <table className="singleOwnerTable">
                            <tbody>
                                <tr>
                                    <td className="singleOwnerCell">Car ID: {backendData.data.Car_ID}</td>
                                    <td className="singleOwnerCell">Name: {backendData.data.Name}</td>
                                    <td className="singleOwnerCell">Email: {backendData.data.Email}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>

            </div>

        </div>
    )
}