import React, { Component } from 'react';

export default class Department extends Component {

    render() {
        return (
            <>
                <h1>IMA DEPARTMENT</h1>
                <ul>
                    {this.props.departments.map(dept =>
                        <li> {dept.name}, ${dept.budget} </li>
                        )}

                </ul>
            </>
        )
    }
}