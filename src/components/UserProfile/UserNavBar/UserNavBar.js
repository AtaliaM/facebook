import React from 'react';
import './UserNavBar.css';
import SearchField from '../../SearchField/SearchField'
import { Link} from 'react-router-dom';


const UserNavBar = () => {

    return (
        <ul>
            <li><Link to='/myFeed'>Home <i className="fas fa-home"></i></Link></li>
            <li><Link to='/myProfile'>Profile <i className="fas fa-user-alt"></i></Link></li>
            <li><Link to='/myProfile'>Messages <i className="far fa-envelope"></i></Link></li>
            <li><Link to='/logout'>Logout <i className="fas fa-sign-out-alt"></i></Link></li>
            <SearchField/>
        </ul>
    )

}

export default UserNavBar;