import React from "react";
import SearchBar from "./SearchBar";
import WeatherContainer from "./WeatherContainer";

class OuterContainer extends React.Component {

    constructor() {
        super();

        this.state = {
            weatherObject: {},
            cityDisplayName: "",
        };
    }

    updateDisplayName = (cityName) => {
        this.setState({
            cityDisplayName: cityName,
        });
    }

    updateWeatherObject = (weather) => {
        this.setState({
            weatherObject: weather,
        })
    }

    render() {
        return(
            <div className="outer-container">
                <SearchBar addRecentCity={this.props.addRecentCity} recentCities={this.props.recentCities} tempMeasure={this.props.tempMeasure} updateWeather={this.updateWeatherObject} updateDisplayName={this.updateDisplayName} />
                <WeatherContainer tempMeasure={this.props.tempMeasure} weatherObj={this.state.weatherObject} cityName={this.state.cityDisplayName} />
            </div>
        );
    }
}

export default OuterContainer;