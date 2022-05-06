import React, { useEffect, useState } from "react";

import Navbar from "../navigation/navbar";
import OwnersNavbar from "../navigation/ownersNavbar";
import ViewSingleOwner from "./viewSingleOwner";

// export view owners page
function ViewOwners() {

    // initialize state variables to view data by class
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    // initialize state variables to view all data
    const [backendData, setBackendData] = useState([{}])

    // function to get owners with name and or email specified by user in form
    const submitHandler = (e) => {

        e.preventDefault()

        fetch('/api/owners/').then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
                console.log(backendData)
            }
        )
    }
    
    // get all the owners from the database, initially
    useEffect(() => {
        fetch('/api/owners/').then(
        response => response.json()
        ).then(
        data => {
            setBackendData(data)
        }
        )
    }, [])
    
    // return a table of all the owners or the owners specified by the name and/email address selected by the user
    return (
        <div className="container">
            {(typeof backendData.data === 'undefined') ? (
                <div>
                    <Navbar />
                    <OwnersNavbar />

                    <p>Loading...</p>
                </div>
            ) : (
                <div>

                    <Navbar />
                    <OwnersNavbar />

                    <h1>View Single Owner</h1>
                    <ViewSingleOwner />

                    <h1>Begin typing a name or email address: </h1>
                    <form onSubmit={submitHandler}>
                        <input type="text" value={name} placeholder="Name" onChange={e => setName(e.target.value)} />
                        <input type="text" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
                        <button type="submit">Submit</button>
                    </form>

                    <h1>Table of Owners</h1>

                    <table className="owner-table">
                        <tbody>
                            <tr>
                                <th>Car ID</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                
                            {
                            // allow user to specify a name and email address
                            (name !== '' && email !== ''
                            ) ? (
                                backendData.data
                                .filter(owner => owner.Name.toLowerCase().includes(name.toLowerCase()))
                                .filter(owner => owner.Email.toLowerCase().includes(email.toLowerCase()))
                                .map((owner, i) => (
                                    <tr key={i}>
                                        <td>{ owner.Car_ID }</td>
                                        <td>{ owner.Name }</td>
                                        <td>{ owner.Email }</td>
                                    </tr>
                                ))
                            ) : (
                                // allow user to specify a name
                                (name !== '') 
                            ) ? (
                                backendData.data
                                .filter(owner => owner.Name.toLowerCase().includes(name.toLowerCase()))
                                .map((owner, i) => (
                                    <tr key={i}>
                                        <td>{ owner.Car_ID }</td>
                                        <td>{ owner.Name }</td>
                                        <td>{ owner.Email }</td>
                                    </tr> 
                                ))
                            ) : (
                                // allow user to specify an email address
                                (email !== '') 
                            ) ? (
                                backendData.data
                                .filter(owner => owner.Email.toLowerCase().includes(email.toLowerCase()))
                                .map((owner, i) => (
                                    <tr key={i}>
                                        <td>{ owner.Car_ID }</td>
                                        <td>{ owner.Name }</td>
                                        <td>{ owner.Email }</td>
                                    </tr> 
                                ))
                            ) : (
                                // if user does not specify a name or email address, display all owners
                                backendData.data.map((owner, i) => (
                                <tr key={i}>
                                    <td>{ owner.Car_ID }</td>
                                    <td>{ owner.Name }</td>
                                    <td>{ owner.Email }</td>
                                </tr>
                            )))

                        
                            }
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
}

export default ViewOwners;

