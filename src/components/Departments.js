import React, { Component } from 'react';
import DeptManager from '../modules/departmentManager'
import { Link } from "react-router-dom"


export default class Department extends Component {

  state = {
    dept_name: '',
    dept_budget: ''
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  newDeptSubmit = e => {
    e.preventDefault();
    const newDeptToSave = {
      name: this.state.dept_name,
      budget: this.state.dept_budget
    }
    DeptManager.newDepartment(newDeptToSave)
    .then((depts) => this.props.setDeptState(depts))
  }

  render() {
    return (
      <>
        <h1>BANGAZON DEPARTMENTS</h1>
        <ul>
          {this.props.departments.map(dept =>

            <li key={dept.id}><Link to={`/departments/${dept.id}`}> {dept.name}, ${dept.budget}</Link></li>

          )}
        </ul>
        <form onSubmit={this.newDeptSubmit}>
            <label for="dept_name">Dept Name</label>
            <input onChange={this.handleFieldChange} id='dept_name' type='text'></input>
            <label for="dept_budget">Dept Budget</label>
            <input onChange={this.handleFieldChange} id='dept_budget' type='text'></input>
            <button type="submit">Create New Department</button>
        </form>
      </>
    )
  }
}