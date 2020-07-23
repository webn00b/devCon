import React, {useEffect} from "react";
import {connect} from 'react-redux'
import PropTypes, {func, object} from 'prop-types'
import {getProfiles} from "../../reducers/profileReducer";
import Spinner from "../layouts/Spinner";
import ProfileItem from "./ProfileItem";

const Profiles = ({getProfiles, profile: {profiles, loading}}) => {
    useEffect(() => {
        getProfiles()
    }, [loading])
    return <>
        {loading ? <Spinner/> : <>
            <h1 className={"large text-primary"}>Developers</h1>
            <p className={"lead"}>
                <i className={"fab fa-connectdevelop"}></i>Browse and connect with developers
            </p>
            <div className={"profiles"}>
                {profiles.length>0?profiles.map((profile)=>{
                    return <ProfileItem key={profile._id} profile={profile}/>
                }):<h4>No profiles found...</h4>}
            </div>
        </>}
    </>
}

const mapStateToProps = (state) => ({
    profile: state.profileReducer
})

Profiles.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {getProfiles})(Profiles)