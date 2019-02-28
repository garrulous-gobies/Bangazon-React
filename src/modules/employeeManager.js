import APIManager from './APIManager'

const employeeManager = new APIManager('employees')

export default {

  getEmployees() {
    return employeeManager.all()
  },

  getSingleEmployee(id) {
    return employeeManager.get(id)
  },

  newEmployee(postItem) {
    return employeeManager.post(postItem).then(() => this.getEmployees()
    )
  },

  updateEmployee(item, id) {
    return employeeManager.put(item, id).then(() => this.getEmployees()
    )
  },

  deleteEmployee(id) {
    return employeeManager.delete(id).then(() => this.getEmployees())
  }

}