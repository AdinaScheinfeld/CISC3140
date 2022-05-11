import '../../stylesheets/owners/addOwner.css'

import React, { Component } from "react";
import axios from "axios";

import Navbar from "../navigation/navbar";
import OwnersNavbar from "../navigation/ownersNavbar";

// component to add an owner to the database
class AddOwner extends Component {

  // constructor
  constructor(props) {
    super(props)

    // initialize state
    this.state = {
      carid: '',
      name: '',
      email: ''
    }
  }

  // function to handle input by setting state to the value that was input
  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  // add the provided data to the database when the form is submitted then clear the input fields in the form
  submitHandler = (e) => {
    e.preventDefault()

    console.log(this.state)

    axios.post('/api/owners-single-add', this.state)
    .then(response => {
      console.log(response)
      this.setState({
        carid: '',
        name: '',
        email: ''
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    
    // declare variables to be used in the return
    const { carid, name, email } = this.state

    // return a form for the user to add an owner to the database
    return (
      <div>

        <Navbar />
        <OwnersNavbar />

        <div className="addDisplay">

          <h2>Please enter the Car ID, name, and email address of the owner to be added, then press the Add button.</h2>
          <p>Do not leave any fields blank-You must fill in all fields.</p>
          <p>An attempt to add a car whose Car ID is already in the database will be blocked.</p>

          <form onSubmit={this.submitHandler}>

            {/* {get car ID, name, and email address from input fields} */}
            <input type="number" name="carid" placeholder="Car ID" value={carid} onChange={this.changeHandler} className="addInput" />
            <input type="text" name="name" placeholder="Name" value={name} onChange={this.changeHandler} className="addInput"/>
            <input type="text" name="email" placeholder="Email" value={email} onChange={this.changeHandler} className="addInput"/>
            <button type="submit" className='addButton'>Add</button>
          </form>
        </div>

      </div>
    )
  }
}

export default AddOwner