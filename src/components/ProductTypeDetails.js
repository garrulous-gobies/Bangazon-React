import React, { Component } from 'react';
import productTypeManager from '../modules/productTypeManager';
import { Link } from "react-router-dom"

export default class Department extends Component {

  componentDidMount() {
    const prodType = this.props.productTypes.find(p => p.id === parseInt(this.props.match.params.productTypeId)) || {}
    this.setState({
      'name': prodType.name,
      'id': prodType.id
    })
  }

  state = {
    name: ''
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  prodTypeUpdateSubmit = (e, id) => {
    e.preventDefault()
    let item = {
      name: this.state.name
    }
    productTypeManager.updateProductType(item, this.state.id)
      .then((prodTypes) => this.props.setProductTypeState(prodTypes))
      .then(() => this.props.history.push("/product_types"))
  }

  deleteOnClick = (id) => {
    productTypeManager.deleteProductType(id)
    .then((prodType) => this.props.setProductTypeState(prodType))
    .then(() => this.props.history.push("/product_types"))
  }

  render() {
    return (
      <>
        <h1>Product Category</h1>
        <h5><Link to={'/product_types'}>Back To Product Categories List</Link></h5>
        <button onClick={() => this.deleteOnClick(this.state.id)}>Delete Product Category</button>
        <ul>
          <li>Name: {this.state.name}</li>
        </ul>
        <form onSubmit={(e) => this.prodTypeUpdateSubmit(e)}>
          <label htmlFor="name">Product Category Name: </label>
          <input defaultValue={this.state.name} onChange={this.handleFieldChange} id='name' type='text'></input>
          <button type='submit'>Complete Edit</button>
        </form>
      </>
    )
  }
}