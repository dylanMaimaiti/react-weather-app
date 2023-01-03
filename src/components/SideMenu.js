import React, { useState } from "react";
import Recents from "./Recents";

const SideMenu = (props) => {
    const[showSide, setShowSide] = useState(false);
    
    const sideButtonHandler = () => {
        if (showSide === true) {
            setShowSide(false);
        } else {
            setShowSide(true);
        }
    }

    return (
        <div className="side-menu-button-div">
            <button className="side-button" onClick={sideButtonHandler}>|||</button>
            {showSide ? <Recents clearRecents={props.clearRecents} recentCities={props.recentCities} showSide={showSide} modifyShowSide={setShowSide} /> : null}
        </div>
    )
};

export default SideMenu;