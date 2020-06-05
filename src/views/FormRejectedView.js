import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import FormCard from '../components/FormCard'
import callAPI from '../lib/axios'


class FormRejectedView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MyRejectedRequestFlag: true,
            MyRejectedRequests: [],
            overallRejectedRequests: [],
        }
    }
    componentDidMount() {
        this.getFormRequests()
    }
    handleRequest = async () => {
        if (this.state.MyRejectedRequestFlag) {
            this.getFormRequests()
        } else {
            this.getOverallRejectedForms()
        }
    }

    handleModalOpen = () => {
        this.setState({ isConfirmationModalOpen: true })
    }

    handleModalClose = () => {
        this.setState({ isConfirmationModalOpen: true })
    }

    getOverallRejectedForms = async () => {
        const forms = await callAPI('get', `/form/overallForms/${localStorage.getItem('id')}/Rejected`)

        const { state: currentState } = this
        currentState.MyRejectedRequests = forms.data.message
        this.setState(currentState)
        this._renderFormCards()
    }
    getFormRequests = async () => {
        const forms = await callAPI('get', `/form/${localStorage.getItem('id')}/Rejected`)

        const { state: currentState } = this
        currentState.MyRejectedRequests = forms.data.message
        this.setState(currentState)
        this._renderFormCards()

    }



    
    _renderFormCards = () => {
        if (this.state.MyRejectedRequests.length > 0) {
            return (
                <div>
                    {this.state.MyRejectedRequestFlag ? <h3 style={{ marginLeft: "80px" }}>My Rejected Requests</h3> : <h3 style={{ marginLeft: "80px" }}>Overall Rejected Requests</h3>}

                    {this.state.MyRejectedRequests.map((form, index) => (
                        <div key={index}>
                            
                            
                            <FormCard
                                message={form.message}
                                createdBy={this.state.MyRejectedRequestFlag? form.user.email : false}
                                assignedTo={this.state.MyRejectedRequestFlag? false : form.user.email}


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
						No Rejected Requests
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
                            this.setState({MyRejectedRequestFlag:!this.state.MyRejectedRequestFlag})
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

export default FormRejectedView;