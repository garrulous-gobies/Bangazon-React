import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Departments from './Departments';
import APIManager from '../modules/APIManager';

const departmentManager = new APIManager('departments')

class ApplicationViews extends Component {

  state = {
    departments: []
  }

  componentDidMount() {
    this.getDepartments().then(depts => {
      this.setState({ 'departments': depts })
    })
  }

  getDepartments = () => {
    return departmentManager.all()
  }

  render() {

    return (
      <React.Fragment>
        <Route exact path="/departments" render={(props) => {
        return <Departments departments={this.state.departments} />
        }} />
      </React.Fragment >
    )
  }
}


export default ApplicationViews

{/* <Route path="/login" component={Login} />
<Route exact path="/" render={(props) => {
  if (this.isAuthenticated()) {
    return <LocationList locations={this.state.locations} />
  } else {
    return <Redirect to="/login" />
  }
}} />
<Route exact path="/animals" render={(props) => {
  if (this.isAuthenticated()) {
    return <AnimalList {...props}
      animals={this.state.animals} owners={this.state.owners} animalsOwned={this.animalsOwned} deleteAnimal={this.deleteAnimal} />
  } else {
    return <Redirect to="/login" />
  }
}} />
{/* We pass employees to the AnimalForm so a dropdown can be populated */}
{/* <Route path="/animals/new" render={(props) => {
  return <AnimalForm {...props}
    addAnimal={this.addAnimal}
    employees={this.state.employees} />

}} />
<Route path="/animals/:animalId(\d+)" render={(props) => {
  return <AnimalDetail {...props} deleteAnimal={this.deleteAnimal} animals={this.state.animals} />
}} />
<Route exact path="/employees" render={(props) => {
  if (this.isAuthenticated()) {
    return <EmployeeList {...props} employees={this.state.employees} fireEmployee={this.fireEmployee} />
  } else {
    return <Redirect to="/login" />
  }
}} />
<Route path="/search"></Route> */}