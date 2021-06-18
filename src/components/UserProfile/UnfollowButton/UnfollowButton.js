import React from 'react';
import Cookies from 'universal-cookie';
import facebookApi from '../../../apis/facebook-api';
import FollowButton from '../FollowButton/FollowButton';

class UnfollowButton extends React.Component {

    state = { followingUser: true }

    onUnfollowUserClick = async () => {
        console.log(this.props)
        const cookies = new Cookies();
        const userToken = cookies.get('userToken');
        const userPath = { path: this.props.userPath };
        try {
            const res = await facebookApi.patch('/users/me/unfollowUser', userPath, {
                headers: { Authorization: "Bearer " + userToken }
            });
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
                    <button className="ui button addBtn" onClick={() => this.onUnfollowUserClick()}>Unfollow User</button>
                    :
                    <FollowButton userId={this.props.userId} userPath={this.props.userPath} />
                }
            </div>
        )

    }

}


export default UnfollowButton;