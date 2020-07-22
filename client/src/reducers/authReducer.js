import axios from "axios";
import {set_alert} from './alertReducer'
import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE, DELETE_ACCOUNT
} from "./actions-types";
import setAuthToken from "../utils/setAuthToken";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}
//Load user
export const loadUser=()=>async (dispatch)=>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    }catch (err) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case USER_LOADED:return {...state,isAuthenticated: true,loading: false,user: payload}
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token)
            return {
                ...state,...payload,isAuthenticated: true,loading: false
            }
        case LOGOUT:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token')
            return {
                ...state,token: null,isAuthenticated: false,user: null, loading: false,
            }

        default:
            return state

    }

}

//register user

export const register=({name,email,password})=>async (dispatch)=>{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({name,email,password})
    try {
        const res = await axios.post('/api/users/',body,config)

        dispatch({
            type:REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    }catch (err) {
        //get all errors from response
        const errors=err.response.data.errors
        if(errors){
            errors.forEach(err=>dispatch(set_alert(err.msg,'danger')))
        }
    dispatch({
        type:REGISTER_FAIL
    })
    }
}


//login user

export const logIn=(email,password)=>async (dispatch)=>{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email,password})
    try {
        const res = await axios.post('/api/auth/',body,config)

        dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    }catch (err) {
        //get all errors from response
        const errors=err.response.data.errors
        if(errors){
            errors.forEach(err=>dispatch(set_alert(err.msg,'danger')))
        }
        dispatch({
            type:LOGIN_FAIL
        })
    }
}
//Logout
export const logout=()=>(dispatch)=>{
    dispatch({
        type:LOGOUT
    })
    dispatch({
        type:CLEAR_PROFILE
    })
}
