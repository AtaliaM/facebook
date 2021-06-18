import React from 'react';
import UserNavBar from './UserNavBar/UserNavBar';
import UserHeader from './UserHeader/UserHeader';
import UserWall from './UserWall/UserWall';
import Cookies from 'universal-cookie';
import facebookApi from '../../apis/facebook-api';

class UserProfile extends React.Component {

    state = { userToken: '', userName: '', myProfile: true, userId: '', userPath: '' }

    async componentDidMount() {
        if (window.location.pathname === "/myProfile") { //if the user is viewing his own profile
            try {
                const cookies = new Cookies();
                const userToken = cookies.get('userToken');
                console.log(userToken)
                const res = await facebookApi.get('/users/me', {
                    headers: { Authorization: "Bearer " + userToken }
                });

                this.setState({ userToken: userToken, userName: `${res.data.firstName} ${res.data.lastName}` });

                if (!userToken) {
                    this.props.history.push('/');
                }
            } catch (e) {
                console.log(e);
            }
        }
        else { //if the user is viewing another user's profile
            try {
                const path = window.location.pathname.slice(7);
                const res = await facebookApi.get(`/users/${path}`);
                console.log("in another user profile...")
                this.setState({ myProfile: false, userName: `${res.data[0].firstName} ${res.data[0].lastName}`, userId: `${res.data[0]._id}`, userPath:`${res.data[0].path}` })
            } catch (e) {
                console.log(e);
            }
        }
    }

    //need to pass the user's details to the following components//
    render() {
        return (
            <div> 
                <UserNavBar />
                <UserHeader myProfile={this.state.myProfile} userName={this.state.userName}  userId={this.state.userId} userPath={this.state.userPath}/>
                {/* {this.state.userName !== '' ? */}
                <UserWall myProfile={this.state.myProfile} userId={this.state.userId} userPath={this.state.userPath}/>
            </div>
        )
    }
}

export default UserProfile;