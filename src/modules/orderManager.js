import APIManager from './APIManager'

const orderManager = new APIManager('orders')

export default {

  getOrders() {
    return orderManager.all()
  },

  getSingleOrder(id) {
    return orderManager.get(id)
  },

  newOrder(postItem) {
    return orderManager.post(postItem).then(() => this.getOrders()
    )
  },

  updateOrder(item, id) {
    return orderManager.put(item, id).then(() => this.getOrders()
    )
  }

}