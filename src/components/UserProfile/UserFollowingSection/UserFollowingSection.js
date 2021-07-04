/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './UserFollowingSection.css';
import facebookApi from '../../../apis/facebook-api';
import Cookies from 'universal-cookie';
import tempPhoto from '../../../pictures/icon2.png';

class UserFollowingSection extends React.Component {

    state = { followinglist: [] }

    async componentDidMount() {
        // console.log(this.props.sectionType)
        const followinglist = [];
        if (window.location.pathname === "/myProfile") { //if the user is viewing his own profile
            const cookies = new Cookies();
            const userToken = cookies.get('userToken');
            try {
                const res = await facebookApi.get('/users/me', {
                    headers: { Authorization: "Bearer " + userToken }
                });
                const data = this.props.sectionType === "usersIFollow" ? [...res.data.usersIFollow] : [...res.data.myFollowers];
                for (let i = 0; i < data.length; i++) {
                    const currentFollowing = await this.fetchUsers(data, i);
                    followinglist.push(currentFollowing);
                }
            } catch(e) {
                console.log(e);
            }
        }
        else {
            try {
                const path = window.location.pathname.slice(7);
                const res = await facebookApi.get(`/users/${path}`);
                const data = this.props.sectionType === "usersIFollow" ? [...res.data[0].usersIFollow] : [...res.data[0].myFollowers];
                for (let i = 0; i < data.length; i++) {
                    const currentFollowing = await this.fetchUsers(data, i);
                    followinglist.push(currentFollowing);
                }
            } catch (e) {
                console.log(e);
            }
        }
        this.setState({ followinglist: [...followinglist] })
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    fetchUsers = async (data, i) => {
        try {
            const res = await facebookApi.get(`/users/id/${data[i].userId}`)
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }

    renderFollowingList = () => {
        return (
            this.state.followinglist.map((following) => {
                return (
                    <div key={following._id} >
                        <a href={`/users/${following.path}`} className="followingName" data-tooltip={`${following.firstName} ${following.lastName}`}>
                            <img className="follow" alt={`${following._id}`} src={tempPhoto}></img></a>
                    </div>
                )
            })
        )
    }


    render() {
        return (
            <div className="followingSectionContainer">
                <h3 className="followingh2">{this.props.sectionType==="usersIFollow" ? "Following" : "Followers"}</h3>
                <div className="followingContainer">
                    {this.state.followinglist.length !== 0 ? this.renderFollowingList() : null}
                </div>
            </div>
        )
    }
}

export default UserFollowingSection;