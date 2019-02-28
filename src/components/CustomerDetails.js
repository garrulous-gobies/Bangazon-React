import React, { Component } from 'react';
import CustManager from '../modules/customerManager'
import { Link } from "react-router-dom";

export default class Customer extends Component {

  componentDidMount() {
    const cust = this.props.customers.find(c => c.id === parseInt(this.props.match.params.customerId)) || {}
    this.setState({
      id: cust.id,
      firstName: cust.firstName,
      lastName: cust.lastName,
      street_address: cust.street_address,
      city: cust.city,
      state_: cust.state,
      zipcode: cust.zipcode,
      phone_number: cust.zipcode,
      date_joined: cust.date_joined,
      date_deleted: cust.date_deleted
    })
  }

  state = {
    id: '',
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

  custUpdateSubmit = (e, id) => {
    e.target.checkValidity()
    e.preventDefault()
    let item = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      street_address: this.state.street_address,
      city: this.state.city,
      state: this.state.state_,
      zipcode: this.state.zipcode,
      phone_number: this.state.phone_number,
      date_joined: this.state.date_joined,
      date_deleted: this.state.date_deleted,
    }
    CustManager.updateCustomer(item, this.state.id)
      .then((cust) => this.props.setCustomerState(cust))
      .then(() => this.props.history.push("/customers"))
  }

  render() {
    return (
      <>
        <h5><Link to={`/customers`}>Back to Customers</Link></h5>
        <h1>CUSTOMER DETAIL</h1>
        <ul>
          <li>Employee ID: {this.state.id}</li>
          <li>Name: {this.state.firstName} {this.state.lastName}</li>
          <li>Address: {this.state.street_address}; {this.state.city}, {this.state.state} {this.state.zipcode}</li>
          <li>Phone number: {this.state.phone_number}</li>
          <li>Date joined: {this.state.date_joined}</li>
          {
              this.state.date_deleted == null
                ?
                <li>Date deleted: n/a </li>
                :
                <li>Date deleted: {this.state.date_deleted}</li>
          }
        </ul>
        <form onSubmit={(e) => this.custUpdateSubmit(e)}>
          <p>
            <label htmlFor="firstName">First Name</label>
            <input required defaultValue={this.state.firstName} onChange={this.handleFieldChange} id='firstName' type='text'></input>
          </p>
          <p>
            <label htmlFor="lastName">Last Name</label>
            <input required defaultValue={this.state.lastName} onChange={this.handleFieldChange} id='lastName' type='text'></input>
          </p>
          <p>
            <label htmlFor="street_address">Street Address</label>
            <input required defaultValue={this.state.street_address} onChange={this.handleFieldChange} id='street_address' type='text'></input>
          </p>
          <p>
            <label htmlFor="city">City</label>
            <input required defaultValue={this.state.city} onChange={this.handleFieldChange} id='city' type='text'></input>
          </p>
          <p>
            <label htmlFor="state_">State</label>
            <input required defaultValue={this.state.state_} onChange={this.handleFieldChange} id='state_' type='text'></input>
          </p>
          <p>
            <label htmlFor="zipcode">Zipcode</label>
            <input required defaultValue={this.state.zipcode} onChange={this.handleFieldChange} id='zipcode' type='text'></input>
          </p>
          <p>
            <label htmlFor="phone_number">Phone Number</label>
            <input required defaultValue={this.state.phone_number} onChange={this.handleFieldChange} id='phone_number' type='number'></input>
          </p>
          <p>
            <label htmlFor="date_joined">Date Joined</label>
            <input defaultValue={this.state.date_joined} onChange={this.handleFieldChange} id='date_joined' type='date'></input>
          </p>
          <p>
            <label htmlFor="date_deleted">Date Deleted</label>
            <input defaultValue={this.state.date_deleted} onChange={this.handleFieldChange} id='date_deleted' type='date'></input>
          </p>
          <button type='submit'>Complete Edit</button>
        </form>
      </>
    )
  }
}