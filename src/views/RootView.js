import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import FormView from './FormView'
import FormPendingView from './FormPendingView'
import FormApprovedView from './FormApprovedView'
import FormRejectedView from './FormRejectedView'
import FormRequestedView from './FormRequestedView'

import LoginView from './LoginView'
import RegisterView from './RegisterView'

class RootView extends Component {
    render() {
        return (
            <div className="wrapper">
                <Route path="/login" exact component={LoginView}></Route>
                <Route path="/register" exact component={RegisterView}></Route>
                <Route path="/pending" exact component={FormPendingView}></Route>
                <Route path="/approved" exact component={FormApprovedView}></Route>
                <Route path="/rejected" exact component={FormRejectedView}></Route>
                <Route path="/requested" exact component={FormRequestedView}></Route>
                <Route path="/" exact component={FormView}></Route>


            </div>
        )
    }
}

export default RootView;