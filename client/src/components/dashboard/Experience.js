import React from "react";
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from "react-moment";


const Experience = ({experience}) => {
    const experiences = experience.map((v) => {
        return <tr key={v._id}>
            <td>{v.company}</td>
            <td className={"hide-sm"}>{v.title}</td>
            <td>
                <Moment format={"YYYY/MM/DD"}>{v.from}</Moment> - {
                v.to===null?(' Now'):(<Moment format={"YYYY/MM/DD"}>{v.to}</Moment>)}
            </td>
            <td>
                <button className={"btn btn-danger"}>Delete</button>
            </td>
        </tr>
    })
    return (
        <>
            <h2 className={"my-2"}>Experience Credentials</h2>
            <table className={"table"}>
                <thead>
                <tr>
                    <th>Company</th>
                    <th className={"hide-sm"}>Title</th>
                    <th className={"hide-sm"}>Years</th>
                </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </>
    )
}

Experience.propTypes = {
    experience:PropTypes.array.isRequired
}

export default connect(null,null)(Experience)