import React, { Component } from 'react';

export default class Department extends Component {



    render() {
        const dept = this.props.departments.find(d => d.id === parseInt(this.props.match.params.departmentId)) || {}
        return (
            <>
                <h1>DEPARTMENT</h1>
                <ul>
                    <li>Name: {dept.name}</li>
                    <li>Budget: ${dept.budget}</li>
                </ul>
            </>
        )
    }
}