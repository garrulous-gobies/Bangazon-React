import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Departments from './Departments';
import DepartmentDetails from './DepartmentDetails';
import APIManager from '../modules/APIManager';
import Home from './Home'

const departmentManager = new APIManager('departments')

class ApplicationViews extends Component {

  state = {
    departments: []
  }

  componentDidMount() {

    this.getDepartments()
      .then(depts => {
        this.setState({ 'departments': depts })
      })

  }

  getDepartments = () => {
    return departmentManager.all()
  }

  getSingleDepartment = id => {
    return departmentManager.get(id)
  }

  // deleteDepartment = id => {
  //   return departmentManager.delete(id)
  // }

  newDepartment = postItem => {
    return departmentManager.post(postItem).then(() => this.getDepartments()).then(depts => {
      this.setState({ 'departments': depts })
    })
  }

  updateDepartment = (item, id) => {
      return departmentManager.put(item, id).then(() => this.getDepartments()).then(depts => {
        this.setState({ 'departments': depts })
      })
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
            newDepartment={this.newDepartment}
            />
        }} />
        <Route exact path="/departments/:departmentId(\d+)" render={(props) => {
          return <DepartmentDetails
            {...props}
            departments={this.state.departments}
            updateDepartment={this.updateDepartment}
            />
        }} />
      </React.Fragment >
    )
  }
}


export default ApplicationViews