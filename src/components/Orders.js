import React, { Component } from 'react';
import OrderManager from '../modules/orderManager';
import { Link } from "react-router-dom";


export default class Orders extends Component {

  state = {
    payment_date: null,
    payment_type: null
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  //TODO: Determine method to add specific customer
  newOrderSubmit = e => {
    e.preventDefault();
    const newOrderToSave = {
      customer: 'http://localhost:8000/api/v1/customers/1/',
      payment_date: this.state.payment_date,
      payment_type: this.state.payment_type
    }
    OrderManager.newOrder(newOrderToSave)
      .then((order) => this.props.setOrderState(order))
  }

  render() {
    return (
      <>
        <h5><Link to={`/`}>Back to API root</Link></h5>
        <h1>BANGAZON ORDERS</h1>
        <ul>
          {this.props.orders.map(order =>

            <li key={order.id}>
              <Link to={`/orders/${order.id}`}>Order ID: {order.id}</Link> | {order.payment_type == null ? 'Status: Open' : 'Status: Complete'}
            </li>

          )}
        </ul>
        <h1>ADD NEW ORDER</h1>
        <form onSubmit={this.newOrderSubmit}>
          <p>
            <label htmlFor="payment_date">Payment Date</label>
            <input onChange={this.handleFieldChange} id='payment_date' type='date'></input>
          </p>
          <button type="submit">Add New Order</button>
        </form>
      </>
    )
  }
}