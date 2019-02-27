import React, { Component } from 'react';
import { Link } from "react-router-dom"
import ProductManager from '../modules/productManager'
import productManager from '../modules/productManager';

export default class ProductDetails extends Component {

  componentDidMount() {
    const product = this.props.products.find(p => p.id === parseInt(this.props.match.params.productId)) || {}

    this.setState({
      'product_title': product.title,
      'product_price': product.price,
      'id': product.id,
      'description': product.description,
      'quantity': product.quantity
    })
 }

  state = {
    product_title: '',
    product_price: '',
    id: '',
    description: '',
    quantity: ''
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  productUpdateSubmit = (e, id) => {
    e.preventDefault()
    const product = {
        title: this.state.product_title,
        price: this.state.product_price,
        description: this.state.description,
        quantity: this.state.quantity,
        customer: 'http://127.0.0.1:8000/api/v1/customers/1/',
        productType: 'http://127.0.0.1:8000/api/v1/productType/1/'
    }

    ProductManager.updateProduct(product, this.state.id)
    .then((products) => this.props.setProductState(products))
    .then(() => this.props.history.push("/products"))
  }

  deleteProduct = id => {
    productManager.deleteProduct(id)
    .then((products) => this.props.setProductState(products))
    .then(() => this.props.history.push("/products"))
  }

    render() {
        return (
            <>
                <h1>PRODUCT DETAIL</h1>
                <h5><Link to={`/products`}>Back to Products</Link></h5>
                <ul>
                    <li>Title: {this.state.product_title}</li>
                    <li>Price: ${this.state.product_price}</li>
                    <li>Description: {this.state.description}</li>
                    <li>Quantity: {this.state.quantity}</li>
                </ul>

                <button onClick={() => this.deleteProduct(this.state.id)}>Delete Product</button>

                <br></br>
                <form onSubmit={(e) => this.productUpdateSubmit(e)}>
                    <label for="product_title">Product Title</label>
                    <input defaultValue={this.state.product_title} onChange={this.handleFieldChange} id='product_title' type='text'></input>

                    <label for="product_price">Product Price</label>
                    <input defaultValue={this.state.product_price} onChange={this.handleFieldChange} id='product_price' type='text'></input>

                    <label for="description">Product Description</label>
                    <input defaultValue={this.state.description} onChange={this.handleFieldChange} id='description' type='text'></input>

                    <label for="quantity">Product Quantity</label>
                    <input defaultValue={this.state.quantity} onChange={this.handleFieldChange} id='quantity' type='text'></input>

                    <button type="submit">Submit Edit</button>
                </form>
            </>
        )
    }
}