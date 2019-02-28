import React, { Component } from 'react'
import paymentTypeManager from '../modules/paymentTypeManager'
import { Link } from "react-router-dom"

export default class PaymentType extends Component {

  state = {
    payType_name: '',
    payType_accountNumber: '',

  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }


  // TODO: figure out a way to add a specific customer to a payment type when creating a new payment type
  newPayTypeSubmit = e => {
    e.target.checkValidity()
    e.preventDefault();
    const newPayTypeToSave = {
      name: this.state.payType_name,
      accountNumber: this.state.payType_accountNumber,
      customer: 'http://localhost:8000/api/v1/customers/1/'
    }
    paymentTypeManager.newPaymentType(newPayTypeToSave)
      .then((payType) => this.props.setPayTypeState(payType))
  }

  // TODO: display customer name with payment type info
  render() {
    return (
      <>
        <h5><Link to={`/`}>Back to API root</Link></h5>
        <h1>BANGAZON PAYMENT TYPES</h1>
        <ul>
          {this.props.paymentTypes.map(payType =>

            <li key={payType.id}><Link to={`/payment_types/${payType.id}`}> {payType.name} -- {payType.accountNumber}</Link></li>

          )}
        </ul>
        <form onSubmit={(e) => this.newPayTypeSubmit(e)}>
          <label htmlFor="payType_name">Payment Type Name</label>
          <input required defaultValue={this.state.payType_name} onChange={this.handleFieldChange} id='payType_name' type='text'></input>
          <label htmlFor="payType_accountNumber">Payment Type Account Number</label>
          <input required defaultValue={this.state.payType_accountNumber} onChange={this.handleFieldChange} id='payType_accountNumber' type='number'></input>
          <button type='submit'>Create New Payment Type</button>
        </form>

      </>
    )
  }
}