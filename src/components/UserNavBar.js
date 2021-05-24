import React from 'react';
import '../style/UserNavBar.css';
import icon from '../pictures/icon.png';

const UserNavBar = () => {

    return (
        <ul>
            <li><a href="/">Home <i class="fas fa-home"></i></a></li>
            <li><a href="/">Profile <i class="fas fa-user-alt"></i></a></li>
            <li><a href="/">Messages <i class="far fa-envelope"></i></a></li>
            {/* <img src={icon} alt="icon"></img> */}
        </ul>
    )

}

export default UserNavBar;