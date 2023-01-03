
import './styles.css';
import React, { useEffect, useState } from "react";
import Header from './components/Header';
import OuterContainer from './components/OuterContainer';
import Footer from './components/Footer';

function App() {
  const [measurement, setMeasurement] = useState("metric");
  const [recentLocations, setRecentCities] = useState([]);

  //add new city which modifies state
  const addCity = (newCity) => {
    let temp = [...recentLocations];
    let index;
    //if recent cities array already includes the new city then remove the old one
    //and add new city to the front
    if (temp.includes(newCity)) {
      index = temp.indexOf(newCity);
      temp.splice(index,1);
    }
    temp.unshift(newCity);
    setRecentCities(temp);
  }

  const clearCities = () => {
    setRecentCities([]);
  }

  const setAllCities = (newCities) => {
    setRecentCities(newCities);
  }

  //load visited cities from local storage
  useEffect( () => {
    let items = { ...localStorage };
    let storedCities;

    storedCities = Object.keys(items);
    let cityArray = [];

    storedCities.forEach(city => {
      if (!recentLocations.includes(city)) {
        cityArray.push(city);
      }
    });

    setAllCities(cityArray);
  },[]);
  
  return (
    <div className="body-div">
      <Header clearRecents={clearCities} recentCities={recentLocations} tempMeasure={measurement} changeTempMeasure={setMeasurement} />
      <OuterContainer addRecentCity={addCity} recentCities={recentLocations} tempMeasure={measurement} />
      <Footer />
    </div>
  );
}

export default App;
