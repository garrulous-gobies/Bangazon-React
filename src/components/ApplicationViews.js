import { Route } from "react-router-dom";
import React, { Component } from "react";
import Departments from './Departments';
import DepartmentDetails from './DepartmentDetails';
import Customers from './Customers';
// import DepartmentDetails from './DepartmentDetails';
import Home from './Home'
import DeptManager from '../modules/departmentManager'
import CustManager from '../modules/customerManager'


class ApplicationViews extends Component {

  state = {
    customers: [],
    departments: []
  }

  componentDidMount() {

    DeptManager.getDepartments()
      .then(depts => {
        this.setState({ 'departments': depts })
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


  render() {

    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <Home/>
        }} />
        <Route exact path="/customers" render={(props) => {
          return <Customers
            customers={this.state.customers}
            setCustomerState={this.setCustomerState}
            />
        }} />
        <Route exact path="/customers/:customerId(\d+)" render={(props) => {
          return <DepartmentDetails
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
      </React.Fragment >
    )
  }
}


export default ApplicationViews