# React Weather App
- This is a weather app made with React, HTML5, and CSS for the front end
- It makes calls to lambda functions that I built to retrieve the weather data which acts as a serverless backend
- Live site https://production.d29mx314v559x5.amplifyapp.com/

## Demo

### Searched for a city upper view
![Searching for a city](./public/weatherAppReadMeDemo1.PNG)

### Searched for a city lower view
![Searching for a city lower view](./public/weatherAppReadMeDemo2.PNG)

### Searching with recent locations open
![Searching with recent locations open](./public/weatherAppReadMeSidebar.PNG)

## Features
- Has a search bar that accepts city/location names
- There is also a toggle to switch the unit of measurement between Celsius and Fahrenheit
    - When the user switches the unit and has weather data already displayed it makes a new api call to update the data
- I make calls to two lambda functions which then make calls to the OpenWeather API
    - One lambda function converts a city name into latitude and longitude (which OpenWeather requires)
    - The second function actually retrieves the weather data
- My web app also keeps track of recent searches and stores them in local storage
- Finally, I hosted it using AWS Amplify

## Future plans
 - I would like to implement some sort of weather data caching to avoid overloading the OpenWeather API
 - I know Redis would work but I prefer to use an AWS service as the first lambda function called will need to query the caching service before trying the weather API
 - Weather objects for cities will be stored until there 'expiration' time is reached in which case a new call will be made to OpenWeather
 - Expiration will be based on the most recent weather data being out of time (ie current time has passed that)

# Using the application
 - User's can either clone the repo and use some sort of development server to use it or they can use the hosted app using the link in the top description paragraph.
 - To view weather data for a city, simply enter the city name in the search bar and hit enter or the magnifying glass


# Credits
 - I used the OpenWeatherMap API


### Made by Dylan Maimaiti and hosted with AWS