import React from "react";
import {connect} from "react-redux";
import PropTypes from 'proptypes'


const Alert = ({alerts}) => {
    return alerts !== null && alerts.length>0 && alerts.map((v, k) => {
        return <div key={v.id} className={`alert alert-${v.alertType}`}>
            {v.msg}
        </div>
    })
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}
const mapStateToProps=(state)=>{
    return{
        alerts:state.alertReducer
    }
}
export default connect(mapStateToProps,null)(Alert)