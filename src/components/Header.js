import React from "react";
import SideMenu from "./SideMenu";
import Toggle from './Toggle';

const Header = (props) => {
    return (
        <div className="header">
            <SideMenu clearRecents={props.clearRecents} recentCities={props.recentCities} />
            <Toggle tempMeasure={props.tempMeasure} changeTempMeasure={props.changeTempMeasure} />
        </div>
    );
};

export default Header;