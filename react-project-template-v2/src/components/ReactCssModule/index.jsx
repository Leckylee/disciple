/**
 * @name ReactCssModule
 * @author darcrand
 * @desc 测试 css-module
 */

import React, { Component } from "react"

import "./styles.less"

class ReactCssModule extends Component {
    render() {
        return (
            <div>
                <h1 className="text-style" styleName="head-title">
                    react css module
                </h1>
            </div>
        )
    }
}

export default ReactCssModule
