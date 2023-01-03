import React from "react";
import FutureContainer from "./FutureContainer";
import NextForecast from "./NextForecast";
import WeatherIcon from "./WeatherIcon";


class WeatherContainer extends React.Component {

    //converts unix from API call to local time
    convertUnixToUTC(unixTime) {
        let converted = new Date(unixTime * 1000);
        let convertedString = converted.toString();

        //only return day, month, and time
        let seperatedTime = convertedString.split(" ");

        let time = seperatedTime[0] + ", " + seperatedTime[1] + " " + seperatedTime[2] + " " + seperatedTime[4];

        return time;
    }

    updateCurrentWeather() {
        //confirm it's a valid weather object 
        if (this.props.cityName !== "" && this.props.weatherObj !== null) {
            //render the thing
            let wContainer = document.querySelector(".weather-container");
            if (wContainer.classList.contains("hidden")) {
                wContainer.classList.toggle("hidden");
            }

            //extract relevant info from the api data

            const weatherObj = this.props.weatherObj;

            let currentCity = weatherObj.list[0];
            let sunriseUnix = weatherObj.city.sunrise;
            let sunsetUnix = weatherObj.city.sunset;

            let sunriseTime = this.convertUnixToUTC(sunriseUnix);
            let sunsetTime = this.convertUnixToUTC(sunsetUnix);

            let temp = currentCity.main.temp;
            temp = Math.round(temp);
            let feelsLike = currentCity.main.feels_like;
            feelsLike = Math.round(feelsLike);

            let description = currentCity.weather[0].description;
            description = description.charAt(0).toUpperCase() + description.slice(1);
            let dateTime = currentCity.dt;
            dateTime = this.convertUnixToUTC(dateTime);

            let humidity = currentCity.main.humidity;
            let windDirection = currentCity.wind.deg;
            let windGust = currentCity.wind.gust;
            let windUnits = "f/s";
            if (this.props.tempMeasure === "metric") {
                windUnits = "m/s";
            }
            return (
                <div className="current-container">
                    <div className="time-container">
                        {`Forecast date and time: ${dateTime}`}
                    </div>
                    <div className="icon-container">
                        <div className="weather-description">
                            {description}
                        </div>
                        <div className="weather-icon">
                            <WeatherIcon desc={description} />
                        </div>

                        <div className="temp-container">
                            <div className="actual-temp">
                                {`Current: ${temp}`}
                            </div>
                            <div className="feel-temp">
                                {`Feels like: ${feelsLike}`}
                            </div>
                        </div>
                    </div>
                    <div className="main-info-container">
                        <div className="more-info">
                            <div className="humidity">{`Humidity: ${humidity}%`}</div>
                            <div className="wind-direction">{`Wind direction: ${windDirection} degrees`}</div>
                            <div className="wind-gust">{`Wind gust: ${windGust} ${windUnits}`}</div>
                            <div className="sunrise">{`Sunrise: ${sunriseTime}`}</div>
                            <div className="sunset">{`Sunset: ${sunsetTime}`}</div>
                        </div>
                        <div className="next-forecast-container">
                            <NextForecast weather={weatherObj.list[1]} convertToUTC={this.convertUnixToUTC} />
                            <NextForecast weather={weatherObj.list[2]} convertToUTC={this.convertUnixToUTC} />
                            <NextForecast weather={weatherObj.list[3]} convertToUTC={this.convertUnixToUTC} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }

    //if there is an error it hides the weather container to allow an error container to render
    validateChosenCity() {
        if (this.props.weatherObj === null) {
            let wContainer = document.querySelector(".weather-container");
            if (!wContainer.classList.contains("hidden")) {
                wContainer.classList.toggle("hidden");
            }
        }
    }

    getApiCityName() {
        if (this.props.weatherObj !== null) {
            return this.props.weatherObj.city.name;
        } else {
            return "";
        }
    }

    getErrorView() {
        //return an error div
        if (this.props.weatherObj === null) {
            return (
                <div className="error-container">
                    <div className="error-msg">That city could not be found.</div>
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }


    render() {
        return (
            <div>
                <div className="weather-container hidden">
                    <div className="name-container">{this.props.cityName}</div>
                    {this.updateCurrentWeather()}
                    {(this.props.cityName !== "" && this.props.weatherObj !== null) ? <FutureContainer weather={this.props.weatherObj} convertToUTC={this.convertUnixToUTC} /> : null}
                    {this.validateChosenCity()}
                </div>
                {this.getErrorView()}
            </div>
        );
    }
}

export default WeatherContainer;