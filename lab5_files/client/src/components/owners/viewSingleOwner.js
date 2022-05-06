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
        <div>

            <form onSubmit={submitHandler}>
                <input type="text" value={name} placeholder="Owner's name" onChange={e => setName(e.target.value)} />
                <button type="submit">Submit</button>
            </form>

            <div>
                {(typeof backendData.data === 'undefined') ? (
                    <p>{" "}</p>
                ): (
                    <p> Car ID: {backendData.data.Car_ID}  Name: {backendData.data.Name}  Email: {backendData.data.Email}</p>
                )}
            </div>

        </div>
    )
}