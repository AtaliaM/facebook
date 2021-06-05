import React from 'react';
import '../style/UserFeed.css';
import UserNavBar from './UserNavBar';

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