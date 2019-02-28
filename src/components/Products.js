import React, { Component } from 'react';
import ProductManager from '../modules/productManager'
import { Link } from "react-router-dom"

export default class Products extends Component {

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
    e.target.checkValidity()
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
        <h5><Link to={`/`}>Back to API root</Link></h5>
        <ul>
          {this.props.products.map(product =>

            <li key={product.id}><Link to={`/products/${product.id}`}>{product.title}, {product.description}, ${product.price} </Link> </li>

          )}
        </ul>
        <form onSubmit={this.newProductSubmit}>
            <label for="product_title">Product Title</label>
            <input required onChange={this.handleFieldChange} id='product_title' type='text'></input>

            <label for="product_price">Product Price</label>
            <input required onChange={this.handleFieldChange} id='product_price' type='text'></input>

            <label for="product_description">Product Description</label>
            <input required onChange={this.handleFieldChange} id='product_description' type='text'></input>

            <label for="product_quantity">Product Quantity</label>
            <input required onChange={this.handleFieldChange} id='product_quantity' type='text'></input>

            <button type="submit">Create New Product</button>
        </form>
      </>
    )
  }
}