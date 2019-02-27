import React, { Component } from 'react';
import CustManager from '../modules/customerManager'

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
    phone_number: '',
    date_joined: '',
    date_deleted: ''
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  custUpdateSubmit = (e, id) => {
    e.preventDefault()
    let item = {
      name: this.state.dept_name,
      budget: this.state.dept_budget
    }
    CustManager.updateCustomer(item, this.state.id)
      .then((custs) => this.props.setDeptState(custs))
      .then(() => this.props.history.push("/customers"))
  }

  render() {
    return (
      <>
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
            <label for="firstName">First Name</label>
            <input defaultValue={this.state.firstName} onChange={this.handleFieldChange} id='firstName' type='text'></input>
          </p>
          <p>
            <label for="lastName">Last Name</label>
            <input defaultValue={this.state.lastName} onChange={this.handleFieldChange} id='lastName' type='text'></input>
          </p>
          <p>
            <label for="street_address">Street Address</label>
            <input defaultValue={this.state.lastName} onChange={this.handleFieldChange} id='street_address' type='text'></input>
          </p>
          <p>
            <label for="city">City</label>
            <input defaultValue={this.state.city} onChange={this.handleFieldChange} id='city' type='text'></input>
          </p>
          <p>
            <label for="state_">State</label>
            <input defaultValue={this.state.state_} onChange={this.handleFieldChange} id='state_' type='text'></input>
          </p>
          <p>
            <label for="zipcode">Zipcode</label>
            <input defaultValue={this.state.zipcode} onChange={this.handleFieldChange} id='zipcode' type='text'></input>
          </p>
          <p>
            <label for="phone_number">Phone Number</label>
            <input defaultValue={this.state.phone_number} onChange={this.handleFieldChange} id='phone_number' type='number'></input>
          </p>
          <p>
            <label for="date_joined">Date Joined</label>
            <input defaultValue={this.state.date_joined} onChange={this.handleFieldChange} id='date_joined' type='date'></input>
          </p>
          <p>
            <label for="date_deleted">Date Deleted</label>
            <input defaultValue={this.state.date_deleted} onChange={this.handleFieldChange} id='date_deleted' type='date'></input>
          </p>
          <button type='submit'>Complete Edit</button>
        </form>
      </>
    )
  }
}