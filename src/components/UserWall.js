import React from 'react';
import '../style/UserWall.css'
import facebookApi from '../apis/facebook-api';
import Cookies from 'universal-cookie';


class UserWall extends React.Component {

    state = { userPosts: [] }

    //user's posts will be fetached and displayed here//
    async componentDidMount() {
        const cookies = new Cookies();
        const userToken = cookies.get('userToken');
        try {
            const res = await facebookApi.get('/posts', {
                headers: { Authorization: "Bearer " + userToken }
            });
            if (res) {
                console.log(res)
                this.setState({ userPosts: res.data })
            }

        } catch (e) {
            console.log(e);
        }
    }

    renderUserPosts = () => {
        return (
            this.state.userPosts.map((post) => {
                return (
                    // <div className="singlePostContainer">
                    //     <div>{post.postBody}</div>
                    // </div>
                    <div class="ui card">
                        <div class="content">
                            <i class="right floated like icon"></i>
                            <i class="right floated star icon"></i>
                            <div class="header">Post header</div>
                            <div class="description">
                                <p>{post.postBody}</p>
                            </div>
                        </div>
                        <div class="extra content">
                            <span class="left floated like">
                                <i class="like icon"></i>
                                    Like</span>
                            <span class="right floated star">
                                <i class="star icon"></i>
                                    Favorite</span>
                        </div>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            this.state.userPosts.length !== 0 ?
                <div className="wall-container">
                    <div className="postsContainer">
                        {this.renderUserPosts()}
                    </div>
                </div> :
                <div>You don't have any posts yet..</div>
        )

    }

}

export default UserWall;