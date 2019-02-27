import APIManager from './APIManager'

const customerManager = new APIManager('customers')

export default {

  getCustomers() {
    return customerManager.all()
  },

  getSingleCustomer(id) {
    return customerManager.get(id)
  },

  newCustomer(postItem) {
    return customerManager.post(postItem).then(() => this.getCustomers()
    )
  },

  updateCustomer(item, id) {
    return customerManager.put(item, id).then(() => this.getCustomers()
    )
  }

}