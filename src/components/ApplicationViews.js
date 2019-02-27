import { Route } from "react-router-dom";
import React, { Component } from "react";
import Departments from './Departments';
import DepartmentDetails from './DepartmentDetails';
import Computers from './Computers'
import ComputerDetails from './ComputerDetails'
import Home from './Home'
import DeptManager from '../modules/departmentManager'
import ComputerManager from '../modules/computerManager'
import paymentTypeManager from '../modules/paymentTypeManager'
import PaymentType from "./PaymentType";
import PaymentTypeDetails from "./PaymentTypeDetails";
import TrainingPrograms from "./TrainingProgram";
import TrainingProgramDetail from "./TrainingProgramDetails";
import trainingProgramManager from "../modules/trainingProgramManager";

class ApplicationViews extends Component {

  state = {
    departments: [],
    paymentTypes: [],
    computers: [],
    trainingProgram: []
  }

  componentDidMount() {

    DeptManager.getDepartments()
      .then(depts => {
        this.setState({ 'departments': depts })
      })
      .then(() => {
        ComputerManager.getComputers()
          .then(computers => this.setCompState(computers))
      })

    paymentTypeManager.getPaymentTypes()
      .then(payType => {
        this.setState({ 'paymentTypes': payType })
      })

    trainingProgramManager.getTrainingPrograms()
      .then(training => {
        this.setState({ 'trainingProgram': training })
      })

  }

  setDeptState = (depts) => {
    this.setState({ 'departments': depts })
  }

  setCompState = (computers) => {
    this.setState({ 'computers': computers })
  }

  setPayTypeState = payType => {
    this.setState({ 'paymentTypes': payType })
  }

  setTraingState = training => {
    this.setState({ 'trainingProgram': training })
  }


  render() {

    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <Home />
        }} />
        <Route exact path="/departments" render={(props) => {
          return <Departments
            departments={this.state.departments}
            setDeptState={this.setDeptState}
          />
        }} />
        <Route exact path="/departments/:departmentId(\d+)" render={(props) => {
          return <DepartmentDetails
            {...props}
            departments={this.state.departments}
            setDeptState={this.setDeptState}
          />
        }} />
        <Route exact path="/payment_types/" render={(props) => {
          return <PaymentType
            paymentTypes={this.state.paymentTypes}
            setPayTypeState={this.setPayTypeState}
          />
        }} />
        <Route exact path="/payment_types/:paymentTypeId(\d+)" render={(props) => {
          return <PaymentTypeDetails
            {...props}
            paymentTypes={this.state.paymentTypes}
            setPayTypeState={this.setPayTypeState}
          />
        }} />
        <Route exact path="/trainings/" render={(props) => {
          return <TrainingPrograms
            trainingProgram={this.state.trainingProgram}
            setTraingState={this.setTraingState}
          />
        }} />
        <Route exact path="/trainings/:trainingId(\d+)" render={(props) => {
          return <TrainingProgramDetail
            {...props}
            trainingProgram={this.state.trainingProgram}
            setTraingState={this.setTraingState}
          />
        }} />
        <Route exact path="/computers" render={(props) => {
          return <Computers
            computers={this.state.computers}
            setCompState={this.setCompState}
          />
        }} />
        <Route exact path="/computers/:computerId(\d+)" render={(props) => {
          return <ComputerDetails
            {...props}
            computers={this.state.computers}
            setCompState={this.setCompState}
          />
        }} />
      </React.Fragment >
    )
  }
}


export default ApplicationViews