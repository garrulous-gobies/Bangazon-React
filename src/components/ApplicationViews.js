import { Route } from "react-router-dom";
import React, { Component } from "react";
import Home from './Home'

import DeptManager from '../modules/departmentManager'
import Departments from './Departments';
import DepartmentDetails from './DepartmentDetails';

import CustManager from '../modules/customerManager'
import Customers from './Customers';
import CustomerDetails from './CustomerDetails';

import ComputerManager from '../modules/computerManager'
import Computers from './Computers'
import ComputerDetails from './ComputerDetails'

import ProductManager from '../modules/productManager'
import Products from './Products'
import ProductDetails from './ProductDetails'

import paymentTypeManager from '../modules/paymentTypeManager'
import PaymentType from "./PaymentType";
import PaymentTypeDetails from "./PaymentTypeDetails";
import TrainingPrograms from "./TrainingProgram";
import TrainingProgramDetail from "./TrainingProgramDetails";
import trainingProgramManager from "../modules/trainingProgramManager";

class ApplicationViews extends Component {

  state = {
    customers: [],
    departments: [],
    paymentTypes: [],
    products: [],
    computers: [],
    trainingProgram: []
  }

  componentDidMount() {

    DeptManager.getDepartments()
      .then(depts => {
        this.setState({ 'departments': depts })
      })
      .then(() => {
        ComputerManager.getComputers()
          .then(computers => this.setCompState(computers))
      })

    paymentTypeManager.getPaymentTypes()
      .then(payType => {
        this.setState({ 'paymentTypes': payType })
      })

    trainingProgramManager.getTrainingPrograms()
      .then(training => {
        this.setState({ 'trainingProgram': training })
      })

    CustManager.getCustomers()
      .then(custs => {
        this.setState({ 'customers': custs })
      })

    ProductManager.getProducts()
      .then(products => {
        this.setState({ 'products': products })
      })

  }

  setDeptState = (depts) => {
    this.setState({ 'departments': depts })
  }

  setCustomerState = (custs) => {
    this.setState({ 'customers': custs })
  }

  setProductState = (products) => {
    this.setState({ 'products': products })
  }

  setCompState = (computers) => {
    this.setState({ 'computers': computers })
  }

  setPayTypeState = payType => {
    this.setState({ 'paymentTypes': payType })
  }

  setTrainingState = training => {
    this.setState({ 'trainingProgram': training })
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
        <Route exact path="/trainings/" render={(props) => {
          return <TrainingPrograms
            trainingProgram={this.state.trainingProgram}
            setTrainingState={this.setTrainingState}
          />
        }} />
        <Route exact path="/trainings/:trainingId(\d+)" render={(props) => {
          return <TrainingProgramDetail
            {...props}
            trainingProgram={this.state.trainingProgram}
            setTrainingState={this.setTrainingState}
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
        <Route exact path="/products" render={(props) => {
          return <Products
            setProductState={this.setProductState}
            products={this.state.products}
          />
        }} />
        <Route exact path="/products/:productId(\d+)" render={(props) => {
          return <ProductDetails
            {...props}
            products={this.state.products}
            setProductState={this.setProductState}
          />
        }} />
      </React.Fragment >
    )
  }

}

export default ApplicationViews