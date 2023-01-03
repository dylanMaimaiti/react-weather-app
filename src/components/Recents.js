import React from "react";
import RecentCity from "./RecentCity";


const Recents = (props) => {
    
    const closePanel = () => {
        props.modifyShowSide(!props.showSide);
    }

    const clearRecentsPanel = () => {
        //clear local storage
        localStorage.clear();
        //then clear the city array
        props.clearRecents();
    }

    //add up the cities character ascii codes to be a unique key
    const getCityId = (name) => {
        let id = 0;
        for (let i = 0; i < name.length; i++) {
            id += name.charCodeAt(i);
        }

        return id;
    }

    return (
        <div className="side-content-container">
            <div className="side-main-content-container">
                <div className="side-main-content-header">Recent locations</div>
                <div className="recents-container" >
                    {props.recentCities.map( (cityName) => <RecentCity recentCities={props.recentCities} city={cityName} key={getCityId(cityName)}/>)}
                </div>
                <div className="clear-recents-div">
                    <button className="clear-recents-button" onClick={clearRecentsPanel}>Clear recents</button>
                </div>
            </div>
            <div className="close-container">
                <button className="close-button" onClick={closePanel}>X</button>
            </div>
        </div>
    )
};

export default Recents;