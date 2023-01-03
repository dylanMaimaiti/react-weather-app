import React, { useCallback, useEffect } from "react";

let storageCount = 1;
let userCity;
const SearchBar = (props) => {

    function setUserCity(newCity) {
        userCity = newCity;
    }

    //handles search submission
    function searchSubmit(event) {
        event.preventDefault();
        let searchBar = document.querySelector("#searchBar");
        const searchValue = searchBar.value;
       
        setUserCity(searchValue);
        handleWeatherUpdating(searchValue, props.tempMeasure);

        saveToLocalStorage(userCity);
        searchBar.blur();
        event.target.reset();
    }

    function saveToLocalStorage(cityName) {
        if (props.recentCities) {
            storageCount = props.recentCities.length + 1;
        }
        //if city isn't already in local storage then add it
        if (!localStorage.getItem(cityName)) {
            localStorage.setItem(cityName, storageCount);
            storageCount++;
        } 
        //add user city to the recents array (changes state)
        props.addRecentCity(cityName);
    }

    const updateName = props.updateDisplayName;
    const updateWeather = props.updateWeather;
    const removeCity = props.removeCity;
    const handleWeatherUpdating = useCallback((searchValue, measure) => {
        //converts city name into coordinates, extracts it into lat and lon then gets the weather
        async function retrieveWeatherData(cityName, units) {
            let latLon;
            let obj = await convertCityToCoordinates(cityName);
            latLon = extractCoordinates(obj);
            return await getWeather(latLon.lat, latLon.lon, units);
        };

        retrieveWeatherData(searchValue, measure).then((weather) => {
            if (weather === null) {
                removeCity();
            }
            updateName(userCity);
            updateWeather(weather);
        });
    }, [updateName, updateWeather]);

    //converts a city name into lat and long by calling my lambda function
    async function convertCityToCoordinates(cityName) {
        let coordinates = await fetch("https://76idescclwuo3sbwoip35mhryq0tosoo.lambda-url.us-east-1.on.aws/?cityName=" + cityName, {
            mode: 'cors',
        });
     
        let coordObject = await coordinates.json();
        
        setUserCity(cityName);
        return coordObject;
    }

    //extracts the lat and lon values from the coordinates object
    function extractCoordinates(coords) {
        if (coords.length === 0) {
            return { lat: 0, lon: 0 };
        }
        let lat = coords[0].lat;
        let lon = coords[0].lon;
        return { lat, lon };
    }

    //calls the weather api using lat and long then returns the raw weather obj
    async function getWeather(lat, lon, units) {
        let weatherRaw;
        let weatherObj;
        //handling the user entering a city that doesn't exist
        if (lat === 0 && lon === 0) {
            weatherObj = null;
            localStorage.removeItem(userCity);
            setUserCity("Error");
            return weatherObj;
        }

        lat = parseFloat(lat);
        lon = parseFloat(lon);
        
        weatherRaw = await fetch("https://inpehyjow4f24pqmg74awcurmi0ypibg.lambda-url.us-east-1.on.aws/?lat="+lat+"&lon="+lon+"&units="+units, {
            mode: 'cors',
        });

        weatherObj = await weatherRaw.json();
        return weatherObj;
    }

    useEffect(() => {
        if (userCity) {
            handleWeatherUpdating(userCity, props.tempMeasure);
        }
    }, [props.tempMeasure, handleWeatherUpdating]);

    return (
        <div className="top-bar">
            <form name="searchForm" id="searchForm" onSubmit={(event) => searchSubmit(event, props.tempMeasure)}>
                <input type="search" name="searchBar" id="searchBar" placeholder="Search..." />
                <button type="submit" name="searchButton" id="searchButton">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30"
                        viewBox="0 0 30 30" style={{ fill: "#000000" }}>
                        <path
                            d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z">
                        </path>
                    </svg>
                </button>
            </form>
        </div>
    );
};
export default SearchBar;