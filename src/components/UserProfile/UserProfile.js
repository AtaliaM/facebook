import React from 'react';
import UserNavBar from './UserNavBar/UserNavBar';
import UserHeader from './UserHeader/UserHeader';
import UserWall from './UserWall/UserWall';
import Cookies from 'universal-cookie';
import facebookApi from '../../apis/facebook-api';
import {getAuthUser} from '../../authPaths';

class UserProfile extends React.Component {

    state = { userToken: '', userName: '', myProfile: true, userId: '', userPath: '' }

    async componentDidMount() {
        this.readProfile();
    }

    componentDidUpdate(prevProps, prevState) {
        
        if(prevProps !== this.props){
            window.location.reload();
        }
    }

    readProfile = async() => {
        if (window.location.pathname === "/myProfile") { //if the user is viewing his own profile
            try {
                const cookies = new Cookies();
                const userToken = cookies.get('userToken');
                const res = await getAuthUser("/users/me");

                this.setState({ userToken: userToken, userName: `${res.data.firstName} ${res.data.lastName}`, userId: `${res.data._id}` });
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
                this.setState({ myProfile: false, userName: `${res.data[0].firstName} ${res.data[0].lastName}`, userId: `${res.data[0]._id}`, userPath: `${res.data[0].path}` })
            } catch (e) {
                console.log(e);
            }
        }
    }

    render() {
        return (
            <div>
                <UserNavBar/>
                <UserHeader myProfile={this.state.myProfile} userName={this.state.userName} userId={this.state.userId} userPath={this.state.userPath} />
                <UserWall key={this.state.userId} myProfile={this.state.myProfile} userId={this.state.userId} />
            </div>
        )
    }
}

export default UserProfile;