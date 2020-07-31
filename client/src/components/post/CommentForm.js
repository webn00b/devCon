import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {addComment, addPost} from "../../reducers/postReducer";

const CommentFrom = ({addComment,postId}) => {
    const[text,setText]=useState('')
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={event => {event.preventDefault();addComment(postId,{text});setText('')}}>
          <textarea
              value={text}
              onChange={e=>setText(e.target.value)}
              name="text"
              cols="30"
              rows="5"
              placeholder="Create a post"
              required
          ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit"/>
            </form>
        </div>
    );
};

CommentFrom.propTypes = {
    addComment:PropTypes.func.isRequired
};

export default connect(null,{addComment}) (CommentFrom);
