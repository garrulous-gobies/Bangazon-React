import React, { Component } from 'react'
import trainingProgramManager from '../modules/trainingProgramManager'
import { Link } from "react-router-dom"

export default class TrainingPrograms extends Component {

  state = {
    training_name: '',
    training_startDate: null,
    training_endDate: null,
    training_maxAttendees: null

  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  newTrainingSubmit = e => {
    e.target.checkValidity()
    e.preventDefault();
    const newTrainingToSave = {
      name: this.state.training_name,
      startDate: this.state.training_startDate,
      endDate: this.state.training_endDate,
      maxAttendees: this.state.training_maxAttendees,
      employee: ""
    }

    trainingProgramManager.newTrainingProgram(newTrainingToSave)
      .then((training) => this.props.setTrainingState(training))
  }


  render() {
    return (
      <>
        <h5><Link to={`/`}>Back to API root</Link></h5>
        <h1>Bangazon Training Programs</h1>
        <ul>
          {this.props.trainingProgram.map(training =>
            <li key={training.id}><Link to={`/trainings/${training.id}`}> {training.name}</Link></li>
          )}
        </ul>
        <form onSubmit={(e) => this.newTrainingSubmit(e)}>
          <label htmlFor="training_name">Training Program Name</label>
          <input required defaultValue={this.state.training_name} onChange={this.handleFieldChange} id='training_name' type='text'></input>
          <label htmlFor="training_startDate">Start Date</label>
          <input required defaultValue={this.state.training_startDate} onChange={this.handleFieldChange} id='training_startDate' type='date'></input>
          <label htmlFor="training_endDate">End Date</label>
          <input required defaultValue={this.state.training_endDate} onChange={this.handleFieldChange} id='training_endDate' type='date'></input>
          <label htmlFor="training_maxAttendees">Max Attendees</label>
          <input required defaultValue={this.state.training_maxAttendees} onChange={this.handleFieldChange} id='training_maxAttendees' type='number'></input>
          <button type='submit'>Create New Training Program</button>
        </form>
      </>
    )
  }
}