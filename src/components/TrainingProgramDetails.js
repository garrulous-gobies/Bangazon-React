import React, { Component } from 'react'
import trainingProgramManager from '../modules/trainingProgramManager'
import { Link } from "react-router-dom"

export default class TrainingProgramDetail extends Component {

  state = {
    training_name: '',
    training_startDate: null,
    training_endDate: null,
    training_maxAttendees: null
  }


  componentDidMount() {
    const training = this.props.trainingProgram.find(tP => tP.id === parseInt(this.props.match.params.trainingId)) || {}
    this.setState({
      'training_name': training.name,
      'training_startDate': training.startDate,
      'training_endDate': training.endDate,
      'training_maxAttendees': training.maxAttendees,
      'id': training.id
    })
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  trainingUpdateSubmit = (e, id) => {
    e.target.checkValidity()
    e.preventDefault()
    let item = {
      name: this.state.training_name,
      startDate: this.state.training_startDate,
      endDate: this.state.training_endDate,
      maxAttendees: this.state.training_maxAttendees,
    }
    trainingProgramManager.updateTrainingProgram(item, this.state.id)
      .then((training) => this.props.setTrainingState(training))
      .then(() => this.props.history.push("/trainings/"))
  }

  deleteTraingingProgram = id => {
    trainingProgramManager.deleteTrainingProgram(id)
      .then((training) => this.props.setTrainingState(training))
      .then(() => this.props.history.push("/trainings/"))
  }


  render() {
    return (
      <>
        <h5><Link to={'/trainings/'}>Back To Training Programs</Link></h5>
        <h1>{this.state.training_name} Details</h1>
        <p>Start Date: {this.state.training_startDate}</p>
        <p>End Date: {this.state.training_endDate == null ? "On Going" : this.state.training_endDate}</p>
        <p>Max Attendees: {this.state.training_maxAttendees}</p>
        <form onSubmit={(e) => this.trainingUpdateSubmit(e)}>
          <label htmlFor="training_name">Training Program Name</label>
          <input required defaultValue={this.state.training_name} onChange={this.handleFieldChange} id='training_name' type='text'></input>
          <label htmlFor="training_startDate">Start Date</label>
          <input required defaultValue={this.state.training_startDate} onChange={this.handleFieldChange} id='training_startDate' type='date'></input>
          <label htmlFor="training_endDate">End Date</label>
          <input required defaultValue={this.state.training_endDate} onChange={this.handleFieldChange} id='training_endDate' type='date'></input>
          <label htmlFor="training_maxAttendees">Max Attendees</label>
          <input required defaultValue={this.state.training_maxAttendees} onChange={this.handleFieldChange} id='training_maxAttendees' type='text'></input>
          <button type='submit'>Complete Edit</button>
        </form>
        <button onClick={() => this.deleteTraingingProgram(`${this.state.id}`)}>Delete</button>
      </>
    )
  }
}