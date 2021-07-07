import React from 'react';
import { Link } from 'react-router-dom';
import './Logout.css';
import { postAuthUser } from '../../../authPaths';
import Cookies from 'universal-cookie';

class Logout extends React.Component {

    logout = async () => {
        const cookies = new Cookies();
        try {
            await postAuthUser("/users/logout");
            cookies.remove('userToken', { path: '/users' });
            cookies.remove('userToken', { path: '/' });
            window.location.reload();
            // this.props.history.push("/");
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div>
                <div>Are you sure you want to logout?</div>
                <button className="ui secondary button" onClick={this.logout}>Yes</button>
                <button className="ui button"><Link to='/myProfile' className="logout-link">No</Link></button>
            </div>
        )
    }
}

export default Logout;