import { Route } from "react-router-dom";
import React, { Component } from "react";
import Departments from './Departments';
import DepartmentDetails from './DepartmentDetails';
import Computers from './Computers'
import ComputerDetails from './ComputerDetails'
import Home from './Home'
import DeptManager from '../modules/departmentManager'
import ComputerManager from '../modules/computerManager'


class ApplicationViews extends Component {

  state = {
    departments: [],
    computers: []
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

  }

  setDeptState = (depts) => {
    this.setState({ 'departments': depts })
  }

  setCompState = (computers) => {
    this.setState({ 'computers': computers })
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