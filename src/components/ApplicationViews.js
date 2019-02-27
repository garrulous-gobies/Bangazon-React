import { Route } from "react-router-dom";
import React, { Component } from "react";
import Departments from './Departments';
import DepartmentDetails from './DepartmentDetails';
import Customers from './Customers';
import CustManager from '../modules/customerManager'
import Home from './Home'
import DeptManager from '../modules/departmentManager'
import Computers from './Computers'
import ComputerDetails from './ComputerDetails'
import Home from './Home'
import DeptManager from '../modules/departmentManager'
import ComputerManager from '../modules/computerManager'
import paymentTypeManager from '../modules/paymentTypeManager'
import PaymentType from "./PaymentType";
import PaymentTypeDetails from "./PaymentTypeDetails";

class ApplicationViews extends Component {

  state = {
    customers: [],
    departments: [],
    computers: [],
    paymentTypes: []
  }

  componentDidMount() {

    DeptManager.getDepartments()
      .then(depts => {
        this.setState({ 'departments': depts })
      })
      .then(() => {
        ComputerManager.getComputers()
        .then( computers => this.setCompState(computers))
      })

    paymentTypeManager.getPaymentTypes()
      .then(payType => {
        this.setState({ 'paymentTypes': payType })
      })

    CustManager.getCustomers()
      .then(custs => {
        this.setState({ 'customers': custs })
      })

  }

  setDeptState = (depts) => {
    this.setState({ 'departments': depts })
  }

  setCustomerState = (custs) => {
    this.setState({ 'customers': custs })
  }

  setCompState = (computers) => {
    this.setState({ 'computers': computers })
  }

  setPayTypeState = payType => {
    this.setState({ 'paymentTypes': payType })
  }

  render() {

    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <Home />
        }} />
        <Route exact path="/customers" render={(props) => {
          return <Customers
            customers={this.state.customers}
            setCustomerState={this.setCustomerState}
            />
        }} />
        <Route exact path="/customers/:customerId(\d+)" render={(props) => {
          return <CustomerDetails
            {...props}
            customers={this.state.customers}
            setCustomerState={this.setCustomerState}
            />
        }} />
        <Route exact path="/departments" render={(props) => {
          return <Departments
            departments={this.state.departments}
            setDeptState={this.setDeptState}
          />
        }} />
        <Route exact path="/departments/:departmentId(\d+)" render={(props) => {
          return <DepartmentDetails
            {...props}
            departments={this.state.departments}
            setDeptState={this.setDeptState}
          />
        }} />
        <Route exact path="/payment_types/" render={(props) => {
          return <PaymentType
            paymentTypes={this.state.paymentTypes}
            setPayTypeState={this.setPayTypeState}
          />
        }} />
        <Route exact path="/payment_types/:paymentTypeId(\d+)" render={(props) => {
          return <PaymentTypeDetails
            {...props}
            paymentTypes={this.state.paymentTypes}
            setPayTypeState={this.setPayTypeState}
          />
        }} />
        <Route exact path="/computers" render={(props) => {
          return <Computers
            computers={this.state.computers}
            setCompState={this.setCompState}
            />
        }} />
        <Route exact path="/computers/:computerId(\d+)" render={(props) => {
          return <ComputerDetails
            {...props}
            computers={this.state.computers}
            setCompState={this.setCompState}
            />
        }} />
      </React.Fragment >
    )
  }
}


export default ApplicationViews