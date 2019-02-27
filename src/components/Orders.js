import React, { Component } from 'react';
import OrderManager from '../modules/orderManager';
import { Link } from "react-router-dom";


export default class Orders extends Component {

  state = {
    customer_id: null,
    payment_date: null,
    payment_type_id: null
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  newOrderSubmit = e => {
    console.log(e)
    e.preventDefault();
    const newOrderToSave = {
      customer_id: this.state.customer_id,
      payment_date: this.state.payment_date,
      payment_type_id: this.state.payment_type_id
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

              <Link to={`/orders/${order.id}`}>Order ID: {order.id}&nbsp;|&nbsp;Customer ID: {order.customer_id}&nbsp;|&nbsp;{order.payment_type_id == null ? <a>Status: Open</a> : <a>Status: Complete</a>}
              </Link>

            </li>

          )}
        </ul>
        <h1>ADD NEW ORDER</h1>
        <form onSubmit={this.newOrderSubmit}>
          <p>
            <label htmlFor="customer_id">Customer ID</label>
            <input onChange={this.handleFieldChange} id='customer_id' type='number'></input>
          </p>
          <p>
            <label htmlFor="payment_date">Payment Date</label>
            <input onChange={this.handleFieldChange} id='payment_date' type='date'></input>
          </p>
          <p>
            <label htmlFor="payment_type_id">Payment Type ID</label>
            <input onChange={this.handleFieldChange} id='payment_type_id' type='number'></input>
          </p>
          <button type="submit">Add New Order</button>
        </form>
      </>
    )
  }
}