import React, { Component } from 'react';
import NavBar from '../components/NavBar';

import callAPI from '../lib/axios'
import FormCard from '../components/FormCard'

class FormApprovedView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overallApprovedRequests: []
        }
    }
    componentDidMount() {
        this.getOverallApprovedForms()
    }
    getOverallApprovedForms = async () => {
        const forms = await callAPI('get', `/form/overallForms/${localStorage.getItem('id')}/Approved`)

        const { state: currentState } = this
        currentState.overallApprovedRequests = forms.data.message
        this.setState(currentState)
        this._renderFormCards()
    }
    _renderFormCards = () => {
        if (this.state.overallApprovedRequests.length > 0) {
            return (
                <div>
                    <br />
                    <h3 style={{ marginLeft: "80px" }}>Approved Requests In your Department</h3>
                    {this.state.overallApprovedRequests.map((form, index) => (
                        <div key={index}>

                            <FormCard
                                assignedTo={form.user.email}
                                message={form.message}

                            />
                        </div>
                    ))}
                </div>
            )
        } else {
            return (
                <div className="text-center">
                    <br />

                    <h3 className="text-danger">
                        <i className="fa fa-exclamation-circle mr-4" />
						No Approved Requests In your Department!
					</h3>
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                <NavBar />
                {this._renderFormCards()}
            </div>
        );
    }
}

export default FormApprovedView;