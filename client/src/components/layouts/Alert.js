import React from "react";
import {connect} from "react-redux";
import PropTypes from 'proptypes'
import {disable_alert} from "../../reducers/alertReducer";


const Alert = ({alerts}) => {
    const onClick = (x)=>{
        console.log(x)
        disable_alert(x)
    }
    return alerts !== null && alerts.length>0 && alerts.map((v, k) => {
        return <div key={v.id} className={`alert alert-${v.alertType}`} onClick={()=>onClick(v.id)}>
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
export default connect(mapStateToProps, {disable_alert})(Alert)