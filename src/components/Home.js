import React, { Component } from 'react';
import ApplicationViews from './ApplicationViews';
import { Link } from 'react-router-dom'

export default class Home extends Component {
  render() {
    return (
      <>
        <h1>Welcome to the Bangazon API Viewer</h1>
        <ul>
          <li><Link to={`/employees/`}>Employees</Link></li>
          <li><Link to={`/departments/`}>Departments</Link></li>
          <li><Link to={`/computers/`}>Computers</Link></li>
          <li><Link to={`/trainings/`}>Trainings</Link></li>
          <li><Link to={`/customers/`}>Customers</Link></li>
          <li><Link to={`/orders/`}>Orders</Link></li>
          <li><Link to={`/products/`}>Products</Link></li>
          <li><Link to={`/product_types/`}>Product Types</Link></li>
          <li><Link to={`/payment_types/`}>Payment Types</Link></li>
        </ul>
      </>
    )
  }
}