import {CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE} from "./actions-types";
import axios from 'axios'
import {set_alert} from "./alertReducer";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    errors: {}
}
export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_PROFILE:
        case GET_PROFILE :
            return {...state, profile: payload, loading: false}
        case PROFILE_ERROR:
            return {...state, error: payload, loading: false}
        case CLEAR_PROFILE:
            return {...state, profile: null, repos: [], loading: false}
        default:
            return state

    }
}


// GET current user profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Create or update profile
export const createProfile = (formData, history, edit = false) => async (dispatch) => {

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const res = await axios.post('/api/profile', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(set_alert(edit ? 'Profile Updated' : 'Profile Created','success'))
        if (!edit) {
            history.push('/dashboard')
        }

    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(set_alert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }

}
//add Experience
export const addExperience=(formData,history,edit=true)=>async (dispatch)=>{
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(set_alert('Experience added','success'))
        if (!edit) {
            history.push('/dashboard')
        }

    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(set_alert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//add Education
export const addEducation=(formData,history,edit=true)=>async (dispatch)=>{
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const res = await axios.put('/api/profile/education', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(set_alert('education added','success'))
        if (!edit) {
            history.push('/dashboard')
        }

    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(set_alert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}