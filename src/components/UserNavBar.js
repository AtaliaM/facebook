import React from 'react';
import '../style/UserNavBar.css';
// import icon from '../pictures/icon.png';
import { Link} from 'react-router-dom';


const UserNavBar = () => {

    return (
        <ul>
            <li><Link to='/'>Home <i className="fas fa-home"></i></Link></li>
            <li><Link to='/myProfile'>Profile <i className="fas fa-user-alt"></i></Link></li>
            <li><Link to='/myProfile'>Messages <i className="far fa-envelope"></i></Link></li>
            <li><Link to='/logout'>Logout <i className="fas fa-sign-out-alt"></i></Link></li>
            {/* <img src={icon} alt="icon"></img> */}
        </ul>
    )

}

export default UserNavBar;