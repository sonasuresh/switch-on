import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import FormCard from '../components/FormCard'
import callAPI from '../lib/axios'


class FormApprovedView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MyApprovedRequestFlag: true,
            MyApprovedRequests: [],
            overallApprovedRequests: [],
        }
    }
    componentDidMount() {
        this.getFormRequests()
    }
    handleRequest = async () => {
        if (this.state.MyApprovedRequestFlag) {
            this.getFormRequests()
        } else {
            this.getOverallApprovedForms()
        }
    }

    handleModalOpen = () => {
        this.setState({ isConfirmationModalOpen: true })
    }

    handleModalClose = () => {
        this.setState({ isConfirmationModalOpen: true })
    }

    getOverallApprovedForms = async () => {
        const forms = await callAPI('get', `/form/overallForms/${localStorage.getItem('id')}/Approved`)

        const { state: currentState } = this
        currentState.MyApprovedRequests = forms.data.message
        this.setState(currentState)
        this._renderFormCards()
    }
    getFormRequests = async () => {
        const forms = await callAPI('get', `/form/${localStorage.getItem('id')}/Approved`)

        const { state: currentState } = this
        currentState.MyApprovedRequests = forms.data.message
        this.setState(currentState)
        this._renderFormCards()

    }



    
    _renderFormCards = () => {
        if (this.state.MyApprovedRequests.length > 0) {
            return (
                <div>
                    {this.state.MyApprovedRequestFlag ? <h3 style={{ marginLeft: "80px" }}>My Approved Requests</h3> : <h3 style={{ marginLeft: "80px" }}>Overall Approved Requests</h3>}

                    {this.state.MyApprovedRequests.map((form, index) => (
                        <div key={index}>
                            
                            
                            <FormCard
                                message={form.message}
                                createdBy={this.state.MyApprovedRequestFlag? form.user.email : false}
                                assignedTo={this.state.MyApprovedRequestFlag? false : form.user.email}


                            />
                        </div>

                    ))}
                </div>
            )
        } else {
            return (
                <div className="text-center">
                    <h3 className="text-danger">
                        <i className="fa fa-exclamation-circle mr-4" />
						No Approved Requests
					</h3>
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                <NavBar />
                <br />
                <div style={{ float: "right",marginRight:"210px" }}>
                    <label className="switch">
                        <input type="checkbox" onChange={(e) => {
                            this.setState({MyApprovedRequestFlag:!this.state.MyApprovedRequestFlag})
                            this.handleRequest()
                        }} />

                        <span className="slider round"></span>
                    </label>
                </div>
                <div>
                    {this._renderFormCards()}
                </div>


            </div>
        );
    }
}

export default FormApprovedView;