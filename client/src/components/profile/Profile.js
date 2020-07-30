import React, {useEffect} from "react";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getProfileById} from "../../reducers/profileReducer";
import Spinner from "../layouts/Spinner";
import {Link} from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({getProfileById, auth, profile: {profile, loading,username}, match}) => {
    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById])
    return <>{profile === null || loading ? <Spinner/> : <>
        <Link to={'/profiles'} className={"btn btn-light"}>Back to Black</Link>
        {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
            <Link to={'/edit-profile'} className={"btn btn-dark"}>Edit Profile </Link>)}
        <div className={"profile-grid my-1"}>
            <ProfileTop profile={profile}></ProfileTop>
            <ProfileAbout profile={profile}></ProfileAbout>
            <div className={"profile-exp bg-white p-2"}>
                <h2 className={"text text-primary"}>Experience</h2>
                {profile.experience.length > 0 ? (<>
                    {profile.experience.map((experience) => {
                        return <ProfileExperience key={experience._id} experience={experience}></ProfileExperience>
                    })}
                </>) : <h2>No experience credentials</h2>}
            </div>
            <div className={"profile-exp bg-white p-2"}>
                <h2 className={"text text-primary"}>Experience</h2>
                {profile.education.length > 0 ? (<>
                    {profile.education.map((education) => {
                        return <ProfileEducation key={education._id} education={education}></ProfileEducation>
                    })}
                </>) : <h2>No education credentials</h2>}
            </div>
            {profile.githubusername&&(<ProfileGithub username={username}/>)}
        </div>
    </>}</>
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
        auth: state.authReducer
    }


}

export default connect(mapStateToProps, {getProfileById})(Profile)

