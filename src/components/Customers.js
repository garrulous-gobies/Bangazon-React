import React, { Component } from 'react';
import CustManager from '../modules/customerManager';
import { Link } from "react-router-dom";


export default class Customers extends Component {

  state = {
    firstName: '',
    lastName: '',
    street_address: '',
    city: '',
    state_: '',
    zipcode: '',
    phone_number: null,
    date_joined: null,
    date_deleted: null
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  newCustomerSubmit = e => {
    e.target.checkValidity()
    e.preventDefault();
    const newCustToSave = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      street_address: this.state.street_address,
      city: this.state.city,
      state: this.state.state_,
      zipcode: this.state.zipcode,
      phone_number: this.state.phone_number,
      date_joined: this.state.date_joined,
      date_deleted: this.state.date_deleted
    }
    CustManager.newCustomer(newCustToSave)
      .then((cust) => this.props.setCustomerState(cust))
  }

  render() {
    return (
      <>
        <h5><Link to={`/`}>Back to API root</Link></h5>
        <h1>BANGAZON CUSTOMERS</h1>
        <ul>
          {this.props.customers.map(cust =>

            <li key={cust.id}><Link to={`/customers/${cust.id}`}> {cust.lastName}, {cust.firstName}</Link></li>

          )}
        </ul>
        <h1>ADD NEW CUSTOMER</h1>
        <form onSubmit={this.newCustomerSubmit}>
          <p>
            <label htmlFor="firstName">First Name</label>
            <input required onChange={this.handleFieldChange} id='firstName' type='text'></input>
          </p>
          <p>
            <label htmlFor="lastName">Last Name</label>
            <input required onChange={this.handleFieldChange} id='lastName' type='text'></input>
          </p>
          <p>
            <label htmlFor="street_address">Street Address</label>
            <input required onChange={this.handleFieldChange} id='street_address' type='text'></input>
          </p>
          <p>
            <label htmlFor="city">City</label>
            <input required onChange={this.handleFieldChange} id='city' type='text'></input>
          </p>
          <p>
            <label htmlFor="state_">State</label>
            <input required onChange={this.handleFieldChange} id='state_' type='text'></input>
          </p>
          <p>
            <label htmlFor="zipcode">Zipcode</label>
            <input required onChange={this.handleFieldChange} id='zipcode' type='text'></input>
          </p>
          <p>
            <label htmlFor="phone_number">Phone Number</label>
            <input required onChange={this.handleFieldChange} id='phone_number' type='number'></input>
          </p>
          <p>
            <label htmlFor="date_joined">Date Joined</label>
            <input required onChange={this.handleFieldChange} id='date_joined' type='date'></input>
          </p>
          <p>
            <label htmlFor="date_deleted">Date Deleted</label>
            <input onChange={this.handleFieldChange} id='date_deleted' type='date'></input>
          </p>
          <button type="submit">Add New Customer</button>
        </form>
      </>
    )
  }
}