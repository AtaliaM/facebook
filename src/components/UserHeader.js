import React from 'react';
import '../style/UserHeader.css';

const UserHeader = () => {

    return (
        <div className="header-container">
            <div className="header">
                <h1 className="user-name">User Name</h1>
                <div className="user-image">
                    <button className="user-pic-icon"><i className="fas fa-camera-retro"></i></button>
                </div>
                <button className="user-header-pic-icon"><i className="fas fa-camera-retro"></i>Change header picture</button>
            </div>
        </div>
    )

}

export default UserHeader;