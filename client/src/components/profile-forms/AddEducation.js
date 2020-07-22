import React, {useState} from "react";
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {addEducation} from "../../reducers/profileReducer";

const AddEducation = ({addEducation,history}) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })
    const [toDateDisabled, toggleDisabled] = useState(false)

    const {school, degree, fieldofstudy, from, to, current, description} = formData
    const onchange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    return (<>
            <h1 className="large text-primary">
                Add An Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school or bootcamp
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e)=>{e.preventDefault();addEducation(formData,history)}}>
                <div className="form-group">
                    <input value={school} onChange={e => onchange(e)} type="text" placeholder="* School Title" name="school"
                           required/>
                </div>
                <div className="form-group">
                    <input value={degree} onChange={e => onchange(e)} type="text" placeholder="* degree"
                           name="degree" required/>
                </div>
                <div className="form-group">
                    <input value={fieldofstudy} onChange={e => onchange(e)} type="text" placeholder="fieldofstudy"
                           name="fieldofstudy"/>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => onchange(e)}/>
                </div>
                <div className="form-group">
                    <p><input onChange={(e) => {
                        setFormData({...formData, current: !current});
                        toggleDisabled(!toDateDisabled)
                    }} type="checkbox" name="current" checked={current} value={current}/>{' '} Current Job</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input  value={from} onChange={e => onchange(e)} type="date" name="to" disabled={toDateDisabled?'disabled':''}/>
                </div>
                <div className="form-group">
          <textarea  value={description} onChange={e => onchange(e)}
                     name="description"
                     cols="30"
                     rows="5"
                     placeholder="Program Description"
          ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1"/>
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </>
    )
}


AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, {addEducation})(AddEducation)