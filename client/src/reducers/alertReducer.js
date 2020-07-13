import {v4 as uuid} from 'uuid'
const initialState=[]

export const SET_ALERT='ALERT/SET_ALERT'
const REMOVE_ALERT='ALERT/REMOVE_ALERT'

const alertReducer = (state=initialState,action)=>{
    const {type,payload}=action;
    switch (type) {
        case SET_ALERT: return [...state,payload]
        case REMOVE_ALERT:return state.filter((x)=>x.id!==payload)
        default:return state
    }
}

export const set_alert=(msg,alertType,timeOut=5000)=> (dispatch)=>{
    const id = uuid()
     dispatch({
        type:SET_ALERT,
        payload:{
            id,msg,alertType
        }
    })
    setTimeout(()=>dispatch({type:REMOVE_ALERT,payload:id}),timeOut)
}


export const disable_alert=(x)=>{
    return{
        type:REMOVE_ALERT,
        payload:x
    }
}





export default alertReducer;