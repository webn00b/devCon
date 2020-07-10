import uuid from 'uuid'
const initialState=[]

const SET_ALERT='SET_ALERT'
const REMOVE_ALERT='REMOVE_ALERT'

const alertReducer = (state=initialState,action)=>{
    const {type,payload}=action;
    switch (type) {
        case SET_ALERT: return [...state,payload]
        case DISABLE_ALERT:return[...state,state.filter((x)=>x.id!=payload)]
        default:return state
    }
}

export const set_alert=(msg,alertType)=> dispatch=>{
    const id = uuid.v4()
    return dispatch({
        type:SET_ALERT,
        payload:{
            id,msg,alertType
        }
    })
}


const disable_alert=(x)=>{
    return{
        type:DISABLE_ALERT,
        payload:x
    }
}





export default alertReducer;