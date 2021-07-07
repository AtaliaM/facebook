import React from 'react';
import { patchAuthUser } from '../../../authPaths';
import FollowButton from '../FollowButton/FollowButton';
import '../FollowButton/FollowButton.css'

class UnfollowButton extends React.Component {

    state = { followingUser: true }

    onUnfollowUserClick = async () => {
        console.log(this.props)
        const userPath = { path: this.props.userPath };
        try {
            const res = await patchAuthUser("/users/me/unfollowUser", userPath);
            console.log(res);
            this.setState({ followingUser: false })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className="buttonContainer">
                {this.state.followingUser ?
                    <button className="ui button followBtn" onClick={() => this.onUnfollowUserClick()}>Unfollow User</button>
                    :
                    <FollowButton userId={this.props.userId} userPath={this.props.userPath} />
                }
            </div>
        )
    }
}

export default UnfollowButton;