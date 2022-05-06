import React, { useEffect, useState } from "react";

import Navbar from "../navigation/navbar";
import OwnersNavbar from "../navigation/ownersNavbar";
import ViewSingleOwner from "./viewSingleOwner";

// export view owners page
export default function ViewOwners() {

    // initialize state variables
    const [backendData, setBackendData] = useState([{}])
    
    // get all the owners from the database
    useEffect(() => {
        fetch("/api/owners").then(
        response => response.json()
        ).then(
        data => {
            setBackendData(data)
        }
        )
    }, [])
    
    // return a table of all the owners
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

                    <ViewSingleOwner />

                    <h1>Table of All Owners</h1>

                    <table className="owner-table">
                        <tbody>
                            <tr>
                                <th>Car ID</th>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                
                            {backendData.data.map((owner, i) => (
                                <tr key={i}>
                                    <td>{ owner.Car_ID }</td>
                                    <td>{ owner.Name }</td>
                                    <td>{ owner.Email }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
}

