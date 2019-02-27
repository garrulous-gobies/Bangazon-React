import APIManager from './APIManager'

const productTypeManager = new APIManager('productType')

export default {

  getProductTypes() {
    return productTypeManager.all()
  },

  getSingleProductType(id) {
    return productTypeManager.get(id)
  },

  newProductType(postItem) {
    return productTypeManager.post(postItem).then(() => this.getProductTypes()
    )
  },

  updateProductType(item, id) {
    return productTypeManager.put(item, id).then(() => this.getProductTypes()
    )
  },

  deleteProductType(id) {
    return productTypeManager.delete(id).then(() => this.getProductTypes())
  }

}