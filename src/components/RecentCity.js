import React from "react";

const RecentCity = (props) => {

    //simulates search submit. Allows user to click a recent city and see it's data
    const submitSearch = () => {
        let city = props.city;
        document.searchForm.searchBar.value = city;
        document.searchForm.searchButton.click();
    }

    return (
        <div className="recent-item-div" onClick={submitSearch}>{props.city}</div>
    )
}

export default RecentCity;