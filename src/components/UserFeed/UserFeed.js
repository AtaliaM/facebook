import React from 'react';
import './UserFeed.css';
import UserNavBar from '../UserProfile/UserNavBar/UserNavBar';

class UserFeed extends React.Component {

    render() {
        return (
            <div>
                <UserNavBar />
                <div className="feedContainer">
                    <div>
                        friends posts
                </div>
                </div>

            </div>
        )
    }
}

export default UserFeed;