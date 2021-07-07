import React from 'react';
import UnfollowButton from '../UnfollowButton/UnfollowButton';
import { getAuthUser, patchAuthUser } from '../../../authPaths';
import './FollowButton.css'

class FollowButton extends React.Component {

    state = {followingUser: false}

    async componentDidMount() {
        //check if current logged in user is already following this user//
        const id = this.props.userId;
        const res = await getAuthUser("/users/me");
        console.log(this.props)
        const result = res.data.usersIFollow.filter(function(userId) {
            return userId.userId === id;
        } );
        if (result.length!==0) {
            this.setState({followingUser: true})
        }
    }

    onFollowUserClick = async() => {
        const userPath = {path: this.props.userPath}
        try {
            const res = await patchAuthUser("/users/me/followUser", userPath);
            console.log(res);
            this.setState({followingUser:true})
        } catch(e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className="buttonContainer">
            {this.state.followingUser ? 
            <UnfollowButton userId={this.props.userId} userPath={this.props.userPath}/> :
            <button className="ui button followBtn" onClick={() => this.onFollowUserClick()}>Follow User</button>
            }
            </div>
        )
    }
}


export default FollowButton;