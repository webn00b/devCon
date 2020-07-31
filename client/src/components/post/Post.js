import React, {useEffect} from "react";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getPost} from "../../reducers/postReducer";
import Spinner from "../layouts/Spinner";
import PostItem from "../posts/PostItem";
import {Link} from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";


const Post = ({getPost,post:{post,loading},match})=>{
    useEffect(()=>{
        getPost(match.params.id)
    },[getPost])

    return loading || post === null ? <Spinner/> : (<>
        <Link to={'/posts'} classname={"btn"}>Back to Posts</Link>
        <PostItem showActions={true}/>
        <CommentForm postId={post._id}/>
        <div className={"comments"}>{
            post.comments.map(comment=>(
                <CommentItem key={comment._id} comment={comment} postId={post._id}/>
            ))
        }</div>
        </>)

}

const mapStateToProps=(state)=>({
    post:state.postReducer
})

export default connect(mapStateToProps,{getPost})(Post)