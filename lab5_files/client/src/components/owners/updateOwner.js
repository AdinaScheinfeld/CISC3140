import "../../stylesheets/owners/updateOwner.css"

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
      <div className="container">

        <Navbar />
        <OwnersNavbar />

        <div className="updateContainer">

            <h2>Please enter the Car ID, name, and email address of the owner to be updated.</h2>
            <p>No fields can be left blank-you must fill in all fields. If you do not want to update one of the fileds, please enter the original data. 
                For example, if you want to update an owner's email address but not their name, please enter the original name and the new email address.</p>

            <form onSubmit={submitHandler}>
                <input type="number" value={carid} onChange={e => setCarID(e.target.value)} placeholder="Car ID" className="updateInput"/>
                <input type="text" value={name} placeholder="Name" onChange={e => setName(e.target.value)} className="updateInput"/>
                <input type="text" value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} className="updateInput"/>
                <button type="submit" className="updateButton">Update</button>
            </form>
        </div>


      </div>
    )
}