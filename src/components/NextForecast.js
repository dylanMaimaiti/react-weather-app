import React from "react";
import WeatherIcon from "./WeatherIcon";

const NextForecast = (props) => {
    let weather = props.weather;
    //extract today's weather info
    let description = weather.weather[0].description;
    description = description.charAt(0).toUpperCase() + description.slice(1);
    let date = props.convertToUTC(weather.dt);
    let temp = Math.round(weather.main.temp);
    let feels = Math.round(weather.main.feels_like);

    return(
        <div className="next-forecast">
            <div className="next-forecast-date">{date}</div>
            <div>{description}</div>
            <WeatherIcon desc={description}/>
            <div>{temp}</div>
            <div>{feels}</div>
        </div>
    )
}

export default NextForecast;