import React from 'react';
import './UserFollowingSection.css';
import facebookApi from '../../../apis/facebook-api';
import Cookies from 'universal-cookie';

class UserFollowingSection extends React.Component {

    state = { followinglist: [] }

    async componentDidMount() {
        const cookies = new Cookies();
        const userToken = cookies.get('userToken');

        const res = await facebookApi.get('/users/me', {
            headers: { Authorization: "Bearer " + userToken }
        });
        const data = [...res.data.usersIFollow];
        const followinglist = [];

        data.forEach(async(following)=> {
            try {
                const res = await facebookApi.get(`/users/${following.userId}`)
                followinglist.push(res.data[0]);
            } catch(e) {
                console.log(e);
            }
        })
        this.setState({followinglist: [...followinglist]})
    }

    renderFollowingList = () => {
        return (
            this.state.followinglist.map((following)=> {
                return (
                    <div className="follow">
                        <p>{`${following.firstName} ${following.lastName}`}</p>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div>
                <h3 className="followingh2">Users I follow</h3>
                <div className="followingContainer">
                    {this.state.followinglist.length !== 0 ? this.renderFollowingList() : null}
                </div>
            </div>
        )
    }
}

export default UserFollowingSection;