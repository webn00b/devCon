import React, {useEffect} from "react";
import PropTypes from 'prop-types'
import {getCurrentProfile} from '../../reducers/profileReducer'
import {connect} from 'react-redux'
import Spinner from "../layouts/Spinner";
import {Link} from "react-router-dom";


const Dashboard = ({profile:{profile,loading},auth:{user},getCurrentProfile}) => {
    useEffect(()=>{
        getCurrentProfile()
    },[])
    return loading&&profile===null?<Spinner/>:<>
    <h1 className={"large text-primary"}>Dashboard</h1>
        <p className={"lead"}>
            <i className={"fas fa-user"}></i>Welcome {user&&user.name}
        </p>

    {profile!==null?(<>has profile</>):(<>
        <p> You has not created profile,please add some info</p>
        <Link to={'/create-profile'} className={'btn btn-primary my-1'}>
            Create Profile
        </Link>
    </>)}
    </>
}


Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,

}
const mapStateToProps = (state) => ({
    profile: state.profileReducer,
    auth:state.authReducer

})

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard)