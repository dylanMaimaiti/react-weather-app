import React from "react";

class Toggle extends React.Component {

    modifyTempMeasure = () => {
        if (this.props.tempMeasure === "metric") {
            this.props.changeTempMeasure("imperial");
        } else {
            this.props.changeTempMeasure("metric");
        }
    }

    render() {
        return (
                <div className="toggle-div">
                    <div>℃</div>
                    <label className="switch">
                        <input type="checkbox" className="toggle" onClick={this.modifyTempMeasure} />
                        <span className="slider"></span>
                    </label>
                    <div>°F</div>
                </div>
        );
    }
}

export default Toggle;