import React from 'react';
import './AddUserPost.css';
import {postAuthUser} from '../../../authPaths';

class AddUserPost extends React.Component {
    //user's new post//
    state = {userPostBody : "", userPostHeader: "", formOpened: false}

    openOrCloseForm = () => {
        console.log("inn")
        this.setState(prevState => ({
            formOpened: !prevState.formOpened
          }));
    }

    uploadPost = async(event) => {
        event.preventDefault();
        const post = {postBody: this.state.userPostBody, postHeader: this.state.userPostHeader};
        try {
            await postAuthUser("/posts", post);
            this.openOrCloseForm();
            window.location.reload();
            // this.props.history.push("/myProfile");
        } catch(e) {
            console.log(e);
        }

    }

    render() {
        return (
            <div>
                <div className="buttonContainer">
                    <button className="ui button addBtn" onClick={() => this.openOrCloseForm()}>Add new post</button>
                </div>
    
                <div className={`add-post-form-popup ${this.state.formOpened ? "show" : "hidden"}`} id="myForm">
                    <form action="/action_page.php" className="add-post-form-container" onSubmit={this.uploadPost}>
                        <h2 className="posth2">What's on your mind?</h2>
                        <input type="text" id="postHeader" className="postHeader" onChange={(e) => this.setState({ userPostHeader: e.target.value })} />
                        <textarea name="addPostText" id="addPostText" onChange={(e)=>this.setState({userPostBody:e.target.value})} required/>
                        <button type="submit" className="btn">Submit post</button>
                        <button type="button" className="btn cancel" onClick={() =>this.openOrCloseForm()}>Close</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default AddUserPost;