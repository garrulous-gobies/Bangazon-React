import React, { Component } from 'react'
import employeeManager from '../modules/employeeManager'
import { Link } from "react-router-dom"


export default class EmployeeDetails extends Component {

  componentDidMount() {
    const emp = this.props.employees.find(emp => emp.id === parseInt(this.props.match.params.employeeId)) || {}
    this.setState({
      'firstName': emp.firstName,
      'lastName': emp.lastName,
      'startDate': emp.startDate,
      'isSupervisor': emp.isSupervisor,
      'department': emp.department,
      'current_computer': emp.current_computer,
      'id': emp.id
    })
  }

  state={
    firstName:"",
    lastName:"",
    startDate:"",
    isSupervisor: false,
    department: {},
    current_computer: null

  }

  deleteEmployeeProgram = id => {
     employeeManager.deleteEmployee(id)
      .then((employee) => this.props.setEmployeeState(employee))
      .then(() => this.props.history.push("/employees/"))
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

  empUpdateSubmit = (e, id) => {
    e.target.checkValidity()
    e.preventDefault()
    let item = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      startDate: this.state.startDate,
      isSupervisor: this.state.isSupervisor,
    }
    employeeManager.updateEmployee(item, this.state.id)
      .then((emp) => this.props.setEmployeeState(emp))
      .then(() => this.props.history.push("/employees"))
  }

  render(){
    return(
      <>
        <h5><Link to={`/employees`}>Back to Employees</Link></h5>
        <h1>EMPLOYEE</h1>
        <ul>
          <li>Name: {this.state.firstName} {this.state.lastName}</li>
          <li>Date Started: {this.state.startDate}</li>
          <li>{this.state.isSupervisor === false ? "Not a Supervisor": "Is a Supervisor"}</li>
          <li>{this.state.department == null ? "Currently not assigned to a department" : `In the ${this.state.department.name} department` }</li>
          <li>{this.state.current_computer == null ? "Currently not assigned a computer" : `Currently assigned the ${this.state.current_computer.computer.manufacturer} ${this.state.current_computer.computer.model}`}</li>
          
        </ul>
        <form onSubmit={(e) => this.empUpdateSubmit(e)}>
          <label htmlFor="firstName">First Name</label>
          <input required defaultValue={this.state.firstName} onChange={this.handleFieldChange} id='firstName' type='text'></input>

          <label htmlFor="lastName">Last Name</label>
          <input required defaultValue={this.state.lastName} onChange={this.handleFieldChange} id='lastName' type='text'></input>

          <label htmlFor="startDate">Start Date</label>
          <input required defaultValue={this.state.startDate} onChange={this.handleFieldChange} id='startDate' type='date'></input>

          <label htmlFor="isSupervisor">Is a Supervior</label>
          <input checked={this.state.isSupervisor} onChange={this.handleCheckbox} id='isSupervisor' type='checkbox'></input>
          <button type='submit'>Complete Edit</button>
        </form>
        <button onClick={() => this.deleteEmployeeProgram(`${this.state.id}`)}>Delete</button>

      </>
    )
  }
}