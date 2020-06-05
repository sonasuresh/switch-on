import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import FormCard from '../components/FormCard'
import callAPI from '../lib/axios'
import { confirmAlert } from "react-custom-confirm-alert";
import "react-custom-confirm-alert/src/react-confirm-alert.css";
import Alert from '../components/Alert'


class FormPendingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MyPendingRequestFlag: true,
            MyPendingRequests: [],
            overallPendingRequests: [],
            isConfirmationModalOpen: false,
            alertFlag: '',
            alertMessage: '',
            showAlertFlag: false
        }
    }
    componentDidMount() {
        this.getFormRequests()
    }
    handleRequest = async () => {
        if (this.state.MyPendingRequestFlag) {
            this.getFormRequests()
        } else {
            this.getOverallPendingForms()
        }
    }

    handleModalOpen = () => {
        this.setState({ isConfirmationModalOpen: true })
    }

    handleModalClose = () => {
        this.setState({ isConfirmationModalOpen: true })
    }

    getOverallPendingForms = async () => {
        const forms = await callAPI('get', `/form/overallForms/${localStorage.getItem('id')}/Pending`)

        const { state: currentState } = this
        currentState.MyPendingRequests = forms.data.message
        this.setState(currentState)
        this._renderFormCards()
    }
    getFormRequests = async () => {
        const forms = await callAPI('get', `/form/${localStorage.getItem('id')}/Pending`)

        const { state: currentState } = this
        currentState.MyPendingRequests = forms.data.message
        this.setState(currentState)
        this._renderFormCards()

    }



    handleUpdateRequest = async (formId, status) => {
        console.log(formId)
        confirmAlert({
            title: <h4>Confirm to {status === 'Approved' ? 'Approve' : 'Reject'}</h4>,
            message: "Are you sure to do this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        try {

                            callAPI('put', '/form', {
                                data: {
                                    formId,
                                    status,
                                }
                            })
                            this.setState({ showAlertFlag: true })
                            this.setState({ alertFlag: true })

                            this.setState({ alertMessage: 'Status Updated!' })
                            window.location.reload();
                        } catch (error) {
                            this.setState({ alertMessage: 'An error occured!Try Again!' })
                            this.setState({ showAlertFlag: true })
                            this.setState({ alertFlag: false })
                        }
                    }
                },
                {
                    label: "No",
                    onClick: () => { }
                }
            ]
        });

    }

    _renderFormCards = () => {
        if (this.state.MyPendingRequests.length > 0) {
            return (
                <div>
                    {this.state.MyPendingRequestFlag ? <h3 style={{ marginLeft: "80px" }}>My Pending Requests</h3> : <h3 style={{ marginLeft: "80px" }}>Overall Pending Requests</h3>}

                    {this.state.MyPendingRequests.map((form, index) => (
                        <div key={index}>
                            
                            
                            <FormCard
                                message={form.message}
                                displayFlag={this.state.MyPendingRequestFlag ? true : false}
                                createdBy={this.state.MyPendingRequestFlag? form.user.email : false}
                                assignedTo={this.state.MyPendingRequestFlag? false : form.user.email}
                                id={form._id}
                                handleUpdateRequest={this.handleUpdateRequest}

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
						No Pending Requests
					</h3>
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                <NavBar />
                {this.state.showAlertFlag ? <Alert flag={this.state.alertFlag} message={this.state.alertMessage} /> : ''}
                <br />
                <div style={{ float: "right",marginRight:"210px" }}>
                    <label className="switch">
                        <input type="checkbox" onChange={(e) => {
                            this.setState({MyPendingRequestFlag:!this.state.MyPendingRequestFlag})
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

export default FormPendingView;