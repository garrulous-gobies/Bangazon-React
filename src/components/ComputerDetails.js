import React, { Component } from 'react';
import computerManager from '../modules/computerManager';
import { Link } from "react-router-dom"


export default class ComputerDetails extends Component {

  componentDidMount() {
    const comp = this.props.computers.find(c => c.id === parseInt(this.props.match.params.computerId)) || {}
    this.setState({
      'model': comp.model,
      'manufacturer': comp.manufacturer,
      'id': comp.id,
      'purchaseDate': comp.purchaseDate,
      'decommissionDate': comp.decommissionDate,
      'url': comp.url
    })
 }

  state = {
    model: '',
    manufacturer: '',
    purchaseDate: '',
    decommissionDate: ''
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  compUpdateSubmit = (e, id) => {
    e.preventDefault()
    const newCompToSave = {
      model: this.state.model,
      manufacturer: this.state.manufacturer,
      purchaseDate : this.state.purchaseDate,
      decommissionDate: this.state.decommissionDate
    }
    computerManager.updateComputer(newCompToSave, this.state.id)
    .then((depts) => this.props.setCompState(depts))
    .then(() => this.props.history.push("/computers"))
  }

  deleteOnClick = (id) => {
    computerManager.deleteComputer(id)
    .then((computers) => this.props.setCompState(computers))
    .then(() => this.props.history.push("/computers"))
  }

    render() {
        return (
            <>
                <h1>COMPUTER</h1>
                <h5><Link to={'/computers'}>Back To Computer List</Link></h5>
                <button onClick={() => this.deleteOnClick(this.state.id)}>Delete Computer</button>
                <ul>
                    <li>Name: {this.state.model}</li>
                    <li>Manufacturer: {this.state.manufacturer}</li>
                    <li>Purchase Date: {this.state.purchaseDate}</li>
                    {
                      this.state.decommissionDate == null
                      ?
                      <li>Decommission Date: Still In Use </li>
                      :
                      <li>Decommission Date: {this.state.decommissionDate}</li>
                    }
                    <li><Link to={`/computers/${this.state.id}`}>URL: {this.state.url}</Link></li>
                </ul>
                <form onSubmit={(e) => this.compUpdateSubmit(e)}>
                    <label htmlFor="model">Dept Name</label>
                    <input defaultValue={this.state.model} onChange={this.handleFieldChange} id='model' type='text'></input>
                    <label htmlFor="manufacturer">Dept Budget</label>
                    <input defaultValue={this.state.manufacturer} onChange={this.handleFieldChange} id='manufacturer' type='text'></input>
                    <label htmlFor="purchaseDate">purchaseDate</label>
                    <input defaultValue={this.state.purchaseDate} onChange={this.handleFieldChange} id='purchaseDate' type='date'></input>
                    <label htmlFor="decommissionDate">Dept Budget</label>
                    <input defaultValue={this.state.decommissionDate} onChange={this.handleFieldChange} id='decommissionDate' type='date'></input>
                    <button type='submit'>Complete Edit</button>
                </form>
            </>
        )
    }
}