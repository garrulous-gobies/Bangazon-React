import { Route } from "react-router-dom";
import React, { Component } from "react";
import Departments from './Departments';
import DepartmentDetails from './DepartmentDetails';
import Home from './Home'
import DeptManager from '../modules/departmentManager'
import Products from './Products'
import ProductManager from '../modules/productManager'


class ApplicationViews extends Component {

  state = {
    departments: [],
    products: []
  }

  componentDidMount() {

    DeptManager.getDepartments()
      .then(depts => {
        this.setState({ 'departments': depts })
      })

    ProductManager.getProducts()
      .then(products => {
        this.setState({ 'products': products })
      })

  }

  setDeptState = (depts) => {
    this.setState({ 'departments': depts })
  }

  setProductState = (products) => {
    this.setState({ 'products': products })
  }


  render() {

    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <Home/>
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
        <Route exact path="/products" render={(props) => {
          return <Products
            setProductState={this.setProductState}
            products={this.state.products}
            />
        }} />
      </React.Fragment >
    )
  }
}


export default ApplicationViews