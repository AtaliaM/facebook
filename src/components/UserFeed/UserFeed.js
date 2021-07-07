import React from 'react';
import {Link} from 'react-router-dom';
import './UserFeed.css';
import UserNavBar from '../UserProfile/UserNavBar/UserNavBar';
import facebookApi from '../../apis/facebook-api';
import {getAuthUser} from '../../authPaths';

class UserFeed extends React.Component {

    state = { myFollowing: [], posts: [] }

    async componentDidMount() {
        try {
            const res = await getAuthUser('/users/me');
            // console.log(res.data.usersIFollow)
            this.setState({ myFollowing: [...res.data.usersIFollow] })
            this.fetchPostsFromMyFollowing();
        } catch (e) {
            console.log(e)
        }
    }

    fetchPostsFromMyFollowing = async () => {
        const myFollowing = this.state.myFollowing;
        const posts = [];
        for (let i = 0; i < myFollowing.length; i++) {
            const currentFollowingPosts = await this.fetchUsers(myFollowing, i);
            posts.push(...currentFollowingPosts);
        }

        this.setState({posts:[...posts]})
    }

    fetchUsers = async (data, i) => {
        try {
            const res = await facebookApi.get(`/posts/user/${data[i].userId}`);
            const res2 = await facebookApi.get(`/users/id/${data[i].userId}`);
            const posts = res.data.map((post)=> {
                return (
                    {_id: post._id, postBody: post.postBody, postHeader:post.postHeader, owner: `${res2.data.firstName} ${res2.data.lastName}`, path: res2.data.path}
                )
            })
            return posts;
        } catch (e) {
            console.log(e);
        }
    }

    renderPostsToFeed = () => {
        return (
            this.state.posts.map((post) => {
                return (
                    <div className="ui card" key={post._id}>
                        <div className="content scroll">
                            <h4><Link to={`/users/${post.path}`} className="userLink"><i className="user icon"></i>{post.owner}</Link></h4>
                            {post.postHeader ? <h3 className="postHeader">{post.postHeader}</h3> : null}
                            <div className="postBody">
                                <p className="postBody">{post.postBody}</p>
                            </div>
                        </div>
                        <div className="extra content">
                            <span className="left floated like">
                                <i className="like icon"></i>
                                Like</span>
                            <span >
                                <i className="comment icon"></i>
                                Comments</span>
                            <span className="right floated star">
                                <i className="star icon"></i>
                                Favorite</span>
                        </div>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div>
                <UserNavBar />
                <div className="feedContainer">
                    <div>
                        <h2 className="feedHeader">My Feed</h2>
                        {this.state.posts.length !== 0 ? this.renderPostsToFeed():null}
                    </div>
                </div>

            </div>
        )
    }
}

export default UserFeed;