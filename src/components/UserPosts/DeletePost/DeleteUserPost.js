import React from 'react';
import './DeleteUserPost.css';
import {deleteAuthPost} from '../../../authPaths';

class DeleteUserPost extends React.Component {

    state = { formOpened: false };

    openOrCloseForm = () => {
        this.setState(prevState => ({
            formOpened: !prevState.formOpened
        }));
    }

    deleteUserPost = async (event) => {
        event.preventDefault();
        try {
            await deleteAuthPost(this.props.postId);
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

                <div className={`ui bottom attached segment ${this.state.formOpened ? "show" : "hidden"}`}>
                        <span className="deleteMsg">Are you sure you want to delete this post?</span>
                        <button className="ui secondary button" onClick={this.deleteUserPost}>Yes</button>
                        <button className="ui button" onClick={() => this.openOrCloseForm()}>No</button>
                </div>
            </div>
        )
    }
}

export default DeleteUserPost;