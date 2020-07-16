import {CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR} from "./actions-types";
import axios from 'axios'
import {set_alert} from "./alertReducer";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    errors: {}
}
export default function (state = initialState,action) {
    const {type, payload}=action;
    switch (type) {
        case GET_PROFILE :
            return {...state, profile: payload, loading: false}
        case PROFILE_ERROR:
            return {...state, error: payload, loading: false}
        default:
            return state
        case CLEAR_PROFILE:return {...state,profile:null,repos: [],loading: false }
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