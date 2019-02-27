import { Route } from "react-router-dom";
import React, { Component } from "react";
import Departments from './Departments';
import DepartmentDetails from './DepartmentDetails';
import Home from './Home'
import DeptManager from '../modules/departmentManager'
import paymentTypeManager from '../modules/paymentTypeManager'
import PaymentType from "./PaymentType";
import PaymentTypeDetails from "./PaymentTypeDetails";

class ApplicationViews extends Component {

    state = {
        departments: [],
        paymentTypes: []
    }

    componentDidMount() {

        DeptManager.getDepartments()
            .then(depts => {
                this.setState({ 'departments': depts })
            })

        paymentTypeManager.getPaymentTypes()
            .then(payType => {
                this.setState({ 'paymentTypes': payType })
            })

    }

    setDeptState = (depts) => {
        this.setState({ 'departments': depts })
    }

    setPayTypeState = payType => {
        this.setState({ 'paymentTypes': payType })
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
            </React.Fragment >
        )
    }
}


export default ApplicationViews