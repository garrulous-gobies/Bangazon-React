import React, { Component } from 'react'
import employeeManager from '../modules/employeeManager'
import { Link } from "react-router-dom"

export default class Employee extends Component {

  state = {
    firstName: "",
    lastName: "",
    startDate: null,
    isSupervisor: false,
  }


  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleCheckbox = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.checked
    this.setState(stateToChange)
  }

  newEmployeeSubmit = e => {
    e.preventDefault();
    const newEmployeeToSave = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      startDate: this.state.startDate,
      isSupervisor: this.state.isSupervisor,
      department: null,
      current_computer: null
    }
    employeeManager.newEmployee(newEmployeeToSave)
      .then((emp) => this.props.setEmployeeState(emp))
  }

  render() {
    return (
      <>
        <h5><Link to={`/`}>Back to API root</Link></h5>
        <h1>BANGAZON EMPLOYEES</h1>
        <ul>
          {this.props.employees.map(emp =>

            <li key={emp.id}><Link to={`/employees/${emp.id}`}> {emp.lastName}, {emp.firstName}</Link></li>

          )}
        </ul>
        <h1>ADD NEW EMPLOYEE</h1>
        <form onSubmit={this.newEmployeeSubmit}>

          <label htmlFor="firstName">First Name</label>
          <input onChange={this.handleFieldChange} id='firstName' type='text'></input>

          <label htmlFor="lastName">Last Name</label>
          <input onChange={this.handleFieldChange} id='lastName' type='text'></input>

          <label htmlFor="startDate">Start Date</label>
          <input onChange={this.handleFieldChange} id='startDate' type='date'></input>

          <label htmlFor="isSupervisor">Supervior?</label>
          <input onChange={this.handleCheckbox} id='isSupervisor' type='checkbox'></input>

          <button type="submit">Add New Employee</button>
        </form>
      </>
    )
  }

}