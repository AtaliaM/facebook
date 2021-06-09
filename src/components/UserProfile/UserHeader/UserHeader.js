import React from 'react';
import './UserHeader.css';

const UserHeader = (props) => {


    return (
        <div className="header-container">
            <div className="header">
                <h1 className="user-name">{props.userName}</h1>
                <div className="user-image">
                    {props.myProfile ? <button className="user-pic-icon"><i className="fas fa-camera-retro"></i></button> : null}
                </div>
                {props.myProfile ? <button className="user-header-pic-icon"><i className="fas fa-camera-retro"></i>Change header picture</button> : null}
            </div>
        </div>
    )

}

export default UserHeader;