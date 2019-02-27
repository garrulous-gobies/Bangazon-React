import React, { Component } from 'react'
import trainingProgramManager from '../modules/trainingProgramManager'

export default class TrainingProgramDetail extends Component {

  state = {
    training_name: '',
    training_startDate: '',
    training_endDate: '',
    training_maxAttendees: ''

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

  render(){
    return(
      <>
      <h1>{this.state.training_name} Details</h1>
      <p>Start Date: {this.state.training_startDate}</p>
        <p>End Date:{this.state.training_endDate == null ? "still open" : this.state.training_endDate }</p>
      </>
    )
  }
}