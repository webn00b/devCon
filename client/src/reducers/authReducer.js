import axios from "axios";
import {set_alert} from './alertReducer'
const REGISTER_SUCCESS = 'AUTH/REGISTER_SUCCESS'
const REGISTER_FAIL = 'AUTH/REGISTER_FAIL'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token)
            return {
                ...state,...payload,isAuthenticated: true,loading: false
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,token: null,isAuthenticated: false,user: null
            }
        default:
            return state

    }

}
//actions

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