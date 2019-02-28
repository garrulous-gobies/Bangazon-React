import APIManager from './APIManager'

const trainingProgramManager = new APIManager('trainingProgram')

export default {

  getTrainingPrograms() {
    return trainingProgramManager.all()
  },

  getSingleTrainingProgram(id) {
    return trainingProgramManager.get(id)
  },

  newTrainingProgram(postItem) {
    return trainingProgramManager.post(postItem).then(() => this.getTrainingPrograms()
    )
  },

  updateTrainingProgram(item, id) {
    return trainingProgramManager.put(item, id).then(() => this.getTrainingPrograms()
    )
  },

  deleteTrainingProgram(id) {
    return trainingProgramManager.delete(id).then(() => this.getTrainingPrograms())
  }

}