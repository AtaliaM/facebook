import React from 'react';
import '../style/UserNavBar.css';
import icon from '../pictures/icon.png';

const UserNavBar = () => {

    return (
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Profile</a></li>
            <li><a href="/">Messages</a></li>
            <img src={icon} alt="icon"></img>
        </ul>
    )

}

export default UserNavBar;