import React, { Component } from 'react'
import trainingProgramManager from '../modules/trainingProgramManager'
import { Link } from "react-router-dom"

export default class TrainingPrograms extends Component {

  state = {
    training_name: '',
    training_startDate: '',
    training_endDate: '',
    training_maxAttendees:''

  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  newTrainingSubmit = e => {
    e.preventDefault();
    const newTrainingToSave = {
      name: this.state.training_name,
      startDate: this.state.training_startDate,
      endDate: this.state.training_endDate,
      maxAttendees: this.state.training_maxAttendees
    }

    trainingProgramManager.newTrainingProgram(newTrainingToSave)
      .then((training) => this.props.setTraingState(training))
  }


  render(){
    return(
      <>
      <h1>Bangazon Training Programs</h1>
      <ul>
          {this.props.trainingProgram.map(training =>
          <li key={training.id}>{training.name}</li>
        )}
      </ul>
      </>
    )
  }
}