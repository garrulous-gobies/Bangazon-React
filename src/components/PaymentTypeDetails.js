import React, { Component } from 'react'
import paymentTypeManager from '../modules/paymentTypeManager'
import { Link } from "react-router-dom"


export default class PaymentTypeDetails extends Component {


  state = {
    payType_name: '',
    payType_accountNumber: ''
  }


  componentDidMount() {
    const payType = this.props.paymentTypes.find(pT => pT.id === parseInt(this.props.match.params.paymentTypeId)) || {}
    this.setState({
      'payType_name': payType.name,
      'payType_accountNumber': payType.accountNumber,
      'id': payType.id
    })
  }


  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  payTypeUpdateSubmit = (e, id) => {
    e.preventDefault()
    let item = {
      name: this.state.payType_name,
      accountNumber: this.state.payType_accountNumber
    }
    paymentTypeManager.updatePaymentType(item, this.state.id)
      .then((payType) => this.props.setPayTypeState(payType))
      .then(() => this.props.history.push("/payment_types/"))
  }

  deletePaymentType = id => {
    paymentTypeManager.deletePaymentType(id)
      .then((payType) => this.props.setPayTypeState(payType))
      .then(() => this.props.history.push("/payment_types/"))
  }


// TODO: add logic to remove delete button from options with with orders associated with it
  render() {
    return (
      <>
        <h5><Link to={'/payment_types/'}>Back To Payment Types</Link></h5>
        <h1>Payment Type: {this.state.payType_name}</h1>
        <p>Account Number: {this.state.payType_accountNumber}</p>
        <br></br>
        <form onSubmit={(e) => this.payTypeUpdateSubmit(e)}>
          <label htmlFor="payType_name">Payment Type Name</label>
          <input defaultValue={this.state.payType_name} onChange={this.handleFieldChange} id='payType_name' type='text'></input>
          <label htmlFor="payType_accountNumber">Payment Type Account Number</label>
          <input defaultValue={this.state.payType_accountNumber} onChange={this.handleFieldChange} id='payType_accountNumber' type='text'></input>
          <button type='submit'>Complete Edit</button>
        </form>
        <button onClick={() => this.deletePaymentType(`${this.state.id}`)}>Delete</button>
      </>
    )
  }
}
