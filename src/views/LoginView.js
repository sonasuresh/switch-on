import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import callAPI from '../lib/axios'

import logger from '../lib/logger'
import Alert from '../components/Alert'


export default class LoginView extends Component {
    constructor(props) {

        localStorage.clear();
        super(props)
        this.state = {
            email: '',
            password: '',
            alertFlag: '',
            message: '',
            showAlertFlag: false
        }
    }
    handleLoginClick = async () => {
        const { email, password } = this.state
        if (email === '' && password === '') {
            alert('Cannot proceed without username and/or password')
        } else {
            try {
                const response = await callAPI('post', '/user/login', {
                    data: {
                        email,
                        password
                    }
                })
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.jwttoken)
                    localStorage.setItem('email', response.data.email)
                    localStorage.setItem('id', response.data.id)
                    this.setState({ alertFlag: true })
                    this.setState({ showAlertFlag: true })
                    this.setState({ message: 'Login Successful!' })
                    window.location = '/#/'
                } else {
                    logger.error(response.data.message)
                }

            } catch (error) {
                logger.error(error)
                this.setState({ message: 'Login Failed!' })
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
            
                <div style={{display:"flex",justifyContent:"center"}}>
                    <div className="card">
                        <div className="card-body">
                            <div className="pt-5 login-bg text-white h-100">
                                <div className="text-center">
                                    <h3>Login Here..!</h3>
                                    <div style={{ fontSize: 20 }} className="mt-5">
                                        <div
                                            style={{ marginLeft: 100, marginRight: 100 }}>
                                            <input
                                                className="form-control text-center placeholder-colored "
                                                placeholder="user@gmail.com"
                                                onChange={(e) => {
                                                    const { state: currentState } = this
                                                    currentState.email = e.target.value
                                                    this.setState(currentState)
                                                }}></input>
                                        </div>
                                        <div
                                            className="mt-3"
                                            style={{ marginLeft: 100, marginRight: 100 }}
                                        >
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
                                        <div
                                            className="mt-3 rounded"
                                        >
                                            <button
                                                className="btn btn-info w-25"
                                                style={{ marginLeft: 120, marginRight: 100 }}
                                                onClick={this.handleLoginClick}>
                                                Login
            				                </button><br />
                                            <Link to="/register" className="link">
                                                Dont Have an Account? Sign Up
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