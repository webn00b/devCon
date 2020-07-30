import axios from 'axios'
import{set_alert} from "./alertReducer";
import {
    GET_POSTS,
    POST_ERROR, PROFILE_ERROR, UPDATE_LIKES
} from './actions-types'

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case GET_POSTS:
            return {
                ...state, posts: payload, loading: false
            }
        case POST_ERROR:
            return {...state,error: payload,loading: false}
        case UPDATE_LIKES:
            return {...state,posts: state.posts.map(post=>post._id===payload.id?{...post,likes: payload.likes}:post),loading: false}
        default:return state
    }

}
//actions

export const getPosts=()=>async (dispatch)=>{
    try {
        const res = await axios.get(`api/post`)
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    }catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Add like
export const addLike=(id)=>async (dispatch)=>{
    try {
        const res = await axios.put(`api/post/like/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data }
        })
    }catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}
//remove like
export const removeLike=(id)=>async (dispatch)=>{
    try {
        const res = await axios.put(`api/post/unlike/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data }
        })
    }catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        })
    }
}