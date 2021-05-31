import React from 'react';
import  UserNavBar from './UserNavBar';
import UserHeader from './UserHeader';
import UserWall from './UserWall';
import Cookies from 'universal-cookie';


class UserProfile extends React.Component {

    state = {userToken : ''}

    componentDidMount() {
        const cookies = new Cookies();
        const userToken = cookies.get('userToken');
        this.setState({userToken:userToken});

        if (!userToken) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <UserNavBar/>
                <UserHeader/>
                <UserWall/>
            </div>
        )
    }

}

export default UserProfile;