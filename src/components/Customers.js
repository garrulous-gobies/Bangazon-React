import React, { Component } from 'react';
import CustManager from '../modules/customerManager';
import { Link } from "react-router-dom";


export default class Customers extends Component {

  state = {
    firstName: '',
    lastName: '',
    street_address: '',
    city: '',
    state: '',
    zipcode: '',
    phone_number: '',
    date_joined: '',
    date_deleted: ''
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  newCustomerSubmit = e => {
    e.preventDefault();
    const newCustToSave = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      street_address: this.state.street_address,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      phone_number: this.state.phone_number,
      date_joined: this.state.date_joined,
      date_deleted: this.state.date_deleted
    }

    CustManager.newCustomer(newCustToSave)
      .then((custs) => this.props.setCustomerState(custs))
  }

  render() {
    return (
      <>
        <h1>BANGAZON CUSTOMERS</h1>
        <ul>
          {this.props.customers.map(cust =>

            <li key={cust.id}><Link to={`/customers/${cust.id}`}> {cust.lastName}, {cust.firstName}</Link></li>

          )}
        </ul>
        <h1>ADD NEW CUSTOMER</h1>
        <form onSubmit={this.newCustomerSubmit}>
          <p>
            <label for="firstName">First Name</label>
            <input onChange={this.handleFieldChange} id='firstName' type='text'></input>
          </p>
          <p>
            <label for="lastName">Last Name</label>
            <input onChange={this.handleFieldChange} id='lastName' type='text'></input>
          </p>
          <p>
            <label for="street_address">Street Address</label>
            <input onChange={this.handleFieldChange} id='street_address' type='text'></input>
          </p>
          <p>
            <label for="city">City</label>
            <input onChange={this.handleFieldChange} id='city' type='text'></input>
          </p>
          <p>
            <label for="state">State</label>
            <input onChange={this.handleFieldChange} id='state' type='text'></input>
          </p>
          <p>
            <label for="zipcode">Zipcode</label>
            <input onChange={this.handleFieldChange} id='zipcode' type='text'></input>
          </p>
          <p>
            <label for="phone_number">Phone Number</label>
            <input onChange={this.handleFieldChange} id='phone_number' type='number'></input>
          </p>
          <p>
            <label for="date_joined">Date Joined</label>
            <input onChange={this.handleFieldChange} id='date_joined' type='date'></input>
          </p>
          <p>
            <label for="date_deleted">Date Deleted</label>
            <input onChange={this.handleFieldChange} id='date_deleted' type='date'></input>
          </p>
          <button type="submit">Add New Customer</button>
        </form>
      </>
    )
  }
}