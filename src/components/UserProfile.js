import React from 'react';
import UserNavBar from './UserNavBar';
import UserHeader from './UserHeader';
import UserWall from './UserWall';
import Cookies from 'universal-cookie';
import facebookApi from '../apis/facebook-api';

class UserProfile extends React.Component {

    state = { userToken: '', userName: '', myProfile: true }

    async componentDidMount() {
        // console.log(window.location.pathname);
        if (window.location.pathname === "/myProfile") { //if the user is viewing his own profile
            try {
                const cookies = new Cookies();
                const userToken = cookies.get('userToken');

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
                const res = await facebookApi.get(`${window.location.pathname}`);
                this.setState({ myProfile: false, userName: `${res.data[0].firstName} ${res.data[0].lastName}` })
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
                <UserHeader myProfile={this.state.myProfile} userName={this.state.userName}/>
                <UserWall myProfile={this.state.myProfile}/>
            </div>
        )
    }

}

export default UserProfile;

// myProfile={this.props.myProfile} userName={this.props.userName}