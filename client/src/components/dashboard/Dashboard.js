import React, {useEffect} from "react";
import PropTypes from 'prop-types'
import {deleteAccount, getCurrentProfile} from '../../reducers/profileReducer'
import {connect} from 'react-redux'
import Spinner from "../layouts/Spinner";
import {Link} from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ({profile: {profile, loading}, auth: {user}, getCurrentProfile,deleteAccount}) => {
    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile])
    return loading && profile === null ? <Spinner/> : <>
        <h1 className={"large text-primary"}>Dashboard</h1>
        <p className={"lead"}>
            <i className={"fas fa-user"}></i>Welcome {user && user.name}
        </p>

        {profile !== null ? (<>
            <DashboardActions/>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
            <div className={"my-2"}>
                <button className={"btn btn-danger"} onClick={()=>deleteAccount(profile.id)}>
                    <i className={"fas fa-user-minus"}></i>Delete My Account
                </button>
            </div>
            </>) : (<>
            <p> You has not created profile,please add some info</p>
            <Link to={'/create-profile'} className={'btn btn-primary my-1'}>
                Create Profile
            </Link>
        </>)}
    </>
}


Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount:PropTypes.func.isRequired

}
const mapStateToProps = (state) => ({
    profile: state.profileReducer,
    auth: state.authReducer

})

export default connect(mapStateToProps, {getCurrentProfile,deleteAccount})(Dashboard)