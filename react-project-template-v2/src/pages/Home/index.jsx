/**
 * @name Home
 * @desc
 * @author
 * @version
 */

import React, { Component } from "react"
import { observer, inject } from "mobx-react"

import "./style.global.less"

@inject("ModuleTest")
@observer
class Home extends Component {
    render() {
        const {
            state: { firstName, lastName },
            fullName,
            onNameChange
        } = this.props.ModuleTest
        return (
            <div className="container">
                <input
                    className="ele-input"
                    type="text"
                    value={firstName}
                    maxLength={12}
                    placeholder="first name"
                    onChange={e => onNameChange("firstName", e.target.value)}
                />
                <input
                    className="ele-input"
                    type="text"
                    value={lastName}
                    maxLength={12}
                    placeholder="last name"
                    onChange={e => onNameChange("lastName", e.target.value)}
                />
                <p className="tips">your full name is :</p>
                <p className="full-name">{fullName}</p>
            </div>
        )
    }
}

export default Home
