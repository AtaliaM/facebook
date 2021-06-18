import React from 'react';
import Cookies from 'universal-cookie';
import facebookApi from '../../../apis/facebook-api';
import UnfollowButton from '../UnfollowButton/UnfollowButton';
import './FollowButton.css'

class FollowButton extends React.Component {

    state = {followingUser: false}

    async componentDidMount() {
        //check if current logged in user is already following this user//
        const id = this.props.userId;
        const cookies = new Cookies();
        const userToken = cookies.get('userToken');
        const res = await facebookApi.get('/users/me', {
            headers: { Authorization: "Bearer " + userToken }
        });
        console.log(this.props)
        const result = res.data.usersIFollow.filter(function(userId) {
            return userId.userId === id;
        } );
        if (result.length!==0) {
            this.setState({followingUser: true})
        }
    }

    onFollowUserClick = async() => {
        const cookies = new Cookies();
        const userToken = cookies.get('userToken');
        const userPath = {path: this.props.userPath}
        try {
            const res = await facebookApi.patch('/users/me/followUser', userPath, {
                headers: { Authorization: "Bearer " + userToken }
            });
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