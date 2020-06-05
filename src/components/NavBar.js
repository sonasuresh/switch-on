import React, { Component } from 'react'
import {Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import callAPI from '../lib/axios'


const URL = 'ws://localhost:4000'

export default class NavBar extends Component {
    constructor(props) {
        super(props)
        if (!localStorage.getItem('token')) {
            window.location = '/#/login'
        }
        this.state={
          popoverOpen:false,
          notifications:[],
          viewFlag:[]
        }

    }
    ws = new WebSocket(URL)

    componentDidMount(){
      this.getAllNotifications()
      this.ws.onopen = () => {
        console.log('connected')
      }
  
  
      this.ws.onmessage = evt => {
        // on receiving a message, add it to the list of messages
        const message = JSON.parse(evt.data)
        this.addMessage(message)
      }
  
      this.ws.onclose = () => {
        console.log('disconnected')
        // automatically try to reconnect on connection loss
        this.setState({
          ws: new WebSocket(URL),
        })
      }
  
    }
    getAllNotifications=async ()=>{
      const notifications = await callAPI('get', `/notification/${localStorage.getItem('id')}`)
          const { state: currentState } = this
        currentState.notifications = notifications.data.message
         if(notifications.data.message.size>0){
      console.log(notifications.data.message)
        this.setState(currentState)
        const { state: current} = this
        current.viewFlag.length +=parseInt(this.state.notifications.length)
        this.setState(current)
        this.setState({viewFlag:this.state.viewFlag.fill(false)})
          }
        
    }
    toggle = () =>{
      const { state: currentState } = this
      currentState.popoverOpen = !this.state.popoverOpen
      this.setState(currentState)
    }
    handleLogoutClick = () => {
      localStorage.clear()
      window.location = '/#/login'
    }
    handleViewClick=(index)=>{
      const { state: currentState } = this
      this.state.viewFlag[index]=!this.state.viewFlag[index]
      this.setState(currentState)


    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:'#e3f2fd'}}>
            <a className="navbar-brand" href="/#/">Form</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                <a className="navbar-brand" href="/#/pending">Pending</a>
                </li>
                <li className="nav-item">
                <a className="navbar-brand" href="/#/approved">Approved</a>
                </li>
                <li className="nav-item">
                <a className="navbar-brand" href="/#/rejected">Rejected</a>
                </li>
                <li className="nav-item">
                <a className="navbar-brand" href="/#/requested">Requested</a>
                </li>
              </ul>
              
              <span className="navbar-text">
              
              <i className="fa fa-bell" id="Popover1" style={{fontSize:"20px"}} ></i>
              <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
              <PopoverHeader>Notifications</PopoverHeader>
              <PopoverBody>
                {this.state.notifications.map((notification,index)=>(
                  <div  key={index}>
                 <div>
                   {notification.message}
                   <button
                        className="btn btn-link link"
                        onClick={
                          ()=>{
                            this.handleViewClick(index)
                          }
                        }
                        >
                        View More
                        
					      </button>
                {this.state.viewFlag[index]?<p>Message : {notification.form[0].message}</p>:<p></p>}
                 </div>
               <hr/>
                  </div>
                
                ))}
              </PopoverBody>
            </Popover>

              <button
                        className="btn btn-link link"
                        onClick={this.handleLogoutClick}>
                        Logout
					</button>

              </span>
            </div>
          </nav>
        )
    }
}