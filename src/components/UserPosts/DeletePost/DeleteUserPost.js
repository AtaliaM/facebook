import React from 'react';
import facebookApi from '../../../apis/facebook-api';
import Cookies from 'universal-cookie';
import './DeleteUserPost.css';

class DeleteUserPost extends React.Component {

    state = { formOpened: false };

    openOrCloseForm = () => {
        console.log("inn")
        this.setState(prevState => ({
            formOpened: !prevState.formOpened
        }));
    }

    deleteUserPost = async (event) => {
        event.preventDefault();
        const cookies = new Cookies();
        const userToken = cookies.get('userToken');
        console.log(userToken);
        try {
            await facebookApi.delete(`/posts/${this.props.postId}`, {
                headers: { Authorization: "Bearer " + userToken }
            });

            window.location.reload();
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        return (
            <div>
                <span className="right floated">
                    <button className="ui button" onClick={() => this.openOrCloseForm()}>Delete</button>
                </span>

                <div div className={`ui bottom attached segment ${this.state.formOpened ? "show" : "hidden"}`}>
                        <span className="deleteMsg">Are you sure you want to delete this post?</span>
                        <button className="ui secondary button" onClick={this.deleteUserPost}>Yes</button>
                        <button className="ui button" onClick={() => this.openOrCloseForm()}>No</button>
                </div>


            </div>
        )
    }
}

export default DeleteUserPost;