import React, { Component } from 'react';
import OrderManager from '../modules/orderManager'
import { Link } from "react-router-dom";

export default class Order extends Component {

  componentDidMount() {
    const order = this.props.orders.find(o => o.id === parseInt(this.props.match.params.orderId)) || {}
    this.setState({
      id: order.id,
      customer: order.customer,
      payment_date: order.payment_date,
      payment_type: order.payment_type,
    })
  }

  state = {
    id: null,
    customer: null,
    payment_date: null,
    payment_type: null
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  OrderUpdateSubmit = (e, id) => {
    e.preventDefault()
    let item = {
      customer: this.state.customer,
      payment_date: this.state.payment_date,
      payment_type: this.state.payment_type
    }
    OrderManager.updateOrder(item, this.state.id)
      .then((order) => this.props.setOrderState(order))
      .then(() => this.props.history.push("/orders"))
  }

  render() {
    return (
      <>
        <h5><Link to={`/orders`}>Back to Orders</Link></h5>
        <h1>ORDER DETAIL</h1>
        <ul>
          <li>Order ID: {this.state.id}</li>
          <li>Customer ID: {this.state.customer}</li>
          <li>Payment Type ID: {this.state.payment_type}</li>
          <li>Payment Date: {this.state.payment_date}</li>
        </ul>
        <form onSubmit={(e) => this.OrderUpdateSubmit(e)}>
          <p>
            <label htmlFor="customer">Customer: </label>
            <select id="customer" onChange={(e) => this.setState({ 'customer': e.target.value === '' ? null : e.target.value })}>
              {/* default value for customer is the order's customer */}
              {this.props.customers.map(customer =>

                this.state.customer === customer.url ?

                  <option selected key={customer.id} value={customer.url}>
                    {customer.lastName}, {customer.firstName}
                  </option>

                  :

                  <option key={customer.id} value={customer.url}>
                    {customer.lastName}, {customer.firstName}
                  </option>

              )}
            </select>
          </p>
          <p>
            <label htmlFor="payment_type">Payment Type: </label>
            <select id="payment_type" onChange={(e) => this.setState({ 'payment_type': e.target.value })}>
              <option value={null}></option>
              {this.props.paymentTypes.map(paymentType =>

                this.state.payment_type === paymentType.url ?

                  <option selected key={paymentType.id} value={paymentType.url}>
                    {paymentType.name} | {paymentType.accountNumber}
                  </option>

                  :

                  <option key={paymentType.id} value={paymentType.url}>
                    {paymentType.name} | {paymentType.accountNumber}
                  </option>

              )}
            </select>
          </p>
          <p>
            <label htmlFor="payment_date">Payment Date</label>
            <input onChange={this.handleFieldChange} id='payment_date' type='date'></input>
          </p>
          <button type="submit">Complete Edit</button>
        </form>
      </>
    )
  }
}