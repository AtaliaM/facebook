import React from 'react';
import '../style/UserWall.css'
import facebookApi from '../apis/facebook-api';
import Cookies from 'universal-cookie';
import AddNewPost from './AddUserPost';


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
                // console.log(res)
                this.setState({ userPosts: res.data.reverse() })
            }

        } catch (e) {
            console.log(e);
        }
    }

    renderUserPosts = () => {
        return (
            this.state.userPosts.map((post) => {
                return (
                    <div className="ui card" key={post._id}>
                        <div className="content">
                            <i className="right floated like icon"></i>
                            <i className="right floated star icon"></i>
                            {post.postHeader ? <h3 className="postHeader">{post.postHeader}</h3> : null}
                            <div className="description">
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
            this.state.userPosts.length !== 0 ?
                <div className="wall-container">
                    {this.props.myProfile ? <AddNewPost /> : null}
                    <div className="postsContainer">
                        {this.renderUserPosts()}
                    </div>
                </div> :
                <div>
                    {this.props.myProfile ? <AddNewPost /> : null}
                </div>
                
        )

    }

}

export default UserWall;