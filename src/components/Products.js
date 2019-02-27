import React, { Component } from 'react';
import ProductManager from '../modules/productManager'
import { Link } from "react-router-dom"

export default class Department extends Component {

  state = {
    product_title: '',
    product_price: '',
    product_description: '',
    product_quantity: ''
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  newProductSubmit = e => {
    e.preventDefault();
    const newProductToSave = {
      title: this.state.product_title,
      price: this.state.product_price,
      description: this.state.product_description,
      quantity: this.state.product_quantity,
      customer: 'http://127.0.0.1:8000/api/v1/customers/1/',
      productType: 'http://127.0.0.1:8000/api/v1/productType/1/'
    }
    ProductManager.newProduct(newProductToSave)
    .then((products) => this.props.setProductState(products))
  }

  render() {
    return (
      <>
        <h1>BANGAZON PRODUCTS</h1>
        <ul>
          {this.props.products.map(product =>

            // <li key={product.id}><Link to={`/departments/${dept.id}`}> {dept.name}, ${dept.budget}</Link></li>
            <li key={product.id}>{product.title}, {product.description}, ${product.price}</li>

          )}
        </ul>
        <form onSubmit={this.newProductSubmit}>
            <label for="product_title">Product Title</label>
            <input onChange={this.handleFieldChange} id='product_title' type='text'></input>

            <label for="product_price">Product Price</label>
            <input onChange={this.handleFieldChange} id='product_price' type='text'></input>

            <label for="product_description">Product Description</label>
            <input onChange={this.handleFieldChange} id='product_description' type='text'></input>

            <label for="product_quantity">Product Quantity</label>
            <input onChange={this.handleFieldChange} id='product_quantity' type='text'></input>

            <button type="submit">Create New Product</button>
        </form>
      </>
    )
  }
}

/*

title
price
description
quantity

customer
product type

*/