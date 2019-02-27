import APIManager from './APIManager'

const computerManager = new APIManager('computers')

export default {

  getComputers() {
    return computerManager.all()
  },

  getSingleComputer(id) {
    return computerManager.get(id)
  },

  newComputer(postItem) {
    return computerManager.post(postItem).then(() => this.getComputers()
    )
  },

  updateComputer(item, id) {
    return computerManager.put(item, id).then(() => this.getComputers()
    )
  },

  deleteComputer(id) {
    return computerManager.delete(id)
  }

}