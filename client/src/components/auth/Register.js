import {Link, Redirect} from 'react-router-dom'
import React, {useState} from 'react'
import {connect} from "react-redux";
import {set_alert, disable_alert} from '../../reducers/alertReducer'
import {register} from "../../reducers/authReducer";
import PropTypes from 'prop-types'

const Register = ({set_alert, register,isAuthenticated}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    if(isAuthenticated){
        return <Redirect to={"/dashboard"}/>
    }
    const {name, email, password, password2} = formData;//get variables from state
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }//e.target.name :: get current input name
    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {

            set_alert('password did not match', 'danger')
            return console.log('password did not match');
        }
        register({name, email, password})

    }
    return (<>

            <section className="container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" value={name} placeholder="Name" name="name" onChange={onChange}
                               // required
                        />
                    </div>
                    <div className="form-group">
                        <input type="email" value={email} placeholder="Email Address" onChange={onChange} name="email"/>
                        <small className="form-text"
                        >This site uses Gravatar so if you want a profile image, use a
                            Gravatar email</small
                        >
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Password"
                            name="password"
                            // minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            onChange={onChange}
                            type="password"
                            placeholder="Confirm Password"
                            value={password2}
                            name="password2"
                            // minLength="6"
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register"/>
                </form>
                <p className="my-1">
                    Already have an account? <Link to="login">Sign In</Link>
                </p>
            </section>

        </>
    )
}

Register.propTypes = {
    set_alert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}

const mapStateToProps=(state)=>({
    isAuthenticated:state.authReducer.isAuthenticated
})


export default connect(mapStateToProps, {set_alert, disable_alert, register})(Register)
