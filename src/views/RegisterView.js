import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import callAPI from '../lib/axios'
import logger from '../lib/logger'
import Alert from '../components/Alert'

export default class RegisterView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            department: '',
            departments: [],
            alertFlag: '',
            message: '',
            showAlertFlag: false
        }
    }
    componentDidMount() {
        this.getAllDepartments()
    }
    getAllDepartments = async () => {
        const departments = await callAPI('get', '/department')
        const { state: currentState } = this
        currentState.departments = departments.data.message
        this.setState(currentState)
    }

    handleRegisterClick = async () => {
        const { email, password, department } = this.state
        if (email === '' && password === '') {
            alert('Cannot proceed without username and/or password')
        } else {
            try {
                await callAPI('post', '/user', {
                    data: {
                        email,
                        password,
                        departmentId: department
                    }
                })

                this.setState({ alertFlag: true })
                this.setState({ showAlertFlag: true })
                this.setState({ message: 'Registration Successful!'})
            } catch (error) {
                logger.error(error)
                this.setState({ message: 'Registration Failed!' })
                this.setState({ showAlertFlag: true })
                this.setState({ alertFlag: false })
            }
        }
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4"></h1>
                        <p className="lead" align="center"><h3>A One Step Solution to Invite Users via Form Request!</h3></p>
                    </div>
                </div>
                {this.state.showAlertFlag ? <Alert flag={this.state.alertFlag} message={this.state.message} /> : ''}

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="pt-5 login-bg text-white h-100">
                                <div className="text-center">
                                    <h3>Register Here..!</h3>
                                    <div style={{ fontSize: 20 }} className="mt-5">
                                        <div style={{ marginLeft: 100, marginRight: 100 }}>
                                            <input
                                                className="form-control text-center placeholder-colored"
                                                placeholder="username@gmail.com"
                                                onChange={(e) => {
                                                    const { state: currentState } = this
                                                    currentState.email = e.target.value
                                                    this.setState(currentState)
                                                }}></input>
                                        </div>
                                        <div
                                            className="mt-3"
                                            style={{ marginLeft: 100, marginRight: 100 }}>
                                            <input
                                                type="password"
                                                className="form-control text-center placeholder-colored"
                                                placeholder="Password"
                                                onChange={(e) => {
                                                    const { state: currentState } = this
                                                    currentState.password = e.target.value
                                                    this.setState(currentState)
                                                }}></input>
                                        </div>

                                        <div class="dropright mt-3 w-70" style={{ marginLeft: 100, marginRight: 100 }}>
                                            <select class="custom-select mb-3" onChange={(e) => {
                                                const { state: currentState } = this
                                                currentState.department = e.target.value
                                                this.setState(currentState)
                                            }}>
                                                <option selected disabled >Department</option>
                                                {this.state.departments.map(department => (

                                                    <option value={department._id}>
                                                        {department.name}

                                                    </option>
                                                ))}

                                            </select>
                                        </div>
                                        <div
                                            className="mt-3 rounded"
                                            style={{ marginLeft: 100, marginRight: 100 }}>
                                            <button
                                                className="btn btn-info w-35"
                                                onClick={this.handleRegisterClick}>
                                                Sign Up
							</button><br />
                                            <Link to="/login" className="link">
                                                Already Registered?Click Here to Login.!
							</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}