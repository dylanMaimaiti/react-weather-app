
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

  const removeNewestCity = () => {
    loadFromStorage();
  }

  const clearCities = () => {
    setRecentCities([]);
  }

  const setAllCities = (newCities) => {
    setRecentCities(newCities);
  }

  //load visited cities from local storage
  useEffect( () => {
    loadFromStorage();
  },[]);

  const loadFromStorage = () => {
    let items = { ...localStorage };
    let storedCities;

    storedCities = Object.keys(items);
    let cityArray = [];
    let index;

    storedCities.forEach(city => {
      if (!recentLocations.includes(city)) {
        index = localStorage.getItem(city)-1;
        cityArray[index] = city;
      }
    });

    //swap it so first in the array based on local storage is actually least recent
    let length = cityArray.length;
    let tempValue;
    for (let i = 0; i < (length/2); i++) {
      tempValue = cityArray[i];
      cityArray[i] = cityArray[length-1-i];
      cityArray[length-1-i] = tempValue;
    }

    setAllCities(cityArray);
  }
  
  return (
    <div className="body-div">
      <Header clearRecents={clearCities} recentCities={recentLocations} tempMeasure={measurement} changeTempMeasure={setMeasurement} />
      <OuterContainer removeCity={removeNewestCity} addRecentCity={addCity} recentCities={recentLocations} tempMeasure={measurement} />
      <Footer />
    </div>
  );
}

export default App;
