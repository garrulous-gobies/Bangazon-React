import APIManager from './APIManager'

const productManager = new APIManager('product')

export default {

  getProducts() {
    return productManager.all()
  },

  getSingleProduct(id) {
    return productManager.get(id)
  },

  newProduct(postItem) {
    return productManager.post(postItem).then(() => this.getProducts()
    )
  },

  updateProduct(item, id) {
    return productManager.put(item, id).then(() => this.getProducts()
    )
  },

  deleteProduct(id) {
    return productManager.delete(id).then(() => this.getProducts())
  }

}