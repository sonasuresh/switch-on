import React, { Component } from 'react';
import NavBar from '../components/NavBar'
import callAPI from '../lib/axios'
import Alert from '../components/Alert'


class FormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: localStorage.getItem('id'),
            otherDepartments: [],
            departmentUsers: [],
            currentDepartment: '',
            assignedToUser: '',
            message: '',
            alertFlag: '',
            message: '',
            showAlertFlag: false
        }
    }
    componentDidMount() {
        this.getOtherDepartments()
    }
    getOtherDepartments = async () => {
        const departments = await callAPI('get', `/department/other/${localStorage.getItem('id')}`)

        const { state: currentState } = this
        currentState.otherDepartments = departments.data.message
        this.setState(currentState)
    }

    getUsersBasedOnDepartment = async () => {
        const departments = await callAPI('get', `user/department/${this.state.currentDepartment}`)
        const { state: currentState } = this
        currentState.departmentUsers = departments.data.message
        this.setState(currentState)
    }

    handleSendRequestClick = async () => {
        const { currentUser, assignedToUser, message } = this.state
        if (assignedToUser !== "") {
            if (message !== "") {
                try {
                    await callAPI('post', '/form', {
                        data: {
                            createdById: currentUser,
                            assignedToId: assignedToUser,
                            message
                        }
                    })
                    this.setState({ showAlertFlag: true })
                    this.setState({ alertFlag: true })

                    this.setState({ message: 'Form Requested!' })
                } catch (error) {
                    this.setState({ message: 'An error occured!Try Again!' })
                    this.setState({ showAlertFlag: true })
                    this.setState({ alertFlag: false })

                }
            } else {
                this.setState({ message: 'Message is missing!' })
                this.setState({ showAlertFlag: true })
                this.setState({ alertFlag: false })
            }

        }
        else {
            this.setState({ message: 'One of the field is missing!' })
            this.setState({ showAlertFlag: true })
            this.setState({ alertFlag: false })


        }
    }

    render() {
        return (
            <div>
                <NavBar />
                {this.state.showAlertFlag ? <Alert flag={this.state.alertFlag} message={this.state.message} /> : ''}

                <div className="mt-5 container">
                    <div className="card">
                        <div className="card-header">
                            <h5>Form Request</h5>
                        </div>
                        <div className="card-body">
                            <div>
                                <div className="text-center">

                                    <div style={{ fontSize: 20 }} className="mt-2">

                                        <form>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Created By</label>
                                                <div className="col-sm-10">
                                                    <input type="text" readOnly className="form-control" value={localStorage.getItem('email')} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Department</label>
                                                <div className="col-sm-10">
                                                    <select  defaultValue={'DEFAULT'}  className="custom-select mb-3" onChange={(e) => {
                                                        const { state: currentState } = this
                                                        currentState.currentDepartment = e.target.value
                                                        this.setState(currentState)
                                                        this.getUsersBasedOnDepartment()
                                                    }}
                                                        required
                                                    >
                                                        <option value="DEFAULT" disabled>Select Department</option>
                                                        {this.state.otherDepartments.map((department,index) => (

                                                            <option key={index} value={department._id}>
                                                                {department.name}

                                                            </option>
                                                        ))}

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Assign To</label>
                                                <div className="col-sm-10">
                                                    <select defaultValue={'DEFAULT'}  className="custom-select mb-3" onChange={(e) => {
                                                        const { state: currentState } = this
                                                        currentState.assignedToUser = e.target.value
                                                        this.setState(currentState)
                                                    }}
                                                        required
                                                    >
                                                        <option value="DEFAULT" disabled >Select Users</option>
                                                        {this.state.departmentUsers.map(user => (

                                                            <option value={user._id}>
                                                                {user.email}

                                                            </option>
                                                        ))}

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Message</label>
                                                <div className="col-sm-10">
                                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => {
                                                        const { state: currentState } = this
                                                        currentState.message = e.target.value
                                                        this.setState(currentState)
                                                    }}></textarea>
                                                </div>
                                            </div>
                                            <br />
                                            <button
                                                className="btn btn-info w-35"
                                                style={{ marginLeft: 100, marginRight: 90 }}
                                                onClick={this.handleSendRequestClick}>
                                                Send Request
            				        </button>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default FormView;