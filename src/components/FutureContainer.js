import React from "react";
import NextForecast from "./NextForecast";
class FutureContainer extends React.Component {

    render() {
        //weather info for next 4 days
        return(
            <div className="future-container">
                <div className="future-title">Next 4 day forecast at 2pm your time</div>
                <div className="future-card-container">
                    <NextForecast weather={this.props.weather.list[7]} convertToUTC={this.props.convertToUTC}/>
                    <NextForecast weather={this.props.weather.list[15]} convertToUTC={this.props.convertToUTC}/>
                    <NextForecast weather={this.props.weather.list[23]} convertToUTC={this.props.convertToUTC}/>
                    <NextForecast weather={this.props.weather.list[31]} convertToUTC={this.props.convertToUTC}/>
                </div>
            </div>
        );
    }
}

export default FutureContainer;