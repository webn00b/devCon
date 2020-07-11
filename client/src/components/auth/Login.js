import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const[formdData,setFormData]=useState({
        email:'',
        password:''
    })
    const {email,password}=formdData
    const onChange=(e)=>{setFormData({...formdData,[e.target.name]:e.target.value})}
    return (<>
        <section className="container">
        {/* <div className="alert alert-danger">
          Invalid credentials
        </div> */}
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i class="fas fa-user"></i> Sign into Your Account</p>
        <form className="form" action="dashboard.html">
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
        <p classname="my-1">
          Don't have an account? <Link to="register">Sign Up</Link>
        </p>
      </section>
      </> )
}

export default Login
