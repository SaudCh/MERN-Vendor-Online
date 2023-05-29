import React from "react";
import Logo from "../images/logo.png";

import "./spinner.css";

//loading sipnner
const LoadingSpinner = (props) => {
    return (
        <div className={`${props.asOverlay && "loading-spinner__overlay z-10"}`}>
            <div className="text-center">
                <div className="lds-dual-ring"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;