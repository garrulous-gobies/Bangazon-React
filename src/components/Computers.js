import React, { Component } from 'react';
import ComputerManager from '../modules/computerManager'
import { Link } from "react-router-dom"


export default class Computer extends Component {

  state = {
    model: '',
    manufacturer: '',
    purchaseDate: null,
    decommissionDate: null
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  newCompSubmit = e => {
    e.preventDefault();
    const newCompToSave = {
      model: this.state.model,
      manufacturer: this.state.manufacturer,
      purchaseDate: this.state.purchaseDate,
      decommissionDate: this.state.decommissionDate
    }
    ComputerManager.newComputer(newCompToSave)
      .then((computers) => this.props.setCompState(computers))
  }

  render() {
    return (
      <>
        <h1>BANGAZON COMPUTERS</h1>
        {this.props.computers.map(comp =>
          <ul key={comp.id}>
            <li>Model: {comp.model}</li>
            <li>manufacturer: {comp.manufacturer}</li>
            <li>Purchase Date: {comp.purchaseDate}</li>
            {
              comp.decommissionDate == null
                ?
                <li>Decommission Date: Still In Use </li>
                :
                <li>Decommission Date: {comp.decommissionDate}</li>
            }
            <li><Link to={`/computers/${comp.id}`}>URL: {comp.url}</Link></li>
          </ul>
        )}
        <form onSubmit={this.newCompSubmit}>
          <label htmlFor="model">Computer model</label>
          <input onChange={this.handleFieldChange} id='model' type='text'></input>
          <label htmlFor="manufacturer">Computer manufacturer</label>
          <input onChange={this.handleFieldChange} id='manufacturer' type='text'></input>
          <label htmlFor="purchaseDate">purchaseDate</label>
          <input onChange={this.handleFieldChange} id='purchaseDate' type='date'></input>
          <label htmlFor="decommissionDate">Decommission Date: </label>
          <input onChange={this.handleFieldChange} id='decommissionDate' type='date'></input>
          <button type="submit">Create New Computer</button>
        </form>
      </>
    )
  }
}