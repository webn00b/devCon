import React from "react";
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from "react-moment";
import {deleteEducation} from "../../reducers/profileReducer";

const Education = ({education,deleteEducation}) => {
    const educations = education.map((v) => {
        return <tr key={v._id}>
            <td>{v.school}</td>
            <td className={"hide-sm"}>{v.degree}</td>
            <td>
                <Moment format={"YYYY/MM/DD"}>{v.from}</Moment> - {
                v.to===null?(' Now'):(<Moment format={"YYYY/MM/DD"}>{v.to}</Moment>)}
            </td>
            <td>
                <button className={"btn btn-danger"} onClick={()=>{deleteEducation(v._id)}}>Delete</button>
            </td>
        </tr>
    })
    return (
        <>
            <h2 className={"my-2"}>Education Credentials</h2>
            <table className={"table"}>
                <thead>
                <tr>
                    <th>Company</th>
                    <th className={"hide-sm"}>Title</th>
                    <th className={"hide-sm"}>Years</th>
                </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </>
    )
}

Education.propTypes = {
    education:PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education)