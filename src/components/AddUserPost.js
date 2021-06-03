import React from 'react';
import '../style/AddUserPost.css';
import facebookApi from '../apis/facebook-api';
import Cookies from 'universal-cookie';


class AddUserPost extends React.Component {
    //user's new post//
    state = {userPostBody : "", userPostHeader: ""}

    openForm = () => {
        document.getElementById("myForm").style.display = "block";
    }

    closeForm = () => {
        document.getElementById("myForm").style.display = "none";
    }

    uploadPost = async(event) => {
        event.preventDefault();
        const post = {postBody: this.state.userPostBody, postHeader: this.state.userPostHeader};
        const cookies = new Cookies();
        const userToken = cookies.get('userToken');
        try {
            facebookApi.post('/posts', post, {
                headers: { Authorization: "Bearer " + userToken }
            })
            document.getElementById("myForm").style.display = "none";
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
                    <button className="addPostBtn" onClick={() => this.openForm()}>Add new post</button>
                </div>
    
                <div className="form-popup2" id="myForm">
                    <form action="/action_page.php" className="form-container" onSubmit={this.uploadPost}>
                        <h2 className="posth2">What's on your mind?</h2>
                        <input type="text" id="postHeader" onChange={(e) => this.setState({ userPostHeader: e.target.value })} />
                        <textarea rows="4" cols="50" onChange={(e)=>this.setState({userPostBody:e.target.value})} required/>
                        <button type="submit" className="btn">Submit post</button>
                        <button type="button" className="btn cancel" onClick={() =>this.closeForm()}>Close</button>
                    </form>
                </div>
    
            </div>
        )
    }

}

export default AddUserPost;