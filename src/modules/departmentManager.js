import APIManager from './APIManager'

const departmentManager = new APIManager('departments')

export default {

  getDepartments() {
    return departmentManager.all()
  },

  getSingleDepartment(id) {
    return departmentManager.get(id)
  },

  newDepartment(postItem) {
    return departmentManager.post(postItem).then(() => this.getDepartments()
    )
  },

  updateDepartment(item, id) {
    return departmentManager.put(item, id).then(() => this.getDepartments()
    )
  }

}