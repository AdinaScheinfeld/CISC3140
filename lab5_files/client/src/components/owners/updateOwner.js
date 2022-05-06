import React, { useState } from "react";
import axios from "axios";

import Navbar from "../navigation/navbar";
import OwnersNavbar from "../navigation/ownersNavbar";

// component to update an owner in the database
export default function UpdateOwner() {

    // initialize state variables
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [carid, setCarID] = useState('');

    // function to update an owner using the provided data
    const submitHandler = (e) => {

        e.preventDefault()

        // set data to be an object with the name and email of an owner
        const data = {
            "name": name,
            "email": email
        }

        // update the owner using the provided data then clear the input fields in the form
        axios.patch(`/api/owners/${carid}`, data)
        .then(response => {
            console.log(data)
            console.log(response)
            setCarID('')
            setName('')
            setEmail('')
        })
            .catch(error => {
                console.log(error)
        })
    }

    // return a form to be used to update an owner in the database
    return (
      <div>

        <Navbar />
        <OwnersNavbar />

        <form onSubmit={submitHandler}>
            <label>
                Car ID: 
                <input type="number" value={carid} onChange={e => setCarID(e.target.value)} />
            </label>
            <input type="text" value={name} placeholder="Name" onChange={e => setName(e.target.value)} />
            <input type="text" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <button type="submit">Submit</button>
        </form>

      </div>
    )
}
