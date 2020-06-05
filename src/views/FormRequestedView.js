import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import callAPI from '../lib/axios'
import FormCard from '../components/FormCard'
class FormRequestedView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overallRejectedRequests: []
        }
    }
    componentDidMount() {
        this.getOverallRejectedForms()
    }
    getOverallRejectedForms = async () => {
        const forms = await callAPI('get', `/form/requested/${localStorage.getItem('id')}`)

        const { state: currentState } = this
        currentState.overallRejectedRequests = forms.data.message
        this.setState(currentState)
        this._renderFormCards()
    }
    _renderFormCards = () => {
        if (this.state.overallRejectedRequests.length > 0) {
            return (
                <div>
                    <br />
                    <h3 style={{ marginLeft: "80px" }}>Requested Forms</h3>
                    {this.state.overallRejectedRequests.map((form, index) => (
                        <div key={index}>
                            <FormCard
                                status={form.status}
                                message={form.message}
                                assignedTo={form.user.email}
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
						No Forms Has Been Requested!
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

export default FormRequestedView;



