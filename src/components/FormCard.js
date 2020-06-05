import React from 'react'


function FormCard(props) {
  return (
    <div>
      <br />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div>{props.createdBy ? <b>Created By : {props.createdBy}</b> : ''}</div>

            <div>{props.assignedTo ? <b>Assigned To : {props.assignedTo} </b> : ''}</div>
            <b>Message</b>: {props.message}
            {props.displayFlag ? <span style={{ float: "right" }}>
              <i className="fa fa-check" style={{ color: "#79d70f", fontSize: "20px" }}

                onClick={() => {
                  props.handleUpdateRequest(props.id, "Approved")
                }}
              >
              </i>&nbsp;&nbsp;
              <i className="fa fa-times" style={{ color: "red", fontSize: "20px" }} aria-hidden="true"
                onClick={() => {
                  props.handleUpdateRequest(props.id, "Rejected")
                }}
              ></i></span> : ""
            }
            <span style={{ float: "right" }}>{props.status ? props.status === 'Approved' ? <span style={{ color: "#79d70f", fontSize: "20px" }}><b>Approved</b></span> : props.status == 'Rejected' ? <span style={{ color: "red", fontSize: "20px" }}><b>Rejected</b></span> : props.status == 'Pending' ? <span style={{ color: "yellow", fontSize: "20px" }}><b>Pending</b></span> : '' : ''}</span>

          </div>
        </div>
      </div>
    </div>


  )
}

export default FormCard;