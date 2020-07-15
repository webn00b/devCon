import React, { useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {logIn} from "../../reducers/authReducer";

const Login = ({isAuthenticated,logIn}) => {
    const[formData,setFormData]=useState({
        email:'',
        password:''
    })
    const {email,password}=formData
    const onSubmit=(e)=>{
        e.preventDefault();
        logIn(email,password)
    }
    //redirect if logged in
    if(isAuthenticated){
        return <Redirect to={"/dashboard"}/>
    }
    const onChange=(e)=>{setFormData({...formData,[e.target.name]:e.target.value})}
    return (<>
        <section className="container">
        {/* <div className="alert alert-danger">
          Invalid credentials
        </div> */}
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
        <form className="form" onSubmit={e=>onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e)=>{onChange(e)}}
              placeholder="Email Address"
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e)=>{onChange(e)}}
              placeholder="Password"
              name="password"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="register">Sign Up</Link>
        </p>
      </section>
      </> )
}

Login.propTypes={
    logIn:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}
const mapStateToProps=(state)=>({
    isAuthenticated:state.authReducer.isAuthenticated
})

export default connect(mapStateToProps,{logIn})(Login)
