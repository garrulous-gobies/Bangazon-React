import React, { Component } from 'react';
import ProductTypeManager from '../modules/productTypeManager'
import { Link } from "react-router-dom"


export default class Computer extends Component {

  state = {
    name: '',
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  newProdTypeSubmit = e => {
    e.target.checkValidity()
    e.preventDefault();
    const prodType= {
      name: this.state.name
    }
    ProductTypeManager.newProductType(prodType)
      .then((prodType) => this.props.setProductTypeState(prodType))
  }

  render() {
    return (
      <>
        <h1>BANGAZON PRODUCT CATEGORIES</h1>
        <h5><Link to={`/`}>Back to API root</Link></h5>
        {this.props.productTypes.map(prodType =>
          <ul key={prodType.id}>
            <li>Category Name: {prodType.name}</li>
            <li><Link to={`/product_types/${prodType.id}`}>URL: {prodType.url}</Link></li>
          </ul>
        )}
        <form onSubmit={this.newProdTypeSubmit}>
          <label htmlFor="name">Product Category Name: </label>
          <input required onChange={this.handleFieldChange} id='name' type='text'></input>
          <button type="submit">Create New Product Category</button>
        </form>
      </>
    )
  }
}