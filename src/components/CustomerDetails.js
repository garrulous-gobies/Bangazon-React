import React, { Component } from 'react';
import CustManager from '../modules/customerManager'

export default class Customer extends Component {

  componentDidMount() {
    const cust = this.props.customers.find(c => c.id === parseInt(this.props.match.params.employeeId)) || {}
    this.setState({
      id = cust.id,
      firstName: cust.firstName,
      lastName: cust.lastName,
      street_address: cust.street_address,
      city: cust.city,
      state: cust.state,
      zipcode: cust.zipcode,
      phone_number: cust.zipcode,
      date_joined: cust.date_joined,
      date_deleted: cust.date_deleted
    })
  }

  state = {
    id = '',
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
          <li>Name: {this.state.firstName} {this.state.lastName}</li>
          <li>Address: {this.state.street_address}; {this.state.city}, {this.state.state} {this.state.zipcode}</li>
        </ul>
        <form onSubmit={(e) => this.custUpdateSubmit(e)}>
          <label for="firstName">First Name</label>
          <input defaultValue={this.state.firstName} onChange={this.handleFieldChange} id='firstName' type='text'></input>
          <label for="lastName">Last Budget</label>
          <input defaultValue={this.state.lastName} onChange={this.handleFieldChange} id='lastName' type='text'></input>
          <button type='submit'>Complete Edit</button>
        </form>
      </>
    )
  }
}