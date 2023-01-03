import React from "react";

const RecentCity = (props) => {

    //simulates search submit. Allows user to click a recent city and see it's data
    const submitSearch = () => {
        let city = props.city;
    
        updateLocalStorage();

        document.searchForm.searchBar.value = city;
        document.searchForm.searchButton.click();
    }

    const updateLocalStorage = () => {
        let recents = props.recentCities;
        let city = props.city;

        let storageNum = localStorage.getItem(city);
        let newValue;
        for (let i = 0; i < recents.length; i++) {
            if (localStorage.getItem(recents[i]) > storageNum) {
                newValue = localStorage.getItem(recents[i]) - 1;
                localStorage.setItem(recents[i], newValue);
            }
        }
        localStorage.setItem(city, recents.length);
    } 

    return (
        <div className="recent-item-div" onClick={submitSearch}>{props.city}</div>
    )
}

export default RecentCity;