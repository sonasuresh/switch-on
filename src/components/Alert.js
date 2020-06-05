import React from 'react'

function Alert(props) {
    return (
        
        <div className="container">
            <div className={`alert alert-${props.flag ? 'success' : 'danger'} alert-dismissible fade show`} role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>{props.flag ? 'Success!' : 'Error!'}</strong> {props.message}
            </div>
        </div>

    )

}
export default Alert;