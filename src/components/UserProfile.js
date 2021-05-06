import React from 'react';
import  UserNavBar from './UserNavBar';
import UserHeader from './UserHeader';
import UserWall from './UserWall';


const UserProfile = () => {

    return (
        <div>
            <UserNavBar/>
            <UserHeader/>
            <UserWall/>
        </div>
    )


}

export default UserProfile;