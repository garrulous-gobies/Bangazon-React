import React, { Component } from 'react'
import DeptManager from '../modules/departmentManager'
import { Link } from "react-router-dom"

export default class Department extends Component {

  componentDidMount() {
    const dept = this.props.departments.find(d => d.id === parseInt(this.props.match.params.departmentId)) || {}
    this.setState({
      'dept_name': dept.name,
      'dept_budget': dept.budget,
      'id': dept.id
    })
  }

  state = {
    dept_name: '',
    dept_budget: ''
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  deptUpdateSubmit = (e, id) => {
    e.preventDefault()
    let item = {
      name: this.state.dept_name,
      budget: this.state.dept_budget
    }
    DeptManager.updateDepartment(item, this.state.id)
      .then((depts) => this.props.setDeptState(depts))
      .then(() => this.props.history.push("/departments"))
  }

  render() {
    return (
      <>
        <h5><Link to={`/departments`}>Back to Departments</Link></h5>
        <h1>DEPARTMENT</h1>
        <ul>
          <li>Name: {this.state.dept_name}</li>
          <li>Budget: ${this.state.dept_budget}</li>
        </ul>
        <form onSubmit={(e) => this.deptUpdateSubmit(e)}>
          <label for="dept_name">Dept Name</label>
          <input defaultValue={this.state.dept_name} onChange={this.handleFieldChange} id='dept_name' type='text'></input>
          <label for="dept_budget">Dept Budget</label>
          <input defaultValue={this.state.dept_budget} onChange={this.handleFieldChange} id='dept_budget' type='text'></input>
          <button type='submit'>Complete Edit</button>
        </form>
      </>
    )
  }
}