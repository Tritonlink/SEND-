import React from 'react';
import {NavLink} from "react-router-dom"

const InscriptNav = () => {
    interface active {
        isActive: boolean
    }
    const isActived = (isActive:active):string => isActive ? "actived" : "nav"
    return (
        <div className="nav-bar">
            <NavLink to="/signIn" className={(isActive) => isActived(isActive)}>S'indentifier</NavLink>
            <NavLink to="/singUp" className={(isActive) => isActived(isActive)}>S'inscrire</NavLink>
        </div>
    );
};

export default InscriptNav;